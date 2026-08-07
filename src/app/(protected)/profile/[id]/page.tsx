"use client";

import ProfileAside from "@/components/profile/profile-aside-section";
import ProfileHeader from "@/components/profile/profile-header";
import ProfileMain from "@/components/profile/profile-main-section";
import { CURRENT_USER_ID } from "@/lib/mock_data/profile-info";
import { getProfileViewModel } from "@/lib/mock_data/profile-selectors";
import { motion } from "framer-motion";
import { use } from "react";

interface ProfilePageProps {
    params: Promise<{ id: string }>;
}

export default function ProfilePage({ params }: ProfilePageProps) {
    const { id } = use(params);
    const profile = getProfileViewModel(Number(id));
    const isOwnProfile = Number(id) === CURRENT_USER_ID;

    if (!profile) {
        return (
            <div className="flex items-center justify-center h-full p-5">
                <p>User not found.</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-8 -mt-10">
            <motion.div
                initial={{ opacity: 0, y: -40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
            >
                <ProfileHeader user={profile} isOwnProfile={isOwnProfile} />
            </motion.div>

            <div className="flex flex-col gap-5 md:flex-row items-start p-5">

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
                    className="flex flex-1 flex-col"
                >
                    <ProfileAside user={profile} />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
                    className="flex flex-[2] flex-col"
                >
                    <ProfileMain user={profile} />
                </motion.div>
            </div>
        </div>
    );
}
