import { notFound } from "next/navigation";
import EventView from "@/components/event/event-view";
import { requireUser } from "@/lib/auth/guards";
import { connectDB } from "@/lib/db/db";
import { getEventPageData, getPendingRequests, type EventJoinRequest } from "@/lib/data/events";
import { User } from "@/model/User";

interface EventPageProps {
    params: Promise<{ id: string }>;
}

export default async function EventPage({ params }: EventPageProps) {
    const { id } = await params;
    const sessionUser = await requireUser();

    // The event and the viewer don't depend on each other, so both queries run at the same time
    await connectDB();
    const [event, viewer] = await Promise.all([
        getEventPageData(id, sessionUser.id),
        User.findById(sessionUser.id).select("firstName lastName username profileImage").lean(),
    ]);
    if (!event) notFound();

    // Not awaited on purpose: the page shows right away and the Requests tab
    // shows a skeleton until they arrive. Only the owner and admins can see them.
    const isHost = event.viewerRole === "owner" || event.viewerRole === "admin";
    const requestsPromise: Promise<EventJoinRequest[]> = isHost ? getPendingRequests(event.id) : Promise.resolve([]);

    return (
        <EventView
            event={event}
            requestsPromise={requestsPromise}
            viewer={{
                firstName: viewer?.firstName ?? "",
                lastName: viewer?.lastName ?? "",
                username: viewer?.username ?? sessionUser.username ?? "",
                profileImage: viewer?.profileImage ?? "",
            }}
        />
    );
}
