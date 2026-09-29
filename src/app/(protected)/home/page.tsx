"use client";

import HomeGreetings from "@/components/home/home-greetings";
import HomeNextEventHero from "@/components/home/home-nextevent-hero";
import HomeNeedsAction from "@/components/home/home-needs-action";
import HomeNextEvents from "@/components/home/home-agenda";
import HomeCommunities from "@/components/home/home-communities";
import AnimatedBackgroundLight from "@/components/ui/backgrounds/animated-background-light";
import { motion } from "framer-motion";

import { PROFILE_INFO } from "@/lib/mock_data/profile-info";
import HomeEventsSuggestions from "@/components/home/home-events-suggestions";
import HomeFastEvent from "@/components/home/home-fast-event";

export default function Feed() {

    return (
        <motion.div
            initial={{ opacity: 0, y: -40 }} // Starts transparent and 40px higher up
            animate={{ opacity: 1, y: 0 }}   // Ends 100% visible and in its original position
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="relative flex flex-col py-10 px-5 gap-8"
        >
            <AnimatedBackgroundLight />

            <HomeGreetings name={PROFILE_INFO.name} events={PROFILE_INFO.events}/>

            {/* Responsive grid: stacked on mobile, 2 even columns on tablet, 6 columns (4/2) on large desktop */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-5">
                <div className="order-2 md:order-1 xl:col-span-4">
                    <HomeNextEventHero events={PROFILE_INFO.events} />
                </div>
                <div className="order-1 md:order-2 xl:col-span-2">
                    <HomeNeedsAction />
                </div>
                <div className="order-3 xl:col-span-4">
                    <HomeNextEvents userEvents={PROFILE_INFO.events} />
                </div>
                <div className="order-4 xl:col-span-2 flex flex-col gap-5">
                    <HomeCommunities communities={PROFILE_INFO.communities} />
                    <HomeFastEvent/>
                </div>
            </div>
            <HomeEventsSuggestions/>
        </motion.div>
    );
}