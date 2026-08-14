import { useState } from "react";
import NavigationTabButton from "../ui/navigation-tab-button";
import { AnimatePresence, motion } from "framer-motion";
import GroupFeedTextBox from "./group-feed/group-feed-textbox";
import type { FeedUser } from "@/lib/mock_data/users-data";
import GroupFeed from "./group-feed/group-feed-section";

const TABS_CONFIG = [
    {
        key: "Feed",
        description:
            "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Placeat magnam saepe iste, minus ut quibusdam enim quis est necessitatibus eaque dicta, commodi amet debitis et soluta dolorum numquam a reiciendis.",
    },
    {
        key: "Agenda",
        description:
            "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Suscipit eaque at commodi aperiam itaque expedita accusamus, doloremque numquam veniam ut praesentium eius, harum nostrum iure repudiandae sapiente non, ratione quod?",
    },
    {
        key: "Members",
        description:
            "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Blanditiis voluptate magnam accusamus ullam. Quos vero ducimus rerum incidunt, in quidem error! Placeat molestiae reprehenderit laborum? Veniam delectus atque amet eum.",
    },
] as const;

type TabType = (typeof TABS_CONFIG)[number]["key"];

type GroupMainSectionProps = {
    user: FeedUser;
    groupId: number;
};

export default function GroupMainSection({user, groupId}:GroupMainSectionProps) {
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
            <div id="group_section" className="relative flex flex-1 flex-col p-4 md:p-6 bg-white rounded-b-3xl">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                        className="flex h-full flex-1 flex-col gap-2"
                    >
                        {activeTab === "Feed" && (
                            <GroupFeed user={user} groupId={groupId}/>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    );
}