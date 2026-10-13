import { Types } from "mongoose";
import { connectDB } from "@/lib/db/db";
import { Event } from "@/model/Event";
import { EventMember, ACTIVE_ROLES, type MemberRole } from "@/model/EventMember";
// Registers the User model so populate("userId") can find it
import "@/model/User";

export type EventHost = {
    id: string;
    firstName: string;
    lastName: string;
    username: string;
    profileImage: string;
};

/** A pending request to join, as the owner/admins see it in the Requests tab. */
export type EventJoinRequest = {
    /** The EventMember id */
    id: string;
    message: string;
    createdAt: string;
    requester: {
        id: string;
        firstName: string;
        lastName: string;
        username: string;
        profileImage: string;
        city: string;
    };
};

/** Everything the event page needs, already serialized (no ObjectIds or Dates). */
export type EventPageData = {
    id: string;
    title: string;
    description: string;
    category: string;
    image: string;
    location: string;
    startDate: string;
    capacity: number;
    registrationsClosed: boolean;
    memberCount: number;
    owner: EventHost | null;
    admins: EventHost[];
    /** Role of the user viewing the page, or null if they have no relation to the event */
    viewerRole: MemberRole | null;
    /** What the viewer wrote in their own pending request ("" if none) */
    viewerRequestMessage: string;
    /** Pending requests. Only filled for the owner and admins; empty for everyone else. */
    requests: EventJoinRequest[];
};

type PopulatedRequester = {
    _id: Types.ObjectId;
    message?: string;
    createdAt: Date;
    userId: {
        _id: Types.ObjectId;
        firstName: string;
        lastName: string;
        username: string;
        profileImage?: string;
        city?: string;
    } | null;
};

async function getPendingRequests(eventId: string): Promise<EventJoinRequest[]> {
    const pending = await EventMember.find({ eventId, role: "pending" })
        .populate<Pick<PopulatedRequester, "userId">>("userId", "firstName lastName username profileImage city")
        .select("message createdAt userId")
        .sort({ createdAt: -1 })
        .lean<PopulatedRequester[]>();

    return pending
        .filter((r) => r.userId)
        .map((r) => ({
            id: r._id.toString(),
            message: r.message ?? "",
            createdAt: r.createdAt.toISOString(),
            requester: {
                id: r.userId!._id.toString(),
                firstName: r.userId!.firstName,
                lastName: r.userId!.lastName,
                username: r.userId!.username,
                profileImage: r.userId!.profileImage ?? "",
                city: r.userId!.city ?? "",
            },
        }));
}

type PopulatedHost = {
    role: MemberRole;
    userId: {
        _id: Types.ObjectId;
        firstName: string;
        lastName: string;
        username: string;
        profileImage?: string;
    } | null;
};

const toHost = (user: NonNullable<PopulatedHost["userId"]>): EventHost => ({
    id: user._id.toString(),
    firstName: user.firstName,
    lastName: user.lastName,
    username: user.username,
    profileImage: user.profileImage ?? "",
});

/** One card in Discover, already serialized. */
export type DiscoverEvent = {
    id: string;
    title: string;
    category: string;
    image: string;
    location: string;
    startDate: string;
    capacity: number;
    memberCount: number;
    ownerName: string;
    /** The viewer already asked to join and is waiting for an answer */
    isRequestPending: boolean;
};

// Discover filters on the client, so we cap the list until there's server-side pagination
const DISCOVER_LIMIT = 200;

/**
 * Upcoming events the viewer could join: not past, registrations open,
 * and the viewer isn't already owner/admin/member. Pending requests stay visible.
 */
export async function getDiscoverEvents(viewerId: string): Promise<DiscoverEvent[]> {
    await connectDB();

    const memberships = await EventMember.find({ userId: viewerId }).select("eventId role").lean();
    const joinedEventIds = memberships
        .filter((m) => ACTIVE_ROLES.includes(m.role as MemberRole))
        .map((m) => m.eventId);
    const pendingEventIds = new Set(
        memberships.filter((m) => m.role === "pending").map((m) => m.eventId.toString())
    );

    const events = await Event.find({
        _id: { $nin: joinedEventIds },
        startDate: { $gte: new Date() },
        registrationsClosed: { $ne: true },
    })
        .sort({ startDate: 1 })
        .limit(DISCOVER_LIMIT)
        .lean();

    if (events.length === 0) return [];

    const { countByEvent, ownerByEvent } = await getMemberCountsAndOwners(events.map((e) => e._id));

    return events.map((event) => {
        const id = event._id.toString();
        return {
            id,
            title: event.title,
            category: event.category,
            image: event.image ?? "",
            location: event.location,
            startDate: event.startDate.toISOString(),
            capacity: event.capacity,
            memberCount: countByEvent.get(id) ?? 0,
            ownerName: ownerByEvent.get(id)?.shortName ?? "",
            isRequestPending: pendingEventIds.has(id),
        };
    });
}

/**
 * For a list of events: how many active members each one has and who owns it.
 * Both maps are keyed by the event id as a string.
 */
export async function getMemberCountsAndOwners(eventIds: Types.ObjectId[]) {
    const [memberCounts, owners] = await Promise.all([
        EventMember.aggregate<{ _id: Types.ObjectId; count: number }>([
            { $match: { eventId: { $in: eventIds }, role: { $in: ACTIVE_ROLES } } },
            { $group: { _id: "$eventId", count: { $sum: 1 } } },
        ]),
        EventMember.find({ eventId: { $in: eventIds }, role: "owner" })
            .populate<Pick<PopulatedHost, "userId">>("userId", "firstName lastName username profileImage")
            .select("eventId userId")
            .lean(),
    ]);

    const countByEvent = new Map(memberCounts.map((c) => [c._id.toString(), c.count]));
    const ownerByEvent = new Map(
        owners
            .filter((o) => o.userId)
            .map((o) => [
                o.eventId.toString(),
                {
                    // "Alexander S."
                    shortName: `${o.userId!.firstName} ${o.userId!.lastName[0] ?? ""}.`,
                    username: o.userId!.username,
                },
            ])
    );

    return { countByEvent, ownerByEvent };
}

/** Returns null when the id is invalid or the event doesn't exist. */
export async function getEventPageData(eventId: string, viewerId: string): Promise<EventPageData | null> {
    if (!Types.ObjectId.isValid(eventId)) return null;

    await connectDB();

    const event = await Event.findById(eventId).lean();
    if (!event) return null;

    const [hosts, memberCount, viewerMembership] = await Promise.all([
        EventMember.find({ eventId, role: { $in: ["owner", "admin"] } })
            .populate<Pick<PopulatedHost, "userId">>("userId", "firstName lastName username profileImage")
            .select("role userId")
            .sort({ createdAt: 1 })
            .lean(),
        EventMember.countDocuments({ eventId, role: { $in: ACTIVE_ROLES } }),
        EventMember.findOne({ eventId, userId: viewerId }).select("role message").lean(),
    ]);

    const viewerRole = (viewerMembership?.role as MemberRole | undefined) ?? null;
    const isHost = viewerRole === "owner" || viewerRole === "admin";

    // A host whose account was deleted comes back with userId = null
    const ownerHost = hosts.find((h) => h.role === "owner" && h.userId);
    const adminHosts = hosts.filter((h) => h.role === "admin" && h.userId);

    return {
        id: event._id.toString(),
        title: event.title,
        description: event.description ?? "",
        category: event.category,
        image: event.image ?? "",
        location: event.location,
        startDate: event.startDate.toISOString(),
        capacity: event.capacity,
        registrationsClosed: event.registrationsClosed ?? false,
        memberCount,
        owner: ownerHost?.userId ? toHost(ownerHost.userId) : null,
        admins: adminHosts.map((h) => toHost(h.userId!)),
        viewerRole,
        viewerRequestMessage: viewerRole === "pending" ? viewerMembership?.message ?? "" : "",
        requests: isHost ? await getPendingRequests(eventId) : [],
    };
}
