"use client";

import Image from "next/image";
import { Users, ArrowUpRight, Crown, Calendar } from "lucide-react";

export interface GroupType {
    id: number;
    title: string;
    category: string;
    members: string;
    colorFrom: string;
    colorTo: string;
    image: string;
    startDate: string;
    owner: string;
    status: string;
    statusClasses: string;
}

export default function ProfileGroupCard({ group }: { group: GroupType }) {
    return (
        <div className="group relative flex flex-col overflow-hidden rounded-3xl border border-black/10 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.15)] cursor-pointer">

            {/* PORTADA DEL GRUPO */}
            <div className="relative h-32 w-full overflow-hidden">
                {/* Imagen de fondo */}
                <Image
                    src={group.image}
                    alt={group.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                <span className="absolute left-4 top-4 rounded-full border border-white/30 bg-white/20 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-md">
                    {group.category}
                </span>
            </div>

            {/* CONTENIDO DE LA TARJETA */}
            <div className="flex flex-col p-5">
                <div className="flex items-start justify-between">
                    <h4 className="line-clamp-2 text-lg font-bold leading-tight text-black/90 transition-colors group-hover:text-[#6D28D9]">
                        {group.title}
                    </h4>

                    <div className="flex h-8 w-8 shrink-0 -translate-x-2 items-center justify-center rounded-full bg-black/5 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                        <ArrowUpRight size={16} className="text-black/70" />
                    </div>
                </div>

                {/* INFO EXTRA */}
                <div className="mt-4 flex flex-col gap-3">
                    <div className="flex items-center justify-between text-xs font-medium text-black/60">
                        <div className="flex items-center gap-1.5">
                            <Crown size={14} className="text-black/40" />
                            <span className="max-w-[80px] truncate">{group.owner}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Calendar size={14} className="text-black/40" />
                            <span>{group.startDate}</span>
                        </div>
                    </div>

                    <div>
                        <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${group.statusClasses}`}>
                            {group.status}
                        </span>
                    </div>
                </div>

                {/* FOOTER */}
                <div className="mt-5 flex items-center justify-between border-t border-black/5 pt-4">
                    <div className="flex items-center gap-1.5 text-sm font-medium text-black/60">
                        <Users size={16} />
                        <span>{group.members}</span>
                    </div>

                    <div className="flex -space-x-2">
                        <div className={`z-30 h-8 w-8 rounded-full border-2 border-white bg-gradient-to-br ${group.colorFrom} ${group.colorTo}`} />
                        <div className="z-20 h-8 w-8 rounded-full border-2 border-white bg-black/20" />
                        <div className="z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-black/10 text-[10px] font-bold text-black/50">
                            +5
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}