"use client";

import { motion } from "framer-motion";
import EventAsideSection from "@/components/event/event-aside-section";
import EventHeader, { type ViewerStatus } from "@/components/event/event-header";
import EventMainSection from "@/components/event/event-main-section";
import { getEventStatus } from "@/lib/display/event-status";
import type { EventPageData } from "@/lib/data/events";
import type { FeedUser } from "@/lib/mock-data/users-data";

type EventViewProps = {
    event: EventPageData;
    viewer: FeedUser;
};

// TODO: the Feed and Members tabs still read mock data keyed by numeric ids.
// Until each one moves to the DB, they get an id that matches no mock event, so they show empty.
const MOCK_TABS_PLACEHOLDER_ID = 0;

function toViewerStatus(role: EventPageData["viewerRole"]): ViewerStatus {
    if (role === null) return "none";
    if (role === "pending") return "pending";
    return "member";
}

export default function EventView({ event, viewer }: EventViewProps) {
    const viewerStatus = toViewerStatus(event.viewerRole);
    const isUserOwner = event.viewerRole === "owner";
    const isHost = isUserOwner || event.viewerRole === "admin";
    const isFull = event.memberCount >= event.capacity;

    return (
        <div className="flex flex-col gap-8 -mt-10">
            <motion.div
                initial={{ opacity: 0, y: -40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
            >
                <EventHeader
                    eventData={{
                        title: event.title,
                        coverImage: event.image,
                        memberCount: event.memberCount,
                        memberLimit: event.capacity,
                        category: event.category,
                        status: getEventStatus(event.startDate),
                        startDate: event.startDate,
                        location: event.location,
                        host: event.owner ?? undefined,
                    }}
                    eventId={event.id}
                    viewerStatus={viewerStatus}
                    isUserOwner={isUserOwner}
                />
            </motion.div>

            <div className="flex flex-col gap-5 md:flex-row items-start p-5">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
                    className="flex w-full min-w-0 flex-1 flex-col"
                >
                    <EventAsideSection
                        event={event}
                        owner={event.owner}
                        admins={event.admins}
                        eventId={event.id}
                        viewerStatus={viewerStatus}
                        viewerRequestMessage={event.viewerRequestMessage}
                        isFull={isFull}
                    />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
                    className="flex w-full min-w-0 flex-[2] flex-col"
                >
                    <EventMainSection
                        user={viewer}
                        eventId={event.id}
                        requests={event.requests}
                        canManageRequests={isHost}
                        mockCurrentUserId={MOCK_TABS_PLACEHOLDER_ID}
                        mockEventId={MOCK_TABS_PLACEHOLDER_ID}
                    />
                </motion.div>
            </div>
        </div>
    );
}
