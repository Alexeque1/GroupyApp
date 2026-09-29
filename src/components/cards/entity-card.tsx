import Image from "next/image";
import Link from "next/link";
import { Users, ArrowUpRight, Crown, Calendar, Shield, MapPin, Activity, ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { USERS_DATA } from "@/lib/mock_data/users-data";
import { DISCOVER_CATEGORIES } from "@/lib/discover-categories";

// Fallback palette for categories not in DISCOVER_CATEGORIES (e.g. communities)
const FALLBACK_CATEGORY_COLORS = [
    "bg-indigo-500",
    "bg-teal-500",
    "bg-fuchsia-500",
    "bg-amber-500",
    "bg-sky-500",
    "bg-lime-600",
];

function getCategoryBadgeColor(category: string) {
    const match = DISCOVER_CATEGORIES.find((c) => c.name.toLowerCase() === category?.toLowerCase());
    if (match) return match.solid;
    if (!category) return "bg-black/60";

    let hash = 0;
    for (let i = 0; i < category.length; i++) {
        hash = category.charCodeAt(i) + ((hash << 5) - hash);
    }
    return FALLBACK_CATEGORY_COLORS[Math.abs(hash) % FALLBACK_CATEGORY_COLORS.length];
}

export type EventRole = "owner" | "admin" | "member";
export type EntityCardKind = "event" | "community";

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
    role?: EventRole;
    activity?: string;
}

const ROLE_BADGE: Record<Exclude<EventRole, "member">, { label: string; Icon: typeof Crown; classes: string }> = {
    owner: {
        label: "Owner",
        Icon: Crown,
        classes: "bg-brand-purple/20 text-brand-purple-deep border-brand-purple/30",
    },
    admin: {
        label: "Admin",
        Icon: Shield,
        classes: "bg-black/5 text-black/80 border-black/10 dark:bg-white/10 dark:text-white/80 dark:border-white/10",
    },
};

interface EntityCardProps {
    data: EntityCardData;
    variant?: "full" | "preview" | "suggestion";
    className?: string;
}

