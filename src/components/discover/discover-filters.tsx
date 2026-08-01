"use client";

import { Calendar, Users, ChevronDown, X, Search, Tag } from "lucide-react";

interface DiscoverFiltersProps {
    searchQuery: string;
    setSearchQuery: (val: string) => void;
    timeFilter: string;
    setTimeFilter: (val: string) => void;
    capacityFilter: string;
    setCapacityFilter: (val: string) => void;
    categoryFilter?: string;
    setCategoryFilter?: (val: string) => void;
    categories?: string[];
    className?: string;
}

export default function DiscoverFilters({
    searchQuery = "",
    setSearchQuery,
    timeFilter = "all",
    setTimeFilter,
    capacityFilter = "all",
    setCapacityFilter,
    categoryFilter = "all",
    setCategoryFilter,
    categories = [],
    className,
}: DiscoverFiltersProps) {
    
    // Contamos filtros activos
    const activeCount =
        (searchQuery !== "" ? 1 : 0) +
        (timeFilter !== "all" ? 1 : 0) +
        (capacityFilter !== "all" ? 1 : 0) +
        (categoryFilter !== "all" ? 1 : 0);

    // Limpieza segura utilizando optional chaining (?.)
    const handleClearFilters = () => {
        setSearchQuery?.("");
        setTimeFilter?.("all");
        setCapacityFilter?.("all");
        setCategoryFilter?.("all");
    };

    // Funciones auxiliares para manejar los estilos visuales activos vs inactivos
    const getSelectStyles = (isActive: boolean) => {
        return isActive 
            ? "border-[#6D28D9]/40 bg-white text-black ring-2 ring-[#6D28D9]/10" 
            : "border-black/10 bg-black/[0.02] text-black hover:bg-white focus:border-[#6D28D9]/40 focus:bg-white focus:ring-2 focus:ring-[#6D28D9]/10";
    };

    const getIconColor = (isActive: boolean) => {
        return isActive ? "text-[#6D28D9]" : "text-black/40";
    };

    return (
        <div className={`flex flex-col gap-3 rounded-3xl border border-black/10 bg-white p-4 shadow-sm ${className || ""}`}>
            <div className="flex flex-col lg:flex-row items-center gap-3">
                
                {/* BÚSQUEDA POR TÍTULO */}
                <div className="relative flex-1 w-full">
                    <Search size={18} className={`absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none transition-colors ${getIconColor(searchQuery !== "")}`} />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery?.(e.target.value)}
                        placeholder="Search groups by title..."
                        className={`w-full rounded-2xl border pl-10 pr-9 py-2.5 text-sm outline-none transition-all placeholder:text-black/40 ${getSelectStyles(searchQuery !== "")}`}
                    />
                    {searchQuery && (
                        <button 
                            type="button"
                            onClick={() => setSearchQuery?.("")}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-black/40 hover:text-black cursor-pointer"
                        >
                            <X size={15} />
                        </button>
                    )}
                </div>

                {/* CONTENEDOR DE SELECTS */}
                <div className="flex flex-col sm:flex-row flex-wrap items-center gap-2 w-full lg:w-auto">
                    
                    {/* Filtro por Tiempo */}
                    <div className="relative w-full flex-1 sm:w-40">
                        <Calendar size={16} className={`absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none transition-colors ${getIconColor(timeFilter !== "all")}`} />
                        <select
                            value={timeFilter}
                            onChange={(e) => setTimeFilter?.(e.target.value)}
                            className={`w-full appearance-none rounded-2xl pl-10 pr-8 py-2.5 text-sm outline-none transition-all cursor-pointer ${getSelectStyles(timeFilter !== "all")}`}
                        >
                            <option value="all">Any time</option>
                            <option value="today_week">Today / This week</option>
                            <option value="this_month">This month</option>
                            <option value="upcoming">Upcoming</option>
                        </select>
                        <ChevronDown size={14} className={`absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none transition-colors ${getIconColor(timeFilter !== "all")}`} />
                    </div>

                    {/* Filtro por Capacidad */}
                    <div className="relative w-full flex-1 sm:w-40">
                        <Users size={16} className={`absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none transition-colors ${getIconColor(capacityFilter !== "all")}`} />
                        <select
                            value={capacityFilter}
                            onChange={(e) => setCapacityFilter?.(e.target.value)}
                            className={`w-full appearance-none rounded-2xl pl-10 pr-8 py-2.5 text-sm outline-none transition-all cursor-pointer ${getSelectStyles(capacityFilter !== "all")}`}
                        >
                            <option value="all">Any capacity</option>
                            <option value="small">Small (1 - 5)</option>
                            <option value="medium">Medium (6 - 15)</option>
                            <option value="large">Large (15+)</option>
                        </select>
                        <ChevronDown size={14} className={`absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none transition-colors ${getIconColor(capacityFilter !== "all")}`} />
                    </div>

                    {/* Filtro por Categoría (Opcional) */}
                    {categories.length > 0 && (
                        <div className="relative w-full flex-1 sm:w-40">
                            <Tag size={16} className={`absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none transition-colors ${getIconColor(categoryFilter !== "all")}`} />
                            <select
                                value={categoryFilter}
                                onChange={(e) => setCategoryFilter?.(e.target.value)}
                                className={`w-full appearance-none rounded-2xl pl-10 pr-8 py-2.5 text-sm outline-none transition-all cursor-pointer ${getSelectStyles(categoryFilter !== "all")}`}
                            >
                                <option value="all">All categories</option>
                                {categories.map((cat) => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                            <ChevronDown size={14} className={`absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none transition-colors ${getIconColor(categoryFilter !== "all")}`} />
                        </div>
                    )}
                </div>
            </div>

            {/* BARRA INFERIOR: Indicador de filtros activos */}
            {activeCount > 0 && (
                <div className="flex items-center justify-between pt-2 border-t border-black/5 px-1">
                    <span className="text-xs text-black/50">
                        Showing filtered groups
                    </span>
                    <button
                        type="button"
                        onClick={handleClearFilters}
                        className="text-xs font-semibold text-[#6D28D9] hover:underline cursor-pointer"
                    >
                        Clear filters ({activeCount})
                    </button>
                </div>
            )}
        </div>
    );
}