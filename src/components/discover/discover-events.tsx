"use client";

import { useMemo } from "react";
import { SearchX } from "lucide-react";
import EntityCard, { type EntityCardData } from "../cards/entity-card";
import PaginationControls from "../ui/pagination-controls";
import { matchesTime, matchesCapacity } from "@/lib/filters/events";
import { getEventStatus, getEventStatusInfo } from "@/lib/display/event-status";
import { formatEventDate } from "@/lib/helpers/date";
import { paginate } from "@/lib/helpers/pagination";
import { DISCOVER_CATEGORIES } from "@/lib/constants/discover-categories";
import type { DiscoverEvent } from "@/lib/data/events";

interface DiscoverEventsProps {
    events: DiscoverEvent[];
    categoryId: number | null;
    searchQuery: string;
    timeFilter: string;
    capacityFilter: string;
    currentPage: number;
    setCurrentPage: (page: number) => void;
}

const ITEMS_PER_PAGE = 8;

const FULL_TAG = { label: "Full", classes: "border-red-500/20 bg-red-500/10 text-red-600" };
const REQUESTED_TAG = { label: "Request sent", classes: "border-brand-purple/30 bg-brand-purple/10 text-brand-purple-deep" };

function toCardData(event: DiscoverEvent): EntityCardData {
    const statusInfo = getEventStatusInfo(getEventStatus(event.startDate));
    const tags = [];
    if (event.memberCount >= event.capacity) tags.push(FULL_TAG);
    if (event.isRequestPending) tags.push(REQUESTED_TAG);

    return {
        kind: "event",
        id: event.id,
        title: event.title,
        image: event.image || null,
        category: event.category,
        location: event.location,
        members: `${event.memberCount}/${event.capacity}`,
        colorFrom: "",
        colorTo: "",
        status: statusInfo.label,
        statusClasses: statusInfo.badgeClasses,
        owner: event.ownerName,
        startDate: formatEventDate(event.startDate),
        tags,
    };
}

export default function DiscoverEvents({
    events,
    categoryId,
    searchQuery,
    timeFilter,
    capacityFilter,
    currentPage,
    setCurrentPage,
}: DiscoverEventsProps) {
    const filteredEvents = useMemo(() => {
        const query = searchQuery.trim().toLowerCase();
        const categoryName = DISCOVER_CATEGORIES.find((c) => c.id === categoryId)?.name;

        return events.filter(
            (event) =>
                (categoryName === undefined || event.category === categoryName) &&
                (query === "" || event.title.toLowerCase().includes(query)) &&
                matchesTime(event, timeFilter) &&
                matchesCapacity(event, capacityFilter)
        );
    }, [events, categoryId, searchQuery, timeFilter, capacityFilter]);

    const { pageItems, totalPages, safePage } = paginate(
        filteredEvents,
        currentPage,
        ITEMS_PER_PAGE
    );

    if (filteredEvents.length === 0) {
        const hasNoEventsAtAll = events.length === 0;

        return (
            <div className="flex min-h-[300px] flex-col items-center justify-center rounded-3xl border border-black/10 bg-black/5 p-6 text-center">
                <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-black/5">
                    <SearchX size={32} className="text-black/40" />
                </div>
                <h3 className="text-sm font-semibold text-black/60">
                    {hasNoEventsAtAll ? "No new events to discover yet" : "No events match your filters"}
                </h3>
                <p className="mt-1 text-xs text-black/50">
                    {hasNoEventsAtAll
                        ? "Check back soon, or create your own event."
                        : "Try changing your filters or selecting another category."}
                </p>
            </div>
        );
    }

    return (
        <div className="flex w-full flex-col gap-6">
            <div className="grid w-full grid-cols-1 sm:grid-cols-2 gap-6 md:grid-cols-3 xl:grid-cols-4">
                {pageItems.map((event) => (
                    <EntityCard key={event.id} data={toCardData(event)} />
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
