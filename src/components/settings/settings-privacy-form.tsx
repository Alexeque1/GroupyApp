"use client";

import { useState, type FormEvent } from "react";
import { Eye, UserPlus, Users, Activity, ChevronDown, Shield } from "lucide-react";
import Button from "@/components/ui/button";
import StatusAlert from "@/components/ui/alerts/status-alert";
import { cn } from "@/lib/utils";

const selectClass =
    "w-full appearance-none rounded-xl border border-black/10 bg-black/5 pl-10 pr-10 py-3 text-black outline-none transition-all focus:border-brand-purple focus:ring-1 focus:ring-brand-purple dark:border-white/10 dark:bg-white/5 dark:text-white";

interface SwitchProps {
    checked: boolean;
    onChange?: (checked: boolean) => void;
    disabled?: boolean;
}

const Switch = ({ checked, onChange, disabled = false }: SwitchProps) => {
    return (
        <button
            type="button"
            role="switch"
            aria-checked={checked}
            disabled={disabled}
            onClick={() => onChange && onChange(!checked)}
            className={cn(
                "relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-brand-purple focus:ring-offset-2 disabled:cursor-not-allowed",
                checked ? "bg-brand-purple disabled:opacity-70" : "bg-black/20 dark:bg-white/20 disabled:opacity-40"
            )}
        >
            <span
                aria-hidden="true"
                className={cn(
                    "pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
                    checked ? "translate-x-4" : "translate-x-0"
                )}
            />
        </button>
    );
};

// ---------------------------------------

