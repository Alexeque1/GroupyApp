"use client";

import { motion, AnimatePresence } from "framer-motion";
import { LogOut } from "lucide-react";

interface AlertFinishSessionProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

export default function AlertFinishSession({ isOpen, onClose, onConfirm }: AlertFinishSessionProps) {
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
                        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-red-500">
                            <LogOut size={28} className="translate-x-0.5" />
                        </div>

                        {/* TEXTOS */}
                        <h3 className="mb-2 text-xl font-bold text-black/90">
                            Loggin Out
                        </h3>
                        <p className="mb-6 text-sm text-black/60">
                            You are about to log out of your account. You will need to log back in to access your groups.
                        </p>

                        {/* BOTONES */}
                        <div className="flex w-full gap-3">
                            <button
                                onClick={onClose}
                                // Agregamos duration-300 para un hover más suave
                                className="cursor-pointer flex-1 rounded-2xl bg-black/5 py-3 text-sm font-semibold text-black/70 transition-colors duration-300 hover:bg-black/10 hover:text-black"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={onConfirm}
                                // Cambiamos a transition-all y agregamos duration-300 para que color y sombra se animen lento
                                className="cursor-pointer flex-1 rounded-2xl bg-red-500 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-red-600 shadow-[0_4px_14px_rgba(239,68,68,0.4)] hover:shadow-[0_6px_20px_rgba(239,68,68,0.6)]"
                            >
                                Yes, log out
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}