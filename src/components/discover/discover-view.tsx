"use client";

import { motion } from "framer-motion";
import DiscoverCategoriesSection from "@/components/discover/discover-categories-section";
import AnimatedBackgroundLight from "@/components/ui/backgrounds/animated-background-light";
import type { DiscoverEvent } from "@/lib/data/events";

export default function DiscoverView({ events }: { events: DiscoverEvent[] }) {
    return (
        <div className="relative flex flex-col py-10 px-5 gap-10 z-10">
            <AnimatedBackgroundLight />

            <motion.div
                initial={{ opacity: 0, y: -40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
            >
                <DiscoverCategoriesSection events={events} />
            </motion.div>
        </div>
    );
}
