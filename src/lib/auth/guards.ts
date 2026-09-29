import { Types } from "mongoose";
import { auth } from "@/auth";
import { connectDB } from "@/lib/db/db";
import { EventMember, type MemberRole } from "@/model/EventMember";

export class AuthError extends Error {
    constructor(
        message: string,
        public status: 401 | 403 | 404
    ) {
        super(message);
        this.name = "AuthError";
    }
}

/** Is anyone logged in? If not, cut with 401. */
export async function requireUser() {
    const session = await auth();

    if (!session?.user?.id) {
        throw new AuthError("You need to sign in", 401);
    }

    return session.user;
}

/** Does the user have any of these roles in this event? If not, cut with 403. */
export async function requireEventRole(eventId: string, allowedRoles: MemberRole[]) {
    const user = await requireUser();

    if (!Types.ObjectId.isValid(eventId)) {
        throw new AuthError("Event not found", 404);
    }

    await connectDB();
    const membership = await EventMember.findOne({ eventId, userId: user.id }).select("role").lean();

    if (!membership || !allowedRoles.includes(membership.role as MemberRole)) {
        throw new AuthError("You don't have permission to do this", 403);
    }

    return { user, role: membership.role as MemberRole };
}