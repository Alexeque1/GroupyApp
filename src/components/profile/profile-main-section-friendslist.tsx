"use client";

import FriendsCards, {FriendType} from "./profile-friends-cards";
import ProfileSectionGrid from "./profile-section-grid";

export default function ProfileSectionFriendsList({ friends }: { friends: FriendType[] }) {
    return (
        <ProfileSectionGrid
            items={friends}
            columns="grid-cols-1 xl:grid-cols-3"
            linkTo={(friend) => `/profile/${friend.id}`}
            renderItem={(friend) => <FriendsCards friend={friend} />}
        />
    );
}