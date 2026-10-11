"use server";

import { signOut } from "@/auth";

export async function logout() {
    await signOut({ redirectTo: "/" });
}

export async function logoutForInactivity() {
    await signOut({ redirectTo: "/auth?mode=login&expired=1" });
}
