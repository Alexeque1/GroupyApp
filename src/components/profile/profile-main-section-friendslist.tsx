"use client";

import { useState, useMemo } from "react";
import { SearchX, ArrowUpDown } from "lucide-react";
import FriendsCards, { FriendType } from "./profile-friends-cards";
import ProfileSectionGrid from "./profile-section-grid";
import { FilterEmptyState, FilterPopover, FilterSearch, FilterSelect } from "../ui/filter-popover";

type SortBy = "newest" | "name-asc" | "name-desc";
type StatusFilter = "all" | "online" | "offline";

interface ProfileSectionFriendsListProps {
    friends: FriendType[];
    currentUserId: number;
}

export default function ProfileSectionFriendsList({ friends, currentUserId }: ProfileSectionFriendsListProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
    const [sortBy, setSortBy] = useState<SortBy>("newest");

    const filteredFriends = useMemo(() => {
        return friends
            .filter((friend) => {
                const friendName = `${friend.name} ${friend.username}`.trim().toLowerCase();
                const matchesSearch = friendName.includes(searchQuery.toLowerCase());

                const friendStatus = friend.status ?? "offline";
                const matchesStatus = statusFilter === "all" || friendStatus === statusFilter;

                return matchesSearch && matchesStatus;
            })
            .sort((a, b) => {
                if (sortBy === "name-asc") {
                    return a.name.localeCompare(b.name);
                }
                if (sortBy === "name-desc") {
                    return b.name.localeCompare(a.name);
                }

                return 0;
            });
    }, [friends, searchQuery, statusFilter, sortBy]);

    const handleClearFilters = () => {
        setSearchQuery("");
        setStatusFilter("all");
        setSortBy("newest");
    };

    const hasActiveFilters = searchQuery !== "" || statusFilter !== "all" || sortBy !== "newest";

    return (
        <div className="flex flex-col gap-6">
            {/* CONTADOR + BOTÓN DE FILTROS */}
            <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="text-sm font-semibold text-black/60">
                    {hasActiveFilters
                        ? `${filteredFriends.length} of ${friends.length} friends`
                        : `${friends.length} friends`}
                </span>

                <FilterPopover hasActiveFilters={hasActiveFilters} onClear={handleClearFilters}>
                    <FilterSearch value={searchQuery} onChange={setSearchQuery} placeholder="Search friends by name..." />
                    <FilterSelect
                        value={statusFilter}
                        onChange={setStatusFilter}
                        ariaLabel="Filter by status"
                        options={[
                            { value: "all", label: "All statuses" },
                            { value: "online", label: "Online" },
                            { value: "offline", label: "Offline" },
                        ]}
                    />
                    <FilterSelect
                        value={sortBy}
                        onChange={setSortBy}
                        icon={ArrowUpDown}
                        ariaLabel="Sort by"
                        options={[
                            { value: "newest", label: "Recently added" },
                            { value: "name-asc", label: "Alphabetical (A-Z)" },
                            { value: "name-desc", label: "Alphabetical (Z-A)" },
                        ]}
                    />
                </FilterPopover>
            </div>

            {/* LISTADO DE AMIGOS */}
            {filteredFriends.length === 0 ? (
                <FilterEmptyState
                    icon={SearchX}
                    title="No friends found"
                    description={friends.length === 0
                        ? "This user hasn't added any friends yet."
                        : "Try adjusting your search query or filters."}
                />
            ) : (
                <ProfileSectionGrid
                    items={filteredFriends}
                    columns="grid-cols-1 xl:grid-cols-3"
                    renderItem={(friend) => <FriendsCards friend={friend} currentUserId={currentUserId} />}
                />
            )}
        </div>
    );
}
