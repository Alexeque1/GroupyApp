import { CommunityType } from "@/components/profile/profile-communities-cards";

export const COMMUNITIES_DATA: CommunityType[] = [
    {
        id: 1,
        title: "Developers on fire 🔥",
        category: "Technology",
        members: "24.5k",
        colorFrom: "from-brand-purple",
        colorTo: "to-[#C4B5FD]",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=500&auto=format&fit=crop",
        location: "Global",
        activity: "3 new posts · Lucas M. commented",
        status: "Public",
        activityCount: 3,
    },
    {
        id: 2,
        title: "Techno lovers",
        category: "Music",
        members: "12.1k",
        colorFrom: "from-brand-mint",
        colorTo: "to-brand-green",
        image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=500&auto=format&fit=crop",
        location: "Berlin, DE",
        activity: "New event: Rooftop set · Sat",
        status: "Private",
        activityCount: 1,
    },
    {
        id: 3,
        title: "Reading club",
        category: "Literature",
        members: "5.3k",
        colorFrom: "from-brand-peach",
        colorTo: "to-brand-orange",
        image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=500&auto=format&fit=crop",
        location: "Online",
        activity: "12 new members this week",
        status: "Public",
        activityCount: 12,
    }
];
