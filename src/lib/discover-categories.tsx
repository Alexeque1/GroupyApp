import { CategoryType } from "@/components/discover/discover-categories-cards";
import { PartyPopper, Mic2, Trees, Handshake, Palette, Dumbbell } from "lucide-react";

export const DISCOVER_CATEGORIES: CategoryType[] = [
    { id: 1, name: "Party", icon: PartyPopper, bg: "bg-pink-500/15", text: "text-pink-600", solid: "bg-pink-500" },
    { id: 2, name: "Concerts", icon: Mic2, bg: "bg-[#8C6CFF]/15", text: "text-[#6D28D9]", solid: "bg-[#8C6CFF]" }, // Morado de la marca
    { id: 3, name: "Nature", icon: Trees, bg: "bg-[#059669]/15", text: "text-[#059669]", solid: "bg-[#059669]" }, // Verde de la marca
    { id: 4, name: "Meetings", icon: Handshake, bg: "bg-blue-500/15", text: "text-blue-600", solid: "bg-blue-500" },
    { id: 5, name: "Hobbies", icon: Palette, bg: "bg-[#EA580C]/15", text: "text-[#EA580C]", solid: "bg-[#EA580C]" }, // Naranja de la marca
    { id: 6, name: "Fitness", icon: Dumbbell, bg: "bg-rose-500/15", text: "text-rose-600", solid: "bg-rose-500" },
];