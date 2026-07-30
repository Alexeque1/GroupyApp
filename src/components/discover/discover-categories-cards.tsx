import { LucideIcon } from "lucide-react";

export interface CategoryType {
    id: number;
    name: string;
    icon: LucideIcon;
    bg: string;
    text: string;
    solid: string;
}

interface DiscoverCategoryCardProps {
    category: CategoryType;
    isActive: boolean;
    onClick: () => void;
}

export default function DiscoverCategoryCard({ category, isActive, onClick }: DiscoverCategoryCardProps) {
    const Icon = category.icon;

    return (
        <button
            onClick={onClick}
            className={`group cursor-pointer flex items-center gap-2 shrink-0 rounded-full border transition-all duration-300 px-4 py-2.5 ${
                isActive
                ? `${category.solid} border-transparent shadow-[0_8px_20px_rgba(0,0,0,0.12)] -translate-y-0.5`
                : `bg-white border-black/10 hover:border-black/20 hover:-translate-y-0.5`
            }`}
        >
            <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full transition-colors ${
                isActive ? "bg-white/20" : category.bg
            }`}>
                <Icon size={14} className={isActive ? "text-white" : category.text} />
            </div>

            <span className={`text-sm font-bold whitespace-nowrap transition-colors ${
                isActive ? "text-white" : "text-black/70 group-hover:text-black/90"
            }`}>
                {category.name}
            </span>
        </button>
    );
}
