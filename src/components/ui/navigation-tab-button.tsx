"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface NavigationTabButtonProps {
    label: string;
    isActive: boolean;
    onClick: () => void;
    layoutId?: string;
    className?: string;
}

export default function NavigationTabButton({
    label,
    isActive,
    onClick,
    layoutId = "default-tab-indicator",
    className,
}: NavigationTabButtonProps) {
    return (
        <button
            onClick={onClick}
            className={cn(
                "relative flex flex-col items-center justify-center px-6 pt-4 pb-3 md:px-8 text-sm md:text-base font-bold transition-all duration-300 outline-none rounded-t-3xl cursor-pointer",
                isActive
                    ? "bg-white text-black"
                    : "bg-transparent text-black/50 hover:bg-black/5 hover:text-black/70",
                className
            )}
        >
            <span className="relative z-10 mb-1.5">{label}</span>

            {isActive && (
                <motion.div
                    layoutId={layoutId}
                    className="absolute bottom-2.5 h-[3px] w-6 rounded-full bg-black"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
            )}
        </button>
    );
}