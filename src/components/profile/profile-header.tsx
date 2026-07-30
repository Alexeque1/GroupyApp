import AnimatedBackgroundLight from "../ui/backgrounds/animated-background-light";
import LiquidButton from "../ui/liquid-button";
import LiquidButtonDark from "../ui/liquid-button-light";
import Image from "next/image";
import { Pencil } from "lucide-react";
import ProfileCover from "./profile-cover";

export default function ProfileHeader() {
    return (
        <section className="flex flex-col items-center">
            {/* CARD */}
            <div className="relative z-10 w-[92%] overflow-hidden rounded-3xl border border-black/10 bg-white shadow-[0_8px_30px_rgba(0,0,0,0.12)] md:w-[85%]">
                
                {/* PORTADA */}
                <ProfileCover/>

                {/* CONTENIDO */}
                <div className="relative px-6 pb-6 pt-0 md:px-10 md:pb-8">
                    
                    {/* MESHY BACKGROUND */}
                    <AnimatedBackgroundLight />

                    {/* BLOQUE SUPERIOR: Avatar + Nombre */}
                    <div className="relative z-10 flex flex-col items-center gap-4 md:flex-row md:items-end md:gap-6">
                        
                        {/* PROFILE IMAGE  */}
                        <div className="relative -mt-14 h-28 w-28 shrink-0 md:-mt-16 md:h-36 md:w-36">
                            <div className="relative h-full w-full overflow-hidden rounded-full border-4 border-white bg-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.15)]">
                                <Image
                                    src="/profile-image.png"
                                    alt="Foto de perfil"
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            <button
                                className="absolute cursor-pointer bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full bg-white text-black/70 shadow-[0_4px_10px_rgba(0,0,0,0.15)] border border-black/10 transition-transform hover:scale-110 hover:text-black md:h-9 md:w-9"
                                aria-label="Editar foto de perfil"
                            >
                                <Pencil size={16} className="cursor-pointer"/>
                            </button>
                        </div>

                        {/* NOMBRE + USUARIO */}
                        <div className="flex flex-col items-center pb-1 text-center md:items-start md:text-left">
                            <h3 className="dark-mesh-gradient text-2xl font-bold tracking-tight md:text-3xl">
                                Alexander Sequera
                            </h3>
                            <p className="text-black/60">@Alexeque1</p>
                        </div>
                    </div>

                    {/* BLOQUE INFERIOR: Estadísticas + Botones */}
                    {/* Al superar los 1200px: se vuelve fila (flex-row) y separa ambos bloques (justify-between) */}
                    <div className="relative z-10 mt-6 flex flex-col items-center gap-6 border-t border-black/10 pt-5 min-[1200px]:flex-row min-[1200px]:justify-between">
                        
                        {/* ESTADÍSTICAS */}
                        <div className="flex items-center justify-center gap-6 md:justify-start md:gap-10">
                            {/* Grupos */}
                            <div className="flex flex-col items-center">
                                <span className="text-2xl font-bold text-[#6D28D9] md:text-3xl">
                                    4
                                </span>
                                <span className="mt-1 text-[10px] font-bold uppercase tracking-[0.2em] text-black/70 md:text-xs">
                                    Groups
                                </span>
                            </div>

                            <div className="h-8 w-px bg-black/10" />

                            {/* Comunidades */}
                            <div className="flex flex-col items-center">
                                <span className="text-2xl font-bold text-[#059669] md:text-3xl">
                                    3
                                </span>
                                <span className="mt-1 text-[10px] font-bold uppercase tracking-[0.2em] text-black/70 md:text-xs">
                                    Communities
                                </span>
                            </div>

                            <div className="h-8 w-px bg-black/10" />

                            {/* Amigos */}
                            <div className="flex flex-col items-center">
                                <span className="text-2xl font-bold text-[#EA580C] md:text-3xl">
                                    6
                                </span>
                                <span className="mt-1 text-[10px] font-bold uppercase tracking-[0.2em] text-black/70 md:text-xs">
                                    Friends
                                </span>
                            </div>
                        </div>

                        {/* BOTONES */}
                        {/* Menos de 1200px: están en columna (flex-col). Más de 1200px: cambian a fila (flex-row) */}
                        <div className="flex px-5 w-full gap-3 sm:w-auto min-[1200px]:flex-row">
                            <LiquidButtonDark
                                className="flex-1 px-8 py-3 sm:flex-none"
                                textClassName="text-sm"
                            >
                                Enviar Solicitud
                            </LiquidButtonDark>
                            <LiquidButtonDark
                                className="flex-1 px-8 py-3 sm:flex-none"
                                textClassName="text-sm"
                            >
                                Mensaje
                            </LiquidButtonDark>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}