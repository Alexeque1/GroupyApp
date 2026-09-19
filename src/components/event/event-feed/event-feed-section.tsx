import { FeedUser } from "@/lib/mock_data/users-data";
import EventFeedTextBox from "./event-feed-textbox";
import EventFeedFeedBox from "./event-feed-feedbox";

type EventFeedSectionProps = {
    user: FeedUser;
    eventId: number;
};

export default function EventFeed({user, eventId}:EventFeedSectionProps) {
    return (
        <section className="flex flex-col gap-5">
            <EventFeedTextBox user={user}/>
            <EventFeedFeedBox eventId={eventId} user={user}/>
        </section>
    );
}