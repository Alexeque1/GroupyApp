"use client";

import { useEffect, useState } from "react";

export interface CountdownParts {
    days: number;
    hours: number;
    minutes: number;
    hasStarted: boolean;
}

function getParts(targetIso: string): CountdownParts {
    const diffMs = Math.max(new Date(targetIso).getTime() - Date.now(), 0);
    return {
        days: Math.floor(diffMs / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diffMs / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diffMs / (1000 * 60)) % 60),
        hasStarted: new Date(targetIso).getTime() <= Date.now(),
    };
}

/**
 * Live countdown to an ISO date.
 * Returns `null` until the component mounts: computing with `Date.now()`
 * during render (including SSR) would make the server markup and the
 * client's first render mismatch (hydration mismatch). Once mounted,
 * it computes the real value and refreshes it every `refreshMs`.
 */
export function useCountdown(targetIso: string, refreshMs = 60_000): CountdownParts | null {
    const [parts, setParts] = useState<CountdownParts | null>(null);

    useEffect(() => {
        const update = () => setParts(getParts(targetIso));
        // setTimeout(0) instead of calling update() directly: this way the
        // first computation also fires from an async callback, not
        // synchronously inside the effect (avoids cascading renders).
        const timeoutId = setTimeout(update, 0);
        const intervalId = setInterval(update, refreshMs);
        return () => {
            clearTimeout(timeoutId);
            clearInterval(intervalId);
        };
    }, [targetIso, refreshMs]);

    return parts;
}
