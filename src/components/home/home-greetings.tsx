"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CalendarClock, Search, Plus, Bell } from "lucide-react";
import Button from "../ui/button";
import { EventType } from "../profile/profile-events-cards";
import Link from "next/link";

interface HomeGreetingsProps {
    name: string;
    events: EventType[];
}

export default function HomeGreetings({ name, events }: HomeGreetingsProps) {
    const [displayedText, setDisplayedText] = useState("");
    const fullText = `Hello, ${name}!`;
    const eventsCount = events.length;
    const isTypingComplete = displayedText === fullText;

    // Reinicia la animación durante el render cuando cambia el nombre,
    // en vez de llamar a setState de forma síncrona dentro del efecto.
    const [prevFullText, setPrevFullText] = useState(fullText);
    if (fullText !== prevFullText) {
        setPrevFullText(fullText);
        setDisplayedText("");
    }

    useEffect(() => {
        let currentIndex = 0;

        const interval = setInterval(() => {
            if (currentIndex <= fullText.length) {
                setDisplayedText(fullText.slice(0, currentIndex));
                currentIndex++;
            } else {
                clearInterval(interval);
            }
        }, 80);

        return () => clearInterval(interval);
    }, [fullText]);

    return (
        <section className="flex md:flex-col md:flex-row md:items-center justify-between gap-4 w-full z-10">
            {/* IZQUIERDA: Saludo e información */}
            <div className="flex flex-col gap-2">
                <h2 className="flex items-center text-3xl md:text-6xl font-bold">
                    {/* TEXTO CON GRADIENTE */}
                    <span className="dark-mesh-gradient">
                        {displayedText}
                    </span>

                    {/* CURSOR PARPADEANTE */}
                    {!isTypingComplete && (
                        <motion.span
                            animate={{ opacity: [1, 0] }}
                            transition={{ duration: 0.6, repeat: Infinity, ease: "linear" }}
                            className="ml-1 inline-block h-[50px] w-[5px] bg-brand-purple"
                        />
                    )}

                    {/* EMOJI QUE APARECE AL FINAL */}
                    <motion.span
                        initial={{ opacity: 0, scale: 0, rotate: -45 }}
                        animate={{
                            opacity: isTypingComplete ? 1 : 0,
                            scale: isTypingComplete ? 1 : 0,
                            rotate: isTypingComplete ? [0, 14, -8, 14, -4, 10, 0] : -45
                        }}
                        transition={{
                            duration: 0.5,
                            delay: 0.1,
                            rotate: { duration: 0.6, delay: 0.2, ease: "easeInOut" }
                        }}
                        className="ml-3 hidden"
                    >
                        👋
                    </motion.span>
                </h2>

                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={isTypingComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
                    transition={{ duration: 0.45, delay: 0.15, ease: "easeOut" }}
                    className="text-sm md:text-lg text-black/70 w-[80%] sm:w-full"
                >
                    <span className="font-bold">3</span> things need your attention · <span className="font-bold">{eventsCount}</span> plans coming up
                </motion.div>
            </div>

            {/* DERECHA: Búsqueda y Botón */}
            <div className="flex items-center gap-3">
                {/* MOBILE / TABLET: solo iconos */}
                <div className="flex items-center gap-2 lg:hidden">
                    <button
                        type="button"
                        aria-label="Search"
                        className="flex h-11 w-11 items-center justify-center rounded-2xl border border-black/5 bg-white shadow-[0_4px_14px_rgba(0,0,0,0.08)] transition-colors hover:bg-black/5"
                    >
                        <Search size={18} className="text-black/70" />
                    </button>

                    <Link
                        href="/create"
                        aria-label="Create plan"
                        className="flex h-11 w-11 items-center justify-center rounded-2xl border border-black/5 bg-white shadow-[0_4px_14px_rgba(0,0,0,0.08)] transition-colors hover:bg-black/5"
                    >
                        <Plus size={20} className="text-black/70" />
                    </Link>

                    <button
                        type="button"
                        aria-label="Notifications"
                        className="relative flex h-11 w-11 items-center justify-center rounded-2xl border border-black/5 bg-white shadow-[0_4px_14px_rgba(0,0,0,0.08)] transition-colors hover:bg-black/5"
                    >
                        <Bell size={18} className="text-black/70" />
                        <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-brand-orange ring-2 ring-white" />
                    </button>
                </div>

                {/* DESKTOP: input de búsqueda completo + botón con texto */}
                <div className="hidden items-center gap-3 lg:flex">
                    <div className="relative flex items-center w-full sm:w-auto shadow-2xl rounded-full">
                        <Search className="absolute left-3.5 text-gray-400 h-4 w-4 pointer-events-none" />
                        <input
                            type="text"
                            placeholder="Search plans, communities, people"
                            className="w-full sm:w-72 md:w-80 rounded-full bg-white/90 pl-10 pr-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 border border-gray-100 shadow-xs focus:outline-none focus:ring-2 focus:ring-brand-purple/20 focus:bg-white transition-all"
                        />
                    </div>

                    <Link href="/create">
                        <Button tone="dark" className="px-6 py-2" textClassName="text-sm">
                            <Plus className="h-4 w-4" />
                            <span className="hidden xl:inline">Create event</span>
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
}