export default function SettingsPrivacyForm() {
    // Estado de las preferencias de privacidad
    const [privacy, setPrivacy] = useState({
        // Quién puede verte
        profileVisibility: "everyone",
        // Quién puede interactuar (seguirte / invitarte)
        friendRequests: "everyone",
        followers: "everyone",
        groupInvites: "friends",
        // Estado de actividad
        showOnlineStatus: true,
        showReadReceipts: true,
    });

    const [statusAlert, setStatusAlert] = useState<{ description: string; type: "success" | "error" } | null>(null);

    const handleSelectChange = (key: keyof typeof privacy, value: string) => {
        setPrivacy((prev) => ({ ...prev, [key]: value }));
    };

    const handleToggle = (key: keyof typeof privacy) => {
        setPrivacy((prev) => ({ ...prev, [key]: !prev[key] as boolean }));
    };

    const handleSaveChanges = (e: FormEvent) => {
        e.preventDefault();
        // TODO: Enviar el objeto `privacy` a tu API
        setStatusAlert({ description: "Your privacy settings have been saved.", type: "success" });
    };

    return (
        <>
            <StatusAlert
                isOpen={statusAlert !== null}
                onClose={() => setStatusAlert(null)}
                description={statusAlert?.description ?? ""}
                type={statusAlert?.type ?? "success"}
                duration={3000}
            />

            <form className="flex w-full flex-col gap-8" onSubmit={handleSaveChanges}>
                
                {/* HEADER INFO */}
                <div className="flex flex-col gap-2 rounded-2xl border border-brand-purple/20 bg-brand-purple/5 p-5">
                    <div className="flex items-center gap-2 text-brand-purple">
                        <Shield size={20} />
                        <h3 className="font-bold">Control your privacy</h3>
                    </div>
                    <p className="text-sm text-black/70 dark:text-white/70">
                        Manage who can see your profile, send you requests, and interact with you across the platform.
                    </p>
                </div>

                {/* PROFILE VISIBILITY (Quién puede verte) */}
                <div className="flex flex-col gap-5">
                    <h3 className="border-b border-black/10 pb-2 text-sm font-bold uppercase tracking-wider text-brand-purple">
                        Profile Visibility
                    </h3>

                    <div className="flex flex-col gap-1.5">
                        <label className="ml-1 text-sm font-medium text-black/70 dark:text-white/70">
                            Who can view your profile?
                        </label>
                        <div className="relative">
                            <Eye size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-black/40 dark:text-white/40" />
                            <select
                                className={selectClass}
                                value={privacy.profileVisibility}
                                onChange={(e) => handleSelectChange("profileVisibility", e.target.value)}
                            >
                                <option value="everyone">Everyone (Public)</option>
                                <option value="users">Registered Users Only</option>
                                <option value="friends">Friends Only</option>
                                <option value="private">Only Me (Private)</option>
                            </select>
                            <ChevronDown size={16} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-black/40 dark:text-white/40" />
                        </div>
                        <p className="ml-1 text-xs text-black/40 dark:text-white/40">
                            If set to Private, only you can see your full bio, interests, and location.
                        </p>
                    </div>
                </div>

                {/* CONNECTIONS (Quién puede seguirte / invitarte) */}
                <div className="flex flex-col gap-5">
                    <h3 className="border-b border-black/10 pb-2 text-sm font-bold uppercase tracking-wider text-brand-purple">
                        Connections & Invites
                    </h3>

                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                        {/* Seguirte */}
                        <div className="flex flex-col gap-1.5">
                            <label className="ml-1 text-sm font-medium text-black/70 dark:text-white/70">
                                Who can follow you?
                            </label>
                            <div className="relative">
                                <Users size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-black/40 dark:text-white/40" />
                                <select
                                    className={selectClass}
                                    value={privacy.followers}
                                    onChange={(e) => handleSelectChange("followers", e.target.value)}
                                >
                                    <option value="everyone">Everyone</option>
                                    <option value="friends">Friends Only</option>
                                    <option value="nobody">Nobody</option>
                                </select>
                                <ChevronDown size={16} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-black/40 dark:text-white/40" />
                            </div>
                        </div>

                        {/* Solicitudes de amistad */}
                        <div className="flex flex-col gap-1.5">
                            <label className="ml-1 text-sm font-medium text-black/70 dark:text-white/70">
                                Who can send you friend requests?
                            </label>
                            <div className="relative">
                                <UserPlus size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-black/40 dark:text-white/40" />
                                <select
                                    className={selectClass}
                                    value={privacy.friendRequests}
                                    onChange={(e) => handleSelectChange("friendRequests", e.target.value)}
                                >
                                    <option value="everyone">Everyone</option>
                                    <option value="friends_of_friends">Friends of Friends</option>
                                    <option value="nobody">Nobody</option>
                                </select>
                                <ChevronDown size={16} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-black/40 dark:text-white/40" />
                            </div>
                        </div>

                        {/* Invitaciones a grupos */}
                        <div className="flex flex-col gap-1.5 md:col-span-2">
                            <label className="ml-1 text-sm font-medium text-black/70 dark:text-white/70">
                                Who can invite you to groups and communities?
                            </label>
                            <div className="relative">
                                <Users size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-black/40 dark:text-white/40" />
                                <select
                                    className={selectClass}
                                    value={privacy.groupInvites}
                                    onChange={(e) => handleSelectChange("groupInvites", e.target.value)}
                                >
                                    <option value="everyone">Everyone</option>
                                    <option value="friends">Friends Only</option>
                                    <option value="nobody">Nobody</option>
                                </select>
                                <ChevronDown size={16} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-black/40 dark:text-white/40" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* ACTIVITY STATUS */}
                <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-2 border-b border-black/10 pb-2 dark:border-white/10">
                        <Activity size={16} className="text-brand-purple" />
                        <h3 className="text-sm font-bold uppercase tracking-wider text-brand-purple">
                            Activity Status
                        </h3>
                    </div>
                    
                    <div className="flex flex-col px-1">
                        <div className="flex items-center justify-between py-3">
                            <div className="flex flex-col">
                                <span className="text-sm font-medium text-black/80 dark:text-white/80">
                                    Show when you're online
                                </span>
                                <span className="text-xs text-black/50 dark:text-white/50">
                                    Allows your friends to see when you are active on the platform.
                                </span>
                            </div>
                            <Switch 
                                checked={privacy.showOnlineStatus as boolean} 
                                onChange={() => handleToggle("showOnlineStatus")} 
                            />
                        </div>

                        <div className="flex items-center justify-between py-3 border-t border-black/5 dark:border-white/5">
                            <div className="flex flex-col">
                                <span className="text-sm font-medium text-black/80 dark:text-white/80">
                                    Show read receipts
                                </span>
                                <span className="text-xs text-black/50 dark:text-white/50">
                                    Let people know when you've seen their direct messages.
                                </span>
                            </div>
                            <Switch 
                                checked={privacy.showReadReceipts as boolean} 
                                onChange={() => handleToggle("showReadReceipts")} 
                            />
                        </div>
                    </div>
                </div>

                {/* ACTIONS */}
                <div className="mt-4 flex justify-end border-t border-black/10 pt-4 dark:border-white/10">
                    <Button type="submit" tone="dark" className="w-full md:w-auto md:px-12">
                        Save privacy settings
                    </Button>
                </div>
            </form>
        </>
    );
}