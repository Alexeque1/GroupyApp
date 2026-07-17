"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface LiquidButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}

export default function LiquidButton({ children, onClick, className = "" }: LiquidButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      initial="rest"
      whileHover="hover"
      animate="rest"
      className={`group relative flex cursor-pointer items-center justify-center overflow-hidden rounded-2xl bg-[#faf8ff] px-10 py-4 font-medium shadow-[0_8px_30px_rgba(140,108,255,0.15)] transition-transform duration-300 hover:scale-105 ${className}`}
    >
      {/* =========================================
          CAPA 1: MESH CLARO ANIMADO (Bolas flotantes)
          ========================================= */}
      {/* Un blur fuerte en el contenedor hace que las bolas parezcan un fluido */}
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
          className="absolute -bottom-1/4 -right-1/4 h-[120%] w-[120%] rounded-full bg-[#A9FFD7]/50"
        />
        {/* Bola Naranja Suave */}
        <motion.div
          animate={{ x: [0, 20, -30, 0], y: [0, -10, 30, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -right-1/4 -top-1/4 h-[100%] w-[100%] rounded-full bg-[#FFB199]/40"
        />
      </div>

      {/* =========================================
          CAPA 2: LÍQUIDO OSCURO (ESTADO HOVER)
          ========================================= */}
      <motion.div
        variants={{
          rest: { opacity: 0 },
          hover: { opacity: 1 },
        }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="absolute inset-0 z-10 overflow-hidden bg-[#0d0d0d]"
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
            background: `linear-gradient(
              115deg, 
              #000000 15%, 
              #112a53 30%, 
              #d97d25 48%, 
              #4b9cdb 53%, 
              #ffffff 58%, 
              #09172f 70%, 
              #000000 85%
            )`,
            filter: "blur(12px)",
          }}
        />
      </motion.div>

      {/* =========================================
          EFECTOS DE CRISTAL Y SOMBRAS
          ========================================= */}
      {/* Borde sutil que cambia de color */}
      <div className="absolute inset-0 z-20 rounded-2xl border border-black/5 group-hover:border-white/20 transition-colors duration-300" />

      {/* Sombra interna para dar profundidad al líquido oscuro en hover */}
      <div className="absolute inset-0 z-20 rounded-2xl shadow-[inset_0_0_20px_rgba(0,0,0,0.8)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* =========================================
          TEXTO DEL BOTÓN
          ========================================= */}
      <span className="relative z-30 text-lg tracking-wide text-[#1a0f2e] group-hover:text-white transition-colors duration-300 drop-shadow-sm group-hover:drop-shadow-md">
        {children}
      </span>
    </motion.button>
  );
}