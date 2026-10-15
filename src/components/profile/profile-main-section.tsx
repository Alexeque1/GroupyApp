"use client";

import { Suspense, use, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import ProfileSectionEvents from "./profile-main-section-events";
import ProfileSectionCommunities from "./profile-main-section-communities";
import ProfileSectionFriendsList from "./profile-main-section-friendslist";

import NavigationTabButton from "../ui/navigation-tab-button";
import Skeleton from "../ui/skeleton";
import type { ProfileEvent } from "./profile-events-cards";
import { CommunityType } from "./profile-communities-cards";
import { FriendType } from "./profile-friends-cards";

const TABS_CONFIG = [
    {
        key: "Events",
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
    {
        key: "Reviews",
        description:
            "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Blanditiis voluptate magnam accusamus ullam. Quos vero ducimus rerum incidunt, in quidem error! Placeat molestiae reprehenderit laborum? Veniam delectus atque amet eum.",
        count: 3
    }
] as const;

type TabType = (typeof TABS_CONFIG)[number]["key"];

type ProfileMainProps = {
    user: {
        name: string;
        username: string;
        communities: CommunityType[];
        friends: FriendType[];
    };
    eventsPromise: Promise<ProfileEvent[]>;
    isOwnProfile: boolean;
    currentUserId: number;
};

export default function ProfileMain({ user, eventsPromise, isOwnProfile, currentUserId }: ProfileMainProps) {
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
            <div id="group_section" className="relative flex flex-1 flex-col p-6 md:p-8 bg-white sm:rounded-b-3xl">
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

                        {activeTab === "Events" && (
                            <Suspense fallback={<EventsTabSkeleton />}>
                                <EventsTab
                                    eventsPromise={eventsPromise}
                                    isOwnProfile={isOwnProfile}
                                    profileName={user.name}
                                    profileUsername={user.username}
                                />
                            </Suspense>
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
type EventsTabProps = Omit<React.ComponentProps<typeof ProfileSectionEvents>, "events"> & {
    eventsPromise: Promise<ProfileEvent[]>;
};

function EventsTab({ eventsPromise, ...props }: EventsTabProps) {
    // Suspends here (showing EventsTabSkeleton) until the events arrive
    const events = use(eventsPromise);
    return <ProfileSectionEvents events={events} {...props} />;
}

function EventsTabSkeleton() {
    return (
        <div className="flex flex-col gap-6" role="status" aria-label="Loading events">
            {/* Hosting / Joined toggle + filters */}
            <div className="flex items-center justify-between gap-3">
                <Skeleton className="h-10 w-56 rounded-full" />
                <Skeleton className="h-10 w-24 rounded-full" />
            </div>

            {/* Same grid as ProfileSectionGrid */}
            <div className="grid w-full grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-6">
                {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="overflow-hidden rounded-2xl border border-black/5">
                        <Skeleton className="h-32 w-full rounded-none" />
                        <div className="flex flex-col gap-2 p-4">
                            <Skeleton className="h-4 w-3/4 rounded-md" />
                            <Skeleton className="h-3 w-1/2 rounded-md" />
                            <Skeleton className="h-3 w-2/3 rounded-md" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
