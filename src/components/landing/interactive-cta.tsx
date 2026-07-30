"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import Button from "@/components/ui/button";

export default function InteractiveCta() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Valores de movimiento para capturar las coordenadas del mouse
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Suavizamos el movimiento del mouse para que el halo de luz tenga un efecto líquido/elástico
  const smoothX = useSpring(mouseX, { damping: 40, stiffness: 150 });
  const smoothY = useSpring(mouseY, { damping: 40, stiffness: 150 });

  // Función que actualiza la posición mientras el usuario mueve el cursor sobre el div
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();

    // Calculamos el centro para que la luz parta desde el medio y siga al cursor
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    mouseX.set(x);
    mouseY.set(y);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative z-10 flex flex-col items-center justify-center gap-10 rounded-3xl border border-white/10 py-28 px-4 text-center overflow-hidden"
    >
      {/* FONDO OSCURO TRASLÚCIDO BASE */}
      <div className="absolute inset-0 z-0 bg-[#251842]/60 backdrop-blur-md" />

      {/* =========================================
          ANIMACIÓN MESHY + MOUSE FOLLOW
          ========================================= */}
      {/* Aplicamos un blur altísimo para que las bolas de luz se derritan entre sí */}
      <div className="absolute inset-0 z-0 overflow-hidden blur-[80px] opacity-80 pointer-events-none">

        {/* Bola 1 - Morada (Movimiento automático amplio) */}
        <motion.div
          animate={{
            x: ["-30%", "40%", "-10%", "-30%"],
            y: ["-30%", "20%", "50%", "-30%"],
            scale: [1, 1.4, 0.9, 1],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 left-0 h-[400px] w-[400px] rounded-full bg-[#8C6CFF]/50"
        />

        {/* Bola 2 - Naranja Suave (Movimiento automático invertido) */}
        <motion.div
          animate={{
            x: ["40%", "-20%", "20%", "40%"],
            y: ["30%", "-30%", "40%", "30%"],
            scale: [0.8, 1.3, 1.1, 0.8],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-[#FFB199]/40"
        />

        {/* Bola 3 - LUZ INTERACTIVA (Sigue al mouse) */}
        {/* Es color menta para que resalte mucho cuando pasas por el botón o el texto */}
        <motion.div
          style={{ x: smoothX, y: smoothY }}
          className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#A9FFD7]/50"
        />
      </div>

      {/* =========================================
          CONTENIDO DE LA SECCIÓN
          ========================================= */}
      <div className="relative z-10 flex flex-col items-center gap-10">
        {/* Sombras añadidas al texto para que no se pierda entre las luces del fondo */}
        <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight drop-shadow-xl">
          Are you ready for your <span className="text-[#A9FFD7] drop-shadow-[0_0_20px_rgba(169,255,215,0.5)]">new adventure?</span>
        </h3>

        <Button onClick={() => console.log("Let's go!")}>
          Let's go!
        </Button>
      </div>

    </div>
  );
}
