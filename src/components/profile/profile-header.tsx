import AnimatedBackgroundLight from "../ui/backgrounds/animated-background-light";
import LiquidButton from "../ui/liquid-button";
import LiquidButtonDark from "../ui/liquid-button-light";
import Image from "next/image";

export default function ProfileHeader() {
    return (
        <section className="flex justify-center">
            <div className="relative z-10 h-full md:h-[250px] overflow-hidden rounded-3xl border border-black/30">
                {/* MESHY BACKGROUND */}
                <AnimatedBackgroundLight />

                <div className="relative z-10 grid h-full grid-cols-1 items-stretch md:grid-cols-[1fr_2fr_1fr]">

                    {/* COLUMNA 1: Izquierda */}
                    <div className="flex h-full items-center justify-center p-8">
                        <div className="relative aspect-square w-full max-w-[200px] overflow-hidden rounded-full">
                            <Image
                                src="/profile-image.png"
                                alt="Foto de perfil"
                                fill
                                className="object-cover border border-black/30"
                            />
                        </div>
                    </div>

                    {/* COLUMNA 2: Centro */}
                    <div className="flex h-full flex-col justify-center p-8 text-black text-center md:text-left">

                        {/* Nombre */}
                        <h3 className="dark-mesh-gradient text-3xl font-bold tracking-tight">
                            Alexander Sequera
                        </h3>

                        {/* Estadísticas */}
                        <div className="mt-8 grid w-full grid-cols-3 gap-4 md:justify-items-start">

                            {/* Grupos */}
                            <div className="flex flex-col items-center justify-center">
                                {/* Cambiado de #C4B5FD a un morado más profundo y oscuro */}
                                <span className="text-3xl font-bold text-[#6D28D9] md:text-4xl">
                                    4
                                </span>

                                {/* Unificado a text-black/70 para mayor oscuridad/contraste */}
                                <span className="mt-1 text-[10px] font-bold uppercase tracking-[0.2em] text-black/70 md:text-xs">
                                    Groups
                                </span>
                            </div>

                            {/* Eventos */}
                            <div className="flex flex-col items-center justify-center">
                                {/* Cambiado de #A9FFD7 a un verde esmeralda oscuro */}
                                <span className="text-3xl font-bold text-[#059669] md:text-4xl">
                                    3
                                </span>

                                <span className="mt-1 text-[10px] font-bold uppercase tracking-[0.2em] text-black/70 md:text-xs">
                                    Communities
                                </span>
                            </div>

                            {/* Amigos */}
                            <div className="flex flex-col items-center justify-center">
                                {/* Cambiado de #FFB199 a un naranja/terracota oscuro */}
                                <span className="text-3xl font-bold text-[#EA580C] md:text-4xl">
                                    0
                                </span>

                                <span className="mt-1 text-[10px] font-bold uppercase tracking-[0.2em] text-black/70 md:text-xs">
                                    Friends
                                </span>
                            </div>

                        </div>

                    </div>

                    {/* COLUMNA 3: Derecha */}
                    <div className="flex md:flex-col gap-5 h-full items-center justify-center p-8">
                        <LiquidButtonDark
                            className="px-2 py-2"
                            textClassName="text-sm"
                        >Enviar Solicitud
                        </LiquidButtonDark>
                        <LiquidButtonDark
                            className="px-4 py-2"
                            textClassName="text-sm"
                        >Mensaje
                        </LiquidButtonDark>
                    </div>

                </div>
            </div>
        </section>
    );
}