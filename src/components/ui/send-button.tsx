"use client";

import { Send } from "lucide-react";
import { cn } from "@/lib/utils";

interface SendPostButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    isDisabled?: boolean;
    isLoading?: boolean; // Preparado para el futuro cuando lo conectes al backend
}

export default function SendButton({ 
    isDisabled = true, 
    isLoading = false,
    className,
    ...props 
}: SendPostButtonProps) {
    return (
        <button
            disabled={isDisabled || isLoading}
            className={cn(
                "group flex items-center gap-2 rounded-full px-5 py-1.5 text-sm font-bold transition-all",
                isDisabled || isLoading
                    ? "cursor-not-allowed bg-black/5 text-black/30 dark:bg-white/5 dark:text-white/30"
                    : "cursor-pointer bg-[#8C6CFF] text-white shadow-md hover:bg-[#7a5ce6] hover:shadow-lg",
                className
            )}
            {...props}
        >
            <span>{isLoading ? "Posting..." : "Post"}</span>
            {!isLoading && (
                <Send 
                    size={16} 
                    className={cn(
                        "transition-transform",
                        !isDisabled && "group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    )} 
                />
            )}
        </button>
    );
}