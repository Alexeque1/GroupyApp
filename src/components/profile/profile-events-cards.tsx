import EntityCard, { type EntityCardData, type EventRole } from "@/components/cards/entity-card";
import { getEventStatus, getEventStatusInfo } from "@/lib/display/event-status";
import { formatEventDate } from "@/lib/helpers/date";

export type { EventRole };

export interface EventType {
    id: number;
    title: string;
    category: string;
    description: string;
    categoryId: number;
    members: string;
    colorFrom: string;
    colorTo: string;
    image: string;
    location: string;
    startDate: string;
    owner: string;
    ownerUsername: string;
    role?: EventRole;
    adminIds: number[];
    ownerId: number;
    createdAt: string;
}

/** The fields a profile needs from an event. Mock `EventType` and real DB events both fit. */
export interface ProfileEvent {
    /** number = mock data, string = MongoDB id */
    id: number | string;
    title: string;
    category: string;
    image: string;
    location: string;
    startDate: string;
    members: string;
    owner: string;
    ownerUsername: string;
    role?: EventRole;
    colorFrom?: string;
    colorTo?: string;
}

export default function ProfileEventCard({ event, className }: { event: ProfileEvent; className?: string }) {
    const statusInfo = getEventStatusInfo(getEventStatus(event.startDate));

    const data: EntityCardData = {
        kind: "event",
        id: event.id,
        title: event.title,
        image: event.image || null,
        category: event.category,
        location: event.location,
        members: event.members,
        colorFrom: event.colorFrom ?? "",
        colorTo: event.colorTo ?? "",
        status: statusInfo.label,
        statusClasses: statusInfo.badgeClasses,
        owner: event.owner,
        startDate: formatEventDate(event.startDate),
        role: event.role,
    };

    return <EntityCard data={data} className={className} />;
}
