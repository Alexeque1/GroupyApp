"use client";

import { useState } from "react";
import Image from "next/image";
import { Bell, UserPlus, ShieldQuestion, MessageCircle, CalendarClock, ChevronDown } from "lucide-react";
import Button from "../ui/button";

type NotifType = "friend_request" | "join_request" | "comment" | "event_rescheduled";
type SourceType = "group" | "community" | "personal";

interface NotificationType {
    id: number;
    type: NotifType;
    sourceType: SourceType;
    sourceName: string;
    content: string;
    time: string;
    image: string;
}

export default function HomeWhatsNew() {
    // Estado para controlar el dropdown en versión móvil (cerrado por defecto)
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    const NOTIFICATIONS_DATA: NotificationType[] = [
        {
            id: 1,
            type: "friend_request",
            sourceType: "personal",
            sourceName: "Mateo R.",
            content: "Te ha enviado una solicitud de amistad.",
            time: "Hace 10 min",
            image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop",
        },
        {
            id: 2,
            type: "join_request",
            sourceType: "group",
            sourceName: "UX/UI Designers Arg",
            content: "Sofía L. solicitó unirse a tu grupo.",
            time: "Hace 1 hora",
            image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=200&auto=format&fit=crop",
        },
        {
            id: 3,
            type: "comment",
            sourceType: "community",
            sourceName: "Desarrolladores Web",
            content: "Lucas M. comentó: '¡Excelente aporte, me sirvió mucho!'",
            time: "Hace 3 horas",
            image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=200&auto=format&fit=crop",
        },
        {
            id: 4,
            type: "event_rescheduled",
            sourceType: "group",
            sourceName: "Weekend Trekking",
            content: "El grupi 'Salida a las Sierras' fue re-programado para el sábado.",
            time: "Ayer",
            image: "https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=200&auto=format&fit=crop",
        }
    ];

    const getNotificationIcon = (type: NotifType) => {
        switch (type) {
            case "friend_request":
                return <UserPlus size={12} className="text-[#FFB199]" />;
            case "join_request":
                return <ShieldQuestion size={12} className="text-[#A9FFD7]" />;
            case "comment":
                return <MessageCircle size={12} className="text-[#8C6CFF]" />;
            case "event_rescheduled":
                return <CalendarClock size={12} className="text-[#FFB199]" />;
        }
    };

    const getSourceTag = (source: SourceType) => {
        switch (source) {
            case "group":
                return <span className="rounded-md bg-[#8C6CFF]/10 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[#6D28D9]">Grupo</span>;
            case "community":
                return <span className="rounded-md bg-[#A9FFD7]/30 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[#059669]">Comunidad</span>;
            case "personal":
                return <span className="rounded-md bg-black/5 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-black/50">Usuario</span>;
        }
    };

    return (
        <div className="relative z-10 flex flex-col rounded-3xl border border-black/10 bg-white p-5 shadow-[0_8px_30px_rgba(0,0,0,0.06)]">

            {/* HEADER INTERACTIVO */}
            <div 
                // En móvil es clickable, en desktop el cursor es normal
                className="flex cursor-pointer items-center justify-between px-1 md:cursor-default"
                onClick={() => setIsMobileOpen(!isMobileOpen)}
            >
                <div className="flex items-center gap-2">
                    <Bell size={18} className="text-[#8C6CFF]" />
                    <h3 className="text-xl font-bold text-black/90">
                        What's new?
                    </h3>
                </div>
                
                <div className="flex items-center gap-3">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#8C6CFF]/10 text-[10px] font-bold text-[#6D28D9]">
                        {NOTIFICATIONS_DATA.length}
                    </span>
                    {/* Flecha solo visible en móvil */}
                    <ChevronDown 
                        size={20} 
                        className={`text-black/40 transition-transform duration-300 md:hidden ${isMobileOpen ? "rotate-180" : ""}`} 
                    />
                </div>
            </div>

            {/* CONTENEDOR COLAPSABLE (Magia CSS) */}
            <div 
                className={`grid transition-all duration-300 ease-in-out md:grid-rows-[1fr] md:opacity-100 ${
                    isMobileOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
            >
                <div className="overflow-hidden">
                    
                    {/* SEPARADOR (Movido adentro para que se oculte al colapsar) */}
                    <div className="mb-4 mt-4 h-px w-full bg-black/5" />

                    {/* LISTA DE NOTIFICACIONES */}
                    <div className="flex flex-col gap-2">
                        {NOTIFICATIONS_DATA.map((notif) => (
                            <div
                                key={notif.id}
                                className="group relative flex cursor-pointer items-start gap-3 rounded-2xl p-2 transition-colors hover:bg-black/5"
                            >
                                <div className="relative mt-1 h-10 w-10 shrink-0">
                                    <Image
                                        src={notif.image}
                                        alt={notif.sourceName}
                                        fill
                                        className="rounded-full object-cover shadow-sm"
                                    />
                                    <div className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-[#0a0514]">
                                        {getNotificationIcon(notif.type)}
                                    </div>
                                </div>

                                <div className="flex flex-1 flex-col">
                                    <div className="flex items-center gap-2">
                                        <h4 className="text-sm font-bold text-black/80 transition-colors group-hover:text-black">
                                            {notif.sourceName}
                                        </h4>
                                        {getSourceTag(notif.sourceType)}
                                    </div>

                                    <p className="mt-0.5 line-clamp-2 text-xs font-medium text-black/70">
                                        {notif.content}
                                    </p>

                                    <span className="mt-1.5 text-[10px] font-semibold uppercase tracking-wider text-black/40">
                                        {notif.time}
                                    </span>
                                </div>

                                <div className="mt-2 flex h-2.5 w-2.5 shrink-0 items-center justify-center rounded-full bg-[#8C6CFF] shadow-[0_0_8px_rgba(140,108,255,0.6)]" />
                            </div>
                        ))}
                    </div>

                    {/* BOTONES */}
                    <div className="mt-5 flex justify-center gap-2">
                        <Button
                            tone="dark"
                            className="px-6 py-2"
                            textClassName="text-xs sm:text-sm whitespace-nowrap"
                        >
                            Mark all read
                        </Button>
                        <Button
                            tone="dark"
                            className="px-6 py-2"
                            textClassName="text-xs sm:text-sm whitespace-nowrap"
                        >
                            See all
                        </Button>
                    </div>

                </div>
            </div>

        </div>
    );
}