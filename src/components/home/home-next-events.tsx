"use client";

import { useRef, useState } from "react";
import { Sparkles, Users, Timer } from "lucide-react";
import ProfileEventCard, { EventType } from "../profile/profile-events-cards";
import Button from "../ui/button";
import Link from "next/link";
import { getToday } from "@/lib/event-filters";

export default function HomeNextEvents({ userEvents }: { userEvents: EventType[] }) {
    const carouselRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [hasDragged, setHasDragged] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    const EVENTS_LIMIT = 4;
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

    const today = getToday();
    // Arranca en el índice 1: el evento más próximo (índice 0) ya se muestra
    // en el hero de arriba, así que este carrusel no lo repite.
    const filteredEvents = userEvents.filter((event) => {
        const eventDate = new Date(event.startDate);
        return eventDate >= today;
    }).slice(1, EVENTS_LIMIT).reverse();

    return (
        <div className="relative z-10 flex w-full flex-col overflow-hidden rounded-3xl border border-black/10 bg-white p-5 shadow-[0_8px_30px_rgba(0,0,0,0.06)]">

            {/* TÍTULO DE LA SECCIÓN Y BOTÓN CREATE */}
            <div className="mb-4 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                    <Sparkles size={20} className="text-brand-purple" />
                    <h3 className="text-xl font-bold text-black/90">
                        Your next events
                    </h3>
                </div>
                <div className="flex justify-end">
                    <Link href={"/create"}>
                        <Button
                            tone="dark"
                            className="px-6 py-2"
                            textClassName="text-xs sm:text-sm"
                        >
                            Create event
                        </Button>
                    </Link>
                </div>
            </div>

            {/* SEPARADOR */}
            <div className="mb-4 h-px w-full bg-black/5" />

            {/* RENDERIZADO CONDICIONAL */}
            {filteredEvents.length > 0 ? (

                <div
                    ref={carouselRef}
                    onMouseDown={handleMouseDown}
                    onMouseLeave={handleMouseLeave}
                    onMouseUp={handleMouseUp}
                    onMouseMove={handleMouseMove}
                    onDragStart={handleDragStart}
                    className={`flex w-full flex-nowrap items-stretch gap-4 overflow-x-auto pb-4 pt-4 select-none [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${isDragging ? "cursor-grabbing snap-none" : "cursor-grab snap-x snap-mandatory"
                        }`}
                >
                    {filteredEvents.map((event, index) => (
                        <div
                            key={event.id}
                            className={`relative shrink-0 snap-center w-[240px] flex flex-col ${hasDragged ? "pointer-events-none" : ""
                                }`}
                        >
                            <div className="flex h-full flex-col [&>*]:h-full">
                                <ProfileEventCard event={event} />
                            </div>
                        </div>
                    ))}

                    {/* BOTÓN AL FINAL DEL CARRUSEL */}
                    <div className="flex shrink-0 snap-center items-center justify-center pr-4">
                        <Link href="/profile#event_section">
                            <Button
                                tone="dark"
                                className="px-8 py-3"
                                textClassName="text-sm whitespace-nowrap"
                            >
                                All my events
                            </Button>
                        </Link>
                    </div>
                </div>

            ) : (

                <div className="flex flex-col items-center justify-center py-10 text-center">
                    <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-black/5">
                        <Users size={32} className="text-black/40" />
                    </div>
                    <p className="text-sm font-medium text-black/60">
                        You have no upcoming events
                    </p>
                    <p className="mt-1 text-xs text-black/60">
                        Create an event or join one and have fun!
                    </p>
                </div>

            )}

        </div>
    );
}
