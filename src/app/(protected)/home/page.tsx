"use client";

import HomeGreetings from "@/components/home/home-greetings";
import HomeMain from "@/components/home/home-main";
import HomeAside from "@/components/home/home-aside";
import AnimatedBackgroundDark from "@/components/ui/backgrounds/animated-background-dark";
import AnimatedBackgroundLight from "@/components/ui/backgrounds/animated-background-light";
import { motion } from "framer-motion";

import { PROFILE_INFO } from "@/lib/mock_data/profile-info";

export default function Feed() {

    return (
        <motion.div
            initial={{ opacity: 0, y: -40 }} // Empieza transparente y 40px más arriba
            animate={{ opacity: 1, y: 0 }}   // Termina 100% visible y en su posición original
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="relative flex flex-col py-10 px-5 gap-10"
        >
            <AnimatedBackgroundLight />

            <HomeGreetings name={PROFILE_INFO.name} />
            <div className="flex flex-col md:flex-row gap-5">
                <HomeAside />
                <HomeMain user={PROFILE_INFO} />
            </div>
        </motion.div>
    );
}