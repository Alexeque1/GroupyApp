import DiscoverView from "@/components/discover/discover-view";
import { requireUser } from "@/lib/auth/guards";
import { getDiscoverEvents } from "@/lib/data/events";

export default async function DiscoverPage() {
    const user = await requireUser();
    const events = await getDiscoverEvents(user.id);

    return <DiscoverView events={events} />;
}
