"use client";

import ProfileGroupCard, { GroupType } from "./profile-groups-cards";

// SAMPLE DATA
const GROUPS_DATA: GroupType[] = [
    {
        id: 1,
        title: "UX/UI Designers Arg",
        category: "Technology",
        members: "10/10",
        colorFrom: "from-[#8C6CFF]",
        colorTo: "to-[#C4B5FD]",
        image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=500&auto=format&fit=crop",
        startDate: "Oct 2023",
        owner: "Alex S.",
        status: "Active",
        statusClasses: "bg-[#A9FFD7]/30 text-[#059669] border-[#059669]/20", 
    },
    {
        id: 2,
        title: "Weekend Trekking",
        category: "Sports",
        members: "5/8",
        colorFrom: "from-[#A9FFD7]",
        colorTo: "to-[#059669]",
        image: "https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=500&auto=format&fit=crop",
        startDate: "Jan 2024",
        owner: "Martín G.",
        status: "Completed",
        statusClasses: "bg-[#8C6CFF]/20 text-[#6D28D9] border-[#8C6CFF]/30",
    },
    {
        id: 3,
        title: "Specialty Coffee",
        category: "Gastronomy",
        members: "2/5",
        colorFrom: "from-[#FFB199]",
        colorTo: "to-[#EA580C]",
        image: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=500&auto=format&fit=crop",
        startDate: "Mar 2022",
        owner: "Lucía P.",
        status: "Inactive",
        statusClasses: "bg-[#FFB199]/30 text-[#EA580C] border-[#FFB199]/30",
    },
    {
        id: 4,
        title: "Night Photography",
        category: "Art",
        members: "2/No limit",
        colorFrom: "from-[#6D28D9]",
        colorTo: "to-[#8C6CFF]",
        image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=500&auto=format&fit=crop",
        startDate: "Aug 2025",
        owner: "Carlos M.",
        status: "Active",
        statusClasses: "bg-[#A9FFD7]/30 text-[#059669] border-[#059669]/20", 
    }
];

export default function ProfileSectionGroups() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 w-full">
            {GROUPS_DATA.map((group) => (
                <ProfileGroupCard key={group.id} group={group} />
            ))}
        </div>
    );
}