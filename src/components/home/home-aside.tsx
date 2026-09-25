import HomeWhatsNew from "./home-whats-new";
import HomeCalendar from "./home-calendar";
import { EventType } from "../profile/profile-events-cards";

export default function HomeAside({ events }: { events: EventType[] }) {
    return (
        <aside className="flex-1 z-10 flex flex-col gap-4">
            <HomeWhatsNew/>
        </aside>
    );
}