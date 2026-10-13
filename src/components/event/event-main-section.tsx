import { useState } from "react";
import NavigationTabButton from "../ui/navigation-tab-button";
import { AnimatePresence, motion } from "framer-motion";
import type { FeedUser } from "@/lib/mock_data/users-data";
import EventFeed from "./event-feed/event-feed-section";
import RequestsSection from "./event-requests/event-requests-section";
import { getRequestsForEvent, type JoinRequestViewModel } from "@/lib/requests-selector";
import MembersSection from "./event-members/event-members-section";
import { getMembersForEvent, toEventMember } from "@/lib/members-selector";

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
    currentUserId: number;
    eventId: number;
};

export default function EventMainSection({ user, currentUserId, eventId }: EventMainSectionProps) {
    const [activeTab, setActiveTab] = useState<TabType>(TABS_CONFIG[0].key);
    // Requests and members live here (not in their sections) so the "Requests" tab badge can
    // read the count, accepted requests show up in Members, and nothing resets when a tab
    // unmounts on switch.
    const [requests, setRequests] = useState(() => getRequestsForEvent(eventId));
    const [members, setMembers] = useState(() => getMembersForEvent(eventId));

    // TODO: persist on the backend (EventMember role "pending" → "member" / delete).
    const handleResolveRequest = (request: JoinRequestViewModel, accepted: boolean) => {
        setRequests((prev) => prev.filter((r) => r.id !== request.id));
        if (accepted) {
            setMembers((prev) => [...prev, toEventMember(request.requester, "member")]);
        }
    };

    return (
        <section className="z-10 flex min-h-[500px] flex-[2] flex-col overflow-hidden rounded-3xl bg-black/5 shadow-[0_8px_30px_rgba(0,0,0,0.08)] backdrop-blur-md pt-2 md:pt-4">
            {/* TABS */}
            <header className="flex w-full items-end gap-1 px-4 overflow-x-auto hide-scrollbar">
                {TABS_CONFIG.map(({ key }) => (
                    <NavigationTabButton
                        key={key}
                        label={key}
                        isActive={activeTab === key}
                        onClick={() => setActiveTab(key)}
                        layoutId="profile-tabs"
                        badge={key === "Requests" ? requests.length : undefined}
                    />
                ))}
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
                            <EventFeed user={user} eventId={eventId} />
                        )}

                        {activeTab === "Members" && (
                            <MembersSection members={members} currentUserId={currentUserId} />
                        )}

                        {activeTab === "Requests" && (
                            <RequestsSection requests={requests} onResolve={handleResolveRequest} />
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    );
}