"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface BackButtonProps {
    className?: string;
}

// Floating round button that goes back to the previous page. Positioned over cover images by default.
export default function BackButton({ className }: BackButtonProps) {
    const router = useRouter();

    return (
        <button
            type="button"
            onClick={() => router.back()}
            className={cn(
                "absolute left-4 top-20 z-20 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-black/10 bg-white/70 text-black/70 backdrop-blur-md transition-colors hover:bg-white hover:text-black dark:border-white/20 dark:bg-black/50 dark:text-white/70 dark:hover:bg-black/70 dark:hover:text-white",
                className
            )}
            aria-label="Go back"
        >
            <ArrowLeft size={18} />
        </button>
    );
}
