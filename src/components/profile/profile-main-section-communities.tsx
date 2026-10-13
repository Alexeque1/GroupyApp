"use client";

import { useMemo, useState } from "react";
import { ArrowUpDown, SearchX } from "lucide-react";
import ProfileCommunityCard, { CommunityType } from "./profile-communities-cards";
import ProfileSectionGrid from "./profile-section-grid";
import { FilterEmptyState, FilterPopover, FilterSearch, FilterSelect } from "../ui/filter-popover";
import { parseMemberCount } from "@/lib/numbers";

type SortBy = "name-asc" | "name-desc" | "members";

export default function ProfileSectionCommunities({ communities }: { communities: CommunityType[] }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [categoryFilter, setCategoryFilter] = useState<string>("all");
    const [statusFilter, setStatusFilter] = useState<string>("all");
    const [sortBy, setSortBy] = useState<SortBy>("name-asc");

    // Opciones de filtro derivadas de la data
    const categories = useMemo(
        () => Array.from(new Set(communities.map((c) => c.category))),
        [communities]
    );
    const statuses = useMemo(
        () => Array.from(new Set(communities.map((c) => c.status))),
        [communities]
    );

    const filteredCommunities = useMemo(() => {
        return communities
            .filter((community) => {
                const matchesSearch = community.title.toLowerCase().includes(searchQuery.toLowerCase());
                const matchesCategory = categoryFilter === "all" || community.category === categoryFilter;
                const matchesStatus = statusFilter === "all" || community.status === statusFilter;

                return matchesSearch && matchesCategory && matchesStatus;
            })
            .sort((a, b) => {
                if (sortBy === "members") {
                    return parseMemberCount(b.members) - parseMemberCount(a.members);
                }
                return sortBy === "name-asc"
                    ? a.title.localeCompare(b.title)
                    : b.title.localeCompare(a.title);
            });
    }, [communities, searchQuery, categoryFilter, statusFilter, sortBy]);

    const handleClearFilters = () => {
        setSearchQuery("");
        setCategoryFilter("all");
        setStatusFilter("all");
        setSortBy("name-asc");
    };

    const hasActiveFilters = searchQuery !== "" || categoryFilter !== "all" || statusFilter !== "all" || sortBy !== "name-asc";

    return (
        <div className="flex flex-col gap-6">
            {/* CONTADOR + BOTÓN DE FILTROS */}
            <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="text-sm font-semibold text-black/60">
                    {hasActiveFilters
                        ? `${filteredCommunities.length} of ${communities.length} communities`
                        : `${communities.length} communities`}
                </span>

                <FilterPopover hasActiveFilters={hasActiveFilters} onClear={handleClearFilters}>
                    <FilterSearch value={searchQuery} onChange={setSearchQuery} placeholder="Search communities by name..." />
                    <FilterSelect
                        value={categoryFilter}
                        onChange={setCategoryFilter}
                        ariaLabel="Filter by category"
                        options={[{ value: "all", label: "All categories" }, ...categories.map((c) => ({ value: c, label: c }))]}
                    />
                    <FilterSelect
                        value={statusFilter}
                        onChange={setStatusFilter}
                        ariaLabel="Filter by privacy"
                        options={[{ value: "all", label: "Public & private" }, ...statuses.map((s) => ({ value: s, label: s }))]}
                    />
                    <FilterSelect
                        value={sortBy}
                        onChange={setSortBy}
                        icon={ArrowUpDown}
                        ariaLabel="Sort by"
                        options={[
                            { value: "name-asc", label: "Alphabetical (A-Z)" },
                            { value: "name-desc", label: "Alphabetical (Z-A)" },
                            { value: "members", label: "Most members" },
                        ]}
                    />
                </FilterPopover>
            </div>

            {filteredCommunities.length === 0 ? (
                <FilterEmptyState
                    icon={SearchX}
                    title="No communities found"
                    description={communities.length === 0
                        ? "This user hasn't joined any communities yet."
                        : "Try adjusting your search query or filters."}
                />
            ) : (
                <ProfileSectionGrid
                    items={filteredCommunities}
                    renderItem={(community) => <ProfileCommunityCard community={community} />}
                />
            )}
        </div>
    );
}
