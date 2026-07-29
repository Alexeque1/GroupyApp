"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Home, User, Bell, Settings } from "lucide-react";
import Image from "next/image";

const MENU_ITEMS = [
    { icon: Home, label: "Home", href: "/feed" },
    { icon: User, label: "Profile", href: "/profile" },
    { icon: Bell, label: "Discover", href: "#" },
    { icon: Settings, label: "Settings", href: "#" },
];

export default function SideMenu() {
    const [isHovered, setIsHovered] = useState(false);
    const pathname = usePathname();

    return (
        <motion.aside
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            initial={{ width: 80 }}
            animate={{
                width: isHovered ? 250 : 80,
            }}
            transition={{
                type: "spring",
                stiffness: 300,
                damping: 25,
            }}
            // AQUÍ ESTÁ LA NUEVA SOMBRA PREMIUM:
            className="fixed left-4 top-4 z-50 hidden h-[calc(100dvh-32px)] flex-col overflow-hidden rounded-[30px] border border-white/10 bg-[#0a0514]/95 shadow-[0_8px_24px_rgba(0,0,0,0.25),_0_0_12px_rgba(140,108,255,0.08)] backdrop-blur-xl lg:flex transform-gpu will-change-auto"
        >
            {/* HEADER / LOGO */}
            <div className="relative h-24 shrink-0">
                {/* CÍRCULO CON LOGO SIEMPRE EN LA MISMA POSICIÓN */}
                <div className="absolute left-5 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border-2 border-[#8C6CFF] bg-[#0a0514] shadow-[0_0_15px_rgba(140,108,255,0.4)]">
                    <Image
                        src="/logo.png"
                        alt="Logo de Groupy"
                        width={22}
                        height={22}
                        className="object-contain"
                    />
                </div>

                {/* TEXTO GROUPY */}
                <AnimatePresence>
                    {isHovered && (
                        <motion.span
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            transition={{ duration: 0.2 }}
                            className="absolute left-[74px] top-1/2 -translate-y-1/2 whitespace-nowrap text-xl font-bold tracking-wide text-white"
                        >
                            Groupy
                        </motion.span>
                    )}
                </AnimatePresence>
            </div>

            {/* NAVEGACIÓN */}
            <nav className="flex flex-1 flex-col gap-2 px-3 py-4">
                {MENU_ITEMS.map((item, index) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;

                    return (
                        <a
                            key={item.label}
                            href={item.href}
                            className={`group relative flex items-center rounded-2xl px-3 py-3 transition-colors ${
                                isActive
                                    ? "bg-white/10 text-white"
                                    : "text-white/60 hover:bg-white/10 hover:text-white"
                            }`}
                        >
                            {/* ICONO */}
                            <div className="flex w-8 shrink-0 items-center justify-center">
                                <Icon
                                    size={22}
                                    className={`transition-transform duration-300 group-hover:scale-110 ${
                                        isActive
                                            ? "text-[#A9FFD7]"
                                            : "group-hover:text-[#A9FFD7]"
                                    }`}
                                />
                            </div>

                            {/* TEXTO DEL MENÚ */}
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

                            {/* INDICADOR DE PÁGINA ACTIVA */}
                            {isActive && (
                                <motion.div
                                    layoutId="active-menu-item"
                                    className="absolute right-0 h-6 w-1 rounded-l-full bg-[#A9FFD7]"
                                    transition={{
                                        type: "spring",
                                        stiffness: 400,
                                        damping: 30,
                                    }}
                                />
                            )}
                        </a>
                    );
                })}
            </nav>
        </motion.aside>
    );
}