"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Home, User, Bell, Settings } from "lucide-react";

export default function SideMenu() {

    const [isOpen, setIsOpen] = useState(false);

    // Opciones del menú
    const MENU_ITEMS = [
        { icon: Home, label: "Home", href: "#" },
        { icon: User, label: "Profile", href: "#" },
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

            <div className="w-[200px] bg-black">
                <nav>
                    
                </nav>
            </div>
        </>
    );
}