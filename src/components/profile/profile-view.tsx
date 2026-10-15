"use client";

import { motion } from "framer-motion";
import ProfileAside from "@/components/profile/profile-aside-section";
import ProfileHeader from "@/components/profile/profile-header";
import ProfileMain from "@/components/profile/profile-main-section";
import type { ProfileEvent } from "@/components/profile/profile-events-cards";
import type { ProfileUser } from "@/lib/data/profile";

type ProfileViewProps = {
    user: ProfileUser;
    /** Still loading when the page shows; each section that needs it waits behind its own skeleton */
    eventsPromise: Promise<ProfileEvent[]>;
    isOwnProfile: boolean;
};

// TODO: the Friends tab still uses mock data keyed by numeric ids. Friends aren't in the DB
// yet, so the list is always empty and this id is never compared against anything real.
const MOCK_FRIENDS_PLACEHOLDER_ID = 0;

export default function ProfileView({ user, eventsPromise, isOwnProfile }: ProfileViewProps) {
    return (
        <div className="flex flex-col gap-8 -mt-10">
            <motion.div
                initial={{ opacity: 0, y: -40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
            >
                {/* Following isn't built yet, so nobody follows anybody */}
                <ProfileHeader
                    user={user}
                    eventsPromise={eventsPromise}
                    isOwnProfile={isOwnProfile}
                    isUserFollowing={false}
                />
            </motion.div>

            <div className="flex flex-col gap-5 md:flex-row items-start p-5">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
                    className="flex w-full min-w-0 flex-1 flex-col"
                >
                    <ProfileAside user={user} eventsPromise={eventsPromise} isOwnProfile={isOwnProfile} />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
                    className="flex w-full min-w-0 flex-[2] flex-col"
                >
                    <ProfileMain
                        user={user}
                        eventsPromise={eventsPromise}
                        isOwnProfile={isOwnProfile}
                        currentUserId={MOCK_FRIENDS_PLACEHOLDER_ID}
                    />
                </motion.div>
            </div>
        </div>
    );
}
