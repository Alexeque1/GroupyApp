"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import NetworkIllustration from "./network-illustration";
import LiquidButton from "@/components/ui/liquid_button";
import OutlineButton from "../ui/outlined-button";

const words = ["It's Groupy", "Discover", "Connect", "Have fun", "Share", "Enjoy", "Meet"];

export default function Hero() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((current) => (current + 1) % words.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="relative min-h-[700px] md:min-h-[750px] lg:min-h-[800px] overflow-hidden bg-[#1a0f2e] text-white m-auto">
            
            {/* MESH BACKGROUND */}
            <div className="mesh-bg" />

            {/* CONTENIDO PRINCIPAL */}
            <div className="relative z-10 container mx-auto px-4 py-16">
                <div className="relative flex items-center justify-center md:justify-start min-h-[440px] sm:min-h-[480px] md:min-h-[520px] lg:min-h-[600px]">
                    
                    {/* ILUSTRACIÓN DE RED */}
                    <div className="absolute inset-0 flex items-center justify-center md:justify-end pointer-events-none translate-y-65 md:translate-y-0 md:translate-x-32 lg:translate-x-48">
                        {/* Fondo brillante */}
                        <div className="absolute w-72 h-72 rounded-full bg-white/15 blur-3xl z-0" />
                        
                        {/* Mapa de Nodos */}
                        <NetworkIllustration className="w-[90%] max-w-[340px] sm:max-w-[420px] md:w-[80%] md:max-w-[650px] lg:max-w-[850px] opacity-95 z-10" />
                    </div>

                    {/* TEXTO Y BOTONES */}
                    <div className="relative z-30 flex flex-col gap-6 items-center text-center md:items-start md:text-left max-w-xl">
                        <div className="overflow-hidden">
                            <h1 key={index} className="text-7xl md:text-9xl font-bold light-mesh-gradient animate-fade-in-up">
                                {words[index]}
                            </h1>
                            <p className="mt-4 text-white/80">
                                Connect with people, discover new groups, and share experiences with those who have the same interests as you.
                            </p>
                        </div>

                        <div className="flex gap-4">
                            <a href="https://www.apple.com/app-store/">
                                <Image src="/app-store-badge.svg" alt="App Store" width={180} height={54} />
                            </a>
                            <a href="https://play.google.com">
                                <Image src="/google-play-badge.svg" alt="Google Play" width={180} height={54} />
                            </a>
                        </div>

                        <div className="flex gap-4">
                            <Link href="/auth?mode=signup">
                                <LiquidButton onClick={() => console.log("Get Started!")}>
                                    Get Started!
                                </LiquidButton>
                            </Link>
                            <Link href="/about-us">
                                <OutlineButton className="py-4">
                                    See more
                                </OutlineButton>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}