"use client";

import { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { CalendarClock, MapPin, Users, Timer, ArrowUpRight, Sparkles } from "lucide-react";

import { EventType } from "../profile/profile-events-cards";
import Button from "../ui/button";
import { formatEventDate } from "@/lib/date";
import { useCountdown, type CountdownParts } from "@/hooks/use-countdown";
import { pickNextEvent } from "@/lib/event-filters";

function formatCountdownLabel(parts: CountdownParts): string {
    if (parts.hasStarted) return "Happening now";
    if (parts.days > 0) return `Starts in ${parts.days}d ${parts.hours}h`;
    if (parts.hours > 0) return `Starts in ${parts.hours}h ${parts.minutes}m`;
    if (parts.minutes > 0) return `Starts in ${parts.minutes}m`;
    return "Starting now";
}

export default function HomeNextEventHero({ events }: { events: EventType[] }) {
    const nextEvent = useMemo(() => pickNextEvent(events), [events]);

    if (!nextEvent) {
        return (
            <section className="flex min-h-[240px] w-full flex-col items-center justify-center gap-3 rounded-3xl border border-dashed border-black/10 bg-white p-8 text-center shadow-sm">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-black/5">
                    <Sparkles size={26} className="text-black/40" />
                </div>
                <div>
                    <h2 className="text-lg font-bold text-black/80">No upcoming events</h2>
                    <p className="mt-1 text-sm text-black/50">
                        Create an event or join one to see it featured here.
                    </p>
                </div>
                <Link href="/create">
                    <Button tone="dark" className="mt-2 px-8 py-3" textClassName="text-sm">
                        Create event
                    </Button>
                </Link>
            </section>
        );
    }

    return <HeroCard event={nextEvent} />;
}

function HeroCard({ event }: { event: EventType }) {
    const countdown = useCountdown(event.startDate);
    const hasImage = Boolean(event.image);

    return (
        <section
            className={`group/hero relative isolate flex min-h-[320px] w-full flex-col justify-end overflow-hidden rounded-3xl border border-black/10 shadow-[0_8px_30px_rgba(0,0,0,0.1)] sm:min-h-[380px] ${!hasImage ? `bg-gradient-to-br ${event.colorFrom} ${event.colorTo}` : ""
                }`}
        >
            {/* PORTADA */}
            {hasImage && (
                <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    priority
                    sizes="(min-width: 1024px) 800px, 100vw"
                    className="object-cover transition-transform duration-700 group-hover/hero:scale-105"
                />
            )}
            {/* Degradado para que el texto blanco siempre sea legible, con o sin foto */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/10" />

            {/* ETIQUETA: solo indica que es el próximo evento, sin categoría */}
            <div className="absolute left-5 top-5 sm:left-8 sm:top-8">
                <span className="flex items-center gap-2 rounded-full border border-white/30 bg-white/15 px-4 py-2 text-xs font-bold uppercase tracking-widest text-white backdrop-blur-md sm:text-sm">
                    <Sparkles size={14} />
                    Your next event
                </span>
            </div>

            {/* COUNTDOWN */}
            <div className="absolute right-5 top-5 sm:right-8 sm:top-8">
                <div className="flex items-center gap-1.5 rounded-full border border-white/20 bg-gradient-to-r from-brand-peach to-[#FF7A59] px-3 py-1.5 text-xs font-bold text-white shadow-[0_4px_14px_rgba(255,122,89,0.45)]">
                    <Timer size={14} />
                    <span>{countdown ? formatCountdownLabel(countdown) : formatEventDate(event.startDate)}</span>
                </div>
            </div>

            {/* CONTENIDO */}
            <div className="relative z-10 flex flex-col gap-4 p-5 sm:p-8">
                <h2 className="max-w-2xl text-2xl font-bold leading-tight text-white drop-shadow-sm sm:text-4xl">
                    {event.title}
                </h2>

                <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-medium text-white/85">
                    <span className="flex items-center gap-1.5">
                        <CalendarClock size={16} />
                        {formatEventDate(event.startDate)}
                    </span>
                    <span className="flex items-center gap-1.5">
                        <MapPin size={16} />
                        {event.location}
                    </span>
                    <span className="flex items-center gap-1.5">
                        <Users size={16} />
                        {event.members}
                    </span>
                </div>

                <div>
                    <Link href={`/event/${event.id}`}>
                        <Button tone="dark" className="px-8 py-3" textClassName="text-sm">
                            View event
                            <ArrowUpRight size={16} />
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
