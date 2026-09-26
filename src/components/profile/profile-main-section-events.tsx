"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Crown, Users, ChevronDown, SearchX, Search, ArrowUpDown, X, User, Filter } from "lucide-react";

import ProfileEventCard, { EventType } from "./profile-events-cards";
import ProfileSectionGrid from "./profile-section-grid";
import PaginationControls from "../ui/pagination-controls";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { paginate } from "@/lib/pagination";
import { getEventStatus } from "@/lib/event-status";

type SortBy = "newest" | "oldest" | "title";
type EventsTab = "hosting" | "joined";

const ITEMS_PER_PAGE = 6;

const isManaged = (event: EventType) =>
    event.role === "owner" || event.role === "admin";

export default function ProfileSectionEvents({
    events,
    isOwnProfile,
    profileName,
    profileUsername
}: {
    events: EventType[];
    isOwnProfile: boolean;
    profileName: string;
    profileUsername: string;
}) {
    const [activeTab, setActiveTab] = useState<EventsTab>("hosting");
    const [page, setPage] = useState(1);

    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState<string>("all");
    const [categoryFilter, setCategoryFilter] = useState<string>("all");
    const [creatorFilter, setCreatorFilter] = useState<string>("all");
    const [sortBy, setSortBy] = useState<SortBy>("newest");

    // Opciones de filtro derivadas de la data
    const categories = useMemo(
        () => Array.from(new Set(events.map((g) => g.category))),
        [events]
    );
    const statuses = useMemo(
        () => Array.from(new Set(events.map((g) => getEventStatus(g.startDate)))),
        [events]
    );

    const creatorLabel = isOwnProfile ? "Created by me" : `Created by ${profileName}`;

    {/* FILTRADO Y ORDENAMIENTO DE EVENTOS */}
    const filteredEvents = useMemo(() => {
        return events.filter((event) => {

            const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesStatus = statusFilter === "all" || getEventStatus(event.startDate) === statusFilter;
            const matchesCategory = categoryFilter === "all" || event.category === categoryFilter;

            {/* FILTRO POR CREADOR (USANDO EL USERNAME ÚNICO) */}
            const matchesCreator =
                creatorFilter === "all" ||
                (creatorFilter === "owner" && event.ownerUsername === profileUsername) ||
                (creatorFilter === "others" && event.ownerUsername !== profileUsername);

            return matchesSearch && matchesStatus && matchesCategory && matchesCreator;

        }).sort((a, b) => {
            if (sortBy === "title") {
                return a.title.localeCompare(b.title);
            }

            const dateA = new Date(a.startDate).getTime();
            const dateB = new Date(b.startDate).getTime();

            return sortBy === "newest" ? dateB - dateA : dateA - dateB;
        });
    }, [events, searchQuery, statusFilter, categoryFilter, creatorFilter, sortBy, profileUsername]);

    const managed = filteredEvents.filter(isManaged);
    const joined = filteredEvents.filter((event) => !isManaged(event));
    const activeItems = activeTab === "hosting" ? managed : joined;

    const { pageItems, totalPages, safePage } = paginate(activeItems, page, ITEMS_PER_PAGE);

    // Cualquier cambio de tab o de filtros vuelve a la página 1
    // (se ajusta durante el render, como recomienda la doc de React, en vez de usar un useEffect)
    const filtersKey = [activeTab, searchQuery, statusFilter, categoryFilter, creatorFilter, sortBy].join("|");
    const [prevFiltersKey, setPrevFiltersKey] = useState(filtersKey);
    if (prevFiltersKey !== filtersKey) {
        setPrevFiltersKey(filtersKey);
        setPage(1);
    }

    const handleClearFilters = () => {
        setSearchQuery("");
        setStatusFilter("all");
        setCategoryFilter("all");
        setCreatorFilter("all");
        setSortBy("newest");
    };

    const hasActiveFilters = searchQuery !== "" || statusFilter !== "all" || categoryFilter !== "all" || creatorFilter !== "all" || sortBy !== "newest";

    return (
        <div className="flex flex-col gap-6">
            {/* TABS + BOTÓN DE FILTROS */}
            <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-1 rounded-2xl bg-black/5 p-1">
                    <button
                        type="button"
                        onClick={() => setActiveTab("hosting")}
                        className={`relative flex cursor-pointer items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-semibold transition-colors ${activeTab === "hosting" ? "text-black" : "text-black/50 hover:text-black/70"
                            }`}
                    >
                        {activeTab === "hosting" && (
                            <motion.div
                                layoutId="events-subtab-pill"
                                className="absolute inset-0 rounded-xl bg-white shadow-sm"
                                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                            />
                        )}
                        <span className="relative z-10 flex items-center gap-1.5">
                            <Crown size={14} className={activeTab === "hosting" ? "text-brand-purple-deep" : "text-black/40"} />
                            Hosting
                            <span className={`rounded-full px-1.5 py-0.5 text-xs font-bold ${activeTab === "hosting" ? "bg-brand-purple-deep/10 text-brand-purple-deep" : "bg-black/10 text-black/40"
                                }`}>
                                {managed.length}
                            </span>
                        </span>
                    </button>

                    <button
                        type="button"
                        onClick={() => setActiveTab("joined")}
                        className={`relative flex cursor-pointer items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-semibold transition-colors ${activeTab === "joined" ? "text-black" : "text-black/50 hover:text-black/70"
                            }`}
                    >
                        {activeTab === "joined" && (
                            <motion.div
                                layoutId="events-subtab-pill"
                                className="absolute inset-0 rounded-xl bg-white shadow-sm"
                                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                            />
                        )}
                        <span className="relative z-10 flex items-center gap-1.5">
                            <Users size={14} className={activeTab === "joined" ? "text-brand-purple-deep" : "text-black/40"} />
                            Joined
                            <span className={`rounded-full px-1.5 py-0.5 text-xs font-bold ${activeTab === "joined" ? "bg-brand-purple-deep/10 text-brand-purple-deep" : "bg-black/10 text-black/40"
                                }`}>
                                {joined.length}
                            </span>
                        </span>
                    </button>
                </div>

                <Popover>
                    <PopoverTrigger className="relative flex cursor-pointer items-center gap-2 rounded-2xl border border-black/10 bg-white px-4 py-2.5 text-sm font-semibold text-black/70 shadow-sm transition-colors hover:bg-black/5">
                        <Filter size={15} />
                        Filter
                        {hasActiveFilters && (
                            <span className="h-1.5 w-1.5 rounded-full bg-brand-purple-deep" />
                        )}
                    </PopoverTrigger>

                    <PopoverContent align="end" className="w-80 border border-black/10 bg-white p-4 shadow-xl">
                        <div className="flex flex-col gap-3">
                            {/* BÚSQUEDA */}
                            <div className="relative w-full">
                                <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-black/40" />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search events by title..."
                                    className="w-full rounded-2xl border border-black/10 bg-black/[0.02] pl-10 pr-4 py-2.5 text-sm text-black outline-none transition-all placeholder:text-black/40 focus:border-brand-purple-deep/40 focus:bg-white focus:ring-2 focus:ring-brand-purple-deep/10"
                                />
                                {searchQuery && (
                                    <button
                                        type="button"
                                        onClick={() => setSearchQuery("")}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-black/40 hover:text-black"
                                    >
                                        <X size={15} />
                                    </button>
                                )}
                            </div>

                            {/* Filtro por Creador */}
                            <div className="relative w-full">
                                <select
                                    value={creatorFilter}
                                    onChange={(e) => setCreatorFilter(e.target.value)}
                                    className="w-full cursor-pointer appearance-none rounded-2xl border border-black/10 bg-black/[0.02] px-4 py-2.5 pr-8 text-sm text-black outline-none transition-all focus:border-brand-purple-deep/40 focus:bg-white"
                                >
                                    <option value="all">Any creator</option>
                                    <option value="owner">{creatorLabel}</option>
                                    <option value="others">Created by others</option>
                                </select>
                                <User size={14} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-black/40" />
                            </div>

                            {/* Filtro por Estado */}
                            <div className="relative w-full">
                                <select
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                    className="w-full cursor-pointer appearance-none rounded-2xl border border-black/10 bg-black/[0.02] px-4 py-2.5 pr-8 text-sm text-black outline-none transition-all focus:border-brand-purple-deep/40 focus:bg-white"
                                >
                                    <option value="all">All statuses</option>
                                    {statuses.map((status) => (
                                        <option key={status} value={status}>{status}</option>
                                    ))}
                                </select>
                                <ChevronDown size={14} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-black/40" />
                            </div>

                            {/* Filtro por Categoría */}
                            <div className="relative w-full">
                                <select
                                    value={categoryFilter}
                                    onChange={(e) => setCategoryFilter(e.target.value)}
                                    className="w-full cursor-pointer appearance-none rounded-2xl border border-black/10 bg-black/[0.02] px-4 py-2.5 pr-8 text-sm text-black outline-none transition-all focus:border-brand-purple-deep/40 focus:bg-white"
                                >
                                    <option value="all">All categories</option>
                                    {categories.map((cat) => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                                <ChevronDown size={14} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-black/40" />
                            </div>

                            {/* Ordenamiento */}
                            <div className="relative w-full">
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value as SortBy)}
                                    className="w-full cursor-pointer appearance-none rounded-2xl border border-black/10 bg-black/[0.02] px-4 py-2.5 pr-8 text-sm text-black outline-none transition-all focus:border-brand-purple-deep/40 focus:bg-white"
                                >
                                    <option value="newest">Newest date</option>
                                    <option value="oldest">Oldest date</option>
                                    <option value="title">Alphabetical</option>
                                </select>
                                <ArrowUpDown size={14} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-black/40" />
                            </div>

                            {hasActiveFilters && (
                                <button
                                    type="button"
                                    onClick={handleClearFilters}
                                    className="cursor-pointer rounded-2xl border border-black/10 py-2 text-xs font-semibold text-brand-purple-deep hover:bg-black/5"
                                >
                                    Clear filters
                                </button>
                            )}
                        </div>
                    </PopoverContent>
                </Popover>
            </div>

            {/* GRID + PAGINACIÓN DE LA TAB ACTIVA */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={`${activeTab}-${safePage}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                >
                    {activeItems.length === 0 ? (
                        <div className="flex min-h-[300px] flex-col items-center justify-center rounded-3xl border border-black/10 bg-black/5 p-6 text-center">
                            <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-black/5">
                                <SearchX size={32} className="text-black/40" />
                            </div>
                            <h3 className="text-sm font-semibold text-black/60">
                                No events found
                            </h3>
                            <p className="mt-1 text-xs text-black/50">
                                Try adjusting your search query or filters.
                            </p>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-6">
                            <ProfileSectionGrid
                                items={pageItems}
                                renderItem={(event) => <ProfileEventCard key={event.id} event={event} />}
                            />

                            <PaginationControls
                                page={safePage}
                                totalPages={totalPages}
                                onChange={setPage}
                            />
                        </div>
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
