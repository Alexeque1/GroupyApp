import { 
    Laptop, Music, Coffee, Palette, Dumbbell, 
    Utensils, Mountain, Gamepad2, Camera, Plane 
} from "lucide-react";
import type { ComponentType } from "react";

export type InterestCategory = "Tech" | "Lifestyle" | "Creative" | "Sports" | "Social";

export type InterestItem = {
    id: string;
    label: string;
    category: InterestCategory;
    icon: ComponentType<{ size?: number; className?: string }>;
};

export const AVAILABLE_INTERESTS: InterestItem[] = [
    { id: "tech", label: "Technology", category: "Tech", icon: Laptop },
    { id: "design", label: "Design", category: "Creative", icon: Palette },
    { id: "live-music", label: "Live Music", category: "Social", icon: Music },
    { id: "coffee", label: "Coffee", category: "Lifestyle", icon: Coffee },
    { id: "fitness", label: "Fitness", category: "Sports", icon: Dumbbell },
    { id: "foodie", label: "Gastronomy", category: "Lifestyle", icon: Utensils },
    { id: "outdoors", label: "Outdoors & Hiking", category: "Sports", icon: Mountain },
    { id: "gaming", label: "Gaming", category: "Tech", icon: Gamepad2 },
    { id: "photography", label: "Photography", category: "Creative", icon: Camera },
    { id: "travel", label: "Travel", category: "Lifestyle", icon: Plane },
] as const;

export const INTERESTS_MAP = new Map(
    AVAILABLE_INTERESTS.map((item) => [item.id, item])
);

// Resolves an interest by id or label (mock users still store labels).
export function getInterest(value: string): InterestItem | undefined {
    const normalized = value.trim().toLowerCase();
    return (
        INTERESTS_MAP.get(normalized) ??
        AVAILABLE_INTERESTS.find((item) => item.label.toLowerCase() === normalized)
    );
}