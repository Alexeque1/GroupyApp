"use client";

import { useState, type RefObject } from "react";

interface CarouselScrollbarProps {
    carouselRef: RefObject<HTMLDivElement | null>;
    hasOverflow: boolean;
    thumbWidthPct: number;
    thumbLeftPct: number;
    className?: string;
}

// Scrollbar-like bar for drag-to-scroll carousels: only shows up when there's
// real overflow, and dragging it moves the carousel (not just indicates it).
export default function CarouselScrollbar({
    carouselRef,
    hasOverflow,
    thumbWidthPct,
    thumbLeftPct,
    className = "",
}: CarouselScrollbarProps) {
    const [isDraggingBar, setIsDraggingBar] = useState(false);

    if (!hasOverflow) return null;

    const scrollToClientX = (clientX: number, barRect: DOMRect) => {
        const carousel = carouselRef.current;
        if (!carousel) return;
        const ratio = Math.min(Math.max((clientX - barRect.left) / barRect.width, 0), 1);
        const maxScroll = carousel.scrollWidth - carousel.clientWidth;
        carousel.scrollLeft = ratio * maxScroll;
    };

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        const barRect = e.currentTarget.getBoundingClientRect();
        setIsDraggingBar(true);
        scrollToClientX(e.clientX, barRect);

        const handleMove = (moveEvent: MouseEvent) => {
            scrollToClientX(moveEvent.clientX, barRect);
        };
        const handleUp = () => {
            setIsDraggingBar(false);
            window.removeEventListener("mousemove", handleMove);
            window.removeEventListener("mouseup", handleUp);
        };
        window.addEventListener("mousemove", handleMove);
        window.addEventListener("mouseup", handleUp);
    };

    return (
        <div
            onMouseDown={handleMouseDown}
            className={`group relative h-1.5 w-full shrink-0 cursor-pointer rounded-full bg-black/5 ${className}`}
        >
            <div
                className={`absolute top-0 h-full rounded-full transition-colors ${isDraggingBar ? "bg-brand-purple" : "bg-brand-purple/40 group-hover:bg-brand-purple/60"
                    }`}
                style={{ width: `${thumbWidthPct}%`, left: `${thumbLeftPct}%` }}
            />
        </div>
    );
}
