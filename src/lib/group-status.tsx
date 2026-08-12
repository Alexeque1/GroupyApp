import { Clock, Radio, CheckCircle2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type GroupStatus = "Upcoming" | "Active" | "Past";

export interface GroupStatusInfo {
    label: string;
    icon: LucideIcon;
    badgeClasses: string; // bg + text + border de la pill
    dotClasses: string; // color sólido para el indicador circular
    pulse?: boolean; // "en vivo ahora" — punto animado
}

// Fuente única de verdad para color + ícono + copy por estado de grupo.
// Las mismas clases de badge que ya estaban duplicadas en cada registro de
// GROUPS_DATA (status/statusClasses), ahora centralizadas acá.
export const GROUP_STATUS_DATA: Record<GroupStatus, GroupStatusInfo> = {
    Upcoming: {
        label: "Upcoming",
        icon: Clock,
        badgeClasses: "bg-[#8C6CFF]/20 text-[#6D28D9] border-[#8C6CFF]/30",
        dotClasses: "bg-[#6D28D9]",
    },
    Active: {
        label: "Happening now",
        icon: Radio,
        badgeClasses: "bg-[#059669]/20 text-[#059669] border-[#059669]/30",
        dotClasses: "bg-[#059669]",
        pulse: true,
    },
    Past: {
        label: "Finished",
        icon: CheckCircle2,
        badgeClasses: "bg-black/10 text-black/60 border-black/10",
        dotClasses: "bg-black/40",
    },
};

// Fallback defensivo por si llega un status que no está en el mapa.
export const FALLBACK_STATUS_INFO: GroupStatusInfo = {
    label: "Unknown",
    icon: Clock,
    badgeClasses: "bg-black/10 text-black/50 border-black/10",
    dotClasses: "bg-black/30",
};

export function getGroupStatusInfo(status: string): GroupStatusInfo {
    return GROUP_STATUS_DATA[status as GroupStatus] ?? FALLBACK_STATUS_INFO;
}
