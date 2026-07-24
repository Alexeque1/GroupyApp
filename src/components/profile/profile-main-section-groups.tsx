"use client";

import ProfileGroupCard, { GroupType } from "./profile-groups-cards";

// DATA DE EJEMPLO
const GROUPS_DATA: GroupType[] = [
    {
        id: 1,
        title: "UX/UI Designers Arg",
        category: "Tecnología",
        members: "1.2k",
        colorFrom: "from-[#8C6CFF]",
        colorTo: "to-[#C4B5FD]",
        image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=500&auto=format&fit=crop",
        startDate: "Oct 2023",
        owner: "Alex S.",
        status: "Activo",
        statusClasses: "bg-[#A9FFD7]/30 text-[#059669] border-[#059669]/20", 
    },
    {
        id: 2,
        title: "Trekking Fin de Semana",
        category: "Deportes",
        members: "340",
        colorFrom: "from-[#A9FFD7]",
        colorTo: "to-[#059669]",
        image: "https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=500&auto=format&fit=crop",
        startDate: "Ene 2024",
        owner: "Martín G.",
        status: "Privado",
        statusClasses: "bg-[#8C6CFF]/20 text-[#6D28D9] border-[#8C6CFF]/30",
    },
    {
        id: 3,
        title: "Café de Especialidad",
        category: "Gastronomía",
        members: "850",
        colorFrom: "from-[#FFB199]",
        colorTo: "to-[#EA580C]",
        image: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=500&auto=format&fit=crop",
        startDate: "Mar 2022",
        owner: "Lucía P.",
        status: "Inactivo",
        statusClasses: "bg-[#FFB199]/30 text-[#EA580C] border-[#FFB199]/30",
    },
    {
        id: 4,
        title: "Fotografía Nocturna",
        category: "Arte",
        members: "150",
        colorFrom: "from-[#6D28D9]",
        colorTo: "to-[#8C6CFF]",
        image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=500&auto=format&fit=crop",
        startDate: "Ago 2025",
        owner: "Carlos M.",
        status: "Activo",
        statusClasses: "bg-[#A9FFD7]/30 text-[#059669] border-[#059669]/20", 
    }
];

export default function ProfileSectionGroups() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full">
            {GROUPS_DATA.map((group) => (
                <ProfileGroupCard key={group.id} group={group} />
            ))}
        </div>
    );
}