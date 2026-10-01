"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/button";

const words = ["It's Groupy", "Discover", "Connect", "Have fun", "Share", "Enjoy", "Meet"];

const POSTER_SRC = "/videos/hero-poster.webp";
const DESKTOP_QUERY = "(min-width: 768px)";
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

// Only load the video where it's worth it: desktop/tablet, no reduced motion, no data saver.
function shouldPlayVideo() {
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    return (
        window.matchMedia(DESKTOP_QUERY).matches &&
        !window.matchMedia(REDUCED_MOTION_QUERY).matches &&
        !connection?.saveData
    );
}

function subscribeToMediaQueries(onChange: () => void) {
    const queries = [DESKTOP_QUERY, REDUCED_MOTION_QUERY].map((query) => window.matchMedia(query));
    queries.forEach((query) => query.addEventListener("change", onChange));
    return () => queries.forEach((query) => query.removeEventListener("change", onChange));
}

export default function Hero() {
    const sectionRef = useRef<HTMLElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [index, setIndex] = useState(0);
    const [videoReady, setVideoReady] = useState(false);
    
    // Server render (and first hydration pass) never includes the video, so mobile never downloads it.
    const showVideo = useSyncExternalStore(subscribeToMediaQueries, shouldPlayVideo, () => false);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((current) => (current + 1) % words.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    // Pause the video when the hero is off-screen so it doesn't keep decoding while the user scrolls.
    useEffect(() => {
        const section = sectionRef.current;
        const video = videoRef.current;
        if (!showVideo || !section || !video) return;

        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) video.play().catch(() => {});
            else video.pause();
        });
        observer.observe(section);
        return () => observer.disconnect();
    }, [showVideo]);

    return (
        <section ref={sectionRef} className="relative min-h-[700px] md:min-h-[750px] lg:min-h-[800px] overflow-hidden bg-brand-violet text-white m-auto">

            {/* 1. BACKGROUND: static poster (LCP + mobile) and video on top only on desktop */}
            <Image
                src={POSTER_SRC}
                alt=""
                fill
                preload
                sizes="100vw"
                className="object-cover z-0"
            />
            {showVideo && (
                <video
                    ref={videoRef}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                    aria-hidden="true"
                    onPlaying={() => setVideoReady(true)}
                    className={`absolute inset-0 w-full h-full object-cover z-0 transition-opacity duration-700 ${videoReady ? "opacity-100" : "opacity-0"}`}
                >
                    <source src="/videos/hero.webm" type="video/webm" />
                    <source src="/videos/hero.mp4" type="video/mp4" />
                </video>
            )}

            {/* 2. BRAND OVERLAY: darker where the text sits for better contrast */}
            <div className="absolute inset-0 z-10 bg-brand-violet/70 md:bg-transparent md:bg-gradient-to-r md:from-brand-violet/90 md:via-brand-violet/60 md:to-brand-violet/30"></div>

            {/* 3. AURORA (radial gradients animated with transform only, see globals.css) */}
            <div className="absolute inset-0 z-20 pointer-events-none" aria-hidden="true">
                <div className="hero-aurora hero-aurora--fuchsia"></div>
                <div className="hero-aurora hero-aurora--cyan"></div>
                <div className="hero-aurora hero-aurora--amber"></div>
            </div>

            {/* 4. NEON WAVE: the glow is a wide translucent stroke, no CSS filters */}
            <div className="absolute inset-0 z-30 pointer-events-none opacity-70" aria-hidden="true">
                <svg viewBox="0 0 1440 800" fill="none" preserveAspectRatio="none" className="w-full h-full">
                    <defs>
                        <linearGradient id="neonGradient" x1="0" y1="0" x2="1440" y2="800" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#e879f9" />
                            <stop offset="0.5" stopColor="#a78bfa" />
                            <stop offset="1" stopColor="#22d3ee" />
                        </linearGradient>
                    </defs>
                    <path d="M-100 520 C 300 220, 800 820, 1540 380" stroke="url(#neonGradient)" strokeWidth="18" strokeLinecap="round" strokeOpacity="0.15" />
                    <path d="M-100 520 C 300 220, 800 820, 1540 380" stroke="url(#neonGradient)" strokeWidth="2.5" strokeLinecap="round" />
                    <path d="M-100 600 C 400 360, 900 860, 1540 480" stroke="url(#neonGradient)" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.4" />
                </svg>
            </div>

            {/* CONTENIDO PRINCIPAL */}
            <div className="relative z-40 container mx-auto py-16">
                <div className="relative flex items-center justify-center md:justify-start min-h-[440px] sm:min-h-[480px] md:min-h-[520px] lg:min-h-[600px]">

                    {/* TEXTO Y BOTONES */}
                    <div className="relative z-50 flex flex-col gap-6 items-center text-center md:items-start md:text-left max-w-xl">
                        <div className="overflow-hidden">
                            {/* key={index} remounts the h1 on each word so wordRise replays */}
                            <h1 key={index} className="text-7xl md:text-8xl lg:text-9xl font-bold light-mesh-gradient">
                                {words[index]}
                            </h1>
                            <p className="mt-4 text-white/90 text-lg md:text-xl drop-shadow-md">
                                Connect with people, discover new events, and share experiences with those who have the same interests as you.
                            </p>
                        </div>

                        <div className="flex gap-4">
                            <a href="https://www.apple.com/app-store/" className="hover:scale-105 transition-transform">
                                <Image src="/app-store-badge.svg" alt="App Store" width={180} height={54} />
                            </a>
                            <a href="https://play.google.com" className="hover:scale-105 transition-transform">
                                <Image src="/google-play-badge.svg" alt="Google Play" width={180} height={54} />
                            </a>
                        </div>

                        <div className="flex gap-4 mt-4">
                            <Link href="/auth?mode=signup">
                                <Button className="shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                                    Get Started!
                                </Button>
                            </Link>
                            <Link href="/about-us">
                                {/* Botón secundario con efecto glassmorphism para que el video y luces se luzcan */}
                                <Button variant="outline" className="py-4 backdrop-blur-sm bg-white/10 border-white/20 hover:bg-white/20 text-white">
                                    See more
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}