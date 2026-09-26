"use client";

import { useSyncExternalStore, type ReactNode } from "react";
import { createPortal } from "react-dom";

interface PortalProps {
    children: ReactNode;
}

// No hay nada a lo que suscribirse: solo necesitamos saber si estamos en el navegador.
const subscribe = () => () => {};

export default function Portal({ children }: PortalProps) {
    // true en el navegador, false durante el render del servidor (donde no existe document).
    const mounted = useSyncExternalStore(subscribe, () => true, () => false);

    if (!mounted) return null;

    return createPortal(children, document.body);
}
