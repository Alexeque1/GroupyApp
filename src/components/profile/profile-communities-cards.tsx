"use client";

import EntityCard, { type EntityCardData } from "@/components/cards/entity-card";
import { getCommunityStatusInfo } from "@/lib/community-status";

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
}

export default function ProfileCommunityCard({ community, className }: { community: CommunityType; className?: string }) {
    // statusClasses no se guarda: se busca a partir de status, así nunca puede
    // quedar desincronizado del texto que se está mostrando.
    const statusInfo = getCommunityStatusInfo(community.status);

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
        status: statusInfo.label,
        statusClasses: statusInfo.badgeClasses,
        activity: community.activity,
    };

    return <EntityCard data={data} className={className} />;
}
