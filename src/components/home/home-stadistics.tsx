import { Users, CalendarDays, UserPlus, Bell } from "lucide-react";

export default function HomeMainStatistics() {
    const STATS_DATA = [
        {
            id: 1,
            label: "Active Groups",
            value: "12",
            detail: "+2 this month",
            icon: Users,
            iconColor: "text-[#8C6CFF]",
            bgColor: "bg-[#8C6CFF]/10",
        },
        {
            id: 2,
            label: "Groups This Week",
            value: "3",
            detail: "Scheduled meetings",
            icon: CalendarDays,
            iconColor: "text-[#059669]",
            bgColor: "bg-[#A9FFD7]/40",
        },
        {
            id: 3,
            label: "Pending Invites",
            value: "2",
            detail: "Awaiting response",
            icon: UserPlus,
            iconColor: "text-[#EA580C]",
            bgColor: "bg-[#FFB199]/30",
        },
        {
            id: 4,
            label: "Notifications",
            value: "4",
            detail: "Unread alerts",
            icon: Bell,
            iconColor: "text-[#6D28D9]",
            bgColor: "bg-[#C4B5FD]/30",
        }
    ];

    return (
        <div className="z-10 w-full">
            {/* GRID DE ESTADÍSTICAS */}
            {/* En celular 2 columnas, en tablets/PC 4 columnas */}
            <div className="grid grid-cols-2 gap-3 md:gap-4 xl:grid-cols-4">
                
                {STATS_DATA.map((stat) => {
                    const Icon = stat.icon;
                    
                    return (
                        <div 
                            key={stat.id}
                            className="group flex cursor-default flex-col justify-between rounded-3xl border border-black/5 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(0,0,0,0.06)]"
                        >
                            {/* HEADER DEL ITEM (Ícono + Label) */}
                            <div className="flex items-center gap-2">
                                <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl ${stat.bgColor} transition-transform duration-300 group-hover:scale-110`}>
                                    <Icon size={16} className={stat.iconColor} />
                                </div>
                                <span className="line-clamp-1 text-xs font-bold text-black/50">
                                    {stat.label}
                                </span>
                            </div>

                            {/* NÚMERO Y DETALLE */}
                            <div className="mt-3 flex flex-col">
                                <span className="text-3xl font-black tracking-tight text-black/90">
                                    {stat.value}
                                </span>
                                <span className="mt-0.5 text-[10px] font-semibold text-black/40">
                                    {stat.detail}
                                </span>
                            </div>
                        </div>
                    );
                })}

            </div>
        </div>
    );
}