export default function EntityCard({ data, variant = "full", className }: EntityCardProps) {
    if (variant === "suggestion") {
        return <SuggestionCard data={data} className={className} />;
    }

    const isPreview = variant === "preview";
    const isEvent = data.kind === "event";
    const accentHover = isEvent ? "group-hover:text-brand-purple-deep" : "group-hover:text-brand-green";
    const roleBadge = data.role && data.role !== "member" ? ROLE_BADGE[data.role] : null;
    const isDataUrl = data.image?.startsWith("blob:") || data.image?.startsWith("data:");

    // --- MEMBERS AND AVATARS LOGIC ---
    let displayMembers: typeof USERS_DATA = [];
    if (!isPreview && data.id) {
        if (isEvent) {
            displayMembers = USERS_DATA.filter((user) =>
                user.events?.owner?.includes(data.id!) ||
                user.events?.admin?.includes(data.id!) ||
                user.events?.member?.includes(data.id!)
            );
        } else {
            displayMembers = USERS_DATA.filter((user) =>
                user.communityIds?.includes(data.id!)
            );
        }
    }

    let totalMembers = displayMembers.length;
    let badgeText = "";

    if (!isPreview && data.members) {
        if (data.members.includes("/")) {
            totalMembers = parseInt(data.members.split("/")[0], 10) || totalMembers;
        } else if (data.members.toLowerCase().includes("k")) {
            totalMembers = 10000;
            const match = data.members.match(/([\d.]+k)/i);
            badgeText = match ? `+${match[1]}` : "+99";
        } else {
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
            href={isPreview ? "#" : `/${isEvent ? "event" : "community"}/${data.id}`}
            className="block h-full">
            <div
                className={cn(
                    "group relative flex h-full flex-col overflow-hidden rounded-3xl border border-black/10 bg-white shadow-sm transition-all duration-300 dark:border-white/10 dark:bg-brand-dark",
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
                    
                    {/* Top-left badge */}
                    <span
                        className={cn(
                            "absolute left-4 top-4 z-10 rounded-full border border-white/30 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm",
                            getCategoryBadgeColor(data.category)
                        )}
                    >
                        {data.category || (isEvent ? "Category" : "Community")}
                    </span>

                </div>

                {/* Color stripe by category: thin accent line (2px) */}
                <div className={cn("h-[2px] w-full shrink-0 opacity-90", getCategoryBadgeColor(data.category))} />

                {/* CONTENT */}
                <div className="flex flex-1 flex-col p-5 pt-2">
                    <div className="flex items-start justify-between min-h-[3rem]">
                        <h4 className={cn("line-clamp-2 text-lg font-bold leading-tight text-black/90 transition-colors dark:text-white", accentHover)}>
                            {data.title || (isEvent ? "Untitled event" : "Untitled community")}
                        </h4>

                        {!isPreview && (
                            <div className="mt-1 flex h-8 w-8 shrink-0 -translate-x-2 items-center justify-center rounded-full bg-black/5 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 dark:bg-white/10">
                                <ArrowUpRight size={16} className="text-black/70 dark:text-white/70" />
                            </div>
                        )}
                    </div>

                    <div className="mt-3 flex flex-col gap-3">
                        {(isPreview || data.owner || data.activity) && (
                            <div className="flex items-center justify-between text-xs font-medium text-black/60 dark:text-white/50">
                                <div className="flex items-center gap-1.5">
                                    {isEvent ? (
                                        <Crown size={14} className="text-black/40 dark:text-white/30" />
                                    ) : (
                                        <Activity size={14} className="text-black/40 dark:text-white/30" />
                                    )}
                                    <span className="max-w-[100px] truncate">
                                        {isEvent ? data.owner || "No owner yet" : data.activity || "No activity yet"}
                                    </span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <MapPin size={14} className="text-black/40 dark:text-white/30" />
                                    <span>{data.location || "No location yet"}</span>
                                </div>
                            </div>
                        )}

                        {isEvent && (isPreview || data.startDate) && (
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

                    {/* FOOTER (Without the top stripe) */}
                    <div className="mt-auto flex items-center justify-between pt-4">
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
                                                <div key={u.id} className={cn("relative h-8 w-8 overflow-hidden rounded-full border-2 border-white bg-black/5 dark:border-brand-dark", zIndexClasses[i])}>
                                                    <Image src={u.profileImage} alt={u.username} fill className="object-cover" />
                                                </div>
                                            );
                                        })}
                                        {remainingCount > 0 && (
                                            <div className={cn("z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-black/10 font-bold text-black/50 dark:border-brand-dark", badgeText.length > 3 ? "text-[8px]" : "text-[10px]")}>
                                                {badgeText}
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <>
                                        <div className={cn("z-30 h-8 w-8 rounded-full border-2 border-white bg-gradient-to-br dark:border-brand-dark", data.colorFrom, data.colorTo)} />
                                        <div className="z-20 h-8 w-8 rounded-full border-2 border-white bg-black/20 dark:border-brand-dark" />
                                        <div className="z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-black/10 text-[10px] font-bold text-black/50 dark:border-brand-dark">
                                            +{isEvent ? 5 : 12}
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

function SuggestionCard({ data, className }: { data: EntityCardData; className?: string }) {
    const isEvent = data.kind === "event";
    const isDataUrl = data.image?.startsWith("blob:") || data.image?.startsWith("data:");
    const hasImage = Boolean(data.image);

    let spotsLeftLabel: string | null = null;
    if (data.members?.includes("/")) {
        const [current, total] = data.members.split("/").map((n) => parseInt(n, 10));
        if (!isNaN(current) && !isNaN(total)) {
            const left = total - current;
            spotsLeftLabel = left > 0 ? `${left} spot${left === 1 ? "" : "s"} left` : "Full";
        }
    }

    return (
        <Link href={data.id ? `/${isEvent ? "event" : "community"}/${data.id}` : "#"} className="block h-full">
            <div
                className={cn(
                    "group relative flex h-full flex-col overflow-hidden rounded-3xl border border-black/10 bg-white shadow-sm transition-all duration-300 cursor-pointer hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] dark:border-white/10 dark:bg-brand-dark",
                    className
                )}
            >
                {/* COVER */}
                <div
                    className={cn(
                        "relative h-28 w-full overflow-hidden",
                        !hasImage && `bg-linear-to-br ${data.colorFrom} ${data.colorTo}`
                    )}
                >
                    {hasImage && (
                        isDataUrl ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                                src={data.image!}
                                alt={data.title || "Cover"}
                                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                        ) : (
                            <Image
                                src={data.image!}
                                alt={data.title || "Cover"}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                        )
                    )}

                    <span className="absolute left-3 top-3 z-10 rounded-full bg-white/95 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-black/80 shadow-sm">
                        {data.category || (isEvent ? "Event" : "Community")}
                    </span>
                </div>

                {/* CONTENT */}
                <div className="flex flex-1 flex-col gap-1.5 p-4">
                    <h4 className="line-clamp-1 text-base font-bold leading-tight text-black/90 dark:text-white">
                        {data.title || (isEvent ? "Untitled event" : "Untitled community")}
                    </h4>

                    {data.startDate && (
                        <div className="flex items-center gap-1.5 text-xs font-medium text-black/60 dark:text-white/60">
                            <Calendar size={13} className="text-black/40 dark:text-white/30" />
                            <span>{data.startDate}</span>
                        </div>
                    )}

                    <div className="flex items-center gap-1.5 text-xs font-medium text-black/60 dark:text-white/60">
                        <MapPin size={13} className="text-black/40 dark:text-white/30" />
                        <span>
                            {data.location || "No location yet"}
                            {data.members ? ` · ${data.members}` : ""}
                        </span>
                    </div>

                    {/* MATCH CHIP */}
                    <div className="mt-2 flex items-center gap-1.5 self-start rounded-full bg-brand-purple/10 px-3 py-1.5 text-xs font-semibold text-brand-purple-deep">
                        <MapPin size={12} />
                        <span>
                            Suggestion text
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
}