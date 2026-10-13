"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Crown, Users, SearchX, ArrowUpDown, User } from "lucide-react";

import ProfileEventCard, { type ProfileEvent } from "./profile-events-cards";
import ProfileSectionGrid from "./profile-section-grid";
import PaginationControls from "../ui/pagination-controls";
import { FilterEmptyState, FilterPopover, FilterSearch, FilterSelect } from "../ui/filter-popover";
import { paginate } from "@/lib/pagination";
import { getEventStatus } from "@/lib/event-status";

type SortBy = "newest" | "oldest" | "title";
type EventsTab = "hosting" | "joined";

const ITEMS_PER_PAGE = 6;

const isManaged = (event: ProfileEvent) =>
    event.role === "owner" || event.role === "admin";

export default function ProfileSectionEvents({
    events,
    isOwnProfile,
    profileName,
    profileUsername
}: {
    events: ProfileEvent[];
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

                <FilterPopover hasActiveFilters={hasActiveFilters} onClear={handleClearFilters}>
                    <FilterSearch value={searchQuery} onChange={setSearchQuery} placeholder="Search events by title..." />
                    <FilterSelect
                        value={creatorFilter}
                        onChange={setCreatorFilter}
                        icon={User}
                        ariaLabel="Filter by creator"
                        options={[
                            { value: "all", label: "Any creator" },
                            { value: "owner", label: creatorLabel },
                            { value: "others", label: "Created by others" },
                        ]}
                    />
                    <FilterSelect
                        value={statusFilter}
                        onChange={setStatusFilter}
                        ariaLabel="Filter by status"
                        options={[{ value: "all", label: "All statuses" }, ...statuses.map((s) => ({ value: s, label: s }))]}
                    />
                    <FilterSelect
                        value={categoryFilter}
                        onChange={setCategoryFilter}
                        ariaLabel="Filter by category"
                        options={[{ value: "all", label: "All categories" }, ...categories.map((c) => ({ value: c, label: c }))]}
                    />
                    <FilterSelect
                        value={sortBy}
                        onChange={setSortBy}
                        icon={ArrowUpDown}
                        ariaLabel="Sort by"
                        options={[
                            { value: "newest", label: "Newest date" },
                            { value: "oldest", label: "Oldest date" },
                            { value: "title", label: "Alphabetical" },
                        ]}
                    />
                </FilterPopover>
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
                        <FilterEmptyState
                            icon={SearchX}
                            title="No events found"
                            description="Try adjusting your search query or filters."
                        />
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
