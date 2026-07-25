"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface LiquidButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  textClassName?: string;
}

export default function LiquidButtonDark({ children, onClick, className = "", textClassName = ""}: LiquidButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      initial="rest"
      whileHover="hover"
      animate="rest"
      // Fondo oscuro por defecto con sombra sutil morada
      className={`group relative flex cursor-pointer items-center justify-center overflow-hidden rounded-2xl bg-[#0a0514] px-10 py-4 font-medium shadow-[0_8px_30px_rgba(140,108,255,0.2)] transition-transform duration-300 hover:scale-105 ${className}`}
    >
      {/* MESH OSCURO ANIMADO */}
      <div className="absolute inset-0 z-0 overflow-hidden opacity-80 blur-[20px] transition-opacity duration-300 group-hover:opacity-0">
        {/* Bola Morada */}
        <motion.div
          animate={{ x: [0, 30, -10, 0], y: [0, -20, 20, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -left-1/4 -top-1/4 h-[120%] w-[120%] rounded-full bg-[#8C6CFF]/40"
        />
        {/* Bola Verde Menta */}
        <motion.div
          animate={{ x: [0, -30, 20, 0], y: [0, 30, -10, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-1/4 -right-1/4 h-[120%] w-[120%] rounded-full bg-[#A9FFD7]/30"
        />
        {/* Bola Naranja Suave */}
        <motion.div
          animate={{ x: [0, 20, -30, 0], y: [0, -10, 30, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -right-1/4 -top-1/4 h-[100%] w-[100%] rounded-full bg-[#FFB199]/30"
        />
      </div>

      {/* ESTADO HOVER */}
      <motion.div
        variants={{
          rest: { opacity: 0 },
          hover: { opacity: 1 },
        }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="absolute inset-0 z-10 overflow-hidden bg-[#ffffff]"
      >
        <motion.div
          variants={{
            rest: { x: "-50%" },
            hover: { x: ["-50%", "0%", "-50%"] },
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-[-50%] left-[-50%] h-[200%] w-[200%]"
          style={{
            /* Gradiente de "seda blanca" con reflejos muy suaves de los colores Groupy */
            background: `linear-gradient(
              115deg, 
              #ffffff 15%, 
              #e8deff 30%, 
              #ffdfd1 48%, 
              #caffeb 53%, 
              #ffffff 58%, 
              #f2eeff 70%, 
              #ffffff 85%
            )`,
            filter: "blur(12px)",
          }}
        />
      </motion.div>

      {/* EFECTOS */}
      <div className="absolute inset-0 z-20 rounded-2xl border border-white/10 group-hover:border-black/5 transition-colors duration-300" />

      <div className="absolute inset-0 z-20 rounded-2xl shadow-[inset_0_0_20px_rgba(0,0,0,0.1)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* TEXTO DEL BOTÓN */}
      <span className={`relative z-30 text-lg tracking-wide text-white group-hover:text-[#1a0f2e] transition-colors duration-300 drop-shadow-md group-hover:drop-shadow-none font-semibold ${textClassName}`}>
        {children}
      </span>
    </motion.button>
  );
}