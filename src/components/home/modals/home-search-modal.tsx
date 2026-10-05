"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, CalendarDays, Users, UserRound, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import Portal from "@/components/ui/portal";

type SearchScope = "plans" | "communities" | "people";

const SCOPES: { id: SearchScope; label: string; icon: LucideIcon }[] = [
    { id: "plans", label: "Plans", icon: CalendarDays },
    { id: "communities", label: "Communities", icon: Users },
    { id: "people", label: "People", icon: UserRound },
];

interface HomeSearchModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function HomeSearchModal({ isOpen, onClose }: HomeSearchModalProps) {
    const [query, setQuery] = useState("");
    const [scope, setScope] = useState<SearchScope | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        const previousOverflow = document.body.style.overflow;

        document.body.style.overflow = "hidden";
        window.addEventListener("keydown", handleKeyDown);

        return () => {
            document.body.style.overflow = previousOverflow;
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpen, onClose]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: connect to the real search once the backend is ready.
    };

    const handleClear = () => {
        setQuery("");
        inputRef.current?.focus();
    };

    const placeholder = scope
        ? `Search ${SCOPES.find((s) => s.id === scope)?.label.toLowerCase()}...`
        : "Search plans, communities, people";

    return (
        <Portal>
            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 z-[100] flex justify-center px-4 pt-4 sm:pt-20">
                        {/* BACKDROP */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            onClick={onClose}
                            className="absolute inset-0 bg-brand-dark/40 backdrop-blur-sm"
                        />

                        {/* PANEL */}
                        <motion.div
                            role="dialog"
                            aria-modal="true"
                            aria-label="Search"
                            initial={{ opacity: 0, y: -24, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -16, scale: 0.98 }}
                            transition={{ type: "spring", stiffness: 380, damping: 30 }}
                            onAnimationComplete={() => inputRef.current?.focus()}
                            className="relative flex h-fit w-full max-w-lg flex-col gap-4 rounded-3xl border border-black/5 bg-white p-3 shadow-[0_20px_60px_rgba(10,5,20,0.25)]"
                        >
                            {/* SEARCH ROW */}
                            <form onSubmit={handleSubmit} className="flex items-center gap-2">
                                <div className="flex flex-1 items-center gap-2.5 rounded-2xl bg-black/5 px-4 py-3 transition-all focus-within:bg-white focus-within:ring-2 focus-within:ring-brand-purple/30">
                                    <Search size={18} className="shrink-0 text-brand-purple" />
                                    <input
                                        ref={inputRef}
                                        type="search"
                                        enterKeyHint="search"
                                        value={query}
                                        onChange={(e) => setQuery(e.target.value)}
                                        placeholder={placeholder}
                                        className="w-full min-w-0 bg-transparent text-base text-black/80 outline-none placeholder:text-black/40 [&::-webkit-search-cancel-button]:hidden"
                                    />
                                    <AnimatePresence>
                                        {query && (
                                            <motion.button
                                                type="button"
                                                initial={{ opacity: 0, scale: 0.6 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.6 }}
                                                transition={{ duration: 0.15 }}
                                                onClick={handleClear}
                                                aria-label="Clear search"
                                                className="flex h-6 w-6 shrink-0 cursor-pointer items-center justify-center rounded-full bg-black/10 text-black/60 transition-colors hover:bg-black/20"
                                            >
                                                <X size={13} />
                                            </motion.button>
                                        )}
                                    </AnimatePresence>
                                </div>

                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="cursor-pointer px-2 text-sm font-semibold text-black/50 transition-colors hover:text-black"
                                >
                                    Cancel
                                </button>
                            </form>

                            {/* SCOPES */}
                            <div className="flex flex-col gap-2.5 px-1 pb-1">
                                <span className="text-[11px] font-bold uppercase tracking-wider text-black/40">
                                    Search in
                                </span>

                                <div className="flex flex-wrap gap-2">
                                    {SCOPES.map(({ id, label, icon: Icon }) => {
                                        const isActive = scope === id;

                                        return (
                                            <button
                                                key={id}
                                                type="button"
                                                aria-pressed={isActive}
                                                onClick={() => setScope(isActive ? null : id)}
                                                className={cn(
                                                    "flex cursor-pointer items-center gap-1.5 rounded-full border px-3.5 py-2 text-xs font-semibold transition-all",
                                                    isActive
                                                        ? "border-brand-purple bg-brand-purple text-white shadow-[0_4px_14px_rgba(140,108,255,0.35)]"
                                                        : "border-black/10 bg-white text-black/60 hover:border-brand-purple/30 hover:bg-brand-purple/5 hover:text-black"
                                                )}
                                            >
                                                <Icon size={14} className={isActive ? "text-white" : "text-brand-purple"} />
                                                {label}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </Portal>
    );
}
