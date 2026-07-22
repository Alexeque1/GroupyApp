import { section } from "framer-motion/client";

export default function ProfileHeader() {
    return (
        <section className="relative z-10 grid grid-cols-1 md:grid-cols-[1fr_2fr_1fr] items-center gap-10 rounded-3xl border border-white/10 py-28 px-4 text-center overflow-hidden">
            
            {/* COLUMNA 1: Izquierda (Más pequeña) */}
            <div className="w-full flex justify-center">
                {/* Contenido izquierdo */}
            </div>

            {/* COLUMNA 2: Centro (Más grande) */}
            <div className="w-full flex flex-col items-center justify-center">
                <h3 className="text-3xl font-bold tracking-tight">Alexander Sequera</h3>
                <p className="mt-2 text-white/70">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </p>
                
                {/* Contenedor extra que tenías */}
                <div className="mt-4">
                    {/* Botones, stats, etc. */}
                </div>
            </div>

            {/* COLUMNA 3: Derecha (Más pequeña) */}
            <div className="w-full flex justify-center">
                {/* Contenido derecho */}
            </div>

        </section>
    );
}