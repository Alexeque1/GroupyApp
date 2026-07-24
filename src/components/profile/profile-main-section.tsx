"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import ProfileSectionGroups from "./profile-main-section-groups";

// Definimos las pestañas que tendrá tu navegación
const TABS = ["Grupos", "Comunidades", "Amigos"];

export default function ProfileMain() {
    // Estado para controlar qué pestaña está activa. Inicia en la primera ("Grupos")
    const [activeTab, setActiveTab] = useState(TABS[0]);

    return (
        <section className="z-10 flex flex-col flex-[2] rounded-3xl border border-black/30 shadow-[0_8px_30px_rgba(0,0,0,0.08)] bg-white/5 backdrop-blur-md overflow-hidden min-h-[500px]">
            
            {/* HEADER TIPO NAV */}
            <header className="flex w-full border-b border-black/10 overflow-x-auto hide-scrollbar">
                {TABS.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`relative px-6 py-4 text-sm font-semibold transition-colors duration-300 ${
                            activeTab === tab ? "text-[#6D28D9]" : "text-black/50 hover:text-black/80"
                        }`}
                    >
                        {tab}

                        {/* Línea animada que indica la pestaña activa */}
                        {activeTab === tab && (
                            <motion.div
                                layoutId="active-tab-indicator"
                                className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#6D28D9]"
                                initial={false}
                                transition={{
                                    type: "spring",
                                    stiffness: 500,
                                    damping: 30,
                                }}
                            />
                        )}
                    </button>
                ))}
            </header>

            {/* =========================================
                CONTENIDO DINÁMICO
                ========================================= */}
            <div className="flex-1 p-6 relative">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="h-full"
                    >
                        {/* Aquí renderizamos el contenido dependiendo del tab activo */}
                        {activeTab === "Grupos" && (
                            <div className="flex flex-col gap-4">
                                <h3 className="text-xl font-bold text-black/80">Tus Grupos</h3>
                                <p className="text-black/60">Aquí aparecerá el listado de grupos a los que pertenece el usuario...</p>
                                <ProfileSectionGroups/>
                            </div>
                        )}

                        {activeTab === "Comunidades" && (
                            <div className="flex flex-col gap-4">
                                <h3 className="text-xl font-bold text-black/80">Comunidades</h3>
                                <p className="text-black/60">Aquí verás las comunidades que sigues o administras...</p>
                            </div>
                        )}

                        {activeTab === "Eventos" && (
                            <div className="flex flex-col gap-4">
                                <h3 className="text-xl font-bold text-black/80">Próximos Eventos</h3>
                                <p className="text-black/60">Calendario y lista de eventos confirmados...</p>
                            </div>
                        )}

                        {activeTab === "Amigos" && (
                            <div className="flex flex-col gap-4">
                                <h3 className="text-xl font-bold text-black/80">Lista de Amigos</h3>
                                <p className="text-black/60">Grid con los avatares de tus conexiones...</p>
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>

        </section>
    );
}