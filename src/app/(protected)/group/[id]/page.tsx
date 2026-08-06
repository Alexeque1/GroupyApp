"use client";

import GroupAsideSection from "@/components/group/group-aside-section";
import GroupHeader from "@/components/group/group-header";
import GroupMainSection from "@/components/group/group-main-section";
import AnimatedBackgroundLight from "@/components/ui/backgrounds/animated-background-light";
import { GROUPS_DATA } from "@/lib/mock_data/group-data";
import { motion } from "framer-motion";
import { use } from "react";

interface GroupProps {
    params: Promise<{ id: string }>;
}

export default function Group({ params }: GroupProps) {
    const { id } = use(params);
    const group = GROUPS_DATA.find((g) => g.id === Number(id));

    if (!group) {
        return (
            <div className="flex items-center justify-center h-full p-5">
                <p>Group not found.</p>
            </div>
        );
    }

    const [memberCount, memberLimit] = group.members.split("/").map(Number);

    return (
        <div className="flex flex-col gap-8 -mt-10">
            <motion.div
                initial={{ opacity: 0, y: -40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
            >
                <GroupHeader
                    groupData={{
                        title: group.title,
                        coverImage: group.image,
                        memberCount,
                        memberLimit,
                        category: group.category,
                    }}
                />
            </motion.div>

            <div className="flex flex-col gap-5 md:flex-row items-start p-5">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
                    className="flex flex-1 flex-col"
                >
                    <GroupAsideSection />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
                    className="flex flex-[2] flex-col"
                >
                    <GroupMainSection />
                </motion.div>
            </div>
        </div>
    );
}