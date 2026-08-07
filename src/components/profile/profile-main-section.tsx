"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import ProfileSectionGroups from "./profile-main-section-groups";
import ProfileSectionCommunities from "./profile-main-section-communities";
import ProfileSectionFriendsList from "./profile-main-section-friendslist";
import { GroupType } from "./profile-groups-cards";
import { CommunityType } from "./profile-communities-cards";
import { FriendType } from "./profile-friends-cards";

const TABS_CONFIG = [
    {
        key: "Groups",
        title: "Alex's Groups",
        description:
            "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Placeat magnam saepe iste, minus ut quibusdam enim quis est necessitatibus eaque dicta, commodi amet debitis et soluta dolorum numquam a reiciendis.",
        Component: ProfileSectionGroups,
    },
    {
        key: "Communities",
        title: "Alex's Communities",
        description:
            "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Suscipit eaque at commodi aperiam itaque expedita accusamus, doloremque numquam veniam ut praesentium eius, harum nostrum iure repudiandae sapiente non, ratione quod?",
        Component: ProfileSectionCommunities,
    },
    {
        key: "Friends",
        title: "Alex's friends list",
        description:
            "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Blanditiis voluptate magnam accusamus ullam. Quos vero ducimus rerum incidunt, in quidem error! Placeat molestiae reprehenderit laborum? Veniam delectus atque amet eum.",
        Component: ProfileSectionFriendsList,
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
};

export default function ProfileMain({ user }: ProfileMainProps) {
    const [activeTab, setActiveTab] = useState<TabType>(TABS_CONFIG[0].key);

    return (
        <section className="z-10 flex flex-col flex-[2] rounded-3xl border border-black/30 shadow-[0_8px_30px_rgba(0,0,0,0.08)] bg-white/5 backdrop-blur-md overflow-hidden min-h-[500px]">
            {/* HEADER TIPO NAV */}
            <header className="flex w-full border-b border-black/10 overflow-x-auto hide-scrollbar">
                {TABS_CONFIG.map(({ key }) => (
                    <button
                        key={key}
                        onClick={() => setActiveTab(key)}
                        className={`relative cursor-pointer px-6 py-4 text-sm font-semibold transition-colors duration-300 ${
                            activeTab === key
                                ? "text-[#6D28D9]"
                                : "text-black/50 hover:text-black/80"
                        }`}
                    >
                        {key}

                        {/* Línea animada que indica la pestaña activa */}
                        {activeTab === key && (
                            <motion.div
                                layoutId="active-tab-indicator"
                                className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#6D28D9]"
                                transition={{
                                    type: "spring",
                                    stiffness: 500,
                                    damping: 30,
                                }}
                            />
                        )}
                    </button>
                ))}
            </header>

            {/* CONTENIDO DINÁMICO */}
            <div id="group_section" className="flex-1 p-6 relative flex flex-col">
                <AnimatePresence mode="wait">
                    {TABS_CONFIG.map(({ key, description, Component }) => {
                        if (activeTab !== key) return null;

                        return (
                            <motion.div
                                key={key}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2, ease: "easeInOut" }}
                                className="flex flex-col gap-4 flex-1 h-full"
                            >
                                <h3 className="text-xl font-bold text-black/80">{user.name}&apos;s {key}</h3>
                                <p className="text-black/60">{description}</p>

                                <Component
                                    groups={user.groups}
                                    communities={user.communities}
                                    friends={user.friends}
                                    isOwnProfile
                                    profileName={user.name}
                                    profileUsername={user.username}
                                />
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>
        </section>
    );
}