"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationControlsProps {
    page: number;
    totalPages: number;
    onChange: (page: number) => void;
    size?: "sm" | "md";
}

// Controles prev/next reutilizables. No renderiza nada si hay una sola página.
export default function PaginationControls({
    page,
    totalPages,
    onChange,
    size = "md",
}: PaginationControlsProps) {
    if (totalPages <= 1) return null;

    const btn = size === "sm" ? "h-8 w-8 shadow-sm" : "h-9 w-9";
    const iconSize = size === "sm" ? 14 : 16;
    const labelSize = size === "sm" ? "text-xs" : "text-sm";

    return (
        <div className="flex items-center justify-center gap-4">
            <button
                onClick={() => onChange(page - 1)}
                disabled={page === 1}
                className={`flex ${btn} cursor-pointer items-center justify-center rounded-full border border-black/10 bg-white transition-all duration-200 hover:border-black/20 disabled:cursor-not-allowed disabled:opacity-40`}
                aria-label="Página anterior"
            >
                <ChevronLeft size={iconSize} className="text-black/70" />
            </button>

            <span className={`${labelSize} font-semibold text-black/60`}>
                {page} / {totalPages}
            </span>

            <button
                onClick={() => onChange(page + 1)}
                disabled={page === totalPages}
                className={`flex ${btn} cursor-pointer items-center justify-center rounded-full border border-black/10 bg-white transition-all duration-200 hover:border-black/20 disabled:cursor-not-allowed disabled:opacity-40`}
                aria-label="Página siguiente"
            >
                <ChevronRight size={iconSize} className="text-black/70" />
            </button>
        </div>
    );
}
