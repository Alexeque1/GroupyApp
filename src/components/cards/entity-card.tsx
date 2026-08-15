"use client";

import Image from "next/image";
import Link from "next/link";
import { Users, ArrowUpRight, Crown, Calendar, Shield, MapPin, Activity, ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { USERS_DATA } from "@/lib/mock_data/users-data";

export type GroupRole = "owner" | "admin" | "member";
export type EntityCardKind = "group" | "community";

export interface EntityCardData {
    kind: EntityCardKind;
    id?: number;
    title: string;
    image: string | null;
    category: string;
    location: string;
    members: string;
    colorFrom: string;
    colorTo: string;
    status?: string;
    statusClasses?: string;
    owner?: string;
    startDate?: string;
    role?: GroupRole;
    activity?: string;
}

const ROLE_BADGE: Record<Exclude<GroupRole, "member">, { label: string; Icon: typeof Crown; classes: string }> = {
    owner: {
        label: "Owner",
        Icon: Crown,
        classes: "bg-[#8C6CFF]/20 text-[#6D28D9] border-[#8C6CFF]/30",
    },
    admin: {
        label: "Admin",
        Icon: Shield,
        classes: "bg-black/5 text-black/80 border-black/10 dark:bg-white/10 dark:text-white/80 dark:border-white/10",
    },
};

interface EntityCardProps {
    data: EntityCardData;
    variant?: "full" | "preview";
    className?: string;
}

export default function EntityCard({ data, variant = "full", className }: EntityCardProps) {
    const isPreview = variant === "preview";
    const isGroup = data.kind === "group";
    const accentHover = isGroup ? "group-hover:text-[#6D28D9]" : "group-hover:text-[#059669]";
    const roleBadge = data.role && data.role !== "member" ? ROLE_BADGE[data.role] : null;
    const isDataUrl = data.image?.startsWith("blob:") || data.image?.startsWith("data:");

    // --- LÓGICA DE MIEMBROS Y AVATARES ---
    let displayMembers: typeof USERS_DATA = [];
    if (!isPreview && data.id) {
        if (isGroup) {
            displayMembers = USERS_DATA.filter((user) =>
                user.groups?.owner?.includes(data.id!) ||
                user.groups?.admin?.includes(data.id!) ||
                user.groups?.member?.includes(data.id!)
            );
        } else {
            displayMembers = USERS_DATA.filter((user) =>
                user.communityIds?.includes(data.id!)
            );
        }
    }

    // Calcular la cantidad real de miembros desde el string (ej. "8/10", "24.5k")
    let totalMembers = displayMembers.length;
    let badgeText = "";

    if (!isPreview && data.members) {
        if (data.members.includes("/")) {
            // Caso "8/10" -> 8
            totalMembers = parseInt(data.members.split("/")[0], 10) || totalMembers;
        } else if (data.members.toLowerCase().includes("k")) {
            // Caso "24.5k"
            totalMembers = 10000; // Forzar que sea > 3
            const match = data.members.match(/([\d.]+k)/i);
            badgeText = match ? `+${match[1]}` : "+99";
        } else {
            // Caso "50" o "120"
            const parsed = parseInt(data.members.replace(/[^0-9]/g, ""), 10);
            if (!isNaN(parsed)) totalMembers = parsed;
        }
    }

    const maxImages = totalMembers > 3 ? 2 : 3;
    const imagesToShow = displayMembers.slice(0, maxImages);
    const remainingCount = totalMembers - imagesToShow.length;

    if (!badgeText && remainingCount > 0) {
        badgeText = `+${remainingCount}`;
    }

    return (
        <Link
            href={isPreview ? "#" : `/group/${data.id}`}
            className="block h-full">
            <div
                className={cn(
                    "group relative flex h-full flex-col overflow-hidden rounded-3xl border border-black/10 bg-white shadow-sm transition-all duration-300 dark:border-white/10 dark:bg-[#0a0514]",
                    !isPreview && "cursor-pointer hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)]",
                    className
                )}
            >
                {/* COVER */}
                <div className="relative h-32 w-full overflow-hidden bg-black/5 dark:bg-white/5">
                    {data.image ? (
                        isDataUrl ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                                src={data.image}
                                alt={data.title || "Cover"}
                                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                        ) : (
                            <Image
                                src={data.image}
                                alt={data.title || "Cover"}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                        )
                    ) : (
                        <div className="flex h-full w-full items-center justify-center">
                            <ImageIcon size={28} className="text-black/20 dark:text-white/20" />
                        </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <span className="absolute left-4 top-4 rounded-full border border-white/30 bg-white/20 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-md">
                        {data.category || (isGroup ? "Category" : "Community")}
                    </span>
                </div>

                {/* CONTENT */}
                <div className="flex flex-1 flex-col p-5">
                    <div className="flex items-start justify-between">
                        <h4 className={cn("line-clamp-2 text-lg font-bold leading-tight text-black/90 transition-colors dark:text-white", accentHover)}>
                            {data.title || (isGroup ? "Untitled group" : "Untitled community")}
                        </h4>

                        {!isPreview && (
                            <div className="flex h-8 w-8 shrink-0 -translate-x-2 items-center justify-center rounded-full bg-black/5 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 dark:bg-white/10">
                                <ArrowUpRight size={16} className="text-black/70 dark:text-white/70" />
                            </div>
                        )}
                    </div>

                    <div className="mt-4 flex flex-col gap-3">
                        {(isPreview || data.owner || data.activity) && (
                            <div className="flex items-center justify-between text-xs font-medium text-black/60 dark:text-white/50">
                                <div className="flex items-center gap-1.5">
                                    {isGroup ? (
                                        <Crown size={14} className="text-black/40 dark:text-white/30" />
                                    ) : (
                                        <Activity size={14} className="text-black/40 dark:text-white/30" />
                                    )}
                                    <span className="max-w-[100px] truncate">
                                        {isGroup ? data.owner || "No owner yet" : data.activity || "No activity yet"}
                                    </span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <MapPin size={14} className="text-black/40 dark:text-white/30" />
                                    <span>{data.location || "No location yet"}</span>
                                </div>
                            </div>
                        )}

                        {isGroup && (isPreview || data.startDate) && (
                            <div className="flex items-center gap-1.5 text-xs font-medium text-black/60 dark:text-white/50">
                                <Calendar size={14} className="text-black/40 dark:text-white/30" />
                                <span>{data.startDate || "No date yet"}</span>
                            </div>
                        )}

                        {(data.status || roleBadge) && (
                            <div className="flex flex-wrap items-center gap-2">
                                {data.status && (
                                    <span
                                        className={cn(
                                            "inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider",
                                            data.statusClasses
                                        )}
                                    >
                                        {data.status}
                                    </span>
                                )}
                                {roleBadge && (
                                    <span
                                        className={cn(
                                            "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider",
                                            roleBadge.classes
                                        )}
                                    >
                                        <roleBadge.Icon size={12} />
                                        {roleBadge.label}
                                    </span>
                                )}
                            </div>
                        )}
                    </div>

                    {/* FOOTER */}
                    <div className="mt-5 flex items-center justify-between border-t border-black/5 pt-4 dark:border-white/10">
                        <div className="flex items-center gap-1.5 text-sm font-medium text-black/60 dark:text-white/60">
                            <Users size={16} />
                            <span>{data.members}</span>
                        </div>

                        {!isPreview && (
                            <div className="flex -space-x-2">
                                {imagesToShow.length > 0 ? (
                                    <>
                                        {imagesToShow.map((u, i) => {
                                            const zIndexClasses = ["z-30", "z-20", "z-10"];
                                            return (
                                                <div key={u.id} className={cn("relative h-8 w-8 overflow-hidden rounded-full border-2 border-white bg-black/5 dark:border-[#0a0514]", zIndexClasses[i])}>
                                                    <Image src={u.profileImage} alt={u.username} fill className="object-cover" />
                                                </div>
                                            );
                                        })}
                                        {remainingCount > 0 && (
                                            <div className={cn("z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-black/10 font-bold text-black/50 dark:border-[#0a0514]", badgeText.length > 3 ? "text-[8px]" : "text-[10px]")}>
                                                {badgeText}
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <>
                                        <div className={cn("z-30 h-8 w-8 rounded-full border-2 border-white bg-gradient-to-br dark:border-[#0a0514]", data.colorFrom, data.colorTo)} />
                                        <div className="z-20 h-8 w-8 rounded-full border-2 border-white bg-black/20 dark:border-[#0a0514]" />
                                        <div className="z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-black/10 text-[10px] font-bold text-black/50 dark:border-[#0a0514]">
                                            +{isGroup ? 5 : 12}
                                        </div>
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Link>
    );
}