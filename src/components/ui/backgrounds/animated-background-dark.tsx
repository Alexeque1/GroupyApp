"use client";

import { motion } from "framer-motion";

export default function AnimatedBackgroundDark() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden blur-[90px] opacity-70 pointer-events-none">

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
        className="absolute top-0 left-0 h-[500px] w-[500px] rounded-full bg-[#8C6CFF]/50"
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
        className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-[#FFB199]/40"
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
        className="absolute left-1/4 top-1/4 h-[400px] w-[400px] rounded-full bg-[#A9FFD7]/40"
      />
    </div>
  );
}