"use client";

import { useIdleLogout } from "@/hooks/use-idle-logout";

// Renders nothing — mounts the inactivity watcher inside the (server) protected layout.
export default function IdleLogout() {
    useIdleLogout();
    return null;
}
