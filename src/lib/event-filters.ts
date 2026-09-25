import { EventType } from "@/components/profile/profile-events-cards";

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

export function matchesTime(event: EventType, filter: string): boolean {
    if (filter === "all") return true;
    const days = daysFromToday(event.startDate);
    if (days < 0) return false; 
    if (filter === "today_week") return days <= 7;
    if (filter === "this_month") return days <= 31;
    return true; //
}

export function matchesCapacity(event: EventType, filter: string): boolean {
    if (filter === "all") return true;
    const cap = maxCapacity(event.members);
    if (filter === "small") return cap <= 5;
    if (filter === "medium") return cap >= 6 && cap <= 15;
    if (filter === "large") return cap > 15;
    return true;
}

export function getSuggestedEvents(events: EventType[]): EventType[] {
    return events.filter(
        (event) => event.role === undefined && daysFromToday(event.startDate) >= 0
    );
}

export function pickNextEvent(events: EventType[]): EventType | null {
    const now = Date.now();
    const upcoming = events
        .filter((event) => new Date(event.startDate).getTime() >= now)
        .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
    return upcoming[0] ?? null;
}