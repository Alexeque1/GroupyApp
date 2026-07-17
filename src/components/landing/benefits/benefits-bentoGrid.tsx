"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

// 1. Define aquí todas las imágenes de tu galería (deben ser más de 4 para que roten)
const ALL_IMAGES = [
  "/benefits_carrousel/party_carrousel.jpg",
  "/benefits_carrousel/fitness_carrousel.jpg",
  "/benefits_carrousel/hobbies_carrousel.jpg",
  "/benefits_carrousel/nature_carrousel.jpg",
  "/benefits_carrousel/meeting_carrousel.jpg",
  "/benefits_carrousel/events_carrousel.jpg",
];

// 2. Definimos las posiciones exactas en el Grid para replicar el diseño asimétrico
const BENTO_POSITIONS = [
  "xl:col-start-1 xl:row-start-1 xl:row-span-1", // Arriba Izquierda (Corto)
  "xl:col-start-1 xl:row-start-2 xl:row-span-2", // Abajo Izquierda (Alto)
  "xl:col-start-2 xl:row-start-1 xl:row-span-2", // Arriba Derecha (Alto)
  "xl:col-start-2 xl:row-start-3 xl:row-span-1", // Abajo Derecha (Corto)
];

export default function BentoAnimatedGridBenefits() {
  // Estado para mantener las 4 imágenes que se están mostrando actualmente
  const [displayImages, setDisplayImages] = useState<string[]>(ALL_IMAGES.slice(0, 4));

  useEffect(() => {
    // Intervalo de tiempo para rotar imágenes (ej: cada 3.5 segundos)
    const interval = setInterval(() => {
      setDisplayImages((prev) => {
        const newDisplay = [...prev];
        
        // Elegimos un bloque al azar (0 a 3) para cambiar su imagen
        const slotToChange = Math.floor(Math.random() * 4);
        
        // Filtramos las imágenes que NO se están mostrando actualmente
        const availableImages = ALL_IMAGES.filter((img) => !prev.includes(img));
        
        // Elegimos una nueva imagen al azar de las disponibles
        const randomReplacement = availableImages.length > 0 ? availableImages[Math.floor(Math.random() * availableImages.length)] : prev[slotToChange];
        
        // Reemplazamos la imagen en el slot elegido
        newDisplay[slotToChange] = randomReplacement;
        return newDisplay;
      });
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hidden lg:block w-full">
      <div className="grid grid-cols-2 grid-rows-2 xl:grid-rows-3 gap-4 h-[530px]">
        
        {displayImages.map((imageSrc, index) => (
          <div
            key={`bento-slot-${index}`}
            className={`group relative w-full h-full rounded-[32px] overflow-hidden bg-[#251842]/40 border border-white/10 shadow-lg ${BENTO_POSITIONS[index]}`}
          >

            <AnimatePresence mode="wait">
              <motion.div
                key={imageSrc} // La key es la URL de la imagen. Al cambiar, Framer Motion dispara la animación.
                initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)"}}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="absolute inset-0 flex items-center justify-center p-0"
              >
                <Image
                  src={imageSrc}
                  alt={`Bento image ${index}`}
                  fill
                  className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                  sizes="50vw" 
                />
              </motion.div>
            </AnimatePresence>

            {/* Degradado interior para darle profundidad a la tarjeta */}
            <div className="absolute inset-0 pointer-events-none rounded-[32px] shadow-[inset_0_0_20px_rgba(0,0,0,0.2)] z-10" />
          </div>
        ))}

      </div>
    </section>
  );
}