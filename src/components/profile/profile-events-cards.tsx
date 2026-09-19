import EntityCard, { type EntityCardData, type EventRole } from "@/components/cards/entity-card";
import { getEventStatus, getEventStatusInfo } from "@/lib/event-status";
import { formatEventDate } from "@/lib/date";

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

export default function ProfileEventCard({ event, className }: { event: EventType; className?: string }) {
    const statusInfo = getEventStatusInfo(getEventStatus(event.startDate));

    const data: EntityCardData = {
        kind: "event",
        id: event.id,
        title: event.title,
        image: event.image,
        category: event.category,
        location: event.location,
        members: event.members,
        colorFrom: event.colorFrom,
        colorTo: event.colorTo,
        status: statusInfo.label,
        statusClasses: statusInfo.badgeClasses,
        owner: event.owner,
        startDate: formatEventDate(event.startDate),
        role: event.role,
    };

    return <EntityCard data={data} className={className} />;
}
