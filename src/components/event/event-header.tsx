"use client";

import { useState } from "react";
import AnimatedBackgroundLight from "../ui/backgrounds/animated-background-light";
import Button from "../ui/button";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { Users, Share2, Check, LogOut, Calendar, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { getEventStatusInfo } from "@/lib/event-status";
import BackButton from "../ui/back-button";
import ConfirmAlert from "../ui/alerts/confirm-alert";
import StatusAlert from "../ui/alerts/status-alert";
import EventModalTransferOwnership from "./event-modal-transferownership";
import type { UserType } from "@/lib/mock_data/users-data";

type EventHeaderProps = {
    eventData: {
        title: string;
        coverImage: string;
        memberCount: number;
        memberLimit: number;
        category: string;
        status: string;
        startDate: string;
        location: string;
        host?: {
            firstName: string;
            lastName: string;
            username: string;
            profileImage?: string;
        };
    };
    isUserMember?: boolean;
    isUserOwner?: boolean;
    eventMembers?: UserType[];
};

export default function EventHeader({
    eventData,
    isUserMember = false,
    isUserOwner = false,
    eventMembers = [],
}: EventHeaderProps) {
    const statusInfo = getEventStatusInfo(eventData.status);
    const StatusIcon = statusInfo.icon;

    const [isMember, setIsMember] = useState(isUserMember);
    const [memberCount, setMemberCount] = useState(eventData.memberCount);
    const [showLeaveConfirm, setShowLeaveConfirm] = useState(false);
    const [showTransferModal, setShowTransferModal] = useState(false);
    const [statusAlert, setStatusAlert] = useState<{ description: string; type: "success" | "error" } | null>(null);

    const isFull = memberCount >= eventData.memberLimit;

    const startDate = new Date(eventData.startDate);
    const host = eventData.host;
    const hostInitials = host ? `${host.firstName[0] ?? ""}${host.lastName[0] ?? ""}`.toUpperCase() : "";

    const handleJoinToggle = () => {
        if (isMember) {
            if (isUserOwner) {
                if (eventMembers.length === 0) {
                    setStatusAlert({
                        description: "You're the only member — invite someone before you can leave.",
                        type: "error",
                    });
                    return;
                }
                setShowTransferModal(true);
                return;
            }

            setShowLeaveConfirm(true);
            return;
        }

        if (isFull) {
            setStatusAlert({ description: "This event is already full.", type: "error" });
            return;
        }

        setIsMember(true);
        setMemberCount((prev) => prev + 1);
        setStatusAlert({ description: `You joined ${eventData.title}.`, type: "success" });
    };

    const handleLeaveEvent = () => {
        setShowLeaveConfirm(false);
        setIsMember(false);
        setMemberCount((prev) => Math.max(0, prev - 1));
        setStatusAlert({ description: `You left ${eventData.title}.`, type: "success" });
    };

    const handleTransferOwnership = (newOwner: UserType) => {
        setShowTransferModal(false);
        setIsMember(false);
        setMemberCount((prev) => Math.max(0, prev - 1));
        setStatusAlert({
            description: `Ownership transferred to ${newOwner.firstName} ${newOwner.lastName}. You've left ${eventData.title}.`,
            type: "success",
        });
    };

    const handleShare = async () => {
        const shareUrl = window.location.href;

        if (navigator.share) {
            try {
                await navigator.share({ title: eventData.title, url: shareUrl });
            } catch {
                // The user canceled the share sheet — not a real error, no alert shown.
            }
            return;
        }

        try {
            await navigator.clipboard.writeText(shareUrl);
            setStatusAlert({ description: "Link copied to clipboard.", type: "success" });
        } catch {
            setStatusAlert({ description: "Couldn't copy the link.", type: "error" });
        }
    };

    return (
        <section className="flex flex-col items-center">
            <ConfirmAlert
                isOpen={showLeaveConfirm}
                onClose={() => setShowLeaveConfirm(false)}
                onConfirm={handleLeaveEvent}
                icon={LogOut}
                title="Leave event"
                description={`You'll stop having access to ${eventData.title} and its content.`}
                confirmLabel="Yes, leave event"
                variant="neutral"
            />
            <EventModalTransferOwnership
                isOpen={showTransferModal}
                onClose={() => setShowTransferModal(false)}
                onConfirm={handleTransferOwnership}
                members={eventMembers}
                eventTitle={eventData.title}
            />
            <StatusAlert
                isOpen={statusAlert !== null}
                onClose={() => setStatusAlert(null)}
                description={statusAlert?.description ?? ""}
                type={statusAlert?.type ?? "success"}
                duration={3000}
            />

            {/* CARD */}
            <div className="relative z-10 w-[92%] overflow-hidden rounded-3xl border border-black/10 bg-white shadow-[0_8px_30px_rgba(0,0,0,0.12)] md:w-[85%]">

                {/* COVER */}
                <div className="relative h-48 w-full md:h-72">
                    {/* BACK BUTTON */}
                    <BackButton />

                    <Image
                        src={eventData.coverImage}
                        alt={`Portada de ${eventData.title}`}
                        fill
                        className="object-cover"
                    />
                </div>

                {/* CONTENIDO */}
                <div className="relative px-6 pb-6 pt-6 md:px-10 md:pb-8">

                    {/* MESHY BACKGROUND */}
                    <AnimatedBackgroundLight variant="blue" />

                    <div className="z-20">
                        {/* BLOQUE SUPERIOR */}
                        <div className="relative z-10 flex flex-col items-start gap-2">
                            <div className="flex flex-wrap items-center gap-2">
                                <span className="rounded-full bg-brand-purple/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand-purple-deep">
                                    {eventData.category}
                                </span>

                                <span
                                    className={cn(
                                        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-wider",
                                        statusInfo.badgeClasses
                                    )}
                                >
                                    {statusInfo.pulse ? (
                                        <span className="relative flex h-2 w-2">
                                            <span className={cn("absolute inline-flex h-full w-full animate-ping rounded-full opacity-75", statusInfo.dotClasses)} />
                                            <span className={cn("relative inline-flex h-2 w-2 rounded-full", statusInfo.dotClasses)} />
                                        </span>
                                    ) : (
                                        <StatusIcon size={12} />
                                    )}
                                    {statusInfo.label}
                                </span>
                            </div>

                            <h1 className="dark-mesh-gradient text-3xl font-black tracking-tight md:text-4xl lg:text-5xl">
                                {eventData.title}
                            </h1>

                            {/* EVENT INFO */}
                            <div className="mt-1 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-black/60">
                                <span className="flex items-center gap-2">
                                    <Calendar size={16} className="shrink-0 text-black/50" />
                                    <span className="font-bold text-black/80">
                                        {format(startDate, "EEE, MMM d")}
                                    </span>
                                    <span className="text-black/50">· {format(startDate, "HH:mm")}</span>
                                </span>

                                <span className="flex items-center gap-2">
                                    <MapPin size={16} className="shrink-0 text-black/50" />
                                    {eventData.location}
                                </span>

                                {host && (
                                    <span className="flex items-center gap-2">
                                        <span className="relative flex h-6 w-6 shrink-0 items-center justify-center overflow-hidden rounded-full bg-brand-plum text-[10px] font-bold text-white">
                                            {host.profileImage ? (
                                                <Image
                                                    src={host.profileImage}
                                                    alt={`${host.firstName} ${host.lastName}`}
                                                    fill
                                                    sizes="24px"
                                                    className="object-cover"
                                                />
                                            ) : (
                                                hostInitials
                                            )}
                                        </span>
                                        Hosted by
                                        <Link
                                            href={`/profile/${host.username}`}
                                            className="font-bold text-brand-purple-deep transition-colors hover:text-brand-purple"
                                        >
                                            {host.firstName} {host.lastName[0]}.
                                        </Link>
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* STATS AND BUTTONS */}
                        <div className="relative z-10 mt-6 flex w-full flex-col items-start gap-6 border-t border-black/10 pt-5 md:flex-row md:items-center md:justify-between">

                            {/* STATS */}
                            <div className="flex items-center gap-6 md:gap-10">
                                <div className="flex flex-col">
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-3xl font-bold text-brand-purple-deep md:text-4xl">
                                            {memberCount}
                                        </span>
                                        <span className="text-xl font-bold text-black/30 md:text-2xl">
                                            / {eventData.memberLimit}
                                        </span>
                                    </div>
                                    <span className="mt-1 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-black/70 md:text-xs">
                                        <Users size={14} className="text-brand-purple-deep" />
                                        Members
                                    </span>
                                </div>
                            </div>

                            {/* BUTTONS */}
                            <div className="flex w-full flex-row items-center gap-3 md:w-auto md:flex-nowrap">
                                {isMember ? (
                                    <Button
                                        tone="following"
                                        variant="outline"
                                        onClick={handleJoinToggle}
                                        className="h-12 flex-1 px-4 md:flex-none md:px-8"
                                        textClassName="text-sm flex items-center gap-2 justify-center"
                                    >
                                        <Check size={16} />
                                        Joined
                                    </Button>
                                ) : (
                                    <Button
                                        tone="dark"
                                        onClick={handleJoinToggle}
                                        className="h-12 flex-1 px-4 md:flex-none md:px-8"
                                        textClassName="text-sm flex items-center gap-2 justify-center"
                                    >
                                        {isFull ? "Event full" : "Request to join"}
                                    </Button>
                                )}

                                {isUserOwner && (
                                    <Button
                                        tone="dark"
                                        onClick={() => { }}
                                        className="h-12 flex-1 px-4 md:flex-none md:px-8"
                                        textClassName="text-sm flex items-center gap-2 justify-center"
                                    >
                                        Edit profile
                                    </Button>
                                )}

                                {/* SHARE BUTTON */}
                                <Button
                                    tone="dark"
                                    onClick={handleShare}
                                    className="h-12 w-12 shrink-0 flex-none p-0 md:w-auto md:px-6"
                                    textClassName="flex items-center justify-center text-sm"
                                >
                                    <Share2 size={18} />
                                </Button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}