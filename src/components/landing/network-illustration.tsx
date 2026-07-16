"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Music, Dumbbell, Palette, Gamepad2, Plane, Coffee, type LucideIcon } from "lucide-react";

type InterestNode = {
    label: string;
    icon: LucideIcon;
    color: string;
    x: number;
    y: number;
};

const CENTER = 50;
const RADIUS = 36;

function pointOnCircle(angleDeg: number) {
    const angle = (angleDeg * Math.PI) / 180;
    return {
        x: CENTER + RADIUS * Math.cos(angle),
        y: CENTER + RADIUS * Math.sin(angle),
    };
}

const INTERESTS: InterestNode[] = [
    { label: "Música", icon: Music, color: "#A9FFD7", ...pointOnCircle(-90) },
    { label: "Deporte", icon: Dumbbell, color: "#607AF6", ...pointOnCircle(-30) },
    { label: "Arte", icon: Palette, color: "#E7B8D9", ...pointOnCircle(30) },
    { label: "Gaming", icon: Gamepad2, color: "#8C6CFF", ...pointOnCircle(90) },
    { label: "Viajes", icon: Plane, color: "#A8B8FA", ...pointOnCircle(150) },
    { label: "Café", icon: Coffee, color: "#FFB199", ...pointOnCircle(210) },
];

type NetworkIllustrationProps = {
    className?: string;
};

export default function NetworkIllustration({ className = "w-full" }: NetworkIllustrationProps) {
    return (
        <div className={`network-illustration relative aspect-square ${className}`}>

            {/* CONEXIONES */}
            <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
                {INTERESTS.map((node) => (
                    <line
                        key={`line-${node.label}`}
                        x1={CENTER}
                        y1={CENTER}
                        x2={node.x}
                        y2={node.y}
                        stroke="rgba(255,255,255,0.18)"
                        strokeWidth={0.6}
                        strokeLinecap="round"
                    />
                ))}

                {INTERESTS.map((node, i) => (
                    <motion.circle
                        key={`pulse-${node.label}`}
                        r={1.4}
                        fill={node.color}
                        initial={{ cx: CENTER, cy: CENTER, opacity: 0 }}
                        animate={{
                            cx: [CENTER, node.x],
                            cy: [CENTER, node.y],
                            opacity: [0, 1, 1, 0],
                        }}
                        transition={{
                            duration: 2.6,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: i * 0.35,
                            times: [0, 0.15, 0.85, 1],
                        }}
                    />
                ))}
            </svg>

            {/* NODO CENTRAL: GROUPY */}
            <div
                className="absolute left-1/2 top-1/2 z-20"
                style={{ transform: "translate(-50%, -50%)" }}
            >
                <motion.div
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                    <div className="relative flex items-center justify-center w-[26cqw] h-[26cqw] max-w-32 max-h-32 min-w-16 min-h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/25 shadow-[0_0_50px_rgba(140,108,255,0.5)]">
                        <div className="relative w-3/5 h-3/5">
                            <Image
                                src="/logo.png"
                                alt="Groupy"
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* NODOS DE USUARIOS / INTERESES */}
            {INTERESTS.map((node, i) => {
                const Icon = node.icon;
                return (
                    <div
                        key={node.label}
                        className="absolute z-10"
                        style={{
                            left: `${node.x}%`,
                            top: `${node.y}%`,
                            transform: "translate(-50%, -50%)",
                        }}
                    >
                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{
                                duration: 3.2 + i * 0.3,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: i * 0.25,
                            }}
                        >
                            <div className="relative flex items-center justify-center w-[15cqw] h-[15cqw] max-w-16 max-h-16 min-w-9 min-h-9 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-lg">
                                <span
                                    className="node-pulse-ring absolute inset-0 rounded-full"
                                    style={{
                                        border: `2px solid ${node.color}`,
                                        animationDelay: `${i * 0.4}s`,
                                    }}
                                />
                                <Icon
                                    className="relative w-1/2 h-1/2"
                                    style={{ color: node.color }}
                                    strokeWidth={2}
                                />
                            </div>
                        </motion.div>
                    </div>
                );
            })}
        </div>
    );
}
