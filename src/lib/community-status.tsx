export type CommunityStatus = "Public" | "Private";

export interface CommunityStatusInfo {
    label: string;
    badgeClasses: string;
}

// Single source of truth for each community status's classes —
// previously "statusClasses" was repeated by hand in every COMMUNITIES_DATA entry.
export const COMMUNITY_STATUS_DATA: Record<CommunityStatus, CommunityStatusInfo> = {
    Public: {
        label: "Public",
        badgeClasses: "bg-brand-mint/30 text-brand-green border-brand-green/20",
    },
    Private: {
        label: "Private",
        badgeClasses: "bg-brand-purple/20 text-brand-purple-deep border-brand-purple/30",
    },
};

export const FALLBACK_COMMUNITY_STATUS_INFO: CommunityStatusInfo = {
    label: "Unknown",
    badgeClasses: "bg-black/10 text-black/50 border-black/10",
};

export function getCommunityStatusInfo(status: string): CommunityStatusInfo {
    return COMMUNITY_STATUS_DATA[status as CommunityStatus] ?? FALLBACK_COMMUNITY_STATUS_INFO;
}
