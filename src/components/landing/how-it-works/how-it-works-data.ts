import type { Variants } from "framer-motion";
import {
    AnimatedStep1Icon,
    AnimatedStep2Icon,
    AnimatedStep3Icon,
} from "./how-it-works-icons";

export const steps = [
    {
        title: "Create your profile",
        description: "Tell us about yourself. Select your interests, hobbies and what you're passionate about so the algorithm can do its magic.",
        IconComponent: AnimatedStep1Icon,
        color: "#8C6CFF", // Morado Groupy
    },
    {
        title: "Discover groups",
        description: "Explore communities and events that match perfectly with your vibe. There's always something new happening near you.",
        IconComponent: AnimatedStep2Icon,
        color: "#A9FFD7", // Verde menta
    },
    {
        title: "Connect and enjoy",
        description: "Join the conversation, attend gatherings and start sharing experiences with amazing people.",
        IconComponent: AnimatedStep3Icon,
        color: "#FFB199", // Naranja suave
    },
];

export const containerVariants: Variants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.3,
        },
    },
};

export const cardVariants: Variants = {
    hidden: {
        opacity: 0,
        y: 50,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: "easeOut",
        },
    },
};
