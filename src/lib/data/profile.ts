import { connectDB } from "@/lib/db/db";
import { User } from "@/model/User";
import { Event } from "@/model/Event";
import { EventMember, ACTIVE_ROLES } from "@/model/EventMember";
import { getMemberCountsAndOwners } from "@/lib/data/events";
import type { ProfileEvent } from "@/components/profile/profile-events-cards";
import type { EventRole } from "@/components/cards/entity-card";

/** Everything the profile page shows, already serialized. Same shape the profile components expect. */
export type ProfileData = {
    id: string;
    name: string;
    lastName: string;
    username: string;
    profileImage: string;
    bio: string;
    city: string;
    country: string;
    profession: string;
    languages: string[];
    interests: string[];
    /** e.g. "October 2026" */
    joined: string;
    events: ProfileEvent[];
    // Not built yet (friends, communities, reviews, verification): always empty for now
    friends: [];
    communities: [];
    verified: boolean;
    rating: number;
    reviewsCount: number;
};

/** Returns null if no user has that username. */
export async function getProfileData(username: string): Promise<ProfileData | null> {
    await connectDB();

    const user = await User.findOne({ username })
        .select("firstName lastName username profileImage bio city country profession languages interests createdAt")
        .lean();
    if (!user) return null;

    // Events where this user is owner, admin or member (pending requests are private)
    const memberships = await EventMember.find({ userId: user._id, role: { $in: ACTIVE_ROLES } })
        .select("eventId role")
        .lean();
    const roleByEvent = new Map(memberships.map((m) => [m.eventId.toString(), m.role as EventRole]));

    const events = memberships.length
        ? await Event.find({ _id: { $in: memberships.map((m) => m.eventId) } }).lean()
        : [];
    const { countByEvent, ownerByEvent } = await getMemberCountsAndOwners(events.map((e) => e._id));

    return {
        id: user._id.toString(),
        name: user.firstName,
        lastName: user.lastName,
        username: user.username,
        profileImage: user.profileImage ?? "",
        bio: user.bio ?? "",
        city: user.city ?? "",
        country: user.country ?? "",
        profession: user.profession ?? "",
        languages: user.languages ?? [],
        interests: user.interests ?? [],
        joined: user.createdAt.toLocaleDateString("en-US", { month: "long", year: "numeric" }),
        events: events.map((event) => {
            const id = event._id.toString();
            const owner = ownerByEvent.get(id);
            return {
                id,
                title: event.title,
                category: event.category,
                image: event.image ?? "",
                location: event.location,
                startDate: event.startDate.toISOString(),
                members: `${countByEvent.get(id) ?? 0}/${event.capacity}`,
                owner: owner?.shortName ?? "",
                ownerUsername: owner?.username ?? "",
                role: roleByEvent.get(id),
            };
        }),
        friends: [],
        communities: [],
        verified: false,
        rating: 0,
        reviewsCount: 0,
    };
}
