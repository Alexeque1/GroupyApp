"use client";

import ProfileCommunityCard, { CommunityType } from "./profile-communities-cards";
import ProfileSectionGrid from "./profile-section-grid";

export default function ProfileSectionCommunities({ communities }: { communities: CommunityType[] }) {
    return (
        <ProfileSectionGrid
            items={communities}
            renderItem={(community) => <ProfileCommunityCard community={community} />}
        />
    );
}