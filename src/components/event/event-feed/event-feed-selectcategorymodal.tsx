"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutGrid, X } from "lucide-react";
import Button from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Portal from "@/components/ui/portal";

// We import your category types and data
import { POST_CATEGORY_DATA } from "@/lib/post-category"; 
import type { PostCategory } from "@/lib/mock_data/post-data";

interface EventFeedSelectCategoryModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (category: PostCategory) => void;
    currentCategory?: PostCategory | null;
}

export default function EventFeedSelectCategoryModal({
    isOpen,
    onClose,
    onConfirm,
    currentCategory = null,
}: EventFeedSelectCategoryModalProps) {
    const [selectedCategory, setSelectedCategory] = useState<PostCategory | null>(currentCategory);

    const [prevIsOpen, setPrevIsOpen] = useState(isOpen);
    if (isOpen !== prevIsOpen) {
        setPrevIsOpen(isOpen);
        if (isOpen) {
            setSelectedCategory(currentCategory);
        }
    }

    const handleConfirm = () => {
        if (!selectedCategory) return;
        onConfirm(selectedCategory);
        onClose();
    };

    // We turn the POST_CATEGORY_DATA object into an array so we can iterate over it
    const categories = Object.entries(POST_CATEGORY_DATA) as [PostCategory, typeof POST_CATEGORY_DATA[PostCategory]][];

    return (
        <Portal>
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
                            className="fixed inset-0 bg-brand-dark/40 backdrop-blur-sm"
                        />

                        {/* MODAL CONTAINER */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 10 }}
                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                            onClick={(e) => e.stopPropagation()}
                            className="relative flex max-h-[85vh] w-full max-w-md flex-col overflow-hidden rounded-3xl border border-black/5 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.2)] dark:border-white/5 dark:bg-brand-dark"
                        >
                            {/* HEADER */}
                            <div className="flex shrink-0 items-start justify-between gap-4 border-b border-black/10 p-6 dark:border-white/10">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-purple/15 text-brand-purple">
                                        <LayoutGrid size={20} />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-brand-violet dark:text-white">
                                            Post Type
                                        </h3>
                                        <p className="text-xs text-black/50 dark:text-white/50">
                                            Choose a category for your publication.
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

                            {/* BODY (CATEGORY LIST) */}
                            <div className="flex flex-1 flex-col gap-3 overflow-y-auto p-6">
                                {categories.map(([key, info]) => {
                                    const isSelected = selectedCategory === key;
                                    const Icon = info.icon;

                                    return (
                                        <button
                                            key={key}
                                            type="button"
                                            onClick={() => setSelectedCategory(key)}
                                            className={cn(
                                                "flex w-full cursor-pointer items-center justify-between gap-3 rounded-xl border p-4 text-left transition-colors",
                                                isSelected
                                                    ? "border-brand-purple/40 bg-brand-purple/5 dark:border-brand-purple/40 dark:bg-brand-purple/10"
                                                    : "border-black/10 bg-transparent hover:bg-black/5 dark:border-white/10 dark:hover:bg-white/5"
                                            )}
                                        >
                                            <div className="flex items-center gap-4">
                                                {/* We use your badgeClasses to color the icon */}
                                                <div className={cn(
                                                    "flex h-10 w-10 shrink-0 items-center justify-center rounded-full border",
                                                    info.badgeClasses
                                                )}>
                                                    <Icon size={18} />
                                                </div>
                                                <span className="text-sm font-semibold text-black/90 dark:text-white">
                                                    {info.label}
                                                </span>
                                            </div>

                                            {/* Radio button custom */}
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
                                })}
                            </div>

                            {/* FOOTER */}
                            <div className="flex shrink-0 items-center justify-between gap-3 border-t border-black/10 p-6 dark:border-white/10">
                                <span className="text-xs font-medium text-black/50 dark:text-white/50">
                                    {selectedCategory 
                                        ? `${POST_CATEGORY_DATA[selectedCategory].label} selected` 
                                        : "No category selected"}
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
                                        className={cn("px-6 py-2.5", !selectedCategory && "pointer-events-none opacity-50")}
                                    >
                                        Confirm
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </Portal>
    );
}