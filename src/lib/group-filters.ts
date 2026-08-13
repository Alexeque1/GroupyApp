import { GroupType } from "@/components/profile/profile-groups-cards";

const DAY_MS = 1000 * 60 * 60 * 24;

export function getToday(): Date {
    return new Date();
}

export function daysFromToday(startDate: string): number {
    const date = new Date(startDate);
    return Math.round((date.getTime() - getToday().getTime()) / DAY_MS);
}

export function maxCapacity(members: string): number {
    const raw = members.split("/")[1]?.trim() ?? "";
    const parsed = parseInt(raw, 10);
    return Number.isNaN(parsed) ? Infinity : parsed;
}

export function matchesTime(group: GroupType, filter: string): boolean {
    if (filter === "all") return true;
    const days = daysFromToday(group.startDate);
    if (days < 0) return false; 
    if (filter === "today_week") return days <= 7;
    if (filter === "this_month") return days <= 31;
    return true; //
}

export function matchesCapacity(group: GroupType, filter: string): boolean {
    if (filter === "all") return true;
    const cap = maxCapacity(group.members);
    if (filter === "small") return cap <= 5;
    if (filter === "medium") return cap >= 6 && cap <= 15;
    if (filter === "large") return cap > 15;
    return true;
}
