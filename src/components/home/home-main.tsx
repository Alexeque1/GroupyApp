import { CommunityType } from "../profile/profile-communities-cards";
import { FriendType } from "../profile/profile-friends-cards";
import { GroupType } from "../profile/profile-groups-cards";
import HomeNextGroups from "./home-next-groups";
import HomeMainStatistics from "./home-stadistics";

type ProfileMainProps = {
    user: {
        name: string;
        username: string;
        groups: GroupType[];
    };
};

export default function HomeMain({ user }: ProfileMainProps) {
    return (
        <section className="flex-2 min-w-0 flex flex-col gap-4">
            <HomeMainStatistics/>
            <HomeNextGroups userGroups={user.groups}/>
        </section>
    );
}