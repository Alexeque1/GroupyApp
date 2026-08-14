"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import ProfileSectionGroups from "./profile-main-section-groups";
import ProfileSectionCommunities from "./profile-main-section-communities";
import ProfileSectionFriendsList from "./profile-main-section-friendslist";
import NavigationTabButton from "../ui/navigation-tab-button"; // <-- Importa tu nuevo componente
import { GroupType } from "./profile-groups-cards";
import { CommunityType } from "./profile-communities-cards";
import { FriendType } from "./profile-friends-cards";

const TABS_CONFIG = [
    {
        key: "Groups",
        description:
            "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Placeat magnam saepe iste, minus ut quibusdam enim quis est necessitatibus eaque dicta, commodi amet debitis et soluta dolorum numquam a reiciendis.",
    },
    {
        key: "Communities",
        description:
            "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Suscipit eaque at commodi aperiam itaque expedita accusamus, doloremque numquam veniam ut praesentium eius, harum nostrum iure repudiandae sapiente non, ratione quod?",
    },
    {
        key: "Friends",
        description:
            "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Blanditiis voluptate magnam accusamus ullam. Quos vero ducimus rerum incidunt, in quidem error! Placeat molestiae reprehenderit laborum? Veniam delectus atque amet eum.",
    },
] as const;

type TabType = (typeof TABS_CONFIG)[number]["key"];

type ProfileMainProps = {
    user: {
        name: string;
        username: string;
        groups: GroupType[];
        communities: CommunityType[];
        friends: FriendType[];
    };
    isOwnProfile: boolean;
    currentUserId: number;
};

export default function ProfileMain({ user, isOwnProfile, currentUserId }: ProfileMainProps) {
    const [activeTab, setActiveTab] = useState<TabType>(TABS_CONFIG[0].key);
    const activeConfig = TABS_CONFIG.find((tab) => tab.key === activeTab)!;

    return (
        <section className="z-10 flex min-h-[500px] flex-[2] flex-col overflow-hidden rounded-3xl bg-black/5 shadow-[0_8px_30px_rgba(0,0,0,0.08)] backdrop-blur-md pt-2 md:pt-4">
            
            {/* HEADER TIPO CARPETAS */}
            <header className="flex w-full items-end gap-1 px-4 overflow-x-auto hide-scrollbar">
                {TABS_CONFIG.map(({ key }) => (
                    <NavigationTabButton
                        key={key}
                        label={key}
                        isActive={activeTab === key}
                        onClick={() => setActiveTab(key)}
                        layoutId="profile-tabs"
                    />
                ))}
            </header>

            {/* CONTENIDO DINÁMICO */}
            <div id="group_section" className="relative flex flex-1 flex-col p-6 md:p-8 bg-white rounded-b-3xl">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                        className="flex h-full flex-1 flex-col gap-4"
                    >
                        <h3 className="text-xl font-bold text-black/80">
                            {user.name}&apos;s {activeTab}
                        </h3>
                        <p className="text-black/60">{activeConfig.description}</p>

                        {activeTab === "Groups" && (
                            <ProfileSectionGroups
                                groups={user.groups}
                                isOwnProfile={isOwnProfile}
                                profileName={user.name}
                                profileUsername={user.username}
                            />
                        )}

                        {activeTab === "Communities" && (
                            <ProfileSectionCommunities communities={user.communities} />
                        )}

                        {activeTab === "Friends" && (
                            <ProfileSectionFriendsList friends={user.friends} currentUserId={currentUserId} />
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    );
}