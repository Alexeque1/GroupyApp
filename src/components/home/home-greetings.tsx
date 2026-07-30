"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface HomeGreetingsProps {
    name: string;
}

export default function HomeGreetings({ name}: HomeGreetingsProps) {
    const [displayedText, setDisplayedText] = useState("");
    const fullText = `Hello, ${name}!`;
    const isTypingComplete = displayedText === fullText;

    useEffect(() => {
        let currentIndex = 0;
        setDisplayedText(""); 

        const interval = setInterval(() => {
            if (currentIndex <= fullText.length) {
                setDisplayedText(fullText.slice(0, currentIndex));
                currentIndex++;
            } else {
                clearInterval(interval);
            }
        }, 80);

        return () => clearInterval(interval);
    }, [fullText]);

    return (
        <section className="flex flex-col text-center">
            <h2 className="flex items-center text-3xl md:text-6xl font-bold">
                {/* TEXTO CON GRADIENTE */}
                <span className="dark-mesh-gradient">
                    {displayedText}
                </span>

                {/* CURSOR PARPADEANTE */}
                {!isTypingComplete && (
                    <motion.span
                        animate={{ opacity: [1, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, ease: "linear" }}
                        className="ml-1 inline-block h-[50px] w-[5px] bg-[#8C6CFF]" 
                    />
                )}

                {/* EMOJI QUE APARECE AL FINAL */}
                <motion.span
                    initial={{ opacity: 0, scale: 0, rotate: -45 }}
                    animate={{ 
                        opacity: isTypingComplete ? 1 : 0, 
                        scale: isTypingComplete ? 1 : 0,
                        rotate: isTypingComplete ? [0, 14, -8, 14, -4, 10, 0] : -45 
                    }}
                    transition={{ 
                        duration: 0.5, 
                        delay: 0.1, 
                        rotate: { duration: 0.6, delay: 0.2, ease: "easeInOut" }
                    }}
                    className="ml-3 inline-block"
                >
                    👋
                </motion.span>
            </h2>
        </section>
    );
}