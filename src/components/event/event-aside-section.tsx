"use client";

import { Calendar, Copy, MapPin, Lock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { formatEventDate } from "@/lib/date";
import { cn } from "@/lib/utils";
import type { EventHost } from "@/lib/data/events";
import EventJoinRequestBox from "./event-join-request-box";
import type { ViewerStatus } from "./event-header";

type EventAsideProps = {
    event: {
        description: string;
        location: string;
        startDate: string;
    };
    owner: EventHost | null;
    admins: EventHost[];
    eventId: string;
    viewerStatus: ViewerStatus;
    /** What the viewer wrote in their pending request */
    viewerRequestMessage: string;
    isFull: boolean;
};

/** Profile photo, or initials if the user hasn't uploaded one yet. */
function HostAvatar({ host, sizes, className }: { host: EventHost; sizes: string; className: string }) {
    return (
        <div className={cn("relative flex shrink-0 items-center justify-center overflow-hidden bg-brand-plum font-bold text-white", className)}>
            {host.profileImage ? (
                <Image src={host.profileImage} alt={host.firstName} fill sizes={sizes} className="object-cover" />
            ) : (
                `${host.firstName[0] ?? ""}${host.lastName[0] ?? ""}`.toUpperCase()
            )}
        </div>
    );
}

export default function EventAsideSection({
    event,
    owner,
    admins,
    eventId,
    viewerStatus,
    viewerRequestMessage,
    isFull,
}: EventAsideProps) {
    const isUserMember = viewerStatus === "member";

    return (
        <aside className="flex h-fit flex-1 flex-col gap-5">

            {/* REQUEST TO JOIN */}
            {!isUserMember && (
                <EventJoinRequestBox
                    eventId={eventId}
                    status={viewerStatus}
                    sentMessage={viewerRequestMessage}
                    isFull={isFull}
                />
            )}

            {/* EVENT INFO */}
            <div className="flex flex-col gap-4 rounded-3xl border border-black/10 bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.06)] backdrop-blur-sm">
                <h3 className="text-lg font-bold text-black/80">
                    About Event
                </h3>

                <p className="text-sm leading-relaxed text-black/70">
                    {event.description || "The host hasn't added a description yet."}
                </p>
            </div>

            {/* EVENT INFO */}
            <div className="flex flex-col gap-4 rounded-3xl border border-black/10 bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.06)] backdrop-blur-sm">
                <h3 className="text-lg font-bold text-black/80">
                    Details
                </h3>

                <div className="mt-1 flex flex-col gap-3">
                    <div className="flex items-center gap-3 text-sm text-black/70">
                        <MapPin size={16} className="text-brand-purple-deep" />
                        <span>{event.location}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-black/70">
                        <Calendar size={16} className="text-brand-purple-deep" />
                        <span>Starts {formatEventDate(event.startDate)}</span>
                    </div>
                </div>

                {/* MEMBERS ONLY  */}
                {isUserMember ? (
                    <div className="mt-2 flex flex-col gap-4 rounded-2xl bg-brand-purple/10 p-5 text-sm text-black/80">
                        {/* Header */}
                        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-purple-deep">
                            <Lock size={14} strokeWidth={2.5} />
                            <span>Members Only</span>
                        </div>

                        {/* Address */}
                        <div>
                            <span className="font-bold text-black">Address:</span> [STREET AND NUMBER]
                        </div>

                        {/* Group Link */}
                        <div className="flex items-center justify-between gap-4">
                            <div className="truncate">
                                <span className="font-bold text-black">Group link:</span> [WHATSAPP GROUP LINK]
                            </div>

                            {/* Copy Button */}
                            <button
                                className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-xl border border-black/10 bg-white text-brand-purple-deep shadow-sm transition-colors hover:bg-black/5"
                                aria-label="Copy group link"
                            >
                                <Copy size={16} strokeWidth={2} />
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="mt-2 flex items-center gap-4 rounded-2xl bg-[#F8F7FA] p-5">
                        <Lock size={24} className="text-slate-500 shrink-0" strokeWidth={1.5} />
                        <div className="flex flex-col">
                            <span className="text-base font-semibold text-slate-900">
                                Exact address and group link
                            </span>
                            <span className="text-sm text-slate-500">
                                Visible once the host accepts you
                            </span>
                        </div>
                    </div>
                )}
            </div>

            {/* HOSTS */}
            <div className="flex flex-col gap-4 rounded-3xl border border-black/10 bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.06)] backdrop-blur-sm">
                <h3 className="text-lg font-bold text-black/80">
                    Hosts
                </h3>

                <div className="flex flex-col gap-4">
                    {owner && (
                        <Link href={`/profile/${owner.username}`}>
                            <div className="group flex items-center justify-between rounded-2xl border border-brand-purple/20 bg-brand-purple/5 p-3 transition-colors hover:bg-brand-purple/10 dark:border-brand-purple/30 dark:bg-brand-purple/10">
                                <div className="flex items-center gap-3.5">
                                    <HostAvatar
                                        host={owner}
                                        sizes="56px"
                                        className="h-14 w-14 rounded-full border-2 border-brand-purple/20 text-base shadow-sm"
                                    />
                                    <div className="flex flex-col">
                                        <span className="text-[15px] font-bold text-black transition-colors group-hover:text-brand-purple dark:text-white">
                                            {owner.firstName} {owner.lastName}
                                        </span>
                                        <span className="text-[11px] font-black uppercase tracking-wider text-brand-purple">
                                            Owner
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    )}

                    {admins.length > 0 && (
                        <div className="flex flex-col gap-3 mt-1">
                            {admins.map((admin) => (
                                <Link key={admin.id} href={`/profile/${admin.username}`}>
                                    <div className="group flex cursor-pointer items-center gap-3">
                                        <HostAvatar
                                            host={admin}
                                            sizes="40px"
                                            className="h-10 w-10 rounded-xl border border-black/5 text-xs transition-transform group-hover:scale-105"
                                        />
                                        <div className="flex flex-1 flex-col">
                                            <h4 className="text-sm font-semibold text-black/80 transition-colors group-hover:text-brand-purple-deep">
                                                {admin.firstName} {admin.lastName}
                                            </h4>
                                            <p className="flex items-center gap-1 text-xs text-black/50">
                                                Admin
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </aside>
    );
}