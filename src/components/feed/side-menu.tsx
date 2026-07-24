"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, User, Bell, Settings } from "lucide-react";

export default function SideMenu() {
    const [isHovered, setIsHovered] = useState(false);

    // Opciones del menú
    const MENU_ITEMS = [
        { icon: Home, label: "Home", href: "#" },
        { icon: User, label: "Profile", href: "#" },
        { icon: Bell, label: "Discover", href: "#" },
        { icon: Settings, label: "Settings", href: "#" },
    ];

    return (
        <>
            {/* =========================================
                SPACER FANTASMA
                ========================================= */}
            <div className="hidden lg:block w-[80px] shrink-0 h-screen" />

            {/* =========================================
                SIDEBAR EXPANDIBLE
                ========================================= */}
            <motion.div
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                initial={{ width: 80 }}
                animate={{ width: isHovered ? 240 : 80 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                // FIX APLICADO AQUÍ: transform-gpu y will-change-auto
                className="fixed left-0 top-0 z-50 hidden lg:flex h-screen flex-col border-r border-white/10 bg-[#0a0514]/95 backdrop-blur-xl overflow-hidden transform-gpu will-change-auto"
            >
                {/* Header del menú / Logo */}
                <div className="flex h-24 items-center px-6">
                    <div className="h-8 w-8 shrink-0 rounded-xl bg-gradient-to-tr from-[#8C6CFF] to-[#A9FFD7] shadow-[0_0_15px_rgba(140,108,255,0.4)]" />
                    
                    <AnimatePresence>
                        {isHovered && (
                            <motion.span
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                transition={{ duration: 0.2 }}
                                className="ml-4 whitespace-nowrap text-xl font-bold tracking-wide text-white"
                            >
                                Groupy
                            </motion.span>
                        )}
                    </AnimatePresence>
                </div>

                {/* Lista de navegación */}
                <nav className="flex flex-1 flex-col gap-2 px-3 py-4">
                    {MENU_ITEMS.map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <a
                                key={item.label}
                                href={item.href}
                                className="group relative flex items-center rounded-2xl px-3 py-3 text-white/60 transition-colors hover:bg-white/10 hover:text-white"
                            >
                                {/* Ícono centrado y fijo a la izquierda */}
                                <div className="flex w-8 shrink-0 items-center justify-center">
                                    <Icon size={22} className="transition-transform duration-300 group-hover:scale-110 group-hover:text-[#A9FFD7]" />
                                </div>
                                
                                {/* Texto que aparece solo en Hover */}
                                <AnimatePresence>
                                    {isHovered && (
                                        <motion.span
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -10 }}
                                            transition={{ duration: 0.2, delay: index * 0.03 }}
                                            className="ml-4 whitespace-nowrap text-sm font-medium"
                                        >
                                            {item.label}
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                            </a>
                        );
                    })}
                </nav>
            </motion.div>
        </>
    );
}