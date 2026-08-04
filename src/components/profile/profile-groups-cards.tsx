"use client";

import EntityCard, { type EntityCardData, type GroupRole } from "@/components/cards/entity-card";

export type { GroupRole };

export interface GroupType {
    id: number;
    title: string;
    category: string;
    categoryId: number;
    members: string;
    colorFrom: string;
    colorTo: string;
    image: string;
    location: string;
    startDate: string;
    owner: string;
    role: GroupRole;
    status: string;
    statusClasses: string;
}

export default function ProfileGroupCard({ group, className }: { group: GroupType; className?: string }) {
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
        status: group.status,
        statusClasses: group.statusClasses,
        owner: group.owner,
        startDate: group.startDate,
        role: group.role,
    };

    return <EntityCard data={data} className={className} />;
}
