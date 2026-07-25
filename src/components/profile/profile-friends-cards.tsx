"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { MoreHorizontal, UserPlus, Users, MessageCircle } from "lucide-react";

export interface FriendType {
    id: number;
    name: string;
    username: string;
    image: string;
    mutualFriends: number;
}

export default function FriendCard({ friend }: { friend: FriendType }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    // Cierra el menú si se hace clic fuera de él
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsMenuOpen(false);
            }
        }
        if (isMenuOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isMenuOpen]);

    return (
        <div 
            className={`group relative flex items-center justify-between rounded-2xl border border-black/10 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] cursor-pointer ${
                isMenuOpen ? "z-50" : "z-10 hover:z-20"
            }`}
        >
            {/* AVATAR E INFO */}
            <div className="flex items-center gap-4">
                {/* Avatar */}
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full">
                    <Image 
                        src={friend.image}
                        alt={friend.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                </div>

                {/* Textos */}
                <div className="flex flex-col">
                    <h4 className="text-sm font-bold text-black/90 group-hover:text-[#6D28D9] transition-colors">
                        {friend.name}
                    </h4>
                    <span className="text-xs font-medium text-black/50">
                        {friend.username}
                    </span>
                    <span className="mt-0.5 text-[11px] text-black/40">
                        {friend.mutualFriends} commun friends
                    </span>
                </div>
            </div>

            {/* BOTÓN DE OPCIONES + DROPDOWN */}
            <div className="relative" ref={menuRef}>
                {/* Botón Trigger */}
                <button 
                    onClick={(e) => {
                        e.stopPropagation();
                        setIsMenuOpen(!isMenuOpen);
                    }}
                    className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors ${
                        isMenuOpen ? "bg-black/10 text-black" : "text-black/40 hover:bg-black/5 hover:text-black/70"
                    }`}
                >
                    <MoreHorizontal size={18} />
                </button>

                {/* Menú Desplegable (Dropdown) */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 10, transformOrigin: "top right" }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 10 }}
                            transition={{ duration: 0.2 }}
                            className="absolute right-0 top-12 z-50 flex w-48 flex-col overflow-hidden rounded-2xl border border-black/10 bg-white p-1.5 shadow-[0_8px_30px_rgba(0,0,0,0.12)]"
                        >
                            {/* Opción 1: Agregar como amigo */}
                            <button 
                                onClick={(e) => { e.stopPropagation(); setIsMenuOpen(false); /* Lógica aquí */ }}
                                className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium text-black/70 transition-colors hover:bg-black/5 hover:text-black"
                            >
                                <UserPlus size={16} className="text-[#6D28D9]" />
                                Add as friend
                            </button>

                            {/* Opción 2: Invitar a grupo */}
                            <button 
                                onClick={(e) => { e.stopPropagation(); setIsMenuOpen(false); /* Lógica aquí */ }}
                                className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium text-black/70 transition-colors hover:bg-black/5 hover:text-black"
                            >
                                <Users size={16} className="text-[#059669]" />
                                Invite group
                            </button>

                            {/* Línea divisoria */}
                            <div className="my-1 h-px w-full bg-black/5" />

                            {/* Opción 3: Enviar mensaje */}
                            <button 
                                onClick={(e) => { e.stopPropagation(); setIsMenuOpen(false); /* Lógica aquí */ }}
                                className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium text-black/70 transition-colors hover:bg-black/5 hover:text-black"
                            >
                                <MessageCircle size={16} className="text-[#EA580C]" />
                                Send message
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}