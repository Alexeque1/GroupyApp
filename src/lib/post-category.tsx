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
        badgeClasses: "bg-brand-purple/10 text-brand-purple-deep dark:bg-brand-purple/20 dark:text-brand-purple", 
        // We bump the border opacity to /40 (light) and /50 (dark) so it outlines the card better
        cardClasses: "bg-brand-purple/[0.03] border-brand-purple/40 dark:bg-brand-purple/[0.05] dark:border-brand-purple/50" 
    },
    Media: { 
        label: "Media", 
        icon: ImageIcon,  
        badgeClasses: "bg-brand-orange/10 text-brand-orange dark:bg-brand-orange/20", 
        // Aumentamos la opacidad del borde a /40 (light) y /50 (dark)
        cardClasses: "bg-brand-orange/[0.03] border-brand-orange/40 dark:bg-brand-orange/[0.05] dark:border-brand-orange/50" 
    },
};

const FALLBACK: PostCategoryInfo = { 
    label: "Post", 
    icon: MessageCircle, 
    badgeClasses: "bg-black/5 text-black/60 dark:bg-white/10 dark:text-white/70", 
    // Slightly more pronounced border (20%) for the fallback too
    cardClasses: "bg-white border-black/20 dark:bg-brand-dark dark:border-white/20" 
};

export function getPostCategoryInfo(category: string): PostCategoryInfo {
    return POST_CATEGORY_DATA[category as PostCategory] ?? FALLBACK;
}