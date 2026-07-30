"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "group relative flex cursor-pointer items-center justify-center overflow-hidden rounded-2xl font-medium transition-transform duration-300 hover:scale-105",
  {
    variants: {
      variant: {
        liquid: "px-10 py-4",
        outline:
          "px-6 py-3 border border-white/60 text-white transition-colors hover:scale-110 hover:bg-white/10",
      },
      tone: {
        light: "",
        dark: "",
      },
    },
    compoundVariants: [
      {
        variant: "liquid",
        tone: "light",
        className: "bg-[#faf8ff] shadow-[0_8px_30px_rgba(140,108,255,0.15)]",
      },
      {
        variant: "liquid",
        tone: "dark",
        className: "bg-brand-dark shadow-[0_8px_30px_rgba(140,108,255,0.2)]",
      },
    ],
    defaultVariants: {
      variant: "liquid",
      tone: "light",
    },
  }
);

const LIQUID_TONE_STYLES = {
  light: {
    overlayBg: "bg-[#0d0d0d]",
    overlayGradient:
      "linear-gradient(115deg, #000000 15%, #112a53 30%, #d97d25 48%, #4b9cdb 53%, #ffffff 58%, #09172f 70%, #000000 85%)",
    border: "border-black/5 group-hover:border-white/20",
    insetShadow: "shadow-[inset_0_0_20px_rgba(0,0,0,0.8)]",
    text: "text-[#1a0f2e] group-hover:text-white drop-shadow-sm group-hover:drop-shadow-md",
  },
  dark: {
    overlayBg: "bg-white",
    overlayGradient:
      "linear-gradient(115deg, #ffffff 15%, #e8deff 30%, #ffdfd1 48%, #caffeb 53%, #ffffff 58%, #f2eeff 70%, #ffffff 85%)",
    border: "border-white/10 group-hover:border-black/5",
    insetShadow: "shadow-[inset_0_0_20px_rgba(0,0,0,0.1)]",
    text: "text-white font-semibold group-hover:text-[#1a0f2e] drop-shadow-md group-hover:drop-shadow-none",
  },
} as const;

interface ButtonProps extends VariantProps<typeof buttonVariants> {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  textClassName?: string;
  type?: "button" | "submit";
}

export default function Button({
  children,
  onClick,
  className,
  textClassName,
  type,
  variant = "liquid",
  tone = "light",
}: ButtonProps) {
  if (variant === "outline") {
    return (
      <button
        type={type}
        onClick={onClick}
        className={cn(buttonVariants({ variant, tone }), className)}
      >
        {children}
      </button>
    );
  }

  const styles = LIQUID_TONE_STYLES[tone ?? "light"];

  return (
    <motion.button
      type={type}
      onClick={onClick}
      initial="rest"
      whileHover="hover"
      animate="rest"
      className={cn(buttonVariants({ variant, tone }), className)}
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

      <div
        className={cn(
          "absolute inset-0 z-20 rounded-2xl border transition-colors duration-300",
          styles.border
        )}
      />
      <div
        className={cn(
          "absolute inset-0 z-20 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100",
          styles.insetShadow
        )}
      />

      <span
        className={cn(
          "relative z-30 text-lg tracking-wide transition-colors duration-300",
          styles.text,
          textClassName
        )}
      >
        {children}
      </span>
    </motion.button>
  );
}
