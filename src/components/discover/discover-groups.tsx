"use client";

import { useMemo } from "react";
import { SearchX } from "lucide-react";
import ProfileGroupCard, { GroupType } from "../profile/profile-groups-cards";
import PaginationControls from "../ui/pagination-controls";
import { GROUPS_DATA } from "@/lib/mock_data/group-data";
import { matchesDate, matchesCapacity } from "@/lib/group-filters";
import { paginate } from "@/lib/pagination";

interface DiscoverGroupsProps {
    categoryId: number | null; // null = "All"
    dateFilter: string;
    capacityFilter: string;
    currentPage: number;
    setCurrentPage: (page: number) => void;
}

const ITEMS_PER_PAGE = 8;

export default function DiscoverGroups({
    categoryId,
    dateFilter,
    capacityFilter,
    currentPage,
    setCurrentPage,
}: DiscoverGroupsProps) {
    const filteredGroups = useMemo(
        () =>
            GROUPS_DATA.filter(
                (group: GroupType) =>
                    (categoryId === null || group.categoryId === categoryId) &&
                    matchesDate(group, dateFilter) &&
                    matchesCapacity(group, capacityFilter)
            ),
        [categoryId, dateFilter, capacityFilter]
    );

    const { pageItems, totalPages, safePage } = paginate(
        filteredGroups,
        currentPage,
        ITEMS_PER_PAGE
    );

    if (filteredGroups.length === 0) {
        return (
            <div className="flex min-h-[300px] flex-col items-center justify-center rounded-3xl border border-black/10 bg-black/5 p-6 text-center">
                <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-black/5">
                    <SearchX size={32} className="text-black/40" />
                </div>
                <h3 className="text-sm font-semibold text-black/60">
                    No groups match your filters
                </h3>
                <p className="mt-1 text-xs text-black/50">
                    Try changing your filters or selecting another category.
                </p>
            </div>
        );
    }

    return (
        <div className="flex w-full flex-col gap-6">
            <div className="grid w-full grid-cols-1 sm:grid-cols-2 gap-6 md:grid-cols-3 xl:grid-cols-4">
                {pageItems.map((group) => (
                    <ProfileGroupCard key={group.id} group={group} />
                ))}
            </div>

            <PaginationControls
                page={safePage}
                totalPages={totalPages}
                onChange={setCurrentPage}
            />
        </div>
    );
}
