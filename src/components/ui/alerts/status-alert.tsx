"use client";

import { useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
import Portal from "@/components/ui/portal";

const iconWrapperVariants = cva(
    "mb-4 flex h-14 w-14 items-center justify-center rounded-full",
    {
        variants: {
            type: {
                success: "bg-emerald-100 text-emerald-600",
                error: "bg-red-100 text-red-600",
                warning: "bg-yellow-100 text-yellow-600"
            },
        },
        defaultVariants: {
            type: "success",
        },
    }
);

interface StatusAlertProps {
    isOpen: boolean;
    onClose: () => void;
    description: string;
    type: "success" | "error" | "warning";
    duration?: number; 
}

const iconPathVariants: Variants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
        pathLength: 1,
        opacity: 1,
        transition: {
            pathLength: { type: "spring", duration: 0.8, bounce: 0, delay: 0.1 },
            opacity: { duration: 0.01, delay: 0.1 },
        },
    },
};

const AnimatedCheck = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-check"
    >
        <motion.path
            d="M20 6 9 17l-5-5"
            variants={iconPathVariants}
            initial="hidden"
            animate="visible"
        />
    </svg>
);

const AnimatedX = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-x"
    >
        <motion.path
            d="M18 6 6 18"
            variants={iconPathVariants}
            initial="hidden"
            animate="visible"
        />
        <motion.path
            d="M6 6 18 18"
            variants={iconPathVariants}
            initial="hidden"
            animate="visible"
        />
    </svg>
);

const AnimatedExclamation = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-alert-triangle"
    >
        <motion.line
            x1="12"
            y1="4"
            x2="12"
            y2="14"
            variants={iconPathVariants}
            initial="hidden"
            animate="visible"
        />
        <motion.circle
            cx="12"
            cy="19"
            r="0.5"
            fill="currentColor"
            variants={iconPathVariants}
            initial="hidden"
            animate="visible"
        />
    </svg>
);

export default function StatusAlert({
    isOpen,
    onClose,
    description,
    type,
    duration = 3000,
}: StatusAlertProps) {
    
    // Lógica para el cierre automático
    useEffect(() => {
        if (isOpen && duration > 0) {
            const timer = setTimeout(() => {
                onClose();
            }, duration);
            return () => clearTimeout(timer); // Limpia el temporizador al desmontar
        }
    }, [isOpen, onClose, duration]);

    return (
        <Portal>
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">

                    {/* FONDO OSCURO CON BLUR (Reutilizado) */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-[#0a0514]/40 backdrop-blur-sm"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                        transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 25,
                        }}
                        onClick={(e) => e.stopPropagation()}
                        className="relative flex w-full max-w-sm flex-col items-center overflow-hidden rounded-3xl bg-white p-6 pb-8 text-center shadow-[0_20px_50px_rgba(0,0,0,0.2)]"
                    >
                        
                        {/* CONTENEDOR DEL ÍCONO (Adaptado) */}
                        <div className={cn(iconWrapperVariants({ type }))}>
                            {type === "success" && (
                                <AnimatedCheck />
                            )}
                            {type === "error" && (
                                <AnimatedX />
                            )}
                            {type === "warning" && (
                                <AnimatedExclamation />
                            )}
                        </div>

                        {/* DESCRIPCIÓN (Reutilizado) */}
                        <p className="text-sm font-medium text-black/80">
                            {description}
                        </p>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
        </Portal>
    );
}