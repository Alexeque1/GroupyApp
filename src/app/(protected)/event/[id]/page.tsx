"use client";

import EventAsideSection from "@/components/event/event-aside-section";
import EventHeader from "@/components/event/event-header";
import EventMainSection from "@/components/event/event-main-section";
import { EVENTS_DATA } from "@/lib/mock_data/event-data";
import { USERS_DATA } from "@/lib/mock_data/users-data";
import { CURRENT_USER_ID } from "@/lib/mock_data/profile-info";
import { getEventStatus } from "@/lib/event-status";
import { motion } from "framer-motion";
import { use } from "react";

interface EventProps {
    params: Promise<{ id: string }>;
}

export default function Event({ params }: EventProps) {
    const { id } = use(params);
    const event = EVENTS_DATA.find((g) => g.id === Number(id));
    const currentUser = USERS_DATA.find((u) => u.id === Number(CURRENT_USER_ID));
    const isUserMember = !!currentUser && !!event && (
        event.ownerId === currentUser.id ||
        event.adminIds.includes(currentUser.id) ||
        currentUser.events.member.includes(event.id)
    );
    const userIsOwner = event?.ownerId === currentUser?.id

    if (!event || !currentUser) {
        return (
            <div className="flex items-center justify-center h-full p-5">
                <p>Event not found.</p>
            </div>
        );
    }

    const host = USERS_DATA.find((u) => u.id === event.ownerId);
    const [memberCount, memberLimit] = event.members.split("/").map(Number);

    // Candidates for new owner if the current one decides to leave the event: admins + members, excluding the owner.
    const eventMembers = USERS_DATA.filter((u) =>
        u.id !== event.ownerId && (
            event.adminIds.includes(u.id) ||
            u.events.member.includes(event.id)
        )
    );

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
                        memberCount,
                        memberLimit,
                        category: event.category,
                        status: getEventStatus(event.startDate),
                        startDate: event.startDate,
                        location: event.location,
                        host,
                    }}
                    isUserMember={isUserMember}
                    isUserOwner={userIsOwner}
                    eventMembers={eventMembers}
                />
            </motion.div>

            <div className="flex flex-col gap-5 md:flex-row items-start p-5">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
                    className="flex flex-1 flex-col"
                >
                    <EventAsideSection event={event} isUserMember={isUserMember} />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
                    className="flex flex-[2] flex-col w-full"
                >
                    <EventMainSection user={currentUser} eventId={event.id}/>
                </motion.div>
            </div>
        </div>
    );
}