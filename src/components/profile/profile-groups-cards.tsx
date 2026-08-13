"use client";

import EntityCard, { type EntityCardData, type GroupRole } from "@/components/cards/entity-card";
import { getGroupStatus, getGroupStatusInfo } from "@/lib/group-status";
import { formatEventDate } from "@/lib/date";

export type { GroupRole };

export interface GroupType {
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
    role?: GroupRole;
    adminIds: number[];
    ownerId: number;
    createdAt: string;
}

export default function ProfileGroupCard({ group, className }: { group: GroupType; className?: string }) {
    const statusInfo = getGroupStatusInfo(getGroupStatus(group.startDate));

    const data: EntityCardData = {
        kind: "group",
        id: group.id,
        title: group.title,
        image: group.image,
        category: group.category,
        location: group.location,
        members: group.members,
        colorFrom: group.colorFrom,
        colorTo: group.colorTo,
        status: statusInfo.label,
        statusClasses: statusInfo.badgeClasses,
        owner: group.owner,
        startDate: formatEventDate(group.startDate),
        role: group.role,
    };

    return <EntityCard data={data} className={className} />;
}
