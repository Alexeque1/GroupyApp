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
            initial={{ opacity: 0, y: -40 }} // Empieza transparente y 40px más arriba
            animate={{ opacity: 1, y: 0 }}   // Termina 100% visible y en su posición original
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="relative flex flex-col py-10 px-5 gap-8"
        >
            <AnimatedBackgroundLight />

            <HomeGreetings name={PROFILE_INFO.name} events={PROFILE_INFO.events}/>

            {/* GRID responsive: apilado en mobile, 2 columnas parejas en tablet, 6 columnas (4/2) en desktop grande */}
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