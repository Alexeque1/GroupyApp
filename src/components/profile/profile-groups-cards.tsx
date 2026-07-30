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
        <div className="group relative flex flex-col rounded-3xl border border-black/10 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] overflow-hidden cursor-pointer">
            
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
                
                <span className="absolute top-4 left-4 rounded-full bg-white/20 backdrop-blur-md border border-white/30 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                    {group.category}
                </span>
            </div>

            {/* CONTENIDO DE LA TARJETA */}
            <div className="flex flex-col p-5">
                <div className="flex justify-between items-start">
                    <h4 className="text-lg font-bold text-black/90 leading-tight group-hover:text-[#6D28D9] transition-colors line-clamp-2">
                        {group.title}
                    </h4>
                    
                    <div className="h-8 w-8 shrink-0 rounded-full bg-black/5 flex items-center justify-center opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                        <ArrowUpRight size={16} className="text-black/70" />
                    </div>
                </div>

                {/* INFO EXTRA */}
                <div className="mt-4 flex flex-col gap-3">
                    <div className="flex items-center justify-between text-xs text-black/60 font-medium">
                        <div className="flex items-center gap-1.5">
                            <Crown size={14} className="text-black/40" />
                            <span className="truncate max-w-[80px]">{group.owner}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Calendar size={14} className="text-black/40" />
                            <span>{group.startDate}</span>
                        </div>
                    </div>
                    
                    <div>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full border text-[10px] font-bold uppercase tracking-wider ${group.statusClasses}`}>
                            {group.status}
                        </span>
                    </div>
                </div>

                {/* FOOTER */}
                <div className="mt-5 pt-4 border-t border-black/5 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-black/60 text-sm font-medium">
                        <Users size={16} />
                        <span>{group.members}</span>
                    </div>

                    <div className="flex -space-x-2">
                        <div className={`h-8 w-8 rounded-full border-2 border-white bg-gradient-to-br ${group.colorFrom} ${group.colorTo} z-30`} />
                        <div className="h-8 w-8 rounded-full border-2 border-white bg-black/20 z-20" />
                        <div className="h-8 w-8 rounded-full border-2 border-white bg-black/10 z-10 flex items-center justify-center text-[10px] font-bold text-black/50">
                            +5
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}