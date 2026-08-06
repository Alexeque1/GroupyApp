"use client";

import { useRef, useState } from "react";
import { Sparkles, Users, Timer } from "lucide-react";
import ProfileGroupCard, { GroupType } from "../profile/profile-groups-cards";
import Button from "../ui/button";
import Link from "next/link";

export default function HomeNextGroups({userGroups}: {userGroups: GroupType[]}) {
    const carouselRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    // Solo se activa cuando hubo un movimiento real del mouse, no en el simple mousedown de un click.
    // Se usa para bloquear la navegación de las tarjetas mientras se arrastra el carrusel.
    const [hasDragged, setHasDragged] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    const GROUPS_LIMIT = 4;
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

    // Los links/imágenes son "draggable" nativamente en el navegador: sin esto, el navegador
    // intenta iniciar su propio drag-and-drop (ghost image) y compite con el scroll manual de arriba.
    const handleDragStart = (e: React.DragEvent) => {
        e.preventDefault();
    };

    const currentDate = new Date("2026-07-31");

    const filteredGroups = userGroups.filter((group) => {
        const groupDate = new Date(group.startDate);
        return groupDate >= currentDate;
    }).slice(0, GROUPS_LIMIT);

    return (
        <div className="relative z-10 flex w-full flex-col overflow-hidden rounded-3xl border border-black/10 bg-white p-5 shadow-[0_8px_30px_rgba(0,0,0,0.06)]">

            {/* TÍTULO DE LA SECCIÓN Y BOTÓN CREATE */}
            <div className="mb-4 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                    <Sparkles size={20} className="text-[#8C6CFF]" />
                    <h3 className="text-xl font-bold text-black/90">
                        Your next groups
                    </h3>
                </div>
                <div className="flex justify-end">
                    <Link href={"/create"}>
                        <Button
                            tone="dark"
                            className="px-6 py-2"
                            textClassName="text-xs sm:text-sm"
                        >
                            Create group
                        </Button>
                    </Link>
                </div>
            </div>

            {/* SEPARADOR */}
            <div className="mb-4 h-px w-full bg-black/5" />

            {/* RENDERIZADO CONDICIONAL */}
            {filteredGroups.length > 0 ? (

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
                    {filteredGroups.map((group, index) => (
                        <div
                            key={group.id}
                            className={`relative shrink-0 snap-center w-[220px] flex flex-col ${hasDragged ? "pointer-events-none" : ""
                                }`}
                        >
                            {index === 0 && (
                                <div className="absolute top-3 right-3 z-20 flex items-center gap-1 rounded-full border border-white/20 bg-gradient-to-r from-[#FFB199] to-[#FF7A59] px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white shadow-[0_4px_10px_rgba(255,122,89,0.4)]">
                                    <Timer size={12} />
                                    <span>Soon</span>
                                </div>
                            )}

                            <div className="flex h-full flex-col [&>*]:h-full">
                                <ProfileGroupCard group={group} />
                            </div>
                        </div>
                    ))}

                    {/* BOTÓN AL FINAL DEL CARRUSEL */}
                    <div className="flex shrink-0 snap-center items-center justify-center pr-4">
                        <Link href="/profile#group_section">
                            <Button
                                tone="dark"
                                className="px-8 py-3"
                                textClassName="text-sm whitespace-nowrap"
                            >
                                All my groups
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
                        Create an group or join one and have fun!
                    </p>
                </div>

            )}

        </div>
    );
}