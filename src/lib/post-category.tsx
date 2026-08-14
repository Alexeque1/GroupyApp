import { Megaphone, MessageCircle, Image as ImageIcon } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { PostCategory } from "@/lib/mock_data/post-data";

export interface PostCategoryInfo {
    label: string;
    icon: LucideIcon;
    badgeClasses: string; 
    cardClasses: string; // Cambiamos accentClasses por cardClasses
}

export const POST_CATEGORY_DATA: Record<PostCategory, PostCategoryInfo> = {
    Announcement: { 
        label: "Announcement", 
        icon: Megaphone, 
        // Badge más limpio, sin bordes tan marcados
        badgeClasses: "bg-[#8C6CFF]/10 text-[#6D28D9] dark:bg-[#8C6CFF]/20 dark:text-[#8C6CFF]", 
        // Fondo ultra sutil (3% en light, 5% en dark) y borde suave
        cardClasses: "bg-[#8C6CFF]/[0.03] border-[#8C6CFF]/15 dark:bg-[#8C6CFF]/[0.05] dark:border-[#8C6CFF]/20" 
    },
    Media: { 
        label: "Media", 
        icon: ImageIcon,  
        badgeClasses: "bg-[#EA580C]/10 text-[#EA580C] dark:bg-[#EA580C]/20", 
        cardClasses: "bg-[#EA580C]/[0.03] border-[#EA580C]/15 dark:bg-[#EA580C]/[0.05] dark:border-[#EA580C]/20" 
    },
};

const FALLBACK: PostCategoryInfo = { 
    label: "Post", 
    icon: MessageCircle, 
    badgeClasses: "bg-black/5 text-black/60 dark:bg-white/10 dark:text-white/70", 
    cardClasses: "bg-white border-black/10 dark:bg-[#0a0514] dark:border-white/10" 
};

export function getPostCategoryInfo(category: string): PostCategoryInfo {
    return POST_CATEGORY_DATA[category as PostCategory] ?? FALLBACK;
}