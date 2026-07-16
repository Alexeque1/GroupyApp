"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import NetworkIllustration from "./network-illustration";

const words = ["Discover", "Connect", "Create", "Share", "Enjoy"];

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
                    
                    {/* ILUSTRACIÓN Y TARJETAS FLOTANTES */}
                    <div className="absolute inset-0 flex items-center justify-center md:justify-end pointer-events-none translate-y-65 md:translate-y-0">
                        
                        {/* Contenedor de las tarjetas */}
                        <div className="absolute inset-0 w-full h-full z-20">
                            {[
                                { src: "/assets_hero/asset1.png", top: "10%", left: "55%" },
                                { src: "/assets_hero/asset2.png", top: "10%", left: "80%" },
                                { src: "/assets_hero/asset3.png", top: "40%", left: "50%" },
                                { src: "/assets_hero/asset4.png", top: "65%", left: "85%" },
                                { src: "/assets_hero/asset5.png", top: "40%", left: "80%" },
                                { src: "/assets_hero/asset6.png", top: "60%", left: "60%" },
                                { src: "/assets_hero/asset7.png", top: "80%", left: "50%" },
                            ].map((card, i) => (
                                <motion.div
                                    key={i}
                                    className="absolute hidden md:block"
                                    animate={{ 
                                        y: [0, -15, 0],
                                        rotate: [0, 5, -5, 0] 
                                    }}
                                    transition={{ 
                                        duration: 4 + i, 
                                        repeat: Infinity, 
                                        ease: "easeInOut" 
                                    }}
                                    style={{ top: card.top, left: card.left }}
                                >
                                    <Image 
                                        src={card.src} 
                                        alt="Floating element" 
                                        width={200} 
                                        height={200} 
                                        className="opacity-90 w-auto h-auto max-w-[140px] object-contain" 
                                    />
                                </motion.div>
                            ))}
                        </div>

                        {/* Fondo brillante e ilustración */}
                        <div className="absolute w-72 h-72 rounded-full bg-white/15 blur-3xl" />
                        <NetworkIllustration className="w-[70%] max-w-[260px] sm:max-w-[320px] md:w-[60%] md:max-w-lg lg:max-w-3xl md:mr-[-1rem] lg:mr-4 opacity-95" />
                    </div>

                    {/* TEXTO Y BOTONES */}
                    <div className="relative z-30 flex flex-col gap-6 items-center text-center md:items-start md:text-left max-w-xl">
                        <div className="overflow-hidden">
                            <h1 key={index} className="text-7xl md:text-9xl font-bold light-mesh-gradient">
                                {words[index]}
                            </h1>
                            <p className="mt-4 text-white/80">
                                Connect with people, discover new groups, and share experiences with those who have the same interests as you.
                            </p>
                        </div>

                        <div className="flex gap-4">
                            <a href="https://www.apple.com/app-store/"><Image src="/app-store-badge.svg" alt="App Store" width={180} height={54} /></a>
                            <a href="https://play.google.com"><Image src="/google-play-badge.svg" alt="Google Play" width={180} height={54} /></a>
                        </div>

                        <div className="flex gap-4">
                            <Link href="/registro" className="inline-flex items-center justify-center px-6 py-3 rounded-md bg-white text-[#711F5C] font-semibold hover:bg-white/90 hover:scale-110 transition">Let's go!</Link>
                            <Link href="/sobre-nosotros" className="inline-flex items-center justify-center px-6 py-3 rounded-md border border-white/60 text-white hover:bg-white/10 hover:scale-110 transition">See more</Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}