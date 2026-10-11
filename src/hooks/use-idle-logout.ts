"use client";

import { useEffect, useRef } from "react";
import { logoutForInactivity } from "@/lib/actions/auth";
import { SESSION_IDLE_TIMEOUT_SECONDS } from "@/lib/session-config";

const ACTIVITY_EVENTS = ["mousemove", "mousedown", "keydown", "wheel", "scroll", "touchstart"] as const;
// Shared across tabs: activity in one tab keeps the others alive too.
const STORAGE_KEY = "groupy:last-activity";
const STORAGE_WRITE_THROTTLE_MS = 5_000;
const SESSION_REFRESH_THROTTLE_MS = 60_000;
const CHECK_INTERVAL_MS = 15_000;

function readStoredActivity(): number {
    try {
        return Number(localStorage.getItem(STORAGE_KEY)) || 0;
    } catch {
        return 0;
    }
}

function writeStoredActivity(timestamp: number) {
    try {
        localStorage.setItem(STORAGE_KEY, String(timestamp));
    } catch {
        // Storage blocked (private mode, etc.) — this tab still tracks its own activity.
    }
}

/**
 * Signs the user out after `timeoutMs` without mouse/keyboard/scroll/touch activity.
 * While the user is active it also pings /api/auth/session (at most once a minute) so
 * Auth.js re-issues the JWT cookie and the server-side maxAge never expires mid-use.
 */
export function useIdleLogout(timeoutMs = SESSION_IDLE_TIMEOUT_SECONDS * 1000) {
    const lastActivityRef = useRef(0);
    const lastStorageWriteRef = useRef(0);
    const lastRefreshRef = useRef(0);
    const isLoggingOutRef = useRef(false);

    useEffect(() => {
        const now = Date.now();
        lastActivityRef.current = now;
        lastStorageWriteRef.current = now;
        lastRefreshRef.current = now;
        writeStoredActivity(now);

        const handleActivity = () => {
            const timestamp = Date.now();
            lastActivityRef.current = timestamp;

            if (timestamp - lastStorageWriteRef.current >= STORAGE_WRITE_THROTTLE_MS) {
                lastStorageWriteRef.current = timestamp;
                writeStoredActivity(timestamp);
            }

            if (timestamp - lastRefreshRef.current >= SESSION_REFRESH_THROTTLE_MS) {
                lastRefreshRef.current = timestamp;
                fetch("/api/auth/session", { cache: "no-store" }).catch(() => { });
            }
        };

        const checkIdle = () => {
            if (isLoggingOutRef.current) return;

            const lastActivity = Math.max(lastActivityRef.current, readStoredActivity());
            if (Date.now() - lastActivity >= timeoutMs) {
                isLoggingOutRef.current = true;
                logoutForInactivity();
            }
        };

        // Timers are throttled in background tabs / after the laptop sleeps, so check
        // right away when the tab becomes visible again.
        const handleVisibilityChange = () => {
            if (document.visibilityState === "visible") checkIdle();
        };

        ACTIVITY_EVENTS.forEach((event) => window.addEventListener(event, handleActivity, { passive: true }));
        document.addEventListener("visibilitychange", handleVisibilityChange);
        const intervalId = setInterval(checkIdle, CHECK_INTERVAL_MS);

        return () => {
            ACTIVITY_EVENTS.forEach((event) => window.removeEventListener(event, handleActivity));
            document.removeEventListener("visibilitychange", handleVisibilityChange);
            clearInterval(intervalId);
        };
    }, [timeoutMs]);
}
