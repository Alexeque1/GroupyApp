"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Crown, Search, UserX, X } from "lucide-react";
import Button from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { UserType } from "@/lib/mock_data/users-data";

interface GroupModalTransferOwnershipProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (newOwner: UserType) => void;
    members: UserType[];
    groupTitle: string;
}

export default function GroupModalTransferOwnership({
    isOpen,
    onClose,
    onConfirm,
    members,
    groupTitle,
}: GroupModalTransferOwnershipProps) {
    const [search, setSearch] = useState("");
    const [selectedId, setSelectedId] = useState<number | null>(null);

    // Resetea la búsqueda y la selección cada vez que el modal se vuelve a abrir.
    const [prevIsOpen, setPrevIsOpen] = useState(isOpen);
    if (isOpen !== prevIsOpen) {
        setPrevIsOpen(isOpen);
        if (isOpen) {
            setSelectedId(null);
            setSearch("");
        }
    }

    const filteredMembers = members.filter((member) => {
        const query = search.trim().toLowerCase();
        if (!query) return true;
        const fullName = `${member.firstName} ${member.lastName}`.toLowerCase();
        return fullName.includes(query) || member.username.toLowerCase().includes(query);
    });

    const selectedMember = members.find((member) => member.id === selectedId) ?? null;

    const handleConfirm = () => {
        if (!selectedMember) return;
        onConfirm(selectedMember);
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto p-4 py-8">
                    {/* OVERLAY */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-[#0a0514]/40 backdrop-blur-sm"
                    />

                    {/* CONTENEDOR DEL MODAL */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        onClick={(e) => e.stopPropagation()}
                        className="relative flex max-h-[85vh] w-full max-w-lg flex-col overflow-hidden rounded-3xl border border-black/5 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.2)] dark:border-white/5 dark:bg-brand-dark"
                    >
                        {/* HEADER */}
                        <div className="flex shrink-0 items-start justify-between gap-4 border-b border-black/10 p-6 dark:border-white/10">
                            <div className="flex items-center gap-3">
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-purple/15 text-brand-purple">
                                    <Crown size={20} />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-[#1a0f2e] dark:text-white">
                                        Transfer ownership
                                    </h3>
                                    <p className="text-xs text-black/50 dark:text-white/50">
                                        Choose who becomes the new owner of {groupTitle}.
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={onClose}
                                className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full border border-black/10 bg-black/5 text-black/50 transition-colors hover:bg-black/10 hover:text-black dark:border-white/10 dark:bg-white/5 dark:text-white/50 dark:hover:bg-white/10 dark:hover:text-white"
                            >
                                <X size={16} />
                            </button>
                        </div>

                        {/* BODY */}
                        <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-6">
                            {/* SEARCH */}
                            <div className="relative">
                                <Search
                                    size={16}
                                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-black/30 dark:text-white/30"
                                />
                                <input
                                    type="text"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Search members by name..."
                                    className="w-full rounded-xl border border-black/10 bg-black/5 py-3 pl-11 pr-4 text-sm text-black placeholder-black/30 outline-none transition-all focus:border-brand-purple focus:ring-1 focus:ring-brand-purple dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder-white/30"
                                />
                            </div>

                            {/* MEMBERS LIST */}
                            <div className="flex max-h-[40vh] flex-col gap-2 overflow-y-auto pr-1">
                                {filteredMembers.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center gap-2 py-10 text-center">
                                        <UserX size={28} className="text-black/20 dark:text-white/20" />
                                        <span className="text-sm text-black/50 dark:text-white/50">
                                            No members match &quot;{search}&quot;.
                                        </span>
                                    </div>
                                ) : (
                                    filteredMembers.map((member) => {
                                        const isSelected = selectedId === member.id;

                                        return (
                                            <button
                                                key={member.id}
                                                type="button"
                                                onClick={() => setSelectedId(member.id)}
                                                className={cn(
                                                    "flex w-full cursor-pointer items-center justify-between gap-3 rounded-xl border p-3 text-left transition-colors",
                                                    isSelected
                                                        ? "border-brand-purple/40 bg-brand-purple/5 dark:border-brand-purple/40 dark:bg-brand-purple/10"
                                                        : "border-black/10 bg-transparent hover:bg-black/5 dark:border-white/10 dark:hover:bg-white/5"
                                                )}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full">
                                                        <Image
                                                            src={member.profileImage}
                                                            alt={member.firstName}
                                                            fill
                                                            className="object-cover"
                                                        />
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="text-sm font-semibold text-black/90 dark:text-white">
                                                            {member.firstName} {member.lastName}
                                                        </span>
                                                        <span className="text-xs text-black/50 dark:text-white/50">
                                                            {member.username}
                                                        </span>
                                                    </div>
                                                </div>

                                                {/* Radio, no checkbox: solo puede haber un dueño nuevo */}
                                                <div
                                                    className={cn(
                                                        "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
                                                        isSelected
                                                            ? "border-brand-purple"
                                                            : "border-black/20 dark:border-white/20"
                                                    )}
                                                >
                                                    {isSelected && (
                                                        <div className="h-2.5 w-2.5 rounded-full bg-brand-purple" />
                                                    )}
                                                </div>
                                            </button>
                                        );
                                    })
                                )}
                            </div>
                        </div>

                        {/* FOOTER */}
                        <div className="flex shrink-0 items-center justify-between gap-3 border-t border-black/10 p-6 dark:border-white/10">
                            <span className="text-xs font-medium text-black/50 dark:text-white/50">
                                {selectedMember ? `${selectedMember.firstName} ${selectedMember.lastName} selected` : "No one selected"}
                            </span>
                            <div className="flex gap-3">
                                <button
                                    onClick={onClose}
                                    className="cursor-pointer rounded-xl px-5 py-2.5 text-sm font-semibold text-black/60 transition-colors hover:bg-black/5 hover:text-black dark:text-white/60 dark:hover:bg-white/10 dark:hover:text-white"
                                >
                                    Cancel
                                </button>
                                <Button
                                    type="button"
                                    tone="dark"
                                    onClick={handleConfirm}
                                    className={cn("px-6 py-2.5", !selectedMember && "pointer-events-none opacity-50")}
                                >
                                    Transfer ownership
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
