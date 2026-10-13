import { EVENTS_DATA } from "./mock_data/event-data";
import { USERS_DATA, type UserType } from "./mock_data/users-data";
import type { FriendType } from "@/components/profile/profile-friends-cards";

// Same active roles as EventMember (minus "pending", which lives in the Requests tab).
export type EventMemberRole = "owner" | "admin" | "member";

export interface EventMemberViewModel extends FriendType {
    role: EventMemberRole;
}

export const MEMBER_ROLE_ORDER: Record<EventMemberRole, number> = { owner: 0, admin: 1, member: 2 };

export function toEventMember(
    user: Pick<UserType, "id" | "firstName" | "lastName" | "username" | "profileImage">,
    role: EventMemberRole
): EventMemberViewModel {
    return {
        id: user.id,
        name: `${user.firstName} ${user.lastName}`,
        username: `@${user.username}`,
        image: user.profileImage,
        role,
    };
}

export function getMembersForEvent(eventId: number): EventMemberViewModel[] {
    const event = EVENTS_DATA.find((e) => e.id === eventId);
    if (!event) return [];

    const roleOf = (user: UserType): EventMemberRole | null => {
        if (user.id === event.ownerId) return "owner";
        if (event.adminIds.includes(user.id)) return "admin";
        if (user.events.member.includes(event.id)) return "member";
        return null;
    };

    return USERS_DATA
        .map((user) => {
            const role = roleOf(user);
            return role ? toEventMember(user, role) : null;
        })
        .filter((member): member is EventMemberViewModel => member !== null)
        .sort((a, b) => MEMBER_ROLE_ORDER[a.role] - MEMBER_ROLE_ORDER[b.role] || a.name.localeCompare(b.name));
}
