import { Pencil } from "lucide-react";

export default function ProfileCover() {
    return (
        <div className="relative h-[180px] w-full overflow-hidden md:h-[250px]">
            {/* FONDO / IMAGEN DE PORTADA */}
            <div className="h-full w-full bg-gradient-to-r from-[#8C6CFF] via-[#A9FFD7] to-[#FFB199]" />

            {/* BOTÓN DEL LÁPIZ */}
            <button
                className="absolute cursor-pointer bottom-[20px] right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-black/70 shadow-[0_4px_10px_rgba(0,0,0,0.15)] backdrop-blur-sm border border-black/10 transition-all hover:scale-110 hover:bg-white hover:text-black"
                aria-label="Editar portada"
            >
                <Pencil size={18} className="cursor-pointer"/>
            </button>
        </div>
    );
}