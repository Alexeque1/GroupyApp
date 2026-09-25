"use client";

import Image from "next/image";
import Link from "next/link";
import { Compass } from "lucide-react";
import { CommunityType } from "../profile/profile-communities-cards";
import Button from "../ui/button";

// Paleta de colores para los avatares según el índice
const AVATAR_COLORS = [
    "bg-[#2d52bd]", // Azul (como WD)
    "bg-[#6344d4]", // Púrpura (como UX)
    "bg-[#1c6b48]", // Verde (como WT)
    "bg-[#d946ef]", // Rosado/Fucsia
    "bg-[#099268]", // Esmeralda
];

// Función para obtener las iniciales del nombre de la comunidad
function getInitials(title: string): string {
    if (!title) return "C";
    const words = title.trim().split(/\s+/);
    if (words.length >= 2) {
        return (words[0][0] + words[1][0]).toUpperCase();
    }
    return title.slice(0, 2).toUpperCase();
}

export default function HomeCommunities({ communities }: { communities: CommunityType[] }) {
    return (
        <div className="relative z-10 flex h-full w-full flex-col rounded-3xl bg-white p-6 shadow-sm border border-black/5">
            {/* CABECERA */}
            <div className="mb-4 flex shrink-0 items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900">
                    Communities
                </h3>
                <Link
                    href="/discover"
                >
                    <Button
                        tone="dark"
                        className="px-6 py-2"
                        textClassName="text-xs sm:text-sm"
                    >
                        Explore
                    </Button>
                </Link>
            </div>

            {/* LISTADO DE COMUNIDADES */}
            {communities.length > 0 ? (
                <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto pr-1">
                    {communities.map((community, index) => {
                        const bgAvatar = AVATAR_COLORS[index % AVATAR_COLORS.length];
                        const initials = getInitials(community.title);
                        const badgeCount = community.activityCount ?? null;
                        const subtitle = community.activity || "No recent activity";

                        return (
                            <Link
                                key={community.id}
                                href={`/community/${community.id}`}
                                className="group flex items-center justify-between rounded-2xl bg-[#f8f8fc] p-3 transition-colors hover:bg-gray-100/80"
                            >
                                {/* LADO IZQUIERDO: AVATAR E INFORMACIÓN */}
                                <div className="flex items-center gap-3.5 min-w-0">
                                    {/* Avatar con Imagen o Iniciales */}
                                    {community.image ? (
                                        <Image
                                            src={community.image}
                                            alt={community.title}
                                            width={48}
                                            height={48}
                                            className="h-12 w-12 shrink-0 rounded-2xl object-cover"
                                        />
                                    ) : (
                                        <div
                                            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${bgAvatar} text-white font-bold text-sm tracking-wide shadow-xs`}
                                        >
                                            {initials}
                                        </div>
                                    )}

                                    {/* Nombre y Actividad */}
                                    <div className="flex flex-col truncate">
                                        <span className="font-bold text-sm text-gray-900 truncate group-hover:text-brand-purple transition-colors">
                                            {community.title}
                                        </span>
                                        <span className="text-xs text-gray-500 truncate mt-0.5">
                                            {subtitle}
                                        </span>
                                    </div>
                                </div>

                                {/* LADO DERECHO: BADGE / CONTEO */}
                                {badgeCount !== null && (
                                    <div className="ml-3 flex shrink-0 items-center justify-center">
                                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-purple text-[11px] font-bold text-white">
                                            {badgeCount}
                                        </span>
                                    </div>
                                )}
                            </Link>
                        );
                    })}
                </div>
            ) : (
                /* ESTADO VACÍO */
                <div className="flex flex-1 flex-col items-center justify-center py-8 text-center">
                    <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
                        <Compass size={28} className="text-gray-400" />
                    </div>
                    <p className="text-sm font-semibold text-gray-700">
                        You haven&apos;t joined any community yet
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                        Discover a community and start connecting!
                    </p>
                </div>
            )}
        </div>
    );
}
