"use client";

import AnimatedBackgroundLight from "@/components/ui/backgrounds/animated-background-light";
import { motion } from "framer-motion";
import CreateAsideSection from "@/components/create/create-aside-section";
import CreateMainSection from "@/components/create/create-main-section";
import { CreateProvider } from "@/components/create/create-context";

export default function Create() {
    return (
        <>
            <div className="relative flex flex-col py-10 px-5 gap-10 z-10">
                <AnimatedBackgroundLight />

                <CreateProvider>
                    <motion.div
                        initial={{ opacity: 0, y: -40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[minmax(0,1fr)_320px]"
                    >
                        <CreateMainSection/>
                        <CreateAsideSection/>
                    </motion.div>
                </CreateProvider>
            </div>
        </>
    );
}