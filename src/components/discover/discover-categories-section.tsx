"use client";

import { useState } from "react";
import { LayoutGrid, Sparkles } from "lucide-react";
import DiscoverCategoryCard from "./discover-categories-cards";
import DiscoverFilters from "./discover-filters";
import { DISCOVER_CATEGORIES } from "@/lib/discover-categories";
import DiscoverGroups from "./discover-groups";

export default function DiscoverCategoriesSection() {
    // null = "All" (sin categoría seleccionada)
    const [activeCategory, setActiveCategory] = useState<number | null>(null);

    // DISCOVER FILTERS
    const [dateFilter, setDateFilter] = useState<string>("all");
    const [capacityFilter, setCapacityFilter] = useState<string>("all");

    // PAGINATION STATE
    const [currentPage, setCurrentPage] = useState<number>(1);

    // Handlers que resetean la paginación a la página 1 cuando el usuario filtra o cambia de categoría
    const handleCategoryChange = (catId: number | null) => {
        setActiveCategory((prev) => (prev === catId ? null : catId));
        setCurrentPage(1);
    };

    const handleDateFilterChange = (value: string) => {
        setDateFilter(value);
        setCurrentPage(1);
    };

    const handleCapacityFilterChange = (value: string) => {
        setCapacityFilter(value);
        setCurrentPage(1);
    };

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

            {/* CHIPS DE CATEGORÍA */}
            <div className="flex pl-[10px] pb-[20px] w-full flex-nowrap gap-2.5 overflow-x-auto pt-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">

                {/* Chip "All" */}
                <button
                    onClick={() => handleCategoryChange(null)}
                    className={`group flex shrink-0 cursor-pointer items-center gap-2 rounded-full border px-4 py-2.5 transition-all duration-300 ${
                        activeCategory === null
                            ? "border-transparent bg-black text-white shadow-[0_8px_20px_rgba(0,0,0,0.12)] -translate-y-0.5"
                            : "border-black/10 bg-white hover:-translate-y-0.5 hover:border-black/20"
                    }`}
                >
                    <div
                        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
                            activeCategory === null ? "bg-white/20" : "bg-black/5"
                        }`}
                    >
                        <Sparkles
                            size={14}
                            className={activeCategory === null ? "text-white" : "text-black/60"}
                        />
                    </div>
                    <span
                        className={`whitespace-nowrap text-sm font-bold ${
                            activeCategory === null ? "text-white" : "text-black/70"
                        }`}
                    >
                        All
                    </span>
                </button>

                {DISCOVER_CATEGORIES.map((cat) => (
                    <DiscoverCategoryCard
                        key={cat.id}
                        category={cat}
                        isActive={activeCategory === cat.id}
                        // Volver a tocar la categoría activa la deselecciona (vuelve a "All")
                        onClick={() => handleCategoryChange(cat.id)}
                    />
                ))}

                <div className="w-1 shrink-0" />
            </div>

            <DiscoverFilters
                dateFilter={dateFilter}
                setDateFilter={handleDateFilterChange}
                capacityFilter={capacityFilter}
                setCapacityFilter={handleCapacityFilterChange}
                className="pl-[10px]"
            />

            {/* RESULTADOS Y PAGINACIÓN */}
            <div className="mt-6 w-full">
                <DiscoverGroups
                    categoryId={activeCategory}
                    dateFilter={dateFilter}
                    capacityFilter={capacityFilter}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
            </div>
        </section>
    );
}