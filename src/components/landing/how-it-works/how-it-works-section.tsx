"use client";

import { motion } from "framer-motion";
import { steps, containerVariants, cardVariants } from "./how-it-works-data";

export default function HowItWorksSection() {
    return (
        <div className="container mx-auto px-4 relative z-10">

            {/* ENCABEZADO */}
            <div className="mb-16 text-center max-w-2xl mx-auto">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="h2_title mb-4"
                >
                    ¿Cómo funciona <span className="text-[#8C6CFF]">Groupy</span>?
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-white/70 text-lg"
                >
                    Encontrar a tu tribu nunca ha sido tan fácil. Tres simples pasos para empezar a crear recuerdos.
                </motion.p>
            </div>

            {/* CONTENEDOR DE LOS PASOS */}
            <div className="relative max-w-5xl mx-auto">

                {/* Línea conectora de fondo (Solo visible en desktop) */}
                <div className="absolute top-1/2 left-0 w-full h-[2px] bg-white/10 -translate-y-1/2 hidden md:block z-0">
                    <motion.div
                        className="h-full bg-gradient-to-r from-[#8C6CFF] via-[#A9FFD7] to-[#FFB199]"
                        initial={{ width: "0%" }}
                        whileInView={{ width: "100%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, ease: [0.42, 0, 0.58, 1], delay: 0.5 }}
                    />
                </div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10"
                >
                    {steps.map((step, index) => {
                        const { IconComponent } = step;
                        return (
                            <motion.div
                                key={index}
                                variants={cardVariants}
                                whileHover={{ y: -10 }}
                                className="group relative flex flex-col h-full bg-[#251842]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 overflow-hidden transition-colors hover:border-white/30"
                                style={{ boxShadow: `0 0 0 0 ${step.color}00` }}
                            >
                                {/* Resplandor hover (Glow) */}
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                                    style={{ background: `radial-gradient(circle at 50% 0%, ${step.color}15 0%, transparent 70%)` }}
                                />

                                {/* Número Gigante de Fondo */}
                                <div className="absolute -right-4 -top-8 text-[150px] font-black text-white/5 pointer-events-none select-none transition-transform group-hover:scale-110 group-hover:-rotate-6">
                                    {index + 1}
                                </div>

                                {/* Contenido de la Tarjeta */}
                                <div className="relative z-10">

                                    {/* AQUI RENDERIZAMOS EL ICONO ANIMADO */}
                                    <div
                                        className="relative w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-lg overflow-hidden"
                                        style={{ backgroundColor: `${step.color}20`, border: `1px solid ${step.color}40` }}
                                    >
                                        <IconComponent color={step.color} />
                                    </div>

                                    <h3 className="text-2xl font-semibold mb-3">
                                        {step.title}
                                    </h3>

                                    <p className="text-white/70 leading-relaxed">
                                        {step.description}
                                    </p>
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>

        </div>
    );
}
