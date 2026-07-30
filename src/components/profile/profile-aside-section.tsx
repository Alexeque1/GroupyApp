import { Calendar, MapPin, Users, Briefcase, Globe } from "lucide-react";

export default function ProfileAside() {
    return (
        <aside className="flex h-fit flex-1 flex-col gap-6 rounded-3xl border border-black/30 bg-white/5 p-6 shadow-[0_8px_30px_rgba(0,0,0,0.08)] backdrop-blur-sm">
            {/* SECCIÓN 1: INFO COMPLEMENTARIA */}
            <div className="flex flex-col gap-4">
                <h3 className="text-lg font-bold text-black/80">
                    About it
                </h3>

                {/* Biografía corta */}
                <p className="text-sm leading-relaxed text-black/70">
                    A lover of technology, live music, and good coffee.
                    Always seeking new adventures and groups to share
                    interests with.
                </p>

                {/* Lista de detalles */}
                <div className="mt-1 flex flex-col gap-3">
                    <div className="flex items-center gap-3 text-sm text-black/70">
                        <MapPin size={16} className="text-[#6D28D9]" />
                        <span>Buenos Aires, Argentina</span>
                    </div>

                    <div className="flex items-center gap-3 text-sm text-black/70">
                        <Briefcase size={16} className="text-[#6D28D9]" />
                        <span>UX/UI Designer</span>
                    </div>

                    <div className="flex items-center gap-3 text-sm text-black/70">
                        <Globe size={16} className="text-[#6D28D9]" />
                        <span>Spanish, English</span>
                    </div>

                    <div className="flex items-center gap-3 text-sm text-black/70">
                        <Calendar size={16} className="text-[#6D28D9]" />
                        <span>Joined in October 2023</span>
                    </div>
                </div>
            </div>

            <hr className="border-black/10" />

            {/* SECCIÓN 2: PRÓXIMOS EVENTOS */}
            <div className="flex flex-col gap-4">
                <h3 className="text-lg font-bold text-black/80">
                    Coming soon
                </h3>

                <ul className="flex flex-col gap-3">

                    {/* Evento 1 */}
                    <li className="flex cursor-pointer items-center gap-3 rounded-2xl border border-black/5 bg-black/5 p-3 transition-colors hover:bg-black/10">

                        {/* Fecha */}
                        <div className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-xl bg-[#A9FFD7]/30 text-[#059669]">
                            <span className="text-[10px] font-bold uppercase tracking-wider">
                                Oct
                            </span>

                            <span className="text-sm font-black">
                                24
                            </span>
                        </div>

                        {/* Info Evento */}
                        <div className="flex flex-1 flex-col overflow-hidden">
                            <h4 className="truncate text-sm font-semibold text-black/80">
                                Tech Meetup 2026
                            </h4>

                            <p className="mt-0.5 flex items-center gap-1 text-xs text-black/50">
                                <Calendar size={12} />
                                18:00 hs
                            </p>
                        </div>
                    </li>

                    {/* Evento 2 */}
                    <li className="flex cursor-pointer items-center gap-3 rounded-2xl border border-black/5 bg-black/5 p-3 transition-colors hover:bg-black/10">

                        {/* Fecha */}
                        <div className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-xl bg-[#FFB199]/30 text-[#EA580C]">
                            <span className="text-[10px] font-bold uppercase tracking-wider">
                                Nov
                            </span>

                            <span className="text-sm font-black">
                                02
                            </span>
                        </div>

                        {/* Info Evento */}
                        <div className="flex flex-1 flex-col overflow-hidden">
                            <h4 className="truncate text-sm font-semibold text-black/80">
                                Festival de Jazz
                            </h4>

                            <p className="mt-0.5 flex items-center gap-1 text-xs text-black/50">
                                <Calendar size={12} />
                                20:30 hs
                            </p>
                        </div>
                    </li>
                </ul>
            </div>

            {/* Separador */}
            <hr className="border-black/10" />

            {/* SECCIÓN 3: TOP COMUNIDADES */}
            <div className="flex flex-col gap-4">
                <h3 className="text-lg font-bold text-black/80">
                    Top Communities
                </h3>

                <div className="flex flex-col gap-3">

                    {/* Comunidad 1 */}
                    <div className="group flex cursor-pointer items-center gap-3">
                        <div className="h-10 w-10 shrink-0 rounded-xl bg-gradient-to-br from-[#8C6CFF] to-[#C4B5FD] transition-transform group-hover:scale-105" />

                        <div className="flex flex-1 flex-col">
                            <h4 className="text-sm font-semibold text-black/80 transition-colors group-hover:text-[#6D28D9]">
                                Developers on fire 🔥
                            </h4>

                            <p className="flex items-center gap-1 text-xs text-black/50">
                                <Users size={12} />
                                24.5k miembros
                            </p>
                        </div>
                    </div>

                    {/* Comunidad 2 */}
                    <div className="group flex cursor-pointer items-center gap-3">
                        <div className="h-10 w-10 shrink-0 rounded-xl bg-gradient-to-br from-[#A9FFD7] to-[#059669] opacity-80 transition-transform group-hover:scale-105" />

                        <div className="flex flex-1 flex-col">
                            <h4 className="text-sm font-semibold text-black/80 transition-colors group-hover:text-[#059669]">
                                Techno lovers
                            </h4>

                            <p className="flex items-center gap-1 text-xs text-black/50">
                                <Users size={12} />
                                12.1k members
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </aside>
    );
}