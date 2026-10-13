"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpDown, CalendarDays, Inbox, SearchX } from "lucide-react";
import StatusAlert from "@/components/ui/alerts/status-alert";
import { FilterEmptyState, FilterPopover, FilterSearch, FilterSelect } from "@/components/ui/filter-popover";
import type { EventJoinRequest } from "@/lib/data/events";
import type { MembershipActionResult } from "@/lib/actions/event-members";
import EventRequestBox from "./event-request-box";

type DateFilter = "all" | "24h" | "7d" | "30d";
type SortBy = "newest" | "oldest";

const DATE_FILTER_MS: Record<Exclude<DateFilter, "all">, number> = {
    "24h": 24 * 60 * 60 * 1000,
    "7d": 7 * 24 * 60 * 60 * 1000,
    "30d": 30 * 24 * 60 * 60 * 1000,
};

type EventRequestsSectionProps = {
    // Owned by EventMainSection, which also shows the count on the "Requests" tab.
    requests: EventJoinRequest[];
    onResolve: (request: EventJoinRequest, accepted: boolean) => Promise<MembershipActionResult>;
};

export default function RequestsSection({ requests, onResolve }: EventRequestsSectionProps) {
    const [statusAlert, setStatusAlert] = useState<{ description: string; type: "success" | "error" } | null>(null);
    // Requests the server is still processing (their buttons stay disabled)
    const [busyIds, setBusyIds] = useState<string[]>([]);

    const [searchQuery, setSearchQuery] = useState("");
    const [dateFilter, setDateFilter] = useState<DateFilter>("all");
    // Timestamp computed when the date filter is picked (not during render, which must stay pure).
    const [dateCutoff, setDateCutoff] = useState<number | null>(null);
    const [sortBy, setSortBy] = useState<SortBy>("newest");

    const handleDateFilterChange = (value: DateFilter) => {
        setDateFilter(value);
        setDateCutoff(value === "all" ? null : Date.now() - DATE_FILTER_MS[value]);
    };

    const filteredRequests = useMemo(() => {
        return requests
            .filter((request) => {
                const fullName = `${request.requester.firstName} ${request.requester.lastName} ${request.requester.username}`.toLowerCase();
                const matchesSearch = fullName.includes(searchQuery.toLowerCase());
                const matchesDate = dateCutoff === null || new Date(request.createdAt).getTime() >= dateCutoff;

                return matchesSearch && matchesDate;
            })
            .sort((a, b) => {
                const diff = new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
                return sortBy === "newest" ? diff : -diff;
            });
    }, [requests, searchQuery, dateCutoff, sortBy]);

    const handleClearFilters = () => {
        setSearchQuery("");
        handleDateFilterChange("all");
        setSortBy("newest");
    };

    const hasActiveFilters = searchQuery !== "" || dateFilter !== "all" || sortBy !== "newest";

    const resolveRequest = async (request: EventJoinRequest, accepted: boolean) => {
        setBusyIds((prev) => [...prev, request.id]);
        const result = await onResolve(request, accepted);
        setBusyIds((prev) => prev.filter((id) => id !== request.id));

        setStatusAlert(
            result.ok
                ? {
                    type: "success",
                    description: accepted
                        ? `${request.requester.firstName} joined the event.`
                        : `You declined ${request.requester.firstName}'s request.`,
                }
                : { type: "error", description: result.error }
        );
    };

    return (
        <section className="flex flex-col gap-4 sm:gap-5">
            <StatusAlert
                isOpen={statusAlert !== null}
                onClose={() => setStatusAlert(null)}
                description={statusAlert?.description ?? ""}
                type={statusAlert?.type ?? "success"}
                duration={3000}
            />

            {requests.length === 0 ? (
                <div className="flex flex-col items-center gap-2 py-12 text-center text-black/50">
                    <Inbox size={28} className="text-black/30" />
                    <p className="text-sm">No pending requests.</p>
                </div>
            ) : (
                <>
                    {/* CONTADOR + BOTÓN DE FILTROS */}
                    <div className="flex flex-wrap items-center justify-between gap-3">
                        <span className="text-sm font-semibold text-black/60">
                            {hasActiveFilters
                                ? `${filteredRequests.length} of ${requests.length} pending`
                                : `${requests.length} pending`}
                        </span>

                        <FilterPopover hasActiveFilters={hasActiveFilters} onClear={handleClearFilters}>
                            <FilterSearch value={searchQuery} onChange={setSearchQuery} placeholder="Search by name..." />
                            <FilterSelect
                                value={dateFilter}
                                onChange={handleDateFilterChange}
                                icon={CalendarDays}
                                ariaLabel="Filter by date"
                                options={[
                                    { value: "all", label: "Any time" },
                                    { value: "24h", label: "Last 24 hours" },
                                    { value: "7d", label: "Last 7 days" },
                                    { value: "30d", label: "Last 30 days" },
                                ]}
                            />
                            <FilterSelect
                                value={sortBy}
                                onChange={setSortBy}
                                icon={ArrowUpDown}
                                ariaLabel="Sort by"
                                options={[
                                    { value: "newest", label: "Newest first" },
                                    { value: "oldest", label: "Oldest first" },
                                ]}
                            />
                        </FilterPopover>
                    </div>

                    {filteredRequests.length === 0 ? (
                        <FilterEmptyState
                            icon={SearchX}
                            title="No requests found"
                            description="Try adjusting your search query or filters."
                        />
                    ) : (
                        <AnimatePresence initial={false}>
                            {filteredRequests.map((request) => (
                                <motion.div
                                    key={request.id}
                                    layout
                                    exit={{ opacity: 0, x: 40 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <EventRequestBox
                                        request={request}
                                        onAccept={(r) => resolveRequest(r, true)}
                                        onDecline={(r) => resolveRequest(r, false)}
                                        isBusy={busyIds.includes(request.id)}
                                    />
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    )}
                </>
            )}
        </section>
    );
}
