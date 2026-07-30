import HomeNextGroups from "./home-next-groups";
import HomeMainStatistics from "./home-stadistics";

export default function HomeMain() {
    return (
        <section className="flex-2 min-w-0 flex flex-col gap-4">
            <HomeMainStatistics/>
            <HomeNextGroups/>
        </section>
    );
}