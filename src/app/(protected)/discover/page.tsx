"use client";

import DiscoverCategoriesSection from "@/components/discover/discover-categories-section";
import AnimatedBackgroundLight from "@/components/ui/backgrounds/animated-background-light";
import { motion } from "framer-motion";

export default function Discover() {
    return (
        <div className="relative flex flex-col py-10 px-5 gap-10 z-10">
            <AnimatedBackgroundLight />

            <motion.div
                initial={{ opacity: 0, y: -40 }} // Empieza transparente y 40px más arriba
                animate={{ opacity: 1, y: 0 }}   // Termina 100% visible y en su posición original
                transition={{ duration: 0.5, ease: "easeOut" }}
            >
                <DiscoverCategoriesSection />
            </motion.div>
        </div>
    );
}