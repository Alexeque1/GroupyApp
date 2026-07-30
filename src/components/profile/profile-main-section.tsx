"use client";

import { useState } from "react";

import ProfileSectionGroups from "./profile-main-section-groups";
import ProfileSectionCommunities from "./profile-main-section-communities";
import ProfileSectionFriendsList from "./profile-main-section-friendslist";

const TABS = ["Groups", "Communities", "Friends"] as const;
type TabType = (typeof TABS)[number];

export default function ProfileMain() {
    const [activeTab, setActiveTab] = useState<TabType>(TABS[0]);

    return (
        <section className="z-10 flex flex-col flex-[2] rounded-3xl border border-black/30 shadow-[0_8px_30px_rgba(0,0,0,0.08)] bg-white/5 backdrop-blur-md overflow-hidden min-h-[500px]">
            {/* HEADER TIPO NAV */}
            <header className="flex w-full border-b border-black/10 overflow-x-auto hide-scrollbar">
                {TABS.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`relative px-6 py-4 text-sm font-semibold transition-colors duration-300 ${
                            activeTab === tab
                                ? "text-[#6D28D9]"
                                : "text-black/50 hover:text-black/80"
                        }`}
                    >
                        {tab}

                        {/* Línea estática que indica la pestaña activa */}
                        {activeTab === tab && (
                            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#6D28D9]" />
                        )}
                    </button>
                ))}
            </header>

            {/* CONTENIDO ESTÁTICO */}
            <div className="flex-1 p-6 relative flex flex-col">
                <div className="flex flex-col flex-1 h-full">
                    {activeTab === "Groups" && (
                        <div className="flex flex-col gap-4 flex-1">
                            <h3 className="text-xl font-bold text-black/80">Alex's Groups</h3>
                            <p className="text-black/60">
                                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Placeat magnam saepe iste, minus ut quibusdam enim quis est necessitatibus eaque dicta, commodi amet debitis et soluta dolorum numquam a reiciendis.
                            </p>
                            <ProfileSectionGroups />
                        </div>
                    )}

                    {activeTab === "Communities" && (
                        <div className="flex flex-col gap-4 flex-1">
                            <h3 className="text-xl font-bold text-black/80">Alex's Communities</h3>
                            <p className="text-black/60">
                                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Suscipit eaque at commodi aperiam itaque expedita accusamus, doloremque numquam veniam ut praesentium eius, harum nostrum iure repudiandae sapiente non, ratione quod?
                            </p>
                            <ProfileSectionCommunities />
                        </div>
                    )}

                    {activeTab === "Friends" && (
                        <div className="flex flex-col gap-4 flex-1">
                            <h3 className="text-xl font-bold text-black/80">Alex's friends list</h3>
                            <p className="text-black/60">
                                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Blanditiis voluptate magnam accusamus ullam. Quos vero ducimus rerum incidunt, in quidem error! Placeat molestiae reprehenderit laborum? Veniam delectus atque amet eum.
                            </p>
                            <ProfileSectionFriendsList />
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}