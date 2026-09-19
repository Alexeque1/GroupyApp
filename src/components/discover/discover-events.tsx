"use client";

import { useMemo } from "react";
import { SearchX } from "lucide-react";
import ProfileEventCard, { EventType } from "../profile/profile-events-cards";
import PaginationControls from "../ui/pagination-controls";
import { EVENTS_DATA } from "@/lib/mock_data/event-data";
import { matchesTime, matchesCapacity } from "@/lib/event-filters";
import { getEventStatus } from "@/lib/event-status";
import { paginate } from "@/lib/pagination";

interface DiscoverEventsProps {
    categoryId: number | null;
    searchQuery: string;
    timeFilter: string;
    capacityFilter: string;
    currentPage: number;
    setCurrentPage: (page: number) => void;
}

const ITEMS_PER_PAGE = 8;

export default function DiscoverEvents({
    categoryId,
    searchQuery,
    timeFilter,
    capacityFilter,
    currentPage,
    setCurrentPage,
}: DiscoverEventsProps) {
    const filteredEvents = useMemo(() => {
        const query = searchQuery.trim().toLowerCase();

        return EVENTS_DATA.filter(
            (event: EventType) =>
                event.role === undefined &&
                (categoryId === null || event.categoryId === categoryId) &&
                (query === "" || event.title.toLowerCase().includes(query)) &&
                getEventStatus(event.startDate) !== "Past" &&
                matchesTime(event, timeFilter) &&
                matchesCapacity(event, capacityFilter)
        );
    }, [categoryId, searchQuery, timeFilter, capacityFilter]);

    const { pageItems, totalPages, safePage } = paginate(
        filteredEvents,
        currentPage,
        ITEMS_PER_PAGE
    );

    if (filteredEvents.length === 0) {
        return (
            <div className="flex min-h-[300px] flex-col items-center justify-center rounded-3xl border border-black/10 bg-black/5 p-6 text-center">
                <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-black/5">
                    <SearchX size={32} className="text-black/40" />
                </div>
                <h3 className="text-sm font-semibold text-black/60">
                    No events match your filters
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
                {pageItems.map((event) => (
                    <ProfileEventCard key={event.id} event={event} />
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
