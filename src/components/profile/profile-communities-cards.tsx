"use client";

import EntityCard, { type EntityCardData } from "@/components/cards/entity-card";

export interface CommunityType {
    id: number;
    title: string;
    category: string;
    members: string;
    colorFrom: string;
    colorTo: string;
    image: string;
    location: string;
    activity: string;
    status: string;
    statusClasses: string;
}

export default function ProfileCommunityCard({ community, className }: { community: CommunityType; className?: string }) {
    const data: EntityCardData = {
        kind: "community",
        id: community.id,
        title: community.title,
        image: community.image,
        category: community.category,
        location: community.location,
        members: community.members,
        colorFrom: community.colorFrom,
        colorTo: community.colorTo,
        status: community.status,
        statusClasses: community.statusClasses,
        activity: community.activity,
    };

    return <EntityCard data={data} className={className} />;
}
