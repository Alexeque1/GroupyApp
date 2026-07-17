"use client";

import { motion } from "framer-motion";
import { UserCircle, Users, User, CheckCircle2 } from "lucide-react";

/* --- ANIMACIONES DE ICONOS CUSTOM --- */

const AnimatedStep1Icon = ({ color }: { color: string }) => (
    <div className="relative w-full h-full flex items-center justify-center">
        <motion.div
            animate={{ y: [-3, 3, -3] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
            <UserCircle size={32} color={color} />
        </motion.div>

        {/* Check flotante */}
        <motion.div
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
            className="absolute bottom-2 right-2 bg-[#251842] rounded-full"
        >
            <motion.div
                animate={{ y: [-2, 2, -2] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
            >
                <CheckCircle2 size={16} className="text-[#A9FFD7]" fill="#A9FFD7" stroke="#251842" strokeWidth={2} />
            </motion.div>
        </motion.div>
    </div>
);

const AnimatedStep2Icon = ({ color }: { color: string }) => (
    <div className="relative w-full h-full flex items-center justify-center">
        {/* Líneas conectoras (Aristas) */}
        <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full z-0">
            <motion.line
                x1="50" y1="50" x2="25" y2="25"
                stroke={color} strokeWidth="2" strokeOpacity="0.5"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
            />
            <motion.line
                x1="50" y1="50" x2="80" y2="35"
                stroke={color} strokeWidth="2" strokeOpacity="0.5"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
            />
            <motion.line
                x1="50" y1="50" x2="65" y2="80"
                stroke={color} strokeWidth="2" strokeOpacity="0.5"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.7 }}
            />
        </svg>

        {/* Nodo Central */}
        <motion.div
            className="absolute z-10 bg-[#251842] rounded-full p-[2px]"
            style={{ top: 'calc(50% - 12px)', left: 'calc(50% - 12px)' }}
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
            <User size={20} color={color} />
        </motion.div>

        {/* Nodos Periféricos */}
        <motion.div
            className="absolute z-10 bg-[#251842] rounded-full p-[2px]"
            style={{ top: 'calc(25% - 8px)', left: 'calc(25% - 8px)' }}
            initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
        >
            <User size={12} color={color} opacity={0.7} />
        </motion.div>

        <motion.div
            className="absolute z-10 bg-[#251842] rounded-full p-[2px]"
            style={{ top: 'calc(35% - 8px)', left: 'calc(80% - 8px)' }}
            initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.4 }}
        >
            <User size={12} color={color} opacity={0.7} />
        </motion.div>

        <motion.div
            className="absolute z-10 bg-[#251842] rounded-full p-[2px]"
            style={{ top: 'calc(80% - 8px)', left: 'calc(65% - 8px)' }}
            initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.6 }}
        >
            <User size={12} color={color} opacity={0.7} />
        </motion.div>
    </div>
);

const AnimatedStep3Icon = ({ color }: { color: string }) => (
    <div className="relative w-full h-full flex items-center justify-center">
        <motion.div
            animate={{ scale: [1, 1.05, 1], rotate: [-3, 3, -3] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="z-10 bg-[#251842] rounded-full relative"
        >
            <Users size={32} color={color} />
        </motion.div>

        {/* Emojis de fiesta flotantes */}
        <motion.span
            className="absolute text-sm z-0"
            animate={{ y: [0, -25], x: [0, -20], opacity: [0, 1, 0], scale: [0.5, 1.2, 0.8] }}
            transition={{ duration: 2.5, repeat: Infinity, delay: 0 }}
            style={{ top: '30%', left: '30%' }}
        >
            🎉
        </motion.span>

        <motion.span
            className="absolute text-sm z-0"
            animate={{ y: [0, -20], x: [0, 25], opacity: [0, 1, 0], scale: [0.5, 1.2, 0.8] }}
            transition={{ duration: 2.2, repeat: Infinity, delay: 0.7 }}
            style={{ top: '25%', right: '30%' }}
        >
            ✨
        </motion.span>

        <motion.span
            className="absolute text-sm z-0"
            animate={{ y: [0, -30], opacity: [0, 1, 0], scale: [0.5, 1.2, 0.8] }}
            transition={{ duration: 2.8, repeat: Infinity, delay: 1.2 }}
            style={{ bottom: '15%', left: '40%' }}
        >
            🥳
        </motion.span>
    </div>
);

/* --- DATA DE LA SECCIÓN --- */

const steps = [
    {
        title: "Crea tu perfil",
        description: "Cuéntanos sobre ti. Selecciona tus intereses, pasatiempos y lo que te apasiona para que el algoritmo haga su magia.",
        IconComponent: AnimatedStep1Icon,
        color: "#8C6CFF", // Morado Groupy
    },
    {
        title: "Descubre grupos",
        description: "Explora comunidades y eventos que hacen match perfecto con tu vibra. Siempre hay algo nuevo sucediendo cerca de ti.",
        IconComponent: AnimatedStep2Icon,
        color: "#A9FFD7", // Verde menta
    },
    {
        title: "Conecta y disfruta",
        description: "Únete a la conversación, asiste a las quedadas y empieza a compartir experiencias con personas increíbles.",
        IconComponent: AnimatedStep3Icon,
        color: "#FFB199", // Naranja suave
    },
];

/* --- VARIANTES GENERALES --- */
const containerVariants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.3 },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
    },
};

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
                        transition={{ duration: 1.5, ease: "easeInOut", delay: 0.5 }}
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

