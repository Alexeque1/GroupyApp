"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { AnimatePresence, motion } from "framer-motion";
import AnimatedBackgroundLight from "../ui/backgrounds/animated-background-light";
import Button from "../ui/button";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { Users, Share2, Check, LogOut, Calendar, MapPin, Settings2, ChevronDown, Pencil, Lock, LockOpen, Ban, Clock, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { getEventStatusInfo } from "@/lib/display/event-status";
import BackButton from "../ui/back-button";
import ConfirmAlert from "../ui/alerts/confirm-alert";
import StatusAlert from "../ui/alerts/status-alert";
import { cancelJoinRequest, leaveEvent } from "@/lib/actions/event-members";

/** How the viewer relates to the event */
export type ViewerStatus = "none" | "pending" | "member";

/** Id of the "Want to come?" box in the aside, so the header button can scroll to it */
export const JOIN_REQUEST_FORM_ID = "join-request";

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
    eventId: string;
    viewerStatus: ViewerStatus;
    isUserOwner?: boolean;
};

export default function EventHeader({
    eventData,
    eventId,
    viewerStatus,
    isUserOwner = false,
}: EventHeaderProps) {
    const statusInfo = getEventStatusInfo(eventData.status);
    const StatusIcon = statusInfo.icon;

    // Membership and member count come from the server; actions revalidate the page to update them
    const memberCount = eventData.memberCount;
    const [isPending, startTransition] = useTransition();
    const [showLeaveConfirm, setShowLeaveConfirm] = useState(false);
    const [showCancelRequestConfirm, setShowCancelRequestConfirm] = useState(false);
    const [statusAlert, setStatusAlert] = useState<{ description: string; type: "success" | "error" } | null>(null);
    const [isManageMenuOpen, setIsManageMenuOpen] = useState(false);
    const [areRequestsClosed, setAreRequestsClosed] = useState(false);
    const [showCancelConfirm, setShowCancelConfirm] = useState(false);
    const manageMenuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (manageMenuRef.current && !manageMenuRef.current.contains(event.target as Node)) {
                setIsManageMenuOpen(false);
            }
        };
        if (isManageMenuOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isManageMenuOpen]);

    const isFull = memberCount >= eventData.memberLimit;

    const startDate = new Date(eventData.startDate);
    const host = eventData.host;
    const hostInitials = host ? `${host.firstName[0] ?? ""}${host.lastName[0] ?? ""}`.toUpperCase() : "";

    const handleMainButton = () => {
        if (viewerStatus === "member") {
            if (isUserOwner) {
                // TODO: open the transfer-ownership modal once Members comes from the DB
                setStatusAlert({
                    description: "As the owner, you'll be able to leave once ownership transfer is available.",
                    type: "error",
                });
                return;
            }
            setShowLeaveConfirm(true);
            return;
        }

        if (viewerStatus === "pending") {
            setShowCancelRequestConfirm(true);
            return;
        }

        if (isFull) {
            setStatusAlert({ description: "This event is already full.", type: "error" });
            return;
        }

        // The request (with the optional message) is sent from the box in the aside
        const form = document.getElementById(JOIN_REQUEST_FORM_ID);
        form?.scrollIntoView({ behavior: "smooth", block: "center" });
        form?.querySelector("textarea")?.focus({ preventScroll: true });
    };

    const handleLeaveEvent = () => {
        setShowLeaveConfirm(false);
        startTransition(async () => {
            const result = await leaveEvent(eventId);
            setStatusAlert(
                result.ok
                    ? { description: `You left ${eventData.title}.`, type: "success" }
                    : { description: result.error, type: "error" }
            );
        });
    };

    const handleCancelRequest = () => {
        setShowCancelRequestConfirm(false);
        startTransition(async () => {
            const result = await cancelJoinRequest(eventId);
            setStatusAlert(
                result.ok
                    ? { description: "Your request was canceled.", type: "success" }
                    : { description: result.error, type: "error" }
            );
        });
    };

    const handleToggleRequests = () => {
        setIsManageMenuOpen(false);
        setAreRequestsClosed((prev) => !prev);
        setStatusAlert({
            description: areRequestsClosed ? "Join requests are open again." : "Join requests are now closed.",
            type: "success",
        });
    };

    const handleCancelEvent = () => {
        setShowCancelConfirm(false);
        setStatusAlert({ description: `${eventData.title} has been canceled.`, type: "success" });
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
            <ConfirmAlert
                isOpen={showCancelConfirm}
                onClose={() => setShowCancelConfirm(false)}
                onConfirm={handleCancelEvent}
                icon={Ban}
                title="Cancel event"
                description={`${eventData.title} will be canceled for every member. This can't be undone.`}
                confirmLabel="Yes, cancel event"
                cancelLabel="Keep event"
                variant="danger"
            />
            <ConfirmAlert
                isOpen={showCancelRequestConfirm}
                onClose={() => setShowCancelRequestConfirm(false)}
                onConfirm={handleCancelRequest}
                icon={X}
                title="Cancel request"
                description={`The host won't see your request to join ${eventData.title} anymore.`}
                confirmLabel="Yes, cancel request"
                cancelLabel="Keep request"
                variant="neutral"
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

                    {eventData.coverImage ? (
                        <Image
                            src={eventData.coverImage}
                            alt={`Portada de ${eventData.title}`}
                            fill
                            className="object-cover"
                        />
                    ) : (
                        // No cover uploaded yet (image upload isn't built)
                        <div className="h-full w-full bg-gradient-to-br from-brand-purple via-brand-purple-deep to-brand-plum" />
                    )}
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
                                {viewerStatus === "none" ? (
                                    <Button
                                        tone="dark"
                                        onClick={handleMainButton}
                                        className="h-12 flex-1 px-4 md:flex-none md:px-8"
                                        textClassName="text-sm flex items-center gap-2 justify-center"
                                    >
                                        {isFull ? "Event full" : "Request to join"}
                                    </Button>
                                ) : (
                                    <Button
                                        tone="following"
                                        variant="outline"
                                        onClick={handleMainButton}
                                        disabled={isPending}
                                        className="h-12 flex-1 px-4 md:flex-none md:px-8"
                                        textClassName="text-sm flex items-center gap-2 justify-center"
                                    >
                                        {viewerStatus === "pending" ? <Clock size={16} /> : <Check size={16} />}
                                        {viewerStatus === "pending" ? "Request sent" : "Joined"}
                                    </Button>
                                )}

                                {/* MANAGE DROPDOWN */}
                                {isUserOwner && (
                                    <div className="relative flex-1 md:flex-none" ref={manageMenuRef}>
                                        <Button
                                            tone="dark"
                                            onClick={() => setIsManageMenuOpen((prev) => !prev)}
                                            className="h-12 w-full px-4 md:px-8"
                                            textClassName="text-sm flex items-center gap-2 justify-center"
                                        >
                                            <Settings2 size={16} />
                                            Manage
                                            <ChevronDown
                                                size={16}
                                                className={cn("transition-transform duration-200", isManageMenuOpen && "rotate-180")}
                                            />
                                        </Button>

                                        <AnimatePresence>
                                            {isManageMenuOpen && (
                                                <motion.div
                                                    initial={{ opacity: 0, scale: 0.9, y: 10, transformOrigin: "bottom right" }}
                                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                                    exit={{ opacity: 0, scale: 0.9, y: 10 }}
                                                    transition={{ duration: 0.2 }}
                                                    className="absolute bottom-14 right-0 z-50 flex w-52 flex-col overflow-hidden rounded-2xl border border-black/10 bg-white p-1.5 shadow-[0_8px_30px_rgba(0,0,0,0.12)]"
                                                >
                                                    <button
                                                        onClick={() => setIsManageMenuOpen(false)}
                                                        className="flex cursor-pointer items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium text-black/70 transition-colors hover:bg-black/5 hover:text-black"
                                                    >
                                                        <Pencil size={16} className="text-brand-purple-deep" />
                                                        Edit event
                                                    </button>

                                                    <button
                                                        onClick={handleToggleRequests}
                                                        className="flex cursor-pointer items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium text-black/70 transition-colors hover:bg-black/5 hover:text-black"
                                                    >
                                                        {areRequestsClosed ? (
                                                            <>
                                                                <LockOpen size={16} className="text-brand-green" />
                                                                Open requests
                                                            </>
                                                        ) : (
                                                            <>
                                                                <Lock size={16} className="text-brand-orange" />
                                                                Close requests
                                                            </>
                                                        )}
                                                    </button>

                                                    <div className="my-1 h-px w-full bg-black/5" />

                                                    <button
                                                        onClick={() => {
                                                            setIsManageMenuOpen(false);
                                                            setShowCancelConfirm(true);
                                                        }}
                                                        className="flex cursor-pointer items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium text-red-500 transition-colors hover:bg-red-50 hover:text-red-600"
                                                    >
                                                        <Ban size={16} />
                                                        Cancel event
                                                    </button>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
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