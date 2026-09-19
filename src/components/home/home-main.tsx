import { EventType } from "../profile/profile-events-cards";
import HomeNextEvents from "./home-next-events";
import HomeMainStatistics from "./home-stadistics";
import HomeNextEventHero from "./home-nextevent-hero";

type ProfileMainProps = {
    user: {
        name: string;
        username: string;
        events: EventType[];
    };
};

export default function HomeMain({ user }: ProfileMainProps) {
    return (
        <section className="flex-2 min-w-0 flex flex-col gap-4">
            <HomeNextEventHero events={user.events}/>
            <HomeMainStatistics/>
            <HomeNextEvents userEvents={user.events}/>
        </section>
    );
}