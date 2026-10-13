"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { connectDB } from "@/lib/db/db";
import { requireUser } from "@/lib/auth/guards";
import { Event } from "@/model/Event";
import { EventMember } from "@/model/EventMember";
import { createEventSchema, type CreateEventField } from "@/lib/validation/events";

export type CreateEventState = {
    errors?: Partial<Record<CreateEventField, string[]>>;
    message?: string;
};

export async function createEvent(_prevState: CreateEventState, formData: FormData): Promise<CreateEventState> {
    const user = await requireUser();
    const get = (key: string) => String(formData.get(key) ?? "");

    const parsed = createEventSchema.safeParse({
        title: get("title"),
        description: get("description"),
        category: get("category"),
        location: get("location"),
        startDate: get("startDate"),
        capacity: get("capacity"),
    });

    if (!parsed.success) {
        return { errors: z.flattenError(parsed.error).fieldErrors };
    }

    let eventId: string;

    try {
        await connectDB();

        const event = await Event.create(parsed.data);
        eventId = event._id.toString();

        try {
            await EventMember.create({ eventId: event._id, userId: user.id, role: "owner" });
        } catch (error) {
            // Sin owner el evento queda huérfano, así que lo borramos
            await Event.deleteOne({ _id: event._id });
            throw error;
        }
    } catch {
        return { message: "We couldn't create your event. Please try again in a bit." };
    }

    redirect(`/event/${eventId}`);
}