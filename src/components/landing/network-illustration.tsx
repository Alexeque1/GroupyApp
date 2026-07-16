"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Music, Dumbbell, Palette, Gamepad2, Plane, Coffee, type LucideIcon } from "lucide-react";

type NodeType = "center" | "interest" | "person";

type BaseNode = {
    id: string;
    type: NodeType;
    x: number;
    y: number;
};

type InterestNode = BaseNode & {
    type: "interest";
    label: string;
    icon: LucideIcon;
    color: string;
};

type PersonNode = BaseNode & {
    type: "person";
    src: string;
};

type NetworkNode = BaseNode | InterestNode | PersonNode;

// --- CONFIGURACIÓN DEL MAPA DE NODOS ---
const NODES: NetworkNode[] = [
    { id: "center", type: "center", x: 50, y: 50 },
    
    // Nodos de Intereses (Iconos)
    { id: "music", type: "interest", label: "Música", icon: Music, color: "#A9FFD7", x: 28, y: 25 },
    { id: "deporte", type: "interest", label: "Deporte", icon: Dumbbell, color: "#607AF6", x: 72, y: 28 },
    { id: "arte", type: "interest", label: "Arte", icon: Palette, color: "#E7B8D9", x: 78, y: 65 },
    { id: "gaming", type: "interest", label: "Gaming", icon: Gamepad2, color: "#8C6CFF", x: 25, y: 68 },
    { id: "viajes", type: "interest", label: "Viajes", icon: Plane, color: "#A8B8FA", x: 50, y: 15 },
    { id: "cafe", type: "interest", label: "Café", icon: Coffee, color: "#FFB199", x: 55, y: 82 },
    
    // Nodos de Personas (Assets)
    { id: "p1", type: "person", src: "/assets_hero/asset1.png", x: 18, y: 12 },
    { id: "p2", type: "person", src: "/assets_hero/asset2.png", x: 85, y: 10 },
    { id: "p3", type: "person", src: "/assets_hero/asset3.png", x: 12, y: 48 },
    { id: "p4", type: "person", src: "/assets_hero/asset4.png", x: 92, y: 50 },
    { id: "p5", type: "person", src: "/assets_hero/asset5.png", x: 68, y: 42 },
    { id: "p6", type: "person", src: "/assets_hero/asset6.png", x: 30, y: 88 },
    { id: "p7", type: "person", src: "/assets_hero/asset7.png", x: 82, y: 85 },
];

// --- ARISTAS / CONEXIONES ---
const CONNECTIONS = [
    // Del centro a los intereses
    { from: "center", to: "music", color: "#A9FFD7" },
    { from: "center", to: "deporte", color: "#607AF6" },
    { from: "center", to: "arte", color: "#E7B8D9" },
    { from: "center", to: "gaming", color: "#8C6CFF" },
    { from: "center", to: "viajes", color: "#A8B8FA" },
    { from: "center", to: "cafe", color: "#FFB199" },
    
    // De las personas a los intereses
    { from: "p1", to: "viajes", color: "#A8B8FA" },
    { from: "p1", to: "music", color: "#A9FFD7" },
    { from: "p2", to: "deporte", color: "#607AF6" },
    { from: "p2", to: "viajes", color: "#A8B8FA" },
    { from: "p3", to: "music", color: "#A9FFD7" },
    { from: "p3", to: "gaming", color: "#8C6CFF" },
    { from: "p4", to: "arte", color: "#E7B8D9" },
    { from: "p4", to: "deporte", color: "#607AF6" },
    { from: "p5", to: "arte", color: "#E7B8D9" },
    { from: "p6", to: "gaming", color: "#8C6CFF" },
    { from: "p6", to: "cafe", color: "#FFB199" },
    { from: "p7", to: "cafe", color: "#FFB199" },
    { from: "p7", to: "arte", color: "#E7B8D9" },
];

type NetworkIllustrationProps = {
    className?: string;
};

