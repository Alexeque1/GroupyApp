import { GroupType } from "@/components/profile/profile-groups-cards";

// Fecha de referencia "hoy" (misma que usa Home) — mock determinista.
export const TODAY = new Date("2026-07-31");
const DAY_MS = 1000 * 60 * 60 * 24;

// Días entre la fecha del grupo y hoy (negativo = pasado).
export function daysFromToday(startDate: string): number {
    const date = new Date(startDate);
    return Math.round((date.getTime() - TODAY.getTime()) / DAY_MS);
}

// Capacidad máxima: "8/10" -> 10, "5/No limit" -> Infinity.
export function maxCapacity(members: string): number {
    const raw = members.split("/")[1]?.trim() ?? "";
    const parsed = parseInt(raw, 10);
    return Number.isNaN(parsed) ? Infinity : parsed;
}

export function matchesDate(group: GroupType, filter: string): boolean {
    if (filter === "all") return true;
    const days = daysFromToday(group.startDate);
    if (days < 0) return false; // eventos pasados no aparecen en Discover
    if (filter === "today") return days <= 7; // Today / This week
    if (filter === "month") return days <= 31; // This month
    return true; // "upcoming": cualquier futuro
}

export function matchesCapacity(group: GroupType, filter: string): boolean {
    if (filter === "all") return true;
    const cap = maxCapacity(group.members);
    if (filter === "small") return cap <= 5;
    if (filter === "medium") return cap >= 6 && cap <= 15;
    if (filter === "large") return cap > 15;
    return true;
}
