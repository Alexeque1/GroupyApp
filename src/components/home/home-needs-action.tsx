"use client";

import { useState } from "react";
import Image from "next/image";
import { Bell, UserPlus, ShieldQuestion, MessageCircle, CalendarClock, ChevronDown, Check, X } from "lucide-react";
import Button from "../ui/button";

type NotifType = "friend_request" | "join_request" | "comment" | "event_rescheduled";
type SourceType = "event" | "community" | "personal";

interface NotificationType {
    id: number;
    type: NotifType;
    sourceType: SourceType;
    sourceName: string;
    content: string;
    time: string;
    image: string;
}

export default function HomeNeedsAction() {
    const [isOpen, setIsOpen] = useState(false);

    const NOTIFICATIONS_DATA: NotificationType[] = [
        {
            id: 1,
            type: "friend_request",
            sourceType: "personal",
            sourceName: "Mateo R.",
            content: "Sent you a friend request.",
            time: "10 mins ago",
            image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop",
        },
        {
            id: 2,
            type: "join_request",
            sourceType: "event",
            sourceName: "UX/UI Designers Arg",
            content: "Sofía L. requested to join your event.",
            time: "1 hour ago",
            image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=200&auto=format&fit=crop",
        },
        {
            id: 3,
            type: "comment",
            sourceType: "community",
            sourceName: "Web Developers",
            content: "Lucas M. commented: 'Great contribution, it helped a lot!'",
            time: "3 hours ago",
            image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=200&auto=format&fit=crop",
        },
        {
            id: 4,
            type: "event_rescheduled",
            sourceType: "event",
            sourceName: "Weekend Trekking",
            content: "The event 'Mountain Hike' was rescheduled for Saturday.",
            time: "Yesterday",
            image: "https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=200&auto=format&fit=crop",
        },
        {
            id: 5,
            type: "join_request",
            sourceType: "event",
            sourceName: "Weekend Trekking",
            content: "The event 'Mountain Hike' was rescheduled for Saturday.",
            time: "Yesterday",
            image: "https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=200&auto=format&fit=crop",
        }
    ];

    const getNotificationIcon = (type: NotifType) => {
        switch (type) {
            case "friend_request":
                return <UserPlus size={12} className="text-brand-peach" />;
            case "join_request":
                return <ShieldQuestion size={12} className="text-brand-mint" />;
            case "comment":
                return <MessageCircle size={12} className="text-brand-purple" />;
            case "event_rescheduled":
                return <CalendarClock size={12} className="text-brand-peach" />;
        }
    };

    const getSourceTag = (source: SourceType) => {
        switch (source) {
            case "event":
                return <span className="rounded-md bg-brand-purple/10 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-brand-purple-deep">Event</span>;
            case "community":
                return <span className="rounded-md bg-brand-mint/30 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-brand-green">Community</span>;
            case "personal":
                return <span className="rounded-md bg-black/5 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-black/50">User</span>;
        }
    };

    const NOTIFICATIONS_BY_ACTION = [
        "join_request",
        "friend_request",
        "invitation",
    ];

    const filteredNotifications = NOTIFICATIONS_DATA.filter(
        notification => NOTIFICATIONS_BY_ACTION.includes(notification.type)
    );
    const displayedNotifications = filteredNotifications.slice(0, 3);

    return (
        <div className="relative z-10 flex h-full flex-col rounded-3xl border border-black/10 bg-white p-5 shadow-[0_8px_30px_rgba(0,0,0,0.06)]">

            {/* INTERACTIVE HEADER (the toggle only applies on mobile, on desktop it's always open) */}
            <div
                className="flex cursor-pointer items-center justify-between px-1 md:cursor-default"
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="flex items-center gap-2">
                    <Bell size={18} className="text-brand-purple" />
                    <h3 className="text-xl font-bold text-black/90">
                        Needs your action
                    </h3>
                </div>

                <div className="flex items-center gap-3">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-purple/10 text-[10px] font-bold text-brand-purple-deep">
                        {filteredNotifications.length}
                    </span>
                    <ChevronDown
                        size={20}
                        className={`text-black/40 transition-transform duration-300 md:hidden ${isOpen ? "rotate-180" : ""}`}
                    />
                </div>
            </div>

            {/* COLLAPSIBLE CONTAINER: forced open from md and up */}
            <div
                className={`grid flex-1 min-h-0 transition-all duration-300 ease-in-out md:grid-rows-[1fr]! md:opacity-100! ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
            >
                <div className="flex h-full min-h-0 flex-col overflow-hidden">

                    {/* SEPARATOR */}
                    <div className="mb-4 mt-4 h-px w-full shrink-0 bg-black/5" />

                    {/* NOTIFICATIONS LIST */}
                    <div className="flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto pr-1">
                        {displayedNotifications.map((notif) => (
                            <div
                                key={notif.id}
                                className="group relative flex items-center gap-3 rounded-2xl p-2 transition-colors hover:bg-black/5"
                            >
                                <div className="relative mt-1 h-10 w-10 shrink-0">
                                    <Image
                                        src={notif.image}
                                        alt={notif.sourceName}
                                        fill
                                        className="rounded-full object-cover shadow-sm"
                                    />
                                    <div className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-brand-dark">
                                        {getNotificationIcon(notif.type)}
                                    </div>
                                </div>

                                <div className="flex flex-1 flex-col">
                                    <div className="flex items-center gap-2">
                                        <h4 className="text-sm font-bold text-black/80 transition-colors group-hover:text-black">
                                            {notif.sourceName}
                                        </h4>
                                        {getSourceTag(notif.sourceType)}
                                    </div>

                                    <p className="mt-0.5 line-clamp-2 text-xs font-medium text-black/70">
                                        {notif.content}
                                    </p>

                                    <span className="mt-1.5 text-[10px] font-semibold uppercase tracking-wider text-black/40">
                                        {notif.time}
                                    </span>
                                </div>

                                {/* ACCEPT / REJECT */}
                                <div className="mt-1 flex shrink-0 items-center gap-1.5 z-100">
                                    <button
                                        type="button"
                                        aria-label="Accept"
                                        className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-mint/60 text-brand-green transition-colors hover:bg-brand-mint/40 cursor-pointer"
                                    >
                                        <Check size={14} strokeWidth={2.5} />
                                    </button>
                                    <button
                                        type="button"
                                        aria-label="Reject"
                                        className="flex h-7 w-7 items-center justify-center rounded-full bg-black/5 text-black/40 transition-colors hover:bg-red-500/10 hover:text-red-500 cursor-pointer"
                                    >
                                        <X size={14} strokeWidth={2.5} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* BUTTON */}
                    <div className="mt-4 flex shrink-0 justify-center">
                        <Button
                            tone="dark"
                            className="px-6 py-2"
                            textClassName="text-xs sm:text-sm"
                        >
                            See all
                        </Button>
                    </div>

                </div>
            </div>

        </div>
    );
}