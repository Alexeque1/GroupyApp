"use client";

import { useEffect, useState, type RefObject, type DependencyList } from "react";

interface ScrollbarState {
    hasOverflow: boolean;
    thumbWidthPct: number;
    thumbLeftPct: number;
}

// Deriva el estado de una "scrollbar" custom (si hace falta mostrarla, ancho
// y posición del thumb) a partir del scroll real de un contenedor horizontal.
export function useHorizontalScrollbar(
    ref: RefObject<HTMLDivElement | null>,
    deps: DependencyList = []
): ScrollbarState {
    const [state, setState] = useState<ScrollbarState>({
        hasOverflow: false,
        thumbWidthPct: 100,
        thumbLeftPct: 0,
    });

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const update = () => {
            const { scrollWidth, clientWidth, scrollLeft } = el;
            const hasOverflow = scrollWidth > clientWidth + 1;
            const thumbWidthPct = hasOverflow ? (clientWidth / scrollWidth) * 100 : 100;
            const maxScroll = scrollWidth - clientWidth;
            const thumbLeftPct = hasOverflow && maxScroll > 0
                ? (scrollLeft / maxScroll) * (100 - thumbWidthPct)
                : 0;

            setState({ hasOverflow, thumbWidthPct, thumbLeftPct });
        };

        update();
        el.addEventListener("scroll", update);

        const resizeObserver = new ResizeObserver(update);
        resizeObserver.observe(el);

        return () => {
            el.removeEventListener("scroll", update);
            resizeObserver.disconnect();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ref, ...deps]);

    return state;
}
