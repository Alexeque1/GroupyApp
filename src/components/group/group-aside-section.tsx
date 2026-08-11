import { Calendar, MapPin, Tag } from "lucide-react";
import Image from "next/image";
import { USERS_DATA } from "@/lib/mock_data/users-data";
import Link from "next/link";

type GroupAsideProps = {
    group: {
        description: string;
        location: string;
        category: string;
        createdAt: string;
        ownerId: number;
        adminIds: number[];
    };
};

export default function GroupAsideSection({ group }: GroupAsideProps) {

    const owner = USERS_DATA.find((user) => user.id === group.ownerId);
    const otherAdmins = group.adminIds
        .map((id) => USERS_DATA.find((user) => user.id === id))
        .filter((user) => user !== undefined);

    return (
        <aside className="flex h-fit flex-1 flex-col gap-6 rounded-3xl border border-black/30 bg-white/5 p-6 shadow-[0_8px_30px_rgba(0,0,0,0.08)] backdrop-blur-sm">

            {/* SECCIÓN 1: INFO DEL GRUPO */}
            <div className="flex flex-col gap-4">
                <h3 className="text-lg font-bold text-black/80">
                    About Group
                </h3>

                <p className="text-sm leading-relaxed text-black/70">
                    {group.description}
                </p>

                <div className="mt-1 flex flex-col gap-3">
                    <div className="flex items-center gap-3 text-sm text-black/70">
                        <MapPin size={16} className="text-[#6D28D9]" />
                        <span>{group.location}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-black/70">
                        <Tag size={16} className="text-[#6D28D9]" />
                        <span>{group.category}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-black/70">
                        <Calendar size={16} className="text-[#6D28D9]" />
                        <span>Created in {group.createdAt}</span>
                    </div>
                </div>
            </div>

            <hr className="border-black/10" />

            {/* SECCIÓN 2: TEAM / ADMINISTRADORES */}
            <div className="flex flex-col gap-4">
                <h3 className="text-lg font-bold text-black/80">
                    Team
                </h3>

                <div className="flex flex-col gap-4">

                    {/* --- 1. DUEÑO DESTACADO (FOTO MÁS GRANDE Y SIN CORONA) --- */}
                    {owner && (
                        <Link href={`/profile/${owner.id}`}>
                            <div className="group flex items-center justify-between rounded-2xl border border-brand-purple/20 bg-brand-purple/5 p-3 transition-colors hover:bg-brand-purple/10 dark:border-brand-purple/30 dark:bg-brand-purple/10">
                                <div className="flex items-center gap-3.5">

                                    {/* Foto de perfil más grande */}
                                    <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full border-2 border-brand-purple/20 bg-white shadow-sm">
                                        <Image
                                            src={owner.profileImage}
                                            alt={owner.firstName}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>

                                    {/* Nombre y Etiqueta limpia */}
                                    <div className="flex flex-col">
                                        <span className="text-[15px] font-bold text-black transition-colors group-hover:text-brand-purple dark:text-white">
                                            {owner.firstName} {owner.lastName}
                                        </span>
                                        <span className="text-[11px] font-black uppercase tracking-wider text-brand-purple">
                                            Owner
                                        </span>
                                    </div>

                                </div>
                            </div>
                        </Link>
                    )}

                    {otherAdmins.length > 0 && (
                        <div className="flex flex-col gap-3 mt-1">
                            {otherAdmins.map((admin) => (
                                <Link key={admin!.id} href={`/profile/${admin!.id}`}>
                                    <div className="group flex cursor-pointer items-center gap-3">

                                        <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-xl border border-black/5 bg-black/5 transition-transform group-hover:scale-105">
                                            <Image
                                                src={admin!.profileImage}
                                                alt={admin!.firstName}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>

                                        <div className="flex flex-1 flex-col">
                                            <h4 className="text-sm font-semibold text-black/80 transition-colors group-hover:text-[#6D28D9]">
                                                {admin!.firstName} {admin!.lastName}
                                            </h4>
                                            <p className="flex items-center gap-1 text-xs text-black/50">
                                                Admin
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </aside>
    );
}