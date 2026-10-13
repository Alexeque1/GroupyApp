"use client";

import Image from "next/image";
import Link from "next/link";
import { Check, MapPin, UserRound, X } from "lucide-react";
import Button from "@/components/ui/button";
import { formatTimeAgo } from "@/lib/date";
import type { JoinRequestViewModel } from "@/lib/requests-selector";

type EventRequestBoxProps = {
    request: JoinRequestViewModel;
    onAccept: (request: JoinRequestViewModel) => void;
    onDecline: (request: JoinRequestViewModel) => void;
};

export default function EventRequestBox({ request, onAccept, onDecline }: EventRequestBoxProps) {
    const { requester } = request;
    const fullName = `${requester.firstName} ${requester.lastName}`;
    const initials = `${requester.firstName[0] ?? ""}${requester.lastName[0] ?? ""}`.toUpperCase();

    return (
        <article className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-3 rounded-3xl border border-black/5 bg-white p-4 shadow-sm sm:grid-cols-[auto_1fr_auto] sm:gap-x-4 sm:p-5">

            {/* AVATAR */}
            <div className="relative col-start-1 row-start-1 flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#FCEAE5] text-sm font-bold text-[#D45433] sm:h-12 sm:w-12">
                {requester.profileImage ? (
                    <Image
                        src={requester.profileImage}
                        alt={fullName}
                        fill
                        sizes="48px"
                        className="object-cover"
                    />
                ) : (
                    initials
                )}
            </div>

            {/* NAME + META */}
            <div className="col-start-2 row-start-1 flex min-w-0 flex-col justify-center">
                <span className="truncate font-bold text-slate-900">{fullName}</span>
                <span className="flex flex-wrap items-center gap-x-1.5 text-xs text-slate-500 sm:text-sm">
                    {requester.city && (
                        <>
                            <span className="flex items-center gap-1">
                                <MapPin size={12} className="shrink-0" />
                                {requester.city}
                            </span>
                            <span aria-hidden>·</span>
                        </>
                    )}
                    <time dateTime={request.createdAt}>{formatTimeAgo(request.createdAt)}</time>
                </span>
            </div>

            {/* MESSAGE */}
            {request.message && (
                <p className="col-span-2 row-start-2 rounded-2xl bg-[#F8F7FA] p-4 text-sm leading-relaxed text-slate-700 sm:col-start-2">
                    “{request.message}”
                </p>
            )}

            {/* PROFILE LINK */}
            <Link
                href={`/profile/${requester.username}`}
                className="col-span-2 row-start-3 flex w-fit items-center gap-1.5 text-sm font-medium text-purple-600 hover:underline sm:col-start-2"
            >
                <UserRound size={14} />
                View profile
            </Link>

            {/* ACTIONS */}
            <div className="col-span-2 row-start-4 flex gap-3 sm:col-span-1 sm:col-start-3 sm:row-start-1 sm:self-start">
                <Button
                    type="button"
                    variant="outline"
                    tone="dark"
                    onClick={() => onDecline(request)}
                    className="h-11 flex-1 px-5 py-0 sm:flex-none"
                    textClassName="text-sm"
                >
                    <X size={16} strokeWidth={2.5} />
                    Decline
                </Button>
                <Button
                    type="button"
                    variant="liquid"
                    tone="dark"
                    onClick={() => onAccept(request)}
                    className="h-11 flex-1 px-5 py-0 sm:flex-none"
                    textClassName="text-sm"
                >
                    <Check size={16} strokeWidth={2.5} />
                    Accept
                </Button>
            </div>
        </article>
    );
}
