import { Sparkles } from "lucide-react";
import ProfileGroupCard, { GroupType } from "../profile/profile-groups-cards";

export default function HomeNextGroup() {
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
        }
    ];

    return (
        <div className="flex flex-col rounded-3xl border border-black/10 bg-white p-5 shadow-[0_8px_30px_rgba(0,0,0,0.06)]">

            {/* TÍTULO DE LA SECCIÓN */}
            <div className="mb-4 flex items-center gap-2 px-1">
                <Sparkles size={18} className="text-[#8C6CFF]" />
                <h3 className="text-xl font-bold text-black/90">
                    Your next group
                </h3>
            </div>

            {/* SEPARADOR */}
            <div className="mb-5 h-px w-full bg-black/5" />

            {/* TARJETA(S) DEL GRUPO */}
            <div className="flex flex-col gap-4">
                {GROUPS_DATA.length < 1 ? (
                    <p className="text-black/60">You currently have no groups</p>
                ) : (
                    <>
                        <p className="text-black/60">Take a look at your group's next event!</p>
                        {GROUPS_DATA.map((group) => (
                            <ProfileGroupCard key={group.id} group={group} />
                        ))}
                    </>
                )}
            </div>

        </div>
    );
}