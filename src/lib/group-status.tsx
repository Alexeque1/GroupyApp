import { Clock, Radio, CheckCircle2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { daysFromToday } from "@/lib/group-filters";

export type GroupStatus = "Upcoming" | "Active" | "Past";

export interface GroupStatusInfo {
    label: string;
    icon: LucideIcon;
    badgeClasses: string;
    dotClasses: string; 
    pulse?: boolean;
}

export const GROUP_STATUS_DATA: Record<GroupStatus, GroupStatusInfo> = {
    Upcoming: {
        label: "Upcoming",
        icon: Clock,
        badgeClasses: "bg-brand-purple/20 text-brand-purple-deep border-brand-purple/30",
        dotClasses: "bg-brand-purple-deep",
    },
    Active: {
        label: "Happening now",
        icon: Radio,
        badgeClasses: "bg-brand-green/20 text-brand-green border-brand-green/30",
        dotClasses: "bg-brand-green",
        pulse: true,
    },
    Past: {
        label: "Finished",
        icon: CheckCircle2,
        badgeClasses: "bg-black/10 text-black/60 border-black/10",
        dotClasses: "bg-black/40",
    },
};

export const FALLBACK_STATUS_INFO: GroupStatusInfo = {
    label: "Unknown",
    icon: Clock,
    badgeClasses: "bg-black/10 text-black/50 border-black/10",
    dotClasses: "bg-black/30",
};

export function getGroupStatusInfo(status: string): GroupStatusInfo {
    return GROUP_STATUS_DATA[status as GroupStatus] ?? FALLBACK_STATUS_INFO;
}

export function getGroupStatus(startDate: string): GroupStatus {
    const days = daysFromToday(startDate);
    if (days > 0) return "Upcoming";
    if (days === 0) return "Active";
    return "Past";
}
