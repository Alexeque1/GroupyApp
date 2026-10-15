import { CategoryType } from "@/components/discover/discover-categories-cards";
import { PartyPopper, Mic2, Trees, Handshake, Palette, Dumbbell } from "lucide-react";

export const DISCOVER_CATEGORIES: CategoryType[] = [
    { id: 1, name: "Party", icon: PartyPopper, bg: "bg-pink-500/15", text: "text-pink-600", solid: "bg-pink-500" },
    { id: 2, name: "Concerts", icon: Mic2, bg: "bg-brand-purple/15", text: "text-brand-purple-deep", solid: "bg-brand-purple" }, // Morado de la marca
    { id: 3, name: "Nature", icon: Trees, bg: "bg-brand-green/15", text: "text-brand-green", solid: "bg-brand-green" }, // Verde de la marca
    { id: 4, name: "Meetings", icon: Handshake, bg: "bg-blue-500/15", text: "text-blue-600", solid: "bg-blue-500" },
    { id: 5, name: "Hobbies", icon: Palette, bg: "bg-brand-orange/15", text: "text-brand-orange", solid: "bg-brand-orange" }, // Naranja de la marca
    { id: 6, name: "Fitness", icon: Dumbbell, bg: "bg-rose-500/15", text: "text-rose-600", solid: "bg-rose-500" },
];