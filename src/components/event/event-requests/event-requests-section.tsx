"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Inbox } from "lucide-react";
import StatusAlert from "@/components/ui/alerts/status-alert";
import { getRequestsForEvent, type JoinRequestViewModel } from "@/lib/requests-selector";
import EventRequestBox from "./event-request-box";

type EventRequestsSectionProps = {
    eventId: number;
};

export default function RequestsSection({ eventId }: EventRequestsSectionProps) {
    const [requests, setRequests] = useState(() => getRequestsForEvent(eventId));
    const [statusMessage, setStatusMessage] = useState<string | null>(null);

    // TODO: persist on the backend (EventMember role "pending" → "member" / delete).
    const resolveRequest = (request: JoinRequestViewModel, accepted: boolean) => {
        setRequests((prev) => prev.filter((r) => r.id !== request.id));
        setStatusMessage(
            accepted
                ? `${request.requester.firstName} joined the event.`
                : `You declined ${request.requester.firstName}'s request.`
        );
    };

    return (
        <section className="flex flex-col gap-4 sm:gap-5">
            <StatusAlert
                isOpen={statusMessage !== null}
                onClose={() => setStatusMessage(null)}
                description={statusMessage ?? ""}
                type="success"
                duration={3000}
            />

            {requests.length === 0 ? (
                <div className="flex flex-col items-center gap-2 py-12 text-center text-black/50">
                    <Inbox size={28} className="text-black/30" />
                    <p className="text-sm">No pending requests.</p>
                </div>
            ) : (
                <AnimatePresence initial={false}>
                    {requests.map((request) => (
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
                            />
                        </motion.div>
                    ))}
                </AnimatePresence>
            )}
        </section>
    );
}
