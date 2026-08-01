"use client";

import { Calendar, Users, ChevronDown, X } from "lucide-react";

interface DiscoverFiltersProps {
    dateFilter: string;
    setDateFilter: (val: string) => void;
    capacityFilter: string;
    setCapacityFilter: (val: string) => void;
    className?: string; 
}

// Pill de filtro reutilizable: ícono + select nativo + chevron, con estado activo.
function FilterPill({
    icon: Icon,
    value,
    onChange,
    children,
}: {
    icon: typeof Calendar;
    value: string;
    onChange: (val: string) => void;
    children: React.ReactNode;
}) {
    const isActive = value !== "all";

    return (
        <div className="relative">
            <Icon
                size={14}
                className={`absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none transition-colors ${
                    isActive ? "text-[#6D28D9]" : "text-black/40"
                }`}
            />
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className={`h-9 cursor-pointer appearance-none rounded-full border pl-9 pr-8 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-[#8C6CFF]/40 ${
                    isActive
                        ? "border-[#8C6CFF]/40 bg-[#8C6CFF]/10 text-[#6D28D9]"
                        : "border-black/10 bg-black/5 text-black/70 hover:bg-black/10"
                }`}
            >
                {children}
            </select>
            <ChevronDown
                size={14}
                className={`absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none transition-colors ${
                    isActive ? "text-[#6D28D9]" : "text-black/40"
                }`}
            />
        </div>
    );
}

export default function DiscoverFilters({
    dateFilter,
    setDateFilter,
    capacityFilter,
    setCapacityFilter,
    className
}: DiscoverFiltersProps) {
    const activeCount =
        (dateFilter !== "all" ? 1 : 0) + (capacityFilter !== "all" ? 1 : 0);

    return (
        <div className={`flex flex-wrap items-center gap-2 pt-2 pb-4 ${className}`}>
            <FilterPill icon={Calendar} value={dateFilter} onChange={setDateFilter}>
                <option value="all">Any time</option>
                <option value="today">Today / This week</option>
                <option value="month">This month</option>
                <option value="upcoming">Upcoming</option>
            </FilterPill>

            <FilterPill
                icon={Users}
                value={capacityFilter}
                onChange={setCapacityFilter}
            >
                <option value="all">Any capacity</option>
                <option value="small">Small (1 - 5)</option>
                <option value="medium">Medium (6 - 15)</option>
                <option value="large">Large (15+)</option>
            </FilterPill>

            {/* CLEAR: solo cuando hay algún filtro activo */}
            {activeCount > 0 && (
                <button
                    onClick={() => {
                        setDateFilter("all");
                        setCapacityFilter("all");
                    }}
                    className="flex h-9 items-center gap-1 rounded-full px-3 text-xs font-semibold text-black/50 transition-colors hover:bg-black/5 hover:text-black/80"
                >
                    <X size={13} />
                    Clear ({activeCount})
                </button>
            )}
        </div>
    );
}
