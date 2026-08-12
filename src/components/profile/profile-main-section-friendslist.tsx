"use client";

import { useState, useMemo } from "react";
import { Search, SearchX, X, ChevronDown, ArrowUpDown } from "lucide-react";
import FriendsCards, { FriendType } from "./profile-friends-cards";
import ProfileSectionGrid from "./profile-section-grid";

type SortBy = "newest" | "name-asc" | "name-desc";

interface ProfileSectionFriendsListProps {
    friends: FriendType[];
    currentUserId: number;
}

export default function ProfileSectionFriendsList({ friends, currentUserId }: ProfileSectionFriendsListProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState<string>("all");
    const [sortBy, setSortBy] = useState<SortBy>("newest");

    const filteredFriends = useMemo(() => {
        return friends.filter((friend) => {
            const friendName = (friend as any).name || (friend as any).username || "";
            const matchesSearch = friendName.toLowerCase().includes(searchQuery.toLowerCase());
            
            // Asumiendo que FriendType podría tener un 'status' (ej: 'online', 'offline')
            const friendStatus = (friend as any).status || "offline";
            const matchesStatus = statusFilter === "all" || friendStatus === statusFilter;

            return matchesSearch && matchesStatus;

        }).sort((a, b) => {
            const nameA = (a as any).name || "";
            const nameB = (b as any).name || "";

            if (sortBy === "name-asc") {
                return nameA.localeCompare(nameB);
            }
            if (sortBy === "name-desc") {
                return nameB.localeCompare(nameA);
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
            {/* BARRA DE BÚSQUEDA Y FILTROS */}
            <div className="flex flex-col gap-3 rounded-3xl">
                
                {/* 1. INPUT DE BÚSQUEDA (Ocupa el 100% arriba) */}
                <div className="relative w-full">
                    <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-black/40" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search friends by name..."
                        className="w-full rounded-2xl border border-black/10 bg-black/[0.02] pl-10 pr-4 py-2.5 text-sm text-black outline-none transition-all placeholder:text-black/40 focus:border-[#6D28D9]/40 focus:bg-white focus:ring-2 focus:ring-[#6D28D9]/10"
                    />
                    {searchQuery && (
                        <button 
                            onClick={() => setSearchQuery("")}
                            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-black/40 hover:text-black"
                        >
                            <X size={15} />
                        </button>
                    )}
                </div>

                {/* 2. CONTENEDOR DE SELECTS DE FILTROS (Abajo) */}
                <div className="flex w-full flex-col flex-wrap items-center gap-2 sm:flex-row">
                    
                    <div className="relative w-full sm:min-w-[140px] sm:flex-1">
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="w-full cursor-pointer appearance-none rounded-2xl border border-black/10 bg-black/[0.02] px-4 py-2.5 pr-8 text-sm text-black outline-none transition-all focus:border-[#6D28D9]/40 focus:bg-white"
                        >
                            <option value="all">All statuses</option>
                            <option value="online">Online</option>
                            <option value="offline">Offline</option>
                        </select>
                        <ChevronDown size={14} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-black/40" />
                    </div>

                    {/* Ordenamiento */}
                    <div className="relative w-full sm:min-w-[140px] sm:flex-1">
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value as SortBy)}
                            className="w-full cursor-pointer appearance-none rounded-2xl border border-black/10 bg-black/[0.02] px-4 py-2.5 pr-8 text-sm text-black outline-none transition-all focus:border-[#6D28D9]/40 focus:bg-white"
                        >
                            <option value="newest">Recently added</option>
                            <option value="name-asc">Alphabetical (A-Z)</option>
                            <option value="name-desc">Alphabetical (Z-A)</option>
                        </select>
                        <ArrowUpDown size={14} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-black/40" />
                    </div>
                </div>

                {/* Indicador de filtros activos */}
                {hasActiveFilters && (
                    <div className="mt-1 flex items-center justify-between border-t border-black/5 px-1 pt-2">
                        <span className="text-xs text-black/50">
                            Showing filtered friends
                        </span>
                        <button
                            onClick={handleClearFilters}
                            className="cursor-pointer text-xs font-semibold text-[#6D28D9] hover:underline"
                        >
                            Clear filters
                        </button>
                    </div>
                )}
            </div>

            {/* LISTADO DE AMIGOS */}
            {filteredFriends.length === 0 ? (
                <div className="flex min-h-[300px] flex-col items-center justify-center rounded-3xl border border-black/10 bg-black/5 p-6 text-center">
                    <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-black/5">
                        <SearchX size={32} className="text-black/40" />
                    </div>
                    <h3 className="text-sm font-semibold text-black/60">
                        No friends found
                    </h3>
                    <p className="mt-1 text-xs text-black/50">
                        {friends.length === 0 
                            ? "This user hasn't added any friends yet." 
                            : "Try adjusting your search query or filters."}
                    </p>
                </div>
            ) : (
                <ProfileSectionGrid
                    items={filteredFriends}
                    columns="grid-cols-1 xl:grid-cols-3"
                    linkTo={(friend) => `/profile/${friend.id}`}
                    renderItem={(friend) => <FriendsCards friend={friend} currentUserId={currentUserId} />}
                />
            )}
        </div>
    );
}