import { Suspense, use, useState } from "react";
import NavigationTabButton from "../ui/navigation-tab-button";
import Skeleton from "../ui/skeleton";
import { AnimatePresence, motion } from "framer-motion";
import type { FeedUser } from "@/lib/mock-data/users-data";
import EventFeed from "./event-feed/event-feed-section";
import RequestsSection from "./event-requests/event-requests-section";
import MembersSection from "./event-members/event-members-section";
import { getMembersForEvent } from "@/lib/selectors/members";
import { resolveJoinRequest } from "@/lib/actions/event-members";
import type { EventJoinRequest } from "@/lib/data/events";

const TABS_CONFIG = [
    {
        key: "Feed",
        description:
            "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Placeat magnam saepe iste, minus ut quibusdam enim quis est necessitatibus eaque dicta, commodi amet debitis et soluta dolorum numquam a reiciendis.",
    },
        {
        key: "Members",
        description:
            "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Blanditiis voluptate magnam accusamus ullam. Quos vero ducimus rerum incidunt, in quidem error! Placeat molestiae reprehenderit laborum? Veniam delectus atque amet eum.",
    },
    {
        key: "Requests",
        description:
            "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Blanditiis voluptate magnam accusamus ullam. Quos vero ducimus rerum incidunt, in quidem error! Placeat molestiae reprehenderit laborum? Veniam delectus atque amet eum.",
    },
    {
        key: "Agenda",
        description:
            "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Suscipit eaque at commodi aperiam itaque expedita accusamus, doloremque numquam veniam ut praesentium eius, harum nostrum iure repudiandae sapiente non, ratione quod?",
    },
] as const;

type TabType = (typeof TABS_CONFIG)[number]["key"];

type EventMainSectionProps = {
    user: FeedUser;
    eventId: string;
    /** Pending requests from the DB, still loading when the page shows (empty unless the viewer is owner/admin) */
    requestsPromise: Promise<EventJoinRequest[]>;
    /** Only the owner and admins see the Requests tab */
    canManageRequests: boolean;
    /** Feed and Members still read mock data keyed by numeric ids */
    mockCurrentUserId: number;
    mockEventId: number;
};

export default function EventMainSection({
    user,
    eventId,
    requestsPromise,
    canManageRequests,
    mockCurrentUserId,
    mockEventId,
}: EventMainSectionProps) {
    const [activeTab, setActiveTab] = useState<TabType>(TABS_CONFIG[0].key);
    // TODO: Members still comes from mock data; it moves to the DB in its own task.
    const [members] = useState(() => getMembersForEvent(mockEventId));

    const visibleTabs = TABS_CONFIG.filter(({ key }) => key !== "Requests" || canManageRequests);

    // The server action revalidates the page, so `requestsPromise` arrives updated as a new prop
    const handleResolveRequest = (request: EventJoinRequest, accepted: boolean) =>
        resolveJoinRequest(eventId, request.id, accepted);

    return (
        <section className="z-10 flex min-h-[500px] flex-[2] flex-col overflow-hidden rounded-3xl bg-black/5 shadow-[0_8px_30px_rgba(0,0,0,0.08)] backdrop-blur-md pt-2 md:pt-4">
            {/* TABS */}
            <header className="flex w-full items-end gap-1 px-4 overflow-x-auto hide-scrollbar">
                {visibleTabs.map(({ key }) => {
                    const tabButton = (badge?: number) => (
                        <NavigationTabButton
                            key={key}
                            label={key}
                            isActive={activeTab === key}
                            onClick={() => setActiveTab(key)}
                            layoutId="profile-tabs"
                            badge={badge}
                        />
                    );

                    // The tab shows right away; its count badge pops in once the requests arrive
                    return key === "Requests" ? (
                        <Suspense key={key} fallback={tabButton()}>
                            <RequestsCount requestsPromise={requestsPromise}>{tabButton}</RequestsCount>
                        </Suspense>
                    ) : (
                        tabButton()
                    );
                })}
            </header>

            {/* DYNAMIC CONTENT */}
            <div id="event_section" className="relative flex flex-1 flex-col p-4 md:p-6 bg-white rounded-b-3xl">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                        className="flex h-full flex-1 flex-col gap-2"
                    >
                        {activeTab === "Feed" && (
                            <EventFeed user={user} eventId={mockEventId} />
                        )}

                        {activeTab === "Members" && (
                            <MembersSection members={members} currentUserId={mockCurrentUserId} />
                        )}

                        {activeTab === "Requests" && canManageRequests && (
                            <Suspense fallback={<RequestsTabSkeleton />}>
                                <RequestsTab requestsPromise={requestsPromise} onResolve={handleResolveRequest} />
                            </Suspense>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    );
}
/** Waits for the requests and hands their count to `children` (used for the tab badge). */
function RequestsCount({
    requestsPromise,
    children,
}: {
    requestsPromise: Promise<EventJoinRequest[]>;
    children: (count: number) => React.ReactNode;
}) {
    return children(use(requestsPromise).length);
}

function RequestsTab({
    requestsPromise,
    onResolve,
}: {
    requestsPromise: Promise<EventJoinRequest[]>;
    onResolve: React.ComponentProps<typeof RequestsSection>["onResolve"];
}) {
    // Suspends here (showing RequestsTabSkeleton) until the requests arrive
    const requests = use(requestsPromise);
    return <RequestsSection requests={requests} onResolve={onResolve} />;
}

function RequestsTabSkeleton() {
    return (
        <div className="flex flex-col gap-4" role="status" aria-label="Loading requests">
            {/* Count + filters */}
            <div className="flex items-center justify-between gap-3">
                <Skeleton className="h-5 w-24 rounded-md" />
                <Skeleton className="h-10 w-24 rounded-full" />
            </div>

            {/* One row per request: avatar, name, message, accept / reject */}
            {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex items-center gap-4 rounded-2xl border border-black/5 p-4">
                    <Skeleton className="size-12 shrink-0 rounded-full" />
                    <div className="flex flex-1 flex-col gap-2">
                        <Skeleton className="h-4 w-40 rounded-md" />
                        <Skeleton className="h-3 w-3/4 rounded-md" />
                    </div>
                    <Skeleton className="h-9 w-20 rounded-full" />
                    <Skeleton className="h-9 w-20 rounded-full" />
                </div>
            ))}
        </div>
    );
}
