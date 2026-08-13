import Link from "next/link";
import { Calendar, MapPin, Users, Briefcase, Globe, CalendarX, UsersRound } from "lucide-react";
import { cn } from "@/lib/utils";
import type { GroupType } from "./profile-groups-cards";
import type { CommunityType } from "./profile-communities-cards";
import { getToday } from "@/lib/group-filters";

type ProfileAsideProps = {
    user: {
        bio: string;
        city: string;
        country: string;
        profession: string;
        languages: string[];
        joined: string;
        groups: GroupType[];
        communities: CommunityType[];
    };
};

function getNearestGroup(groups: GroupType[]): GroupType | null {
    const today = getToday();
    const upcoming = groups
        .map((group) => ({ group, date: new Date(group.startDate) }))
        .filter(({ date }) => !isNaN(date.getTime()) && date.getTime() >= today.getTime())
        .sort((a, b) => a.date.getTime() - b.date.getTime());

    return upcoming[0]?.group ?? null;
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

function getTopCommunities(communities: CommunityType[], limit = 2): CommunityType[] {
    return [...communities]
        .sort((a, b) => parseMemberCount(b.members) - parseMemberCount(a.members))
        .slice(0, limit);
}

export default function ProfileAside({ user }: ProfileAsideProps) {
    const nearestGroup = getNearestGroup(user.groups);
    const topCommunities = getTopCommunities(user.communities);

    return (
        <aside className="flex h-fit flex-1 flex-col gap-6 rounded-3xl border border-black/30 bg-white/5 p-6 shadow-[0_8px_30px_rgba(0,0,0,0.08)] backdrop-blur-sm">
            {/* SECCIÓN 1: INFO COMPLEMENTARIA */}
            <div className="flex flex-col gap-4">
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
                        <MapPin size={16} className="text-[#6D28D9]" />
                        <span>{user.city}, {user.country}</span>
                    </div>

                    <div className="flex items-center gap-3 text-sm text-black/70">
                        <Briefcase size={16} className="text-[#6D28D9]" />
                        <span>{user.profession}</span>
                    </div>

                    <div className="flex items-center gap-3 text-sm text-black/70">
                        <Globe size={16} className="text-[#6D28D9]" />
                        <span>{user.languages.join(", ")}</span>
                    </div>

                    <div className="flex items-center gap-3 text-sm text-black/70">
                        <Calendar size={16} className="text-[#6D28D9]" />
                        <span>Joined in {user.joined}</span>
                    </div>
                </div>
            </div>

            <hr className="border-black/10" />

            {/* SECCIÓN 2: PRÓXIMO GRUPO */}
            <div className="flex flex-col gap-4">
                <h3 className="text-lg font-bold text-black/80">
                    Coming soon
                </h3>

                {nearestGroup ? (
                    <ul className="flex flex-col gap-3">
                        <li>
                            <Link
                                href={`/group/${nearestGroup.id}`}
                                className="flex cursor-pointer items-center gap-3 rounded-2xl border border-black/5 bg-black/5 p-3 transition-colors hover:bg-black/10"
                            >
                                {/* Fecha */}
                                <div className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-xl bg-[#6D28D9]/10 text-[#6D28D9]">
                                    <span className="text-[10px] font-bold uppercase tracking-wider">
                                        {new Date(nearestGroup.startDate).toLocaleDateString("en-US", { month: "short" })}
                                    </span>

                                    <span className="text-sm font-black">
                                        {new Date(nearestGroup.startDate).getDate()}
                                    </span>
                                </div>

                                {/* Info del grupo */}
                                <div className="flex flex-1 flex-col overflow-hidden">
                                    <h4 className="truncate text-sm font-semibold text-black/80">
                                        {nearestGroup.title}
                                    </h4>

                                    <p className="mt-0.5 flex items-center gap-1 text-xs text-black/50">
                                        <MapPin size={12} />
                                        {nearestGroup.location}
                                    </p>
                                </div>
                            </Link>
                        </li>
                    </ul>
                ) : (
                    <div className="flex flex-col items-center gap-2 rounded-2xl border border-black/5 bg-black/5 p-4 text-center">
                        <CalendarX size={20} className="text-black/40" />
                        <p className="text-xs text-black/50">
                            No upcoming groups yet.
                        </p>
                    </div>
                )}
            </div>

            <hr className="border-black/10" />

            {/* SECCIÓN 3: TOP COMUNIDADES */}
            <div className="flex flex-col gap-4">
                <h3 className="text-lg font-bold text-black/80">
                    Top Communities
                </h3>

                {topCommunities.length > 0 ? (
                    <div className="flex flex-col gap-3">
                        {topCommunities.map((community) => (
                            <div key={community.id} className="group flex cursor-pointer items-center gap-3">
                                <div
                                    className={cn(
                                        "h-10 w-10 shrink-0 rounded-xl bg-gradient-to-br transition-transform group-hover:scale-105",
                                        community.colorFrom,
                                        community.colorTo
                                    )}
                                />

                                <div className="flex flex-1 flex-col overflow-hidden">
                                    <h4 className="truncate text-sm font-semibold text-black/80 transition-colors group-hover:text-[#6D28D9]">
                                        {community.title}
                                    </h4>

                                    <p className="flex items-center gap-1 text-xs text-black/50">
                                        <Users size={12} />
                                        {community.members} members
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center gap-2 rounded-2xl border border-black/5 bg-black/5 p-4 text-center">
                        <UsersRound size={20} className="text-black/40" />
                        <p className="text-xs text-black/50">
                            Not part of any community yet.
                        </p>
                    </div>
                )}
            </div>

            <hr className="border-black/10" />
            <div className="flex flex-col gap-4">
                <h3 className="text-lg font-bold text-black/80">
                    Interests
                </h3>

                <div className="flex flex-col gap-3">

                </div>
            </div>
        </aside>
    );
}