export default function NetworkIllustration({ className = "w-full" }: NetworkIllustrationProps) {
    return (
        <div className={`network-illustration relative aspect-square ${className}`}>
            
            {/* 1. ARISTAS (Líneas y Pulsos SVG) */}
            <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full z-0 overflow-visible">
                {CONNECTIONS.map((conn, i) => {
                    const fromNode = NODES.find((n) => n.id === conn.from);
                    const toNode = NODES.find((n) => n.id === conn.to);
                    if (!fromNode || !toNode) return null;

                    return (
                        <g key={`conn-${conn.from}-${conn.to}`}>
                            <line
                                x1={fromNode.x}
                                y1={fromNode.y}
                                x2={toNode.x}
                                y2={toNode.y}
                                stroke="rgba(255,255,255,0.12)"
                                strokeWidth={0.4}
                                strokeLinecap="round"
                            />
                            {/* Partícula de energía viajando */}
                            <motion.circle
                                r={1.2}
                                fill={conn.color}
                                initial={{ cx: fromNode.x, cy: fromNode.y, opacity: 0 }}
                                animate={{
                                    cx: [fromNode.x, toNode.x],
                                    cy: [fromNode.y, toNode.y],
                                    opacity: [0, 1, 1, 0],
                                }}
                                transition={{
                                    duration: 3 + (i % 3),
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    delay: i * 0.2,
                                    times: [0, 0.2, 0.8, 1],
                                }}
                            />
                        </g>
                    );
                })}
            </svg>

            {/* 2. NODOS HTML */}
            {NODES.map((node, i) => {
                
                // NODO CENTRAL
                if (node.type === "center") {
                    return (
                        <div
                            key={node.id}
                            className="absolute z-30"
                            style={{ left: `${node.x}%`, top: `${node.y}%`, transform: "translate(-50%, -50%)" }}
                        >
                            <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
                                <div className="relative flex items-center justify-center w-[20cqw] h-[20cqw] max-w-28 max-h-28 min-w-16 min-h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/25 shadow-[0_0_50px_rgba(140,108,255,0.4)]">
                                    <div className="relative w-3/5 h-3/5">
                                        <Image src="/logo.png" alt="Groupy" fill className="object-contain" priority />
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    );
                }

                // NODOS DE INTERESES (Iconos)
                if (node.type === "interest") {
                    const interestNode = node as InterestNode;
                    const Icon = interestNode.icon;
                    return (
                        <div
                            key={node.id}
                            className="absolute z-20"
                            style={{ left: `${node.x}%`, top: `${node.y}%`, transform: "translate(-50%, -50%)" }}
                        >
                            <motion.div
                                animate={{ y: [0, -8, 0] }}
                                transition={{ duration: 3.5 + (i % 2), repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }}
                            >
                                <div className="relative flex items-center justify-center w-[12cqw] h-[12cqw] max-w-14 max-h-14 min-w-9 min-h-9 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-lg">
                                    <span
                                        className="absolute inset-0 rounded-full animate-ping opacity-20"
                                        style={{ backgroundColor: interestNode.color, animationDuration: '3s' }}
                                    />
                                    <Icon className="relative w-1/2 h-1/2" style={{ color: interestNode.color }} strokeWidth={2} />
                                </div>
                            </motion.div>
                        </div>
                    );
                }

                // NODOS DE PERSONAS (Assets flotantes)
                if (node.type === "person") {
                    const personNode = node as PersonNode;
                    return (
                        <div
                            key={node.id}
                            className="absolute z-10 hidden md:block"
                            style={{ left: `${node.x}%`, top: `${node.y}%`, transform: "translate(-50%, -50%)" }}
                        >
                            <motion.div
                                animate={{ y: [0, -12, 0], rotate: [-4, 4, -4] }}
                                transition={{ duration: 4 + (i % 3), repeat: Infinity, ease: "easeInOut", delay: i * 0.1 }}
                            >
                                <Image
                                    src={personNode.src}
                                    alt="User interest map"
                                    width={120}
                                    height={120}
                                    className="opacity-90 w-auto h-auto max-w-[70px] lg:max-w-[110px] object-contain drop-shadow-2xl"
                                />
                            </motion.div>
                        </div>
                    );
                }

                return null;
            })}
        </div>
    );
}