import Link from "next/link";
import { Calendar, MapPin, Briefcase, Globe, CalendarX, Pencil, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import type { EventType } from "./profile-events-cards";
import type { CommunityType } from "./profile-communities-cards";
import { getToday } from "@/lib/event-filters";
import { getInterest, type InterestCategory } from "@/lib/mock_data/interests-data";

// Each category gets its own accent from the brand palette.
const CATEGORY_STYLES: Record<InterestCategory | "Other", { icon: string; chip: string }> = {
    Tech: {
        icon: "bg-brand-purple/15 text-brand-purple-deep",
        chip: "hover:border-brand-purple/40 hover:shadow-[0_6px_16px_rgba(140,108,255,0.18)]",
    },
    Creative: {
        icon: "bg-brand-peach/30 text-brand-orange",
        chip: "hover:border-brand-peach/70 hover:shadow-[0_6px_16px_rgba(255,177,153,0.25)]",
    },
    Social: {
        icon: "bg-fuchsia-100 text-fuchsia-600",
        chip: "hover:border-fuchsia-300 hover:shadow-[0_6px_16px_rgba(192,38,211,0.15)]",
    },
    Lifestyle: {
        icon: "bg-amber-100 text-amber-600",
        chip: "hover:border-amber-300 hover:shadow-[0_6px_16px_rgba(217,119,6,0.15)]",
    },
    Sports: {
        icon: "bg-brand-mint/50 text-brand-green",
        chip: "hover:border-brand-green/40 hover:shadow-[0_6px_16px_rgba(5,150,105,0.15)]",
    },
    Other: {
        icon: "bg-black/5 text-black/50",
        chip: "hover:border-black/20 hover:shadow-[0_6px_16px_rgba(0,0,0,0.08)]",
    },
};

type ProfileAsideProps = {
    user: {
        bio: string;
        city: string;
        country: string;
        profession: string;
        languages: string[];
        joined: string;
        events: EventType[];
        communities: CommunityType[];
        interests: string[];
    };
};

function getNearestEvent(events: EventType[]): EventType | null {
    const today = getToday();
    const upcoming = events
        .map((event) => ({ event, date: new Date(event.startDate) }))
        .filter(({ date }) => !isNaN(date.getTime()) && date.getTime() >= today.getTime())
        .sort((a, b) => a.date.getTime() - b.date.getTime());

    return upcoming[0]?.event ?? null;
}

function parseMemberCount(value: string): number {
    const match = value.match(/^([\d.]+)\s*([kKmM]?)/);
    if (!match) return 0;

    const amount = parseFloat(match[1]);
    const suffix = match[2].toLowerCase();

    if (suffix === "k") return amount * 1_000;
    if (suffix === "m") return amount * 1_000_000;
    return amount;
}

export default function ProfileAside({ user }: ProfileAsideProps) {
    const nearestEvent = getNearestEvent(user.events);

    return (
        <aside className="flex h-fit flex-1 flex-col gap-5">
            {/* ABOUT */}
            <div className="flex flex-col gap-4 rounded-3xl border border-black/10 bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.06)] backdrop-blur-sm">
                <h3 className="text-lg font-bold text-black/80">
                    About me
                </h3>

                {/* Biografía corta */}
                <p className="text-sm leading-relaxed text-black/70">
                    {user.bio}
                </p>

                {/* Lista de detalles */}
                <div className="mt-1 flex flex-col gap-3">
                    <div className="flex items-center gap-3 text-sm text-black/70">
                        <MapPin size={16} className="text-brand-purple-deep" />
                        <span>{user.city}, {user.country}</span>
                    </div>

                    <div className="flex items-center gap-3 text-sm text-black/70">
                        <Briefcase size={16} className="text-brand-purple-deep" />
                        <span>{user.profession}</span>
                    </div>

                    <div className="flex items-center gap-3 text-sm text-black/70">
                        <Globe size={16} className="text-brand-purple-deep" />
                        <span>{user.languages.join(", ")}</span>
                    </div>

                    <div className="flex items-center gap-3 text-sm text-black/70">
                        <Calendar size={16} className="text-brand-purple-deep" />
                        <span>Joined in {user.joined}</span>
                    </div>
                </div>
            </div>

            {/* INTERESTS */}
            <div className="flex flex-col gap-4 rounded-3xl border border-black/10 bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.06)] backdrop-blur-sm">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <h3 className="text-lg font-bold text-black/80">Interests</h3>
                        {user.interests.length > 0 && (
                            <span className="rounded-full bg-brand-purple-deep/10 px-2 py-0.5 text-[11px] font-bold text-brand-purple-deep">
                                {user.interests.length}
                            </span>
                        )}
                    </div>

                    <Link
                        href="/settings"
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-black/10 bg-white text-black/50 transition-all duration-200 hover:border-brand-purple/40 hover:bg-brand-purple-deep/5 hover:text-brand-purple-deep"
                        aria-label="Edit interests"
                    >
                        <Pencil size={14} />
                    </Link>
                </div>

                {user.interests.length > 0 ? (
                    <ul className="flex flex-wrap gap-2">
                        {user.interests.map((value) => {
                            const item = getInterest(value);
                            const Icon = item?.icon ?? Sparkles;
                            const label = item?.label ?? value;
                            const styles = CATEGORY_STYLES[item?.category ?? "Other"];

                            return (
                                <li
                                    key={value}
                                    className={cn(
                                        "inline-flex cursor-default items-center gap-2 rounded-full border border-black/10 bg-white py-1 pl-1 pr-3.5 text-xs font-semibold text-black/70 transition-all duration-200 hover:-translate-y-0.5 hover:text-black/90",
                                        styles.chip
                                    )}
                                >
                                    <span className={cn("flex h-6 w-6 shrink-0 items-center justify-center rounded-full", styles.icon)}>
                                        <Icon size={13} />
                                    </span>
                                    {label}
                                </li>
                            );
                        })}
                    </ul>
                ) : (
                    <div className="flex flex-col items-center gap-2 rounded-2xl border border-black/5 bg-black/5 p-4 text-center">
                        <Sparkles size={20} className="text-black/40" />
                        <p className="text-xs text-black/50">
                            No interests added yet.
                        </p>
                    </div>
                )}
            </div>

            {/* COMING SOON */}
            <div className="flex flex-col gap-4 rounded-3xl border border-black/10 bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.06)] backdrop-blur-sm">
                <h3 className="text-lg font-bold text-black/80">
                    Coming soon
                </h3>

                {nearestEvent ? (
                    <ul className="flex flex-col gap-3">
                        <li>
                            <Link
                                href={`/event/${nearestEvent.id}`}
                                className="flex cursor-pointer items-center gap-3 rounded-2xl border border-black/5 bg-black/5 p-3 transition-colors hover:bg-black/10"
                            >
                                {/* Fecha */}
                                <div className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-xl bg-brand-purple-deep/10 text-brand-purple-deep">
                                    <span className="text-[10px] font-bold uppercase tracking-wider">
                                        {new Date(nearestEvent.startDate).toLocaleDateString("en-US", { month: "short" })}
                                    </span>

                                    <span className="text-sm font-black">
                                        {new Date(nearestEvent.startDate).getDate()}
                                    </span>
                                </div>

                                {/* Info del evento */}
                                <div className="flex flex-1 flex-col overflow-hidden">
                                    <h4 className="truncate text-sm font-semibold text-black/80">
                                        {nearestEvent.title}
                                    </h4>

                                    <p className="mt-0.5 flex items-center gap-1 text-xs text-black/50">
                                        <MapPin size={12} />
                                        {nearestEvent.location}
                                    </p>
                                </div>
                            </Link>
                        </li>
                    </ul>
                ) : (
                    <div className="flex flex-col items-center gap-2 rounded-2xl border border-black/5 bg-black/5 p-4 text-center">
                        <CalendarX size={20} className="text-black/40" />
                        <p className="text-xs text-black/50">
                            No upcoming events yet.
                        </p>
                    </div>
                )}
            </div>

            {/* BADGES */}
            <div className="flex flex-col gap-4 rounded-3xl border border-black/10 bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.06)] backdrop-blur-sm">
                <h3 className="text-lg font-bold text-black/80">
                    Badges
                </h3>
                <div className="flex items-center justify-between">
                    <p className="text-sm leading-relaxed text-black/70">Coming Soon</p>
                </div>
            </div>
        </aside>
    );
}
