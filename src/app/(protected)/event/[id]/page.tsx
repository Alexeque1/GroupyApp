import { notFound } from "next/navigation";
import EventView from "@/components/event/event-view";
import { requireUser } from "@/lib/auth/guards";
import { getEventPageData } from "@/lib/data/events";
import { User } from "@/model/User";

interface EventPageProps {
    params: Promise<{ id: string }>;
}

export default async function EventPage({ params }: EventPageProps) {
    const { id } = await params;
    const sessionUser = await requireUser();

    const event = await getEventPageData(id, sessionUser.id);
    if (!event) notFound();

    // getEventPageData already connected to the DB
    const viewer = await User.findById(sessionUser.id)
        .select("firstName lastName username profileImage")
        .lean();

    return (
        <EventView
            event={event}
            viewer={{
                firstName: viewer?.firstName ?? "",
                lastName: viewer?.lastName ?? "",
                username: viewer?.username ?? sessionUser.username ?? "",
                profileImage: viewer?.profileImage ?? "",
            }}
        />
    );
}
