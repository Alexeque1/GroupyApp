"use client";

import { useMemo, useState } from "react";
import { isSameDay, isValid } from "date-fns";
import { CalendarDays } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { EventType } from "../profile/profile-events-cards";
import { formatEventDate } from "@/lib/date";

export default function HomeCalendar({ events }: { events: EventType[] }) {
    const [selected, setSelected] = useState<Date | undefined>(undefined);

    const eventDays = useMemo(() => {
        return events
            .map((event) => new Date(event.startDate))
            .filter(isValid);
    }, [events]);

    const selectedDayEvents = useMemo(() => {
        if (!selected) return [];
        return events.filter((event) => isSameDay(new Date(event.startDate), selected));
    }, [events, selected]);

    return (
        <div className="relative z-10 flex flex-col rounded-3xl border border-black/10 bg-white p-5 shadow-[0_8px_30px_rgba(0,0,0,0.06)]">

            {/* HEADER */}
            <div className="flex items-center gap-2 px-1">
                <CalendarDays size={18} className="text-brand-purple" />
                <h3 className="text-xl font-bold text-black/90">
                    Event calendar
                </h3>
            </div>

            {/* SEPARADOR */}
            <div className="mb-2 mt-4 h-px w-full bg-black/5" />

            <Calendar
                mode="single"
                selected={selected}
                onSelect={(date) => setSelected((prev) => (prev && date && isSameDay(prev, date) ? undefined : date))}
                modifiers={{ hasEvent: eventDays }}
                className="w-full text-black/80"
            />

            {/* EVENTOS DEL DÍA SELECCIONADO */}
            <div
                className={`grid transition-all duration-300 ease-in-out ${
                    selected ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
            >
                <div className="overflow-hidden">
                    <div className="mt-3 flex flex-col gap-2 border-t border-black/5 pt-3">
                        {selectedDayEvents.length > 0 ? (
                            selectedDayEvents.map((event) => (
                                <div key={event.id} className="flex items-center justify-between gap-2 rounded-2xl bg-black/5 px-3 py-2 transition-colors hover:bg-black/10">
                                    <span className="truncate text-sm font-semibold text-black/80">
                                        {event.title}
                                    </span>
                                    <span className="shrink-0 text-xs font-medium text-black/50">
                                        {formatEventDate(event.startDate)}
                                    </span>
                                </div>
                            ))
                        ) : (
                            <p className="px-1 py-1 text-center text-xs font-medium text-black/50">
                                No events on this day.
                            </p>
                        )}
                    </div>
                </div>
            </div>

        </div>
    );
}
