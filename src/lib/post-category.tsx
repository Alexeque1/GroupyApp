import { Megaphone, MessageCircle, Image as ImageIcon } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { PostCategory } from "@/lib/mock_data/post-data";

export interface PostCategoryInfo {
    label: string;
    icon: LucideIcon;
    badgeClasses: string; 
    cardClasses: string; 
}

export const POST_CATEGORY_DATA: Record<PostCategory, PostCategoryInfo> = {
    Announcement: { 
        label: "Announcement", 
        icon: Megaphone, 
        badgeClasses: "bg-[#8C6CFF]/10 text-[#6D28D9] dark:bg-[#8C6CFF]/20 dark:text-[#8C6CFF]", 
        // Aumentamos la opacidad del borde a /40 (light) y /50 (dark) para que delimite mejor la tarjeta
        cardClasses: "bg-[#8C6CFF]/[0.03] border-[#8C6CFF]/40 dark:bg-[#8C6CFF]/[0.05] dark:border-[#8C6CFF]/50" 
    },
    Media: { 
        label: "Media", 
        icon: ImageIcon,  
        badgeClasses: "bg-[#EA580C]/10 text-[#EA580C] dark:bg-[#EA580C]/20", 
        // Aumentamos la opacidad del borde a /40 (light) y /50 (dark)
        cardClasses: "bg-[#EA580C]/[0.03] border-[#EA580C]/40 dark:bg-[#EA580C]/[0.05] dark:border-[#EA580C]/50" 
    },
};

const FALLBACK: PostCategoryInfo = { 
    label: "Post", 
    icon: MessageCircle, 
    badgeClasses: "bg-black/5 text-black/60 dark:bg-white/10 dark:text-white/70", 
    // Borde un poco más marcado (20%) para el fallback también
    cardClasses: "bg-white border-black/20 dark:bg-[#0a0514] dark:border-white/20" 
};

export function getPostCategoryInfo(category: string): PostCategoryInfo {
    return POST_CATEGORY_DATA[category as PostCategory] ?? FALLBACK;
}