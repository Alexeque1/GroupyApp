"use client";

import { useState, useMemo } from "react";
import { Crown, Users, ChevronDown, SearchX, Search, ArrowUpDown, X } from "lucide-react";

import ProfileGroupCard, { GroupType } from "./profile-groups-cards";
import ProfileSectionGrid from "./profile-section-grid";
import PaginationControls from "../ui/pagination-controls";
import { GROUPS_DATA } from "@/lib/mock_data/group-data";
import { paginate } from "@/lib/pagination";

type SortBy = "newest" | "oldest" | "title";

const ITEMS_PER_PAGE = 6;

// El usuario administra los grupos donde es owner o admin.
const isManaged = (group: GroupType) =>
    group.role === "owner" || group.role === "admin";

// Bloque de grupos con su propia paginación independiente, acordeón y filtros aplicados
function GroupBlock({
    icon,
    label,
    items,
    defaultOpen = true,
}: {
    icon: React.ReactNode;
    label: string;
    items: GroupType[];
    defaultOpen?: boolean;
}) {
    const [isOpen, setIsOpen] = useState(defaultOpen);
    const [internalPage, setInternalPage] = useState(1);

    const { pageItems, totalPages, safePage } = paginate(
        items,
        internalPage,
        ITEMS_PER_PAGE
    );

    return (
        <section className="flex flex-col rounded-3xl border border-black/10 bg-white p-5 shadow-sm transition-shadow hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
            {/* HEADER INTERACTIVO */}
            <button 
                onClick={() => setIsOpen((prev) => !prev)}
                className="flex w-full items-center justify-between cursor-pointer"
            >
                <div className="flex items-center gap-2">
                    {icon}
                    <h4 className="text-sm font-bold uppercase tracking-wider text-black/70">
                        {label}
                    </h4>
                    <span className="rounded-full bg-black/5 px-2 py-0.5 text-xs font-semibold text-black/50">
                        {items.length}
                    </span>
                </div>
                
                <ChevronDown
                    size={20}
                    className={`text-black/40 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                    }`}
                />
            </button>

            {/* CONTENEDOR COLAPSABLE */}
            <div 
                className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
            >
                <div className="overflow-hidden">
                    <div className="mt-5 flex flex-col gap-4">
                        {items.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-8 text-center bg-black/[0.02] rounded-2xl border border-dashed border-black/10">
                                <SearchX size={24} className="text-black/30 mb-2" />
                                <p className="text-xs font-medium text-black/50">No groups match your filters</p>
                            </div>
                        ) : (
                            <>
                                <ProfileSectionGrid
                                    items={pageItems}
                                    renderItem={(group) => <ProfileGroupCard key={group.id} group={group} />}
                                />

                                {/* CONTROLES DE PAGINACIÓN INTERNOS DEL BLOQUE */}
                                {totalPages > 1 && (
                                    <div className="mt-2 pt-2 border-t border-black/5">
                                        <PaginationControls
                                            page={safePage}
                                            totalPages={totalPages}
                                            onChange={setInternalPage}
                                            size="sm"
                                        />
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default function ProfileSectionGroups() {
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState<string>("all");
    const [categoryFilter, setCategoryFilter] = useState<string>("all");
    const [sortBy, setSortBy] = useState<SortBy>("newest");

    // Opciones de filtro derivadas de la data (no hardcodeadas)
    const categories = useMemo(
        () => Array.from(new Set(GROUPS_DATA.map((g) => g.category))),
        []
    );
    const statuses = useMemo(
        () => Array.from(new Set(GROUPS_DATA.map((g) => g.status))),
        []
    );

    // Filtrado avanzado (Búsqueda por título, estado, categoría y ordenamiento por fecha de inicio o título)
    const filteredGroups = useMemo(() => {
        return GROUPS_DATA.filter((group) => {
            // Filtro por búsqueda de texto (título)
            const matchesSearch = 
                group.title.toLowerCase().includes(searchQuery.toLowerCase());

            // Filtro por estado (status: "Upcoming", "Active", etc.)
            const matchesStatus = statusFilter === "all" || group.status === statusFilter;

            // Filtro por categoría (category: "Meetings", "Nature", etc.)
            const matchesCategory = categoryFilter === "all" || group.category === categoryFilter;

            return matchesSearch && matchesStatus && matchesCategory;
        }).sort((a, b) => {
            if (sortBy === "title") {
                return a.title.localeCompare(b.title);
            }
            
            // Convertir startDate ("Aug 2, 2026") a objeto Date para ordenar correctamente por fecha
            const dateA = new Date(a.startDate).getTime();
            const dateB = new Date(b.startDate).getTime();

            return sortBy === "newest" ? dateB - dateA : dateA - dateB;
        });
    }, [searchQuery, statusFilter, categoryFilter, sortBy]);

    // Separar los grupos filtrados en Managing y Joined
    const managed = filteredGroups.filter(isManaged);
    const joined = filteredGroups.filter((group) => !isManaged(group));

    const handleClearFilters = () => {
        setSearchQuery("");
        setStatusFilter("all");
        setCategoryFilter("all");
        setSortBy("newest");
    };

    const hasActiveFilters = searchQuery !== "" || statusFilter !== "all" || categoryFilter !== "all" || sortBy !== "newest";

    return (
        <div className="flex flex-col gap-6">
            {/* BARRA DE BÚSQUEDA Y FILTROS */}
            <div className="flex flex-col gap-3 rounded-3xl border border-black/10 bg-white p-4 shadow-sm">
                <div className="flex flex-col lg:flex-row items-center gap-3">
                    {/* Input de Búsqueda por Título */}
                    <div className="relative flex-1 w-full">
                        <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-black/40" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search groups by title..."
                            className="w-full rounded-2xl border border-black/10 bg-black/[0.02] pl-10 pr-4 py-2.5 text-sm text-black outline-none transition-all placeholder:text-black/40 focus:border-[#6D28D9]/40 focus:bg-white focus:ring-2 focus:ring-[#6D28D9]/10"
                        />
                        {searchQuery && (
                            <button 
                                onClick={() => setSearchQuery("")}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-black/40 hover:text-black cursor-pointer"
                            >
                                <X size={15} />
                            </button>
                        )}
                    </div>

                    {/* Contenedor de Selects de Filtros */}
                    <div className="flex flex-col sm:flex-row flex-wrap items-center gap-2 w-full lg:w-auto">
                        {/* Filtro por Estado */}
                        <div className="relative w-[100%] flex-1 sm:w-36">
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="w-full appearance-none rounded-2xl border border-black/10 bg-black/[0.02] px-4 py-2.5 pr-8 text-sm text-black outline-none transition-all cursor-pointer focus:border-[#6D28D9]/40 focus:bg-white"
                            >
                                <option value="all">All statuses</option>
                                {statuses.map((status) => (
                                    <option key={status} value={status}>{status}</option>
                                ))}
                            </select>
                            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-black/40 pointer-events-none" />
                        </div>

                        {/* Filtro por Categoría */}
                        <div className="relative w-[100%] flex-1 sm:w-36">
                            <select
                                value={categoryFilter}
                                onChange={(e) => setCategoryFilter(e.target.value)}
                                className="w-full appearance-none rounded-2xl border border-black/10 bg-black/[0.02] px-4 py-2.5 pr-8 text-sm text-black outline-none transition-all cursor-pointer focus:border-[#6D28D9]/40 focus:bg-white"
                            >
                                <option value="all">All categories</option>
                                {categories.map((cat) => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-black/40 pointer-events-none" />
                        </div>

                        {/* Ordenamiento por Fecha / Título */}
                        <div className="relative w-[100%] flex-1 sm:w-36">
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value as SortBy)}
                                className="w-full appearance-none rounded-2xl border border-black/10 bg-black/[0.02] px-4 py-2.5 pr-8 text-sm text-black outline-none transition-all cursor-pointer focus:border-[#6D28D9]/40 focus:bg-white"
                            >
                                <option value="newest">Newest date</option>
                                <option value="oldest">Oldest date</option>
                                <option value="title">Alphabetical</option>
                            </select>
                            <ArrowUpDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-black/40 pointer-events-none" />
                        </div>
                    </div>
                </div>

                {/* Indicador de filtros activos */}
                {hasActiveFilters && (
                    <div className="flex items-center justify-between pt-2 border-t border-black/5 px-1">
                        <span className="text-xs text-black/50">
                            Showing filtered groups
                        </span>
                        <button
                            onClick={handleClearFilters}
                            className="text-xs font-semibold text-[#6D28D9] hover:underline cursor-pointer"
                        >
                            Clear filters
                        </button>
                    </div>
                )}
            </div>

            {/* LISTADO DE BLOQUES (Managing / Joined) */}
            {managed.length === 0 && joined.length === 0 ? (
                <div className="flex min-h-[300px] flex-col items-center justify-center rounded-3xl border border-black/10 bg-black/5 p-6 text-center">
                    <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-black/5">
                        <SearchX size={32} className="text-black/40" />
                    </div>
                    <h3 className="text-sm font-semibold text-black/60">
                        No groups found
                    </h3>
                    <p className="mt-1 text-xs text-black/50">
                        Try adjusting your search query or filters.
                    </p>
                </div>
            ) : (
                <div className="flex flex-col gap-6">
                    {managed.length > 0 && (
                        <GroupBlock
                            icon={<Crown size={18} className="text-[#6D28D9]" />}
                            label="Managing"
                            items={managed}
                            defaultOpen={true}
                        />
                    )}

                    {joined.length > 0 && (
                        <GroupBlock
                            icon={<Users size={18} className="text-black/50" />}
                            label="Joined"
                            items={joined}
                            defaultOpen={true}
                        />
                    )}
                </div>
            )}
        </div>
    );
}