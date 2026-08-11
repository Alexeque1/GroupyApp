"use client";

import { motion, AnimatePresence } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Mapeo de colores por variante: dónde aplica cada acción (logout, unfollow, delete...)
const iconWrapperVariants = cva(
    "mb-4 flex h-14 w-14 items-center justify-center rounded-full",
    {
        variants: {
            variant: {
                danger: "bg-red-100 text-red-500",
                warning: "bg-amber-100 text-amber-500",
                neutral: "bg-black/5 text-black/60",
            },
        },
        defaultVariants: {
            variant: "danger",
        },
    }
);

const confirmButtonVariants = cva(
    "cursor-pointer flex-1 rounded-2xl py-3 text-sm font-semibold text-white transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-60",
    {
        variants: {
            variant: {
                danger:
                    "bg-red-500 hover:bg-red-600 shadow-[0_4px_14px_rgba(239,68,68,0.4)] hover:shadow-[0_6px_20px_rgba(239,68,68,0.6)]",
                warning:
                    "bg-amber-500 hover:bg-amber-600 shadow-[0_4px_14px_rgba(245,158,11,0.4)] hover:shadow-[0_6px_20px_rgba(245,158,11,0.6)]",
                neutral:
                    "bg-black/80 hover:bg-black shadow-[0_4px_14px_rgba(0,0,0,0.25)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.35)]",
            },
        },
        defaultVariants: {
            variant: "danger",
        },
    }
);

interface ConfirmAlertProps extends VariantProps<typeof iconWrapperVariants> {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    icon: LucideIcon;
    title: string;
    description: string;
    confirmLabel: string;
    cancelLabel?: string;
    isLoading?: boolean;
}

export default function ConfirmAlert({
    isOpen,
    onClose,
    onConfirm,
    icon: Icon,
    title,
    description,
    confirmLabel,
    cancelLabel = "Cancel",
    isLoading = false,
    variant = "danger",
}: ConfirmAlertProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-[#0a0514]/40 backdrop-blur-sm"
                    />

                    {/* CONTENEDOR DEL MODAL */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        onClick={(e) => e.stopPropagation()}
                        className="relative flex w-full max-w-sm flex-col items-center overflow-hidden rounded-3xl bg-white p-6 text-center shadow-[0_20px_50px_rgba(0,0,0,0.2)]"
                    >
                        {/* ÍCONO DE ALERTA */}
                        <div className={cn(iconWrapperVariants({ variant }))}>
                            <Icon size={28} className="translate-x-0.5" />
                        </div>

                        {/* TEXTOS */}
                        <h3 className="mb-2 text-xl font-bold text-black/90">
                            {title}
                        </h3>
                        <p className="mb-6 text-sm text-black/60">
                            {description}
                        </p>

                        {/* BOTONES */}
                        <div className="flex w-full gap-3">
                            <button
                                onClick={onClose}
                                disabled={isLoading}
                                className="cursor-pointer flex-1 rounded-2xl bg-black/5 py-3 text-sm font-semibold text-black/70 transition-colors duration-300 hover:bg-black/10 hover:text-black disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {cancelLabel}
                            </button>
                            <button
                                onClick={onConfirm}
                                disabled={isLoading}
                                className={cn(confirmButtonVariants({ variant }))}
                            >
                                {isLoading ? "..." : confirmLabel}
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
