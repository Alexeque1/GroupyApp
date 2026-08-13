import { CommunityType } from "@/components/profile/profile-communities-cards";

export const COMMUNITIES_DATA: CommunityType[] = [
    {
        id: 1,
        title: "Developers on fire 🔥",
        category: "Technology",
        members: "24.5k",
        colorFrom: "from-[#8C6CFF]",
        colorTo: "to-[#C4B5FD]",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=500&auto=format&fit=crop",
        location: "Global",
        activity: "+100 posts today",
        status: "Public",
    },
    {
        id: 2,
        title: "Techno lovers",
        category: "Music",
        members: "12.1k",
        colorFrom: "from-[#A9FFD7]",
        colorTo: "to-[#059669]",
        image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=500&auto=format&fit=crop",
        location: "Berlin, DE",
        activity: "Very Active",
        status: "Private",
    },
    {
        id: 3,
        title: "Reading club",
        category: "Literature",
        members: "5.3k",
        colorFrom: "from-[#FFB199]",
        colorTo: "to-[#EA580C]",
        image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=500&auto=format&fit=crop",
        location: "Online",
        activity: "Daily discussions",
        status: "Public",
    }
];
