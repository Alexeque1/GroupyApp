"use client";

import { motion } from "motion/react";
import {
    Calendar,
    Users,
    Folder,
    Sparkles,
} from "lucide-react";

import BenefitCard from "./benefit-card";

const benefits = [
    {
        icon: <Calendar className="h-8 w-8" />,
        title: "Everything in one place",
        description:
            "Organize groups, events and conversations without jumping between different apps.",
    },
    {
        icon: <Users className="h-8 w-8" />,
        title: "Know who's coming",
        description:
            "Everyone can confirm their attendance so you always know who's joining.",
    },
    {
        icon: <Folder className="h-8 w-8" />,
        title: "Keep your groups organized",
        description:
            "Separate friends, work, university or any community into dedicated spaces.",
    },
    {
        icon: <Sparkles className="h-8 w-8" />,
        title: "Discover new plans",
        description:
            "Explore events and communities based on your interests and meet new people.",
    },
];

export default function BenefitsGrid() {
    return (
        <div className="text-center">
            <h2 className="h2_title dark-mesh-gradient">
                Groupy helps you build your group
            </h2>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                {benefits.map((benefit, index) => (
                    <motion.div
                        key={benefit.title}
                        className="h-full"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{
                            duration: 0.6,
                            delay: index * 0.15,
                        }}
                    >
                        <BenefitCard
                            icon={benefit.icon}
                            title={benefit.title}
                            description={benefit.description}
                        />
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
