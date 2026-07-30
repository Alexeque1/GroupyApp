"use client";

import { useRef, useState } from "react";
import { Sparkles, Users, Timer } from "lucide-react";
import ProfileGroupCard, { GroupType } from "../profile/profile-groups-cards";
import Button from "../ui/button";

export default function HomeNextGroups() {
    const carouselRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    const handleMouseDown = (e: React.MouseEvent) => {
        if (!carouselRef.current) return;
        setIsDragging(true);
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
        carouselRef.current.scrollLeft = scrollLeft - walk;
    };

    const GROUPS_DATA: GroupType[] = [
        {
            id: 1,
            title: "UX/UI Designers Arg",
            category: "Technology",
            members: "10/10",
            colorFrom: "from-[#8C6CFF]",
            colorTo: "to-[#C4B5FD]",
            image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=500&auto=format&fit=crop",
            startDate: "Oct 2023",
            owner: "Alex S.",
            status: "Active",
            statusClasses: "bg-[#A9FFD7]/30 text-[#059669] border-[#059669]/20",
        },
        {
            id: 2,
            title: "Weekend Trekking",
            category: "Sports",
            members: "5/8",
            colorFrom: "from-[#A9FFD7]",
            colorTo: "to-[#059669]",
            image: "https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=500&auto=format&fit=crop",
            startDate: "Jan 2024",
            owner: "Martín G.",
            status: "Completed",
            statusClasses: "bg-[#8C6CFF]/20 text-[#6D28D9] border-[#8C6CFF]/30",
        },
        {
            id: 3,
            title: "Specialty Coffee",
            category: "Gastronomy",
            members: "2/5",
            colorFrom: "from-[#FFB199]",
            colorTo: "to-[#EA580C]",
            image: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=500&auto=format&fit=crop",
            startDate: "Mar 2022",
            owner: "Lucía P.",
            status: "Inactive",
            statusClasses: "bg-[#FFB199]/30 text-[#EA580C] border-[#FFB199]/30",
        },
        {
            id: 4,
            title: "Night Photography",
            category: "Art",
            members: "2/No limit",
            colorFrom: "from-[#6D28D9]",
            colorTo: "to-[#8C6CFF]",
            image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=500&auto=format&fit=crop",
            startDate: "Aug 2025",
            owner: "Carlos M.",
            status: "Active",
            statusClasses: "bg-[#A9FFD7]/30 text-[#059669] border-[#059669]/20",
        }
    ];

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
                    <Button
                        tone="dark"
                        className="px-6 py-2"
                        textClassName="text-xs sm:text-sm"
                    >
                        Create group
                    </Button>
                </div>
            </div>

            {/* SEPARADOR */}
            <div className="mb-4 h-px w-full bg-black/5" />

            {/* RENDERIZADO CONDICIONAL: ¿Hay grupos o está vacío? */}
            {GROUPS_DATA.length > 0 ? (
                
                <div
                    ref={carouselRef}
                    onMouseDown={handleMouseDown}
                    onMouseLeave={handleMouseLeave}
                    onMouseUp={handleMouseUp}
                    onMouseMove={handleMouseMove}
                    className={`flex w-full flex-nowrap items-stretch gap-4 overflow-x-auto pb-4 pt-4 select-none [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${
                        isDragging ? "cursor-grabbing snap-none" : "cursor-grab snap-x snap-mandatory"
                    }`}
                >
                    {GROUPS_DATA.map((group, index) => (
                        <div
                            key={group.id}
                            className={`relative shrink-0 snap-center w-[220px] flex flex-col ${isDragging ? "pointer-events-none" : ""}`}
                        >
                            {/* DISTINTIVO DE PRÓXIMO EVENTO (Solo aparece si es el primero) */}
                            {index === 0 && (
                                <div className="absolute -top-3 -right-2 z-20 flex items-center gap-1 rounded-full border border-white/20 bg-gradient-to-r from-[#FFB199] to-[#FF7A59] px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white shadow-[0_4px_10px_rgba(255,122,89,0.4)]">
                                    <Timer size={12} />
                                    <span>Soon</span>
                                </div>
                            )}

                            {/* Contenedor interno que estira la tarjeta al 100% */}
                            <div className="flex h-full flex-col [&>*]:h-full">
                                <ProfileGroupCard group={group} />
                            </div>
                        </div>
                    ))}
                    
                    {/* BOTÓN AL FINAL DEL CARRUSEL */}
                    <div className="flex shrink-0 snap-center items-center justify-center pr-4">
                        <Button
                            tone="dark"
                            className="px-8 py-3"
                            textClassName="text-sm whitespace-nowrap"
                        >
                            All my groups
                        </Button>
                    </div>
                </div>

            ) : (
                
                <div className="flex flex-col items-center justify-center py-10 text-center">
                    <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-black/5">
                        <Users size={32} className="text-black/40" />
                    </div>
                    <p className="text-sm font-medium text-black/60">
                        You don't have any groups yet.
                    </p>
                    <p className="mt-1 text-xs text-black/60">
                        Create one to start collaborating with others!
                    </p>
                </div>

            )}

        </div>
    );
}