"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedBackgroundProps {
  variant?: "default" | "blue";
}

export default function AnimatedBackground({ variant = "default" }: AnimatedBackgroundProps) {
  // Definimos las paletas de colores según la variante
  const colorPalettes = {
    default: {
      ball1: "bg-[#8C6CFF]/40",
      ball2: "bg-[#FFB199]/40",
      ball3: "bg-[#A9FFD7]/50",
    },
    blue: {
      ball1: "bg-[#3B82F6]/40",
      ball2: "bg-[#06B6D4]/40",
      ball3: "bg-[#8C6CFF]/40", 
    },
  };

  const colors = colorPalettes[variant];

  return (
    <div className="absolute inset-0 z-0 overflow-hidden blur-[80px] opacity-100 pointer-events-none">
      
      {/* Bola 1 */}
      <motion.div
        animate={{
          x: ["-30%", "40%", "-10%", "-30%"],
          y: ["-30%", "20%", "50%", "-30%"],
          scale: [1, 1.4, 0.9, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className={cn(
          "absolute top-0 left-0 h-[500px] w-[500px] rounded-full transition-colors duration-1000",
          colors.ball1
        )}
      />

      {/* Bola 2 */}
      <motion.div
        animate={{
          x: ["40%", "-20%", "20%", "40%"],
          y: ["30%", "-30%", "40%", "30%"],
          scale: [0.8, 1.3, 1.1, 0.8],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className={cn(
          "absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full transition-colors duration-1000",
          colors.ball2
        )}
      />

      {/* Bola 3 */}
      <motion.div
        animate={{
          x: ["-20%", "30%", "-10%", "-20%"],
          y: ["10%", "-40%", "30%", "10%"],
          scale: [1, 1.5, 0.9, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className={cn(
          "absolute left-1/4 top-1/4 h-[400px] w-[400px] rounded-full transition-colors duration-1000",
          colors.ball3
        )}
      />
    </div>
  );
}