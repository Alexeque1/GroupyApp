"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Home, User, Bell, Settings } from "lucide-react";

export default function FloatingLiquidMenu() {
    const [isOpen, setIsOpen] = useState(false);

    // Opciones del menú
    const MENU_ITEMS = [
        { icon: Home, label: "Home", href: "/feed" },
        { icon: User, label: "Profile", href: "/profile" },
        { icon: Bell, label: "Discover", href: "#" },
        { icon: Settings, label: "Settings", href: "#" },
    ];

    return (
        <>
            {/* OVERLAY (Fondo oscuro) */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        onClick={() => setIsOpen(false)}
                        className="fixed inset-0 z-40 bg-[#0a0514]/60 backdrop-blur-sm"
                    />
                )}
            </AnimatePresence>

            {/* CONTENEDOR FLOTANTE  */}
            <div className="lg:hidden fixed bottom-8 right-8 z-50 flex flex-col items-end gap-4">

                {/* MENÚ DESPLEGABLE */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: 20, scale: 0.9, transformOrigin: "bottom right" }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 20, scale: 0.9 }}
                            transition={{ type: "spring", stiffness: 400, damping: 25 }}
                            className="w-64 rounded-3xl border border-white/10 bg-[#1a0f2e]/90 p-4 shadow-[0_8px_30px_rgba(0,0,0,0.5)] backdrop-blur-md"
                        >
                            <nav className="flex flex-col gap-2">
                                {MENU_ITEMS.map((item, index) => {
                                    const Icon = item.icon;
                                    return (
                                        <motion.a
                                            key={item.label}
                                            href={item.href}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.05 + 0.1 }}
                                            className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            <Icon size={18} className="text-[#A9FFD7]" />
                                            {item.label}
                                        </motion.a>
                                    );
                                })}
                            </nav>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* BOTÓN LÍQUIDO RECTANGULAR */}
                <motion.button
                    onClick={() => setIsOpen(!isOpen)}
                    // Animación de "respiración" para hacerlo más orgánico
                    animate={{
                        borderRadius: ["16px", "20px", "16px"],
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="group relative flex h-14 w-32 cursor-pointer items-center justify-center overflow-hidden bg-[#0a0514] shadow-[0_8px_30px_rgba(140,108,255,0.3)] transition-transform duration-300 hover:scale-105 active:scale-95"
                >
                    {/* FONDO LÍQUIDO (Plasma en movimiento) */}
                    <div className="absolute inset-0 z-0 overflow-hidden opacity-80 blur-[12px]">
                        {/* Bola Morada */}
                        <motion.div
                            animate={{ x: [0, 40, -10, 0], y: [0, -20, 20, 0] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute -left-1/4 -top-1/4 h-[150%] w-[150%] rounded-full bg-[#8C6CFF]/60"
                        />
                        {/* Bola Verde */}
                        <motion.div
                            animate={{ x: [0, -30, 20, 0], y: [0, 30, -10, 0] }}
                            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute -bottom-1/4 -right-1/4 h-[150%] w-[150%] rounded-full bg-[#A9FFD7]/60"
                        />
                        {/* Bola Naranja */}
                        <motion.div
                            animate={{ x: [0, 20, -30, 0], y: [0, -10, 30, 0] }}
                            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute left-1/4 top-1/4 h-[100%] w-[100%] rounded-full bg-[#FFB199]/50"
                        />
                    </div>

                    {/* Sombra interna para dar profundidad al "tanque de agua" */}
                    <div className="absolute inset-0 z-10 shadow-[inset_0_0_15px_rgba(0,0,0,0.6)]" />

                    {/* Borde sutil cristalino */}
                    <div className="absolute inset-0 z-20 rounded-2xl border border-white/20 transition-colors duration-300 group-hover:border-white/40" />

                    {/* CONTENIDO DEL BOTÓN (Icono + Texto) */}
                    <div className="relative z-30 flex items-center gap-2 text-white drop-shadow-md">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={isOpen ? "close" : "menu"}
                                initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
                                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                                exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
                                transition={{ duration: 0.2 }}
                                className="flex items-center gap-2 font-bold tracking-wide"
                            >
                                {isOpen ? (
                                    <>
                                        <X size={20} />
                                        <span>Cerrar</span>
                                    </>
                                ) : (
                                    <>
                                        <Menu size={20} />
                                        <span>Menú</span>
                                    </>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </motion.button>

            </div>
        </>
    );
}