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
 * Cuenta regresiva en vivo hasta una fecha ISO.
 * Devuelve `null` hasta que el componente se monta: calcular con `Date.now()`
 * durante el render (SSR incluido) haría que el marcado del servidor y el
 * primer render del cliente no coincidan (hydration mismatch). Al montar,
 * calcula el valor real y lo refresca cada `refreshMs`.
 */
export function useCountdown(targetIso: string, refreshMs = 60_000): CountdownParts | null {
    const [parts, setParts] = useState<CountdownParts | null>(null);

    useEffect(() => {
        const update = () => setParts(getParts(targetIso));
        // setTimeout(0) en vez de llamar a update() directo: así el primer
        // cálculo también se dispara desde un callback async, no de forma
        // síncrona dentro del efecto (evita cascading renders).
        const timeoutId = setTimeout(update, 0);
        const intervalId = setInterval(update, refreshMs);
        return () => {
            clearTimeout(timeoutId);
            clearInterval(intervalId);
        };
    }, [targetIso, refreshMs]);

    return parts;
}
