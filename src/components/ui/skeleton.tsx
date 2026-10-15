import { cn } from "@/lib/utils";

/** Gray pulsing block that holds the place of content that is still loading. Size it with className. */
export default function Skeleton({ className }: { className?: string }) {
    return <div aria-hidden className={cn("animate-pulse rounded-xl bg-black/10", className)} />;
}
