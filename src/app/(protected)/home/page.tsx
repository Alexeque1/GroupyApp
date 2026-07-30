"use client";

import HomeGreetings from "@/components/home/home-greetings";
import HomeMain from "@/components/home/home-main";
import HomeAside from "@/components/home/home-aside";
import AnimatedBackgroundDark from "@/components/ui/backgrounds/animated-background-dark";
import AnimatedBackgroundLight from "@/components/ui/backgrounds/animated-background-light";

export default function Feed() {

    return (
        <div className="relative flex flex-col py-10 px-5 gap-10">
            <AnimatedBackgroundLight />

            <HomeGreetings name={"Alexander"} />
            <div className="flex flex-col md:flex-row gap-5">
                <HomeAside />
                <HomeMain />
            </div>
        </div>
    );
}