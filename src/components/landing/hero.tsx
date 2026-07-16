"use client";

import { useState, useEffect } from "react";
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
        <section
            className="
                relative
                min-h-[700px]
                md:min-h-[750px]
                lg:min-h-[800px]
                overflow-hidden
                bg-[#1a0f2e]
                text-white
                m-auto
            "
        >

            {/* MESH BACKGROUND */}
            <div className="mesh-bg" />

            {/* CONTENIDO */}
            <div
                className="
                    relative
                    z-10
                    container
                    mx-auto
                    px-4
                    py-16
                "
            >

                <div
                    className="
                        relative
                        flex
                        items-center
                        justify-center
                        md:justify-start
                        min-h-[440px]
                        sm:min-h-[480px]
                        md:min-h-[520px]
                        lg:min-h-[600px]
                    "
                >

                    {/* ILUSTRACIÓN: capa de fondo, detrás del texto */}
                    <div
                        className="
                            absolute
                            inset-0
                            flex
                            items-center
                            justify-center
                            md:justify-end
                            pointer-events-none
                            translate-y-50 
                            md:translate-y-0
                        "
                    >

                        <div
                            className="
                                absolute
                                w-72
                                h-72
                                rounded-full
                                bg-white/15
                                blur-3xl
                            "
                        />

                        <NetworkIllustration
                            className="
                                w-[70%]
                                max-w-[260px]
                                sm:max-w-[320px]
                                md:w-[60%]
                                md:max-w-lg
                                lg:max-w-3xl
                                md:mr-[-1rem]
                                lg:mr-4
                                opacity-95
                            "
                        />
                    </div>

                    {/* TEXTO */}
                    <div
                        className="
                            relative
                            z-10
                            flex
                            flex-col
                            gap-6
                            items-center
                            text-center
                            md:items-start
                            md:text-left
                            max-w-xl
                        "
                    >

                        <div className="overflow-hidden">
                            <h1
                                key={index}
                                className="
                                    text-7xl
                                    md:text-9xl
                                    font-bold
                                    light-mesh-gradient
                                "
                            >
                                {words[index]}
                            </h1>

                            <p className="mt-4 text-white/80">
                                Connect with people, discover new groups, and share experiences with those who have the same interests as you.
                            </p>
                        </div>

                        {/* STORE BUTTONS */}
                        <div className="flex gap-4">

                            <a href="https://www.apple.com/app-store/">
                                <Image
                                    src="/app-store-badge.svg"
                                    alt="Descargar en App Store"
                                    width={180}
                                    height={54}
                                />
                            </a>

                            <a href="https://play.google.com">
                                <Image
                                    src="/google-play-badge.svg"
                                    alt="Disponible en Google Play"
                                    width={180}
                                    height={54}
                                />
                            </a>

                        </div>

                        {/* ACTION BUTTONS */}
                        <div className="flex gap-4">

                            <Link
                                href="/registro"
                                className="
                                    inline-flex
                                    items-center
                                    justify-center
                                    px-6
                                    py-3
                                    rounded-md
                                    bg-white
                                    text-[#711F5C]
                                    font-semibold
                                    hover:bg-white/90
                                    hover:scale-110
                                    hover:shadow-xl
                                    transition
                                "
                            >
                                Let&apos;s go!
                            </Link>

                            <Link
                                href="/sobre-nosotros"
                                className="
                                    inline-flex
                                    items-center
                                    justify-center
                                    px-6
                                    py-3
                                    rounded-md
                                    border
                                    border-white/60
                                    text-white
                                    hover:bg-white/10
                                    hover:scale-110
                                    hover:shadow-xl
                                    transition
                                "
                            >
                                See more
                            </Link>

                        </div>

                    </div>

                </div>
            </div>
        </section>
    );
}
