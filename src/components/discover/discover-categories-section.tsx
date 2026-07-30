"use client";

import { useState } from "react";
import { LayoutGrid, PartyPopper, Mic2, Trees, Handshake, Palette, Dumbbell } from "lucide-react";
import DiscoverCategoryCard, {CategoryType} from "./discover-categories-cards";

// Mover los datos aquí (o a un archivo externo de constantes) tiene más sentido
const CATEGORIES: CategoryType[] = [
    { id: 1, name: "Party", icon: PartyPopper, bg: "bg-pink-500/15", text: "text-pink-600", solid: "bg-pink-500" },
    { id: 2, name: "Concerts", icon: Mic2, bg: "bg-[#8C6CFF]/15", text: "text-[#6D28D9]", solid: "bg-[#8C6CFF]" }, // Morado de la marca
    { id: 3, name: "Nature", icon: Trees, bg: "bg-[#059669]/15", text: "text-[#059669]", solid: "bg-[#059669]" }, // Verde de la marca
    { id: 4, name: "Meetings", icon: Handshake, bg: "bg-blue-500/15", text: "text-blue-600", solid: "bg-blue-500" },
    { id: 5, name: "Hobbies", icon: Palette, bg: "bg-[#EA580C]/15", text: "text-[#EA580C]", solid: "bg-[#EA580C]" }, // Naranja de la marca
    { id: 6, name: "Fitness", icon: Dumbbell, bg: "bg-rose-500/15", text: "text-rose-600", solid: "bg-rose-500" },
];

export default function DiscoverCategoriesSection() {
    const [activeCategory, setActiveCategory] = useState<number>(1);

    return (
        <section className="relative z-10 flex w-full flex-col rounded-3xl border border-black/10 bg-white p-5 shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
            
            {/* ENCABEZADO */}
            <div className="mb-4 flex items-center justify-between px-1">
                <div className="flex items-center gap-2">
                    <LayoutGrid size={22} className="text-[#8C6CFF]" />
                    <h2 className="text-xl font-bold text-black/90">
                        Explore Categories
                    </h2>
                </div>
                {/* SearchBar futura */}
            </div>

            <div className="mb-5 h-px w-full bg-black/5" />

            {/* CONTROL DE LAYOUT: Aquí dictamos que las cards se vean en fila y con scroll */}
            <div className="flex pl-[10px] pb-[20px] w-full flex-nowrap gap-2.5 overflow-x-auto pb-2 pt-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">

                {CATEGORIES.map((cat) => (
                    <DiscoverCategoryCard
                        key={cat.id}
                        category={cat}
                        isActive={activeCategory === cat.id}
                        onClick={() => setActiveCategory(cat.id)}
                    />
                ))}

                <div className="w-1 shrink-0" />
            </div>

            {/* ÁREA DINÁMICA */}
            <div className="mt-6 flex min-h-[300px] w-full flex-col items-center justify-center rounded-3xl bg-black/5 p-6 border border-black/10 text-center">
                <h3 className="text-lg font-bold text-black/40">
                    Category ID: {activeCategory}
                </h3>
            </div>

        </section>
    );
}