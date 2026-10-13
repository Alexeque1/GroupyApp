"use server";

import { Types } from "mongoose";
import { revalidatePath } from "next/cache";
import { connectDB } from "@/lib/db/db";
import { AuthError, requireEventRole, requireUser } from "@/lib/auth/guards";
import { Event } from "@/model/Event";
import { EventMember, ACTIVE_ROLES } from "@/model/EventMember";

export type MembershipActionResult = { ok: true } | { ok: false; error: string };

const MESSAGE_MAX_LENGTH = 300;
const GENERIC_ERROR = "Something went wrong. Please try again in a bit.";

/** Turns guard errors into a message for the UI; anything else becomes a generic error. */
function toErrorResult(error: unknown): MembershipActionResult {
    if (error instanceof AuthError) return { ok: false, error: error.message };
    console.error(error);
    return { ok: false, error: GENERIC_ERROR };
}

/** Every page that shows membership info for this event. */
function revalidateEventPages(eventId: string) {
    revalidatePath(`/event/${eventId}`);
    revalidatePath("/discover");
    revalidatePath("/profile/[username]", "page");
}

async function countActiveMembers(eventId: string | Types.ObjectId) {
    return EventMember.countDocuments({ eventId, role: { $in: ACTIVE_ROLES } });
}

/** The logged-in user asks to join an event. Creates a "pending" EventMember. */
export async function requestToJoin(eventId: string, message: string): Promise<MembershipActionResult> {
    try {
        const user = await requireUser();
        const trimmedMessage = message.trim();

        if (!Types.ObjectId.isValid(eventId)) return { ok: false, error: "Event not found" };
        if (trimmedMessage.length > MESSAGE_MAX_LENGTH) {
            return { ok: false, error: `Your message can have up to ${MESSAGE_MAX_LENGTH} characters` };
        }

        await connectDB();

        const event = await Event.findById(eventId).select("startDate capacity registrationsClosed").lean();
        if (!event) return { ok: false, error: "Event not found" };
        if (event.startDate < new Date()) return { ok: false, error: "This event has already started" };
        if (event.registrationsClosed) return { ok: false, error: "This event isn't accepting requests" };

        const existing = await EventMember.findOne({ eventId, userId: user.id }).select("role").lean();
        if (existing) {
            return {
                ok: false,
                error: existing.role === "pending" ? "You already sent a request" : "You're already in this event",
            };
        }

        if ((await countActiveMembers(eventId)) >= event.capacity) {
            return { ok: false, error: "This event is already full" };
        }

        await EventMember.create({ eventId, userId: user.id, role: "pending", message: trimmedMessage });
    } catch (error) {
        // Two clicks at once: the unique index (eventId + userId) rejects the second one
        if (error instanceof Error && "code" in error && error.code === 11000) {
            return { ok: false, error: "You already sent a request" };
        }
        return toErrorResult(error);
    }

    revalidateEventPages(eventId);
    return { ok: true };
}

/** The logged-in user withdraws their own pending request. */
export async function cancelJoinRequest(eventId: string): Promise<MembershipActionResult> {
    try {
        const user = await requireUser();
        if (!Types.ObjectId.isValid(eventId)) return { ok: false, error: "Event not found" };

        await connectDB();
        const { deletedCount } = await EventMember.deleteOne({ eventId, userId: user.id, role: "pending" });
        if (deletedCount === 0) return { ok: false, error: "There's no pending request to cancel" };
    } catch (error) {
        return toErrorResult(error);
    }

    revalidateEventPages(eventId);
    return { ok: true };
}

/** Owner or admin accepts (→ "member") or declines (→ deleted) a pending request. */
export async function resolveJoinRequest(
    eventId: string,
    requestId: string,
    accept: boolean
): Promise<MembershipActionResult> {
    try {
        await requireEventRole(eventId, ["owner", "admin"]);
        if (!Types.ObjectId.isValid(requestId)) return { ok: false, error: "Request not found" };

        // requireEventRole already connected to the DB
        const request = await EventMember.findOne({ _id: requestId, eventId, role: "pending" }).select("_id").lean();
        if (!request) return { ok: false, error: "This request was already handled" };

        if (accept) {
            const event = await Event.findById(eventId).select("capacity").lean();
            if (!event) return { ok: false, error: "Event not found" };
            if ((await countActiveMembers(eventId)) >= event.capacity) {
                return { ok: false, error: "The event is full. Raise the capacity to accept more people." };
            }

            await EventMember.updateOne({ _id: requestId, role: "pending" }, { role: "member", message: "" });
        } else {
            await EventMember.deleteOne({ _id: requestId, role: "pending" });
        }
    } catch (error) {
        return toErrorResult(error);
    }

    revalidateEventPages(eventId);
    return { ok: true };
}

/** A member or admin leaves the event. The owner can't, until ownership transfer exists. */
export async function leaveEvent(eventId: string): Promise<MembershipActionResult> {
    try {
        const { user, role } = await requireEventRole(eventId, ["member", "admin", "owner"]);
        if (role === "owner") {
            return { ok: false, error: "As the owner, you need to transfer the event before leaving" };
        }

        await EventMember.deleteOne({ eventId, userId: user.id, role: { $in: ["member", "admin"] } });
    } catch (error) {
        return toErrorResult(error);
    }

    revalidateEventPages(eventId);
    return { ok: true };
}
