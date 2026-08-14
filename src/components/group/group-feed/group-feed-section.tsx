import { FeedUser } from "@/lib/mock_data/users-data";
import GroupFeedTextBox from "./group-feed-textbox";
import GroupFeedFeedBox from "./group-feed-feedbox";

type GroupFeedSectionProps = {
    user: FeedUser;
    groupId: number;
};

export default function GroupFeed({user, groupId}:GroupFeedSectionProps) {
    return (
        <section className="flex flex-col gap-5">
            <GroupFeedTextBox user={user}/>
            <GroupFeedFeedBox groupId={groupId} user={user}/>
        </section>
    );
}