"use client";

import { Construction, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/button";
import AnimatedBackgroundLight from "@/components/ui/backgrounds/animated-background-light";
import { motion } from "framer-motion";
import SettingsAsideSection from "@/components/settings/settings-aside-section";
import SettingsMainSection from "@/components/settings/settings-main-section";
import ProfileHeader from "@/components/profile/profile-header";
import { CURRENT_USER_ID } from "@/lib/mock_data/profile-info";
import { getProfileViewModel } from "@/lib/mock_data/profile-selectors";

export default function Settings() {
    const router = useRouter();
    const profile = getProfileViewModel(Number(CURRENT_USER_ID));

    if (!profile) {
        return (
            <div className="flex items-center justify-center h-full p-5">
                <p>User not found.</p>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex flex-col gap-8 -mt-10"
        >
            <AnimatedBackgroundLight />

            <ProfileHeader user={profile} isOwnProfile={true} isUserFollowing={false} isSettings={true} />
            <div className="flex flex-col md:flex-row gap-5">
                <SettingsAsideSection />
                <SettingsMainSection />
            </div>
        </motion.div>
    );
}