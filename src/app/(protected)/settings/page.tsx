"use client";

import { Construction, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/button";

export default function Settings() {
    const router = useRouter();

    return (
        <div className="flex min-h-[70vh] w-full flex-col items-center justify-center px-4 text-center animate-in fade-in zoom-in-95 duration-500">
            
            {/* Ícono destacado con animación suave */}
            <div className="relative mb-6 flex h-24 w-24 items-center justify-center rounded-[2rem] bg-brand-purple/10 text-brand-purple shadow-inner dark:bg-brand-purple/20">
                <div className="absolute inset-0 rounded-[2rem] border border-brand-purple/20 dark:border-brand-purple/30" />
                <Construction size={40} className="animate-pulse" />
            </div>
            
            {/* Textos */}
            <h1 className="mb-3 text-3xl font-black tracking-tight text-[#1a0f2e] dark:text-white sm:text-4xl">
                Under Construction
            </h1>
            
            <p className="mb-10 max-w-md text-black/60 dark:text-white/50 text-base sm:text-lg">
                We are working hard behind the scenes to bring you a powerful and seamless settings experience. Check back soon!
            </p>

            {/* Botón de regreso */}
            <Button 
                onClick={() => router.back()} 
                tone="dark" 
                className="flex items-center gap-2 px-8"
            >
                <ArrowLeft size={18} />
                Go Back
            </Button>
            
        </div>
    );
}