"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

const TONE_STYLES = {
  light: {
    bg: "bg-[#faf8ff] shadow-[0_8px_30px_rgba(140,108,255,0.15)]",
    overlayBg: "bg-[#0d0d0d]",
    overlayGradient:
      "linear-gradient(115deg, #000000 15%, #112a53 30%, #d97d25 48%, #4b9cdb 53%, #ffffff 58%, #09172f 70%, #000000 85%)",
    border: "border-black/5 group-hover:border-white/20",
    insetShadow: "shadow-[inset_0_0_20px_rgba(0,0,0,0.8)]",
    text: "text-[#1a0f2e] group-hover:text-white drop-shadow-sm group-hover:drop-shadow-md",
    iconBg: "bg-black/5 group-hover:bg-white/10",
    iconColor: "text-black/60 group-hover:text-white",
  },
  dark: {
    bg: "bg-brand-dark shadow-[0_8px_30px_rgba(140,108,255,0.2)]",
    overlayBg: "bg-white",
    overlayGradient:
      "linear-gradient(115deg, #ffffff 15%, #e8deff 30%, #ffdfd1 48%, #caffeb 53%, #ffffff 58%, #f2eeff 70%, #ffffff 85%)",
    border: "border-white/10 group-hover:border-black/5",
    insetShadow: "shadow-[inset_0_0_20px_rgba(0,0,0,0.1)]",
    text: "text-white group-hover:text-[#1a0f2e] drop-shadow-md group-hover:drop-shadow-none",
    iconBg: "bg-white/5 group-hover:bg-black/5",
    iconColor: "text-white/60 group-hover:text-[#1a0f2e]",
  },
} as const;

interface ButtonCreateProps {
  title: string;
  icon: ReactNode;
  tone?: "light" | "dark";
  onClick?: () => void;
  className?: string;
}

export default function ButtonCreate({
  title,
  icon,
  tone = "light",
  onClick,
  className,
}: ButtonCreateProps) {
  const styles = TONE_STYLES[tone];

  return (
    <motion.button
      type="button"
      onClick={onClick}
      initial="rest"
      whileHover="hover"
      animate="rest"
      className={cn(
        "group relative flex aspect-square w-35 md:w-48 cursor-pointer flex-col items-center justify-center gap-4 overflow-hidden rounded-[2rem] font-medium transition-transform duration-300 hover:-translate-y-2",
        styles.bg,
        className
      )}
    >
      {/* MESH ANIMADO (bolas flotantes de marca) */}
      <div className="absolute inset-0 z-0 overflow-hidden opacity-80 blur-[20px] transition-opacity duration-300 group-hover:opacity-0">
        <motion.div
          animate={{ x: [0, 30, -10, 0], y: [0, -20, 20, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -left-1/4 -top-1/4 h-[120%] w-[120%] rounded-full bg-brand-purple/40"
        />
        <motion.div
          animate={{ x: [0, -30, 20, 0], y: [0, 30, -10, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-1/4 -right-1/4 h-[120%] w-[120%] rounded-full bg-brand-mint/40"
        />
        <motion.div
          animate={{ x: [0, 20, -30, 0], y: [0, -10, 30, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -right-1/4 -top-1/4 h-[100%] w-[100%] rounded-full bg-brand-peach/40"
        />
      </div>

      {/* LÍQUIDO EN HOVER */}
      <motion.div
        variants={{ rest: { opacity: 0 }, hover: { opacity: 1 } }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className={cn("absolute inset-0 z-10 overflow-hidden", styles.overlayBg)}
      >
        <motion.div
          variants={{ rest: { x: "-50%" }, hover: { x: ["-50%", "0%", "-50%"] } }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="absolute -left-1/2 -top-1/2 h-[200%] w-[200%]"
          style={{ background: styles.overlayGradient, filter: "blur(12px)" }}
        />
      </motion.div>

      {/* BORDES Y SOMBRAS */}
      <div
        className={cn(
          "absolute inset-0 z-20 rounded-[2rem] border transition-colors duration-300",
          styles.border
        )}
      />
      <div
        className={cn(
          "absolute inset-0 z-20 rounded-[2rem] opacity-0 transition-opacity duration-500 group-hover:opacity-100",
          styles.insetShadow
        )}
      />

      {/* CONTENIDO (icono y texto) */}
      <div className="relative z-30 flex flex-col items-center gap-4">
        <div
          className={cn(
            "flex h-16 w-16 items-center justify-center rounded-2xl transition-colors duration-300",
            styles.iconBg,
            styles.iconColor
          )}
        >
          {icon}
        </div>
        <span
          className={cn(
            "text-lg font-bold tracking-wide transition-colors duration-300",
            styles.text
          )}
        >
          {title}
        </span>
      </div>
    </motion.button>
  );
}
