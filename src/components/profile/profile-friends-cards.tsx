"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { MoreHorizontal, UserPlus, UserMinus, Users, MessageCircle, Eye } from "lucide-react";
import Link from "next/link";
import { USERS_DATA } from "@/lib/mock_data/users-data";
import { countMutualFriends } from "@/lib/mock_data/profile-selectors";
import ConfirmAlert from "../ui/alerts/confirm-alert";
import StatusAlert from "../ui/alerts/status-alert";
import { cn } from "@/lib/utils";

export interface FriendType {
    id: number;
    name: string;
    username: string;
    image: string;
}

interface FriendCardProps {
    friend: FriendType;
    currentUserId: number;
}

export default function FriendCard({ friend, currentUserId }: FriendCardProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [menuPosition, setMenuPosition] = useState<"top" | "bottom">("bottom");
    const menuRef = useRef<HTMLDivElement>(null);

    const isSelf = friend.id === currentUserId;
    const currentUser = USERS_DATA.find((u) => u.id === currentUserId);
    const [isFriend, setIsFriend] = useState(currentUser?.friendIds.includes(friend.id) ?? false);
    // Siempre relativo a QUIEN mira (currentUserId), no al dueño del perfil que se está viendo.
    const mutualFriendsCount = countMutualFriends(currentUserId, friend.id);
    const [showRemoveConfirm, setShowRemoveConfirm] = useState(false);
    const [statusAlert, setStatusAlert] = useState<{ description: string; type: "success" | "error" } | null>(null);

    const handleFriendToggle = () => {
        setIsMenuOpen(false);

        if (isFriend) {
            setShowRemoveConfirm(true);
            return;
        }

        setIsFriend(true);
        setStatusAlert({ description: `You added ${friend.name} as a friend.`, type: "success" });
    };

    const handleRemoveFriend = () => {
        setIsFriend(false);
        setShowRemoveConfirm(false);
        setStatusAlert({ description: `You removed ${friend.name} as a friend.`, type: "success" });
    };

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsMenuOpen(false);
            }
        }
        if (isMenuOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isMenuOpen]);

    return (
        <div
            className={cn(
                "group relative flex cursor-pointer items-center justify-between rounded-2xl border p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)]",
                isMenuOpen ? "z-50" : "z-10 hover:z-20",
                isSelf
                    ? "border-[#6D28D9]/20 bg-[#6D28D9]/5"
                    : isFriend
                        ? "border-[#2563EB]/20 bg-[#2563EB]/5"
                        : "border-black/10 bg-white"
            )}
        >
            <ConfirmAlert
                isOpen={showRemoveConfirm}
                onClose={() => setShowRemoveConfirm(false)}
                onConfirm={handleRemoveFriend}
                icon={UserMinus}
                title="Remove friend"
                description={`You'll no longer be friends with ${friend.name}.`}
                confirmLabel="Yes, remove friend"
                variant="neutral"
            />
            <StatusAlert
                isOpen={statusAlert !== null}
                onClose={() => setStatusAlert(null)}
                description={statusAlert?.description ?? ""}
                type={statusAlert?.type ?? "success"}
                duration={3000}
            />
            {/* AVATAR E INFO */}
            <Link href={`/profile/${friend.id}`} className="flex items-center gap-4">
                <div className="flex items-center gap-4">
                    {/* Contenedor sin overflow-hidden para que la etiqueta "You" pueda
                        sobresalir del círculo; el recorte a círculo pasa al div de adentro. */}
                    <div className="relative h-14 w-14 shrink-0">
                        <div
                            className={cn(
                                "relative h-full w-full overflow-hidden rounded-full",
                                isSelf && "ring-2 ring-[#6D28D9] ring-offset-2 ring-offset-white",
                                !isSelf && isFriend && "ring-2 ring-[#2563EB] ring-offset-2 ring-offset-white"
                            )}
                        >
                            <Image
                                src={friend.image}
                                alt={friend.name}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                        </div>

                        {isSelf ? (
                            <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-[#6D28D9] px-1.5 py-[1px] text-[8px] font-black uppercase tracking-wider text-white shadow-sm">
                                You
                            </span>
                        ) : isFriend && (
                            <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-[#2563EB] px-1.5 py-[1px] text-[8px] font-black uppercase tracking-wider text-white shadow-sm">
                                Friend
                            </span>
                        )}
                    </div>

                    <div className="flex flex-col">
                        <h4 className="text-sm font-bold text-black/90 transition-colors group-hover:text-[#6D28D9]">
                            {friend.name}
                        </h4>
                        <span className="text-xs font-medium text-black/50">
                            {friend.username}
                        </span>
                        {!isSelf && (
                            <span className="mt-0.5 text-[11px] text-black/40">
                                {mutualFriendsCount} mutual friends
                            </span>
                        )}
                    </div>
                </div>
            </Link>

            {/* BOTÓN DE OPCIONES + DROPDOWN */}
            <div className="relative" ref={menuRef}>
                <button
                    onClick={(e) => {
                        e.stopPropagation();

                        if (!isMenuOpen) {
                            const button = e.currentTarget;
                            const rect = button.getBoundingClientRect();

                            const spaceBelowWindow = window.innerHeight - rect.bottom;

                            const scrollParent = button.closest('.overflow-y-auto, .overflow-hidden, .overflow-scroll, .overflow-x-auto, [style*="overflow"]') as HTMLElement;
                            let spaceBelowParent = spaceBelowWindow;

                            if (scrollParent) {
                                const parentRect = scrollParent.getBoundingClientRect();
                                spaceBelowParent = parentRect.bottom - rect.bottom;
                            }

                            const actualSpaceBelow = Math.min(spaceBelowWindow, spaceBelowParent);

                            setMenuPosition(actualSpaceBelow < 180 ? "top" : "bottom");
                        }

                        setIsMenuOpen(!isMenuOpen);
                    }}
                    className={`flex cursor-pointer h-10 w-10 items-center justify-center rounded-full transition-colors ${isMenuOpen ? "bg-black/10 text-black" : "text-black/40 hover:bg-black/5 hover:text-black/70"
                        }`}
                >
                    <MoreHorizontal size={18} />
                </button>

                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            initial={{
                                opacity: 0,
                                scale: 0.9,
                                y: menuPosition === "bottom" ? 10 : -10,
                                transformOrigin: menuPosition === "bottom" ? "top right" : "bottom right"
                            }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{
                                opacity: 0,
                                scale: 0.9,
                                y: menuPosition === "bottom" ? 10 : -10
                            }}
                            transition={{ duration: 0.2 }}
                            className={`absolute right-0 z-50 flex w-48 flex-col overflow-hidden rounded-2xl border border-black/10 bg-white p-1.5 shadow-[0_8px_30px_rgba(0,0,0,0.12)] ${menuPosition === "bottom" ? "top-12" : "bottom-12"
                                }`}
                        >
                            <Link
                                href={`/profile/${friend.id}`}
                                onClick={(e) => { e.stopPropagation(); setIsMenuOpen(false); }}
                                className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium text-black/70 transition-colors hover:bg-black/5 hover:text-black cursor-pointer"
                            >
                                <Eye size={16} className="text-black/50" />
                                View profile
                            </Link>

                            {!isSelf && (
                                <button
                                    onClick={(e) => { e.stopPropagation(); handleFriendToggle(); }}
                                    className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium text-black/70 transition-colors hover:bg-black/5 hover:text-black cursor-pointer"
                                >
                                    {isFriend ? (
                                        <>
                                            <UserMinus size={16} className="text-red-500" />
                                            Remove as friend
                                        </>
                                    ) : (
                                        <>
                                            <UserPlus size={16} className="text-[#6D28D9]" />
                                            Add as friend
                                        </>
                                    )}
                                </button>
                            )}

                            {!isSelf && (
                                <>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); setIsMenuOpen(false); }}
                                        className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium text-black/70 transition-colors hover:bg-black/5 hover:text-black cursor-pointer"
                                    >
                                        <Users size={16} className="text-[#059669]" />
                                        Invite group
                                    </button>

                                    <div className="my-1 h-px w-full bg-black/5" />

                                    <button
                                        onClick={(e) => { e.stopPropagation(); setIsMenuOpen(false); }}
                                        className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium text-black/70 transition-colors hover:bg-black/5 hover:text-black cursor-pointer"
                                    >
                                        <MessageCircle size={16} className="text-[#EA580C]" />
                                        Send message
                                    </button>
                                </>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}