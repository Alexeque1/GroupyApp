"use client";

import FriendsCards, {FriendType} from "./profile-friends-cards";
import ProfileSectionGrid from "./profile-section-grid";

// DATA DE EJEMPLO
export const FRIENDS_DATA: FriendType[] = [
    {
        id: 1,
        name: "Sofía Martínez",
        username: "@sofiam",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
        mutualFriends: 12,
    },
    {
        id: 2,
        name: "Lucas Pereira",
        username: "@lucasp",
        image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=200&auto=format&fit=crop",
        mutualFriends: 5,
    },
    {
        id: 3,
        name: "Valentina Gómez",
        username: "@valegomez",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop",
        mutualFriends: 24,
    },
    {
        id: 4,
        name: "Mateo Silva",
        username: "@mateo_s",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
        mutualFriends: 2,
    },
    {
        id: 5,
        name: "Camila Ruiz",
        username: "@camiruiz",
        image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop",
        mutualFriends: 18,
    },
    {
        id: 6,
        name: "Nicolás Herrera",
        username: "@nico_h",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
        mutualFriends: 8,
    }
];

export default function ProfileSectionFriendsList() {
    return (
        <ProfileSectionGrid
            items={FRIENDS_DATA}
            columns="grid-cols-1 xl:grid-cols-3"
            renderItem={(friend) => <FriendsCards friend={friend} />}
        />
    );
}