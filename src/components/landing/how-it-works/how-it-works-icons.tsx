"use client";

import { motion } from "framer-motion";
import { UserCircle, Users, User, CheckCircle2 } from "lucide-react";

export const AnimatedStep1Icon = ({ color }: { color: string }) => (
    <div className="relative w-full h-full flex items-center justify-center">
        <motion.div
            animate={{ y: [-3, 3, -3] }}
            transition={{ duration: 4, repeat: Infinity, ease: [0.42, 0, 0.58, 1] }}
        >
            <UserCircle size={32} color={color} />
        </motion.div>

        {/* Check flotante */}
        <motion.div
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
            className="absolute bottom-2 right-2 bg-[#251842] rounded-full"
        >
            <motion.div
                animate={{ y: [-2, 2, -2] }}
                transition={{ duration: 3, repeat: Infinity, ease: [0.42, 0, 0.58, 1], delay: 0.2 }}
            >
                <CheckCircle2 size={16} className="text-[#A9FFD7]" fill="#A9FFD7" stroke="#251842" strokeWidth={2} />
            </motion.div>
        </motion.div>
    </div>
);

export const AnimatedStep2Icon = ({ color }: { color: string }) => (
    <div className="relative w-full h-full flex items-center justify-center">
        {/* Líneas conectoras (Aristas) */}
        <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full z-0">
            <motion.line
                x1="50" y1="50" x2="25" y2="25"
                stroke={color} strokeWidth="2" strokeOpacity="0.5"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
            />
            <motion.line
                x1="50" y1="50" x2="80" y2="35"
                stroke={color} strokeWidth="2" strokeOpacity="0.5"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
            />
            <motion.line
                x1="50" y1="50" x2="65" y2="80"
                stroke={color} strokeWidth="2" strokeOpacity="0.5"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.7 }}
            />
        </svg>

        {/* Nodo Central */}
        <motion.div
            className="absolute z-10 bg-[#251842] rounded-full p-[2px]"
            style={{ top: 'calc(50% - 12px)', left: 'calc(50% - 12px)' }}
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: [0.42, 0, 0.58, 1] }}
        >
            <User size={20} color={color} />
        </motion.div>

        {/* Nodos Periféricos */}
        <motion.div
            className="absolute z-10 bg-[#251842] rounded-full p-[2px]"
            style={{ top: 'calc(25% - 8px)', left: 'calc(25% - 8px)' }}
            initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
        >
            <User size={12} color={color} opacity={0.7} />
        </motion.div>

        <motion.div
            className="absolute z-10 bg-[#251842] rounded-full p-[2px]"
            style={{ top: 'calc(35% - 8px)', left: 'calc(80% - 8px)' }}
            initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.4 }}
        >
            <User size={12} color={color} opacity={0.7} />
        </motion.div>

        <motion.div
            className="absolute z-10 bg-[#251842] rounded-full p-[2px]"
            style={{ top: 'calc(80% - 8px)', left: 'calc(65% - 8px)' }}
            initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.6 }}
        >
            <User size={12} color={color} opacity={0.7} />
        </motion.div>
    </div>
);

export const AnimatedStep3Icon = ({ color }: { color: string }) => (
    <div className="relative w-full h-full flex items-center justify-center">
        <motion.div
            animate={{ scale: [1, 1.05, 1], rotate: [-3, 3, -3] }}
            transition={{ duration: 3, repeat: Infinity, ease: [0.42, 0, 0.58, 1] }}
            className="z-10 bg-[#251842] rounded-full relative"
        >
            <Users size={32} color={color} />
        </motion.div>

        {/* Emojis de fiesta flotantes */}
        <motion.span
            className="absolute text-sm z-0"
            animate={{ y: [0, -25], x: [0, -20], opacity: [0, 1, 0], scale: [0.5, 1.2, 0.8] }}
            transition={{ duration: 2.5, repeat: Infinity, delay: 0 }}
            style={{ top: '30%', left: '30%' }}
        >
            🎉
        </motion.span>

        <motion.span
            className="absolute text-sm z-0"
            animate={{ y: [0, -20], x: [0, 25], opacity: [0, 1, 0], scale: [0.5, 1.2, 0.8] }}
            transition={{ duration: 2.2, repeat: Infinity, delay: 0.7 }}
            style={{ top: '25%', right: '30%' }}
        >
            ✨
        </motion.span>

        <motion.span
            className="absolute text-sm z-0"
            animate={{ y: [0, -30], opacity: [0, 1, 0], scale: [0.5, 1.2, 0.8] }}
            transition={{ duration: 2.8, repeat: Infinity, delay: 1.2 }}
            style={{ bottom: '15%', left: '40%' }}
        >
            🥳
        </motion.span>
    </div>
);
