"use client";

import { useState } from "react";
import AnimatedBackgroundLight from "../ui/backgrounds/animated-background-light";
import Button from "../ui/button";
import Image from "next/image";
import { Users, Share2, ArrowLeft, Check, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { getGroupStatusInfo } from "@/lib/group-status";
import ConfirmAlert from "../ui/alerts/confirm-alert";
import StatusAlert from "../ui/alerts/status-alert";
import GroupModalTransferOwnership from "./group-modal-transferownership";
import type { UserType } from "@/lib/mock_data/users-data";

type GroupHeaderProps = {
    groupData: {
        title: string;
        coverImage: string;
        memberCount: number;
        memberLimit: number;
        category: string;
        status: string;
    };
    isUserMember?: boolean;
    isUserOwner?: boolean;
    groupMembers?: UserType[];
};

export default function GroupHeader({
    groupData,
    isUserMember = false,
    isUserOwner = false,
    groupMembers = [],
}: GroupHeaderProps) {
    const router = useRouter();
    const statusInfo = getGroupStatusInfo(groupData.status);
    const StatusIcon = statusInfo.icon;

    const [isMember, setIsMember] = useState(isUserMember);
    const [memberCount, setMemberCount] = useState(groupData.memberCount);
    const [showLeaveConfirm, setShowLeaveConfirm] = useState(false);
    const [showTransferModal, setShowTransferModal] = useState(false);
    const [statusAlert, setStatusAlert] = useState<{ description: string; type: "success" | "error" } | null>(null);

    const isFull = memberCount >= groupData.memberLimit;

    const handleJoinToggle = () => {
        if (isMember) {
            if (isUserOwner) {
                if (groupMembers.length === 0) {
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
            setStatusAlert({ description: "This group is already full.", type: "error" });
            return;
        }

        setIsMember(true);
        setMemberCount((prev) => prev + 1);
        setStatusAlert({ description: `You joined ${groupData.title}.`, type: "success" });
    };

    const handleLeaveGroup = () => {
        setShowLeaveConfirm(false);
        setIsMember(false);
        setMemberCount((prev) => Math.max(0, prev - 1));
        setStatusAlert({ description: `You left ${groupData.title}.`, type: "success" });
    };

    const handleTransferOwnership = (newOwner: UserType) => {
        setShowTransferModal(false);
        setIsMember(false);
        setMemberCount((prev) => Math.max(0, prev - 1));
        setStatusAlert({
            description: `Ownership transferred to ${newOwner.firstName} ${newOwner.lastName}. You've left ${groupData.title}.`,
            type: "success",
        });
    };

    return (
        <section className="flex flex-col items-center">
            <ConfirmAlert
                isOpen={showLeaveConfirm}
                onClose={() => setShowLeaveConfirm(false)}
                onConfirm={handleLeaveGroup}
                icon={LogOut}
                title="Leave group"
                description={`You'll stop having access to ${groupData.title} and its content.`}
                confirmLabel="Yes, leave group"
                variant="neutral"
            />
            <GroupModalTransferOwnership
                isOpen={showTransferModal}
                onClose={() => setShowTransferModal(false)}
                onConfirm={handleTransferOwnership}
                members={groupMembers}
                groupTitle={groupData.title}
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

                {/* PORTADA (COVER) */}
                <div className="relative h-48 w-full md:h-72">
                    {/* BOTÓN VOLVER */}
                    <button
                        onClick={() => router.back()}
                        className="absolute left-4 top-20 z-20 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-black/10 bg-white/70 text-black/70 backdrop-blur-md transition-colors hover:bg-white hover:text-black dark:border-white/20 dark:bg-black/50 dark:text-white/70 dark:hover:bg-black/70 dark:hover:text-white"
                        aria-label="Volver atrás"
                    >
                        <ArrowLeft size={18} />
                    </button>

                    <Image
                        src={groupData.coverImage}
                        alt={`Portada de ${groupData.title}`}
                        fill
                        className="object-cover"
                    />
                </div>

                {/* CONTENIDO */}
                <div className="relative px-6 pb-6 pt-6 md:px-10 md:pb-8">

                    {/* MESHY BACKGROUND */}
                    <AnimatedBackgroundLight />

                    {/* BLOQUE SUPERIOR */}
                    <div className="relative z-10 flex flex-col items-start gap-2">
                        <div className="flex flex-wrap items-center gap-2">
                            <span className="rounded-full bg-[#8C6CFF]/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#6D28D9]">
                                {groupData.category}
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
                            {groupData.title}
                        </h1>
                    </div>

                    <div className="relative z-10 mt-6 flex flex-col items-start gap-6 border-t border-black/10 pt-5 min-[1200px]:flex-row min-[1200px]:items-center min-[1200px]:justify-between">

                        {/* ESTADÍSTICAS */}
                        <div className="flex items-center gap-6 md:gap-10">
                            <div className="flex flex-col">
                                <div className="flex items-baseline gap-1">
                                    <span className="text-3xl font-bold text-[#6D28D9] md:text-4xl">
                                        {memberCount}
                                    </span>
                                    <span className="text-xl font-bold text-black/30 md:text-2xl">
                                        / {groupData.memberLimit}
                                    </span>
                                </div>
                                <span className="mt-1 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-black/70 md:text-xs">
                                    <Users size={14} className="text-[#6D28D9]" />
                                    Members
                                </span>
                            </div>
                        </div>

                        {/* BOTONES */}
                        <div className="flex w-full px-0 gap-3 sm:w-auto min-[1200px]:flex-row">
                            {isMember ? (
                                <Button
                                    tone="following"
                                    variant="outline"
                                    onClick={handleJoinToggle}
                                    className="flex-1 px-8 py-3 sm:flex-none"
                                    textClassName="text-sm flex items-center gap-2 justify-center"
                                >
                                    <Check size={16} />
                                    Joined
                                </Button>
                            ) : (
                                <Button
                                    tone="dark"
                                    onClick={handleJoinToggle}
                                    className="flex-1 px-8 py-3 sm:flex-none"
                                    textClassName="text-sm flex items-center gap-2 justify-center"
                                >
                                    {isFull ? "Group full" : "Join Group"}
                                </Button>
                            )}

                            <button
                                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-black/10 bg-black/5 text-black/60 transition-all hover:bg-black/10 hover:text-black sm:h-auto sm:w-auto sm:px-6 cursor-pointer"
                                aria-label="Share Group"
                            >
                                <Share2 size={18} className="cursor-pointer" />
                                <span className="hidden sm:ml-2 cursor-pointer sm:inline-block sm:text-sm sm:font-semibold">Share</span>
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}