import { EVENTS_DATA } from "./event-data";
import { COMMUNITIES_DATA } from "./community-data";
import { USERS_DATA, UserType } from "./users-data";
import type { EventType, EventRole } from "@/components/profile/profile-events-cards";
import type { CommunityType } from "@/components/profile/profile-communities-cards";
import type { FriendType } from "@/components/profile/profile-friends-cards";

export interface ProfileViewModel {
    id: number;
    name: string;
    lastName: string;
    username: string;
    profileImage: string;
    events: EventType[];
    friends: FriendType[];
    communities: CommunityType[];
    country: string;
    city: string;
    bio: string;
    profession: string;
    languages: string[];
    interests: string[];
    joined: string;
    verified: boolean;
}

function resolveEvents(user: UserType): EventType[] {
    const withRole = (id: number, role: EventRole): EventType | undefined => {
        const event = EVENTS_DATA.find((g) => g.id === id);
        return event ? { ...event, role } : undefined;
    };

    return [
        ...user.events.owner.map((id) => withRole(id, "owner")),
        ...user.events.admin.map((id) => withRole(id, "admin")),
        ...user.events.member.map((id) => withRole(id, "member")),
    ].filter((g): g is EventType => Boolean(g));
}

function resolveCommunities(user: UserType): CommunityType[] {
    return user.communityIds
        .map((id) => COMMUNITIES_DATA.find((c) => c.id === id))
        .filter((c): c is CommunityType => Boolean(c));
}

export function countMutualFriends(userId: number, friendId: number): number {
    const user = USERS_DATA.find((u) => u.id === userId);
    const friend = USERS_DATA.find((u) => u.id === friendId);
    if (!user || !friend) return 0;

    const friendSet = new Set(friend.friendIds);
    return user.friendIds.filter((id) => id !== friendId && friendSet.has(id)).length;
}

function resolveFriends(user: UserType): FriendType[] {
    return user.friendIds
        .map((id) => USERS_DATA.find((u) => u.id === id))
        .filter((f): f is UserType => Boolean(f))
        .map((friend) => ({
            id: friend.id,
            name: `${friend.firstName} ${friend.lastName}`,
            username: `@${friend.username}`,
            image: friend.profileImage,
        }));
}

// Punto único para armar la info "de perfil" de un usuario cualquiera.
// Devuelve null si el id no existe (la page decide qué hacer con eso).
export function getProfileViewModel(userId: number): ProfileViewModel | null {
    const user = USERS_DATA.find((u) => u.id === userId);
    if (!user) return null;

    return {
        id: user.id,
        name: user.firstName,
        lastName: user.lastName,
        username: user.username,
        profileImage: user.profileImage,
        events: resolveEvents(user),
        friends: resolveFriends(user),
        communities: resolveCommunities(user),
        country: user.country,
        city: user.city,
        bio: user.bio,
        profession: user.profession,
        languages: user.languages,
        interests: user.interests,
        joined: user.joined,
        verified: user.verified
    };
}
