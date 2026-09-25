"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { Sparkles, SearchX } from "lucide-react";
import EntityCard, { type EntityCardData } from "@/components/cards/entity-card";
import Button from "../ui/button";
import CarouselScrollbar from "../ui/carousel-scrollbar";
import { EVENTS_DATA } from "@/lib/mock_data/event-data";
import { getSuggestedEvents } from "@/lib/event-filters";
import { formatEventDate } from "@/lib/date";
import { useHorizontalScrollbar } from "@/hooks/use-horizontal-scrollbar";

const SUGGESTIONS_LIMIT = 8;

export default function HomeEventsSuggestions() {
    const carouselRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [hasDragged, setHasDragged] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    const DRAG_THRESHOLD = 5;

    const handleMouseDown = (e: React.MouseEvent) => {
        if (!carouselRef.current) return;
        setIsDragging(true);
        setHasDragged(false);
        setStartX(e.pageX - carouselRef.current.offsetLeft);
        setScrollLeft(carouselRef.current.scrollLeft);
    };

    const handleMouseLeave = () => {
        setIsDragging(false);
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging || !carouselRef.current) return;
        e.preventDefault();
        const x = e.pageX - carouselRef.current.offsetLeft;
        const walk = (x - startX) * 2;
        if (Math.abs(walk) > DRAG_THRESHOLD) {
            setHasDragged(true);
        }
        carouselRef.current.scrollLeft = scrollLeft - walk;
    };

    const handleDragStart = (e: React.DragEvent) => {
        e.preventDefault();
    };

    // TODO: esto solo trae candidatos (mismo criterio que Discover). Todavía
    // falta la lógica real de "sugerido" (intereses, ubicación, edad, etc.).
    const filteredSuggestionEvents = getSuggestedEvents(EVENTS_DATA).slice(0, SUGGESTIONS_LIMIT);

    const { hasOverflow, thumbWidthPct, thumbLeftPct } = useHorizontalScrollbar(
        carouselRef,
        [filteredSuggestionEvents.length]
    );

    return (
        <section className="relative z-10 flex w-full flex-col rounded-3xl border border-black/10 bg-white p-5 shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
            {/* HEADER */}
            <div className="mb-4 flex flex-col gap-2">
                <div className="flex items-center gap-2">
                    <Sparkles size={20} className="text-brand-purple" />
                    <h3 className="text-xl font-bold text-black/90">
                        Events suggestions
                    </h3>
                </div>
                <p className="text-sm text-black/70 md:text-base">Based on your interests, age range and location. Take a look!</p>
            </div>

            <div className="mb-4 h-px w-full bg-black/5" />

            {/* EVENTS */}
            {filteredSuggestionEvents.length > 0 ? (
                <div
                    ref={carouselRef}
                    onMouseDown={handleMouseDown}
                    onMouseLeave={handleMouseLeave}
                    onMouseUp={handleMouseUp}
                    onMouseMove={handleMouseMove}
                    onDragStart={handleDragStart}
                    className={`flex w-full flex-nowrap items-stretch gap-4 overflow-x-auto pb-4 pt-1 select-none [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${isDragging ? "cursor-grabbing snap-none" : "cursor-grab snap-x snap-mandatory"
                        }`}
                >
                    {filteredSuggestionEvents.map((event) => {
                        const data: EntityCardData = {
                            kind: "event",
                            id: event.id,
                            title: event.title,
                            image: event.image,
                            category: event.category,
                            location: event.location,
                            members: event.members,
                            colorFrom: event.colorFrom,
                            colorTo: event.colorTo,
                            startDate: formatEventDate(event.startDate),
                        };

                        return (
                            <div
                                key={event.id}
                                className={`relative shrink-0 snap-center w-[240px] flex flex-col ${hasDragged ? "pointer-events-none" : ""
                                    }`}
                            >
                                <div className="flex h-full flex-col [&>*]:h-full">
                                    <EntityCard data={data} variant="suggestion" />
                                </div>
                            </div>
                        );
                    })}

                    {/* BOTÓN AL FINAL DEL CARRUSEL */}
                    <div className="flex shrink-0 snap-center items-center justify-center pr-4">
                        <Link href="/discover">
                            <Button
                                tone="dark"
                                className="px-8 py-3"
                                textClassName="text-sm whitespace-nowrap"
                            >
                                See all
                            </Button>
                        </Link>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-10 text-center">
                    <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-black/5">
                        <SearchX size={32} className="text-black/40" />
                    </div>
                    <p className="text-sm font-medium text-black/60">
                        No suggestions for now
                    </p>
                    <p className="mt-1 text-xs text-black/60">
                        Check Discover to find new events!
                    </p>
                </div>
            )}

            <CarouselScrollbar
                carouselRef={carouselRef}
                hasOverflow={hasOverflow}
                thumbWidthPct={thumbWidthPct}
                thumbLeftPct={thumbLeftPct}
                className="mt-1"
            />
        </section>
    );
}
