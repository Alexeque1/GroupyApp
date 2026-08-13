export type CommunityStatus = "Public" | "Private";

export interface CommunityStatusInfo {
    label: string;
    badgeClasses: string;
}

// Fuente única de verdad para las clases de cada status de comunidad —
// antes "statusClasses" se repetía a mano en cada registro de COMMUNITIES_DATA.
export const COMMUNITY_STATUS_DATA: Record<CommunityStatus, CommunityStatusInfo> = {
    Public: {
        label: "Public",
        badgeClasses: "bg-[#A9FFD7]/30 text-[#059669] border-[#059669]/20",
    },
    Private: {
        label: "Private",
        badgeClasses: "bg-[#8C6CFF]/20 text-[#6D28D9] border-[#8C6CFF]/30",
    },
};

export const FALLBACK_COMMUNITY_STATUS_INFO: CommunityStatusInfo = {
    label: "Unknown",
    badgeClasses: "bg-black/10 text-black/50 border-black/10",
};

export function getCommunityStatusInfo(status: string): CommunityStatusInfo {
    return COMMUNITY_STATUS_DATA[status as CommunityStatus] ?? FALLBACK_COMMUNITY_STATUS_INFO;
}
