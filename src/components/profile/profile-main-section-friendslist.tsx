"use client";

import FriendsCards, {FriendType} from "./profile-friends-cards";
import ProfileSectionGrid from "./profile-section-grid";
import { FRIENDS_DATA } from "@/lib/mock_data/friends-data";

export default function ProfileSectionFriendsList() {
    return (
        <ProfileSectionGrid
            items={FRIENDS_DATA}
            columns="grid-cols-1 xl:grid-cols-3"
            renderItem={(friend) => <FriendsCards friend={friend} />}
        />
    );
}