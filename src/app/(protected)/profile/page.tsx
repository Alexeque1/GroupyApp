"use client"; // Obligatorio porque usaremos motion de framer-motion

import { motion } from "framer-motion";
import ProfileHeader from "@/components/profile/profile-header";
import ProfileMain from "@/components/profile/profile-main-section";
import ProfileAside from "@/components/profile/profile-aside-section";
import { PROFILE_INFO } from "@/lib/mock_data/profile-info";

export default function Profile() {
    return (
        <div className="flex flex-col gap-8 -mt-10">
            <motion.div
                initial={{ opacity: 0, y: -40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
            >
                <ProfileHeader user={PROFILE_INFO} />
            </motion.div>

            <div className="flex flex-col gap-5 md:flex-row items-start p-5">
                
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
                    className="flex flex-1 flex-col"
                >
                    <ProfileAside user={PROFILE_INFO} />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
                    className="flex flex-[2] flex-col"
                >
                    <ProfileMain user={PROFILE_INFO} />
                </motion.div>
            </div>
        </div>
    );
}