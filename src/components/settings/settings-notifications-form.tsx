"use client";

import { useState, type FormEvent } from "react";
import { BellOff, Users, UsersRound, Globe, Calendar, Settings, Lock } from "lucide-react";
import Button from "@/components/ui/button";
import StatusAlert from "@/components/ui/alerts/status-alert";
import { cn } from "@/lib/utils";

// --- COMPONENTES INTERNOS ---

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

// Componente para cada fila individual (mantiene el código limpio)
interface ToggleRowProps {
    label: string;
    checked: boolean;
    onChange?: (checked: boolean) => void;
    disabled?: boolean;
    locked?: boolean;
}

const ToggleRow = ({ label, checked, onChange, disabled, locked }: ToggleRowProps) => (
    <div className="flex items-center justify-between py-2">
        <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-black/80 dark:text-white/80">
                {label}
            </span>
            {locked && <Lock size={12} className="text-black/40 dark:text-white/40" />}
        </div>
        <Switch checked={checked} onChange={onChange} disabled={disabled || locked} />
    </div>
);

// ---------------------------------------

export default function SettingsNotificationsForm() {
    // Master Switch
    const [pauseAll, setPauseAll] = useState(false);

    // Estado agrupado para todas las preferencias
    const [prefs, setPrefs] = useState({
        // Social
        friendRequest: true,
        friendAccepted: true,
        newFollower: true,
        mention: true,
        directMessage: true,
        // Grupos
        groupJoinRequest: true,
        groupStatusChange: true,
        groupNewPost: true,
        groupNewMemberAdmin: true,
        groupMadeAdmin: true,
        // Comunidades
        commNewPost: true,
        commReplies: true,
        commAnnouncements: true,
        // Eventos
        eventRescheduled: true,
        eventReminder: true,
        eventNew: true,
        eventLocationChanged: true,
        // Sistema
        sysRecommendations: true,
        sysUpdates: true,
    });

    const [statusAlert, setStatusAlert] = useState<{ description: string; type: "success" | "error" } | null>(null);

    // Función genérica para actualizar cualquier toggle
    const handleToggle = (key: keyof typeof prefs) => {
        setPrefs((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    const handleSaveChanges = (e: FormEvent) => {
        e.preventDefault();
        // TODO: Enviar el objeto `prefs` a tu API
        setStatusAlert({ description: "Your notification preferences have been updated.", type: "success" });
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
                
                {/* MASTER SWITCH */}
                <div className="flex flex-col gap-4 rounded-2xl border border-black/10 bg-black/5 p-5 dark:border-white/10 dark:bg-white/5">
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2">
                                <BellOff size={18} className="text-black/70 dark:text-white/70" />
                                <h3 className="font-bold text-black dark:text-white">
                                    Pause all notifications
                                </h3>
                            </div>
                            <p className="text-sm text-black/60 dark:text-white/60">
                                Temporarily mute all push and email notifications.
                            </p>
                        </div>
                        <Switch checked={pauseAll} onChange={setPauseAll} />
                    </div>
                </div>

                <div className={cn("flex flex-col gap-10", pauseAll && "pointer-events-none opacity-50 transition-opacity")}>
                    
                    {/* SOCIAL / PERSONAL */}
                    <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-2 border-b border-black/10 pb-2 dark:border-white/10">
                            <Users size={16} className="text-brand-purple" />
                            <h3 className="text-sm font-bold uppercase tracking-wider text-brand-purple">
                                Social & Personal
                            </h3>
                        </div>
                        <div className="flex flex-col px-1">
                            <ToggleRow label="New friend requests" checked={prefs.friendRequest} onChange={() => handleToggle('friendRequest')} disabled={pauseAll} />
                            <ToggleRow label="Friend request accepted" checked={prefs.friendAccepted} onChange={() => handleToggle('friendAccepted')} disabled={pauseAll} />
                            <ToggleRow label="New followers" checked={prefs.newFollower} onChange={() => handleToggle('newFollower')} disabled={pauseAll} />
                            <ToggleRow label="Mentions (@yourname)" checked={prefs.mention} onChange={() => handleToggle('mention')} disabled={pauseAll} />
                            <ToggleRow label="New direct messages" checked={prefs.directMessage} onChange={() => handleToggle('directMessage')} disabled={pauseAll} />
                        </div>
                    </div>

                    {/* GRUPOS */}
                    <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-2 border-b border-black/10 pb-2 dark:border-white/10">
                            <UsersRound size={16} className="text-brand-purple" />
                            <h3 className="text-sm font-bold uppercase tracking-wider text-brand-purple">
                                Groups
                            </h3>
                        </div>
                        <div className="flex flex-col px-1">
                            <ToggleRow label="Requests to join your group" checked={prefs.groupJoinRequest} onChange={() => handleToggle('groupJoinRequest')} disabled={pauseAll} />
                            <ToggleRow label="Accepted or rejected from a group" checked={prefs.groupStatusChange} onChange={() => handleToggle('groupStatusChange')} disabled={pauseAll} />
                            <ToggleRow label="New posts or comments" checked={prefs.groupNewPost} onChange={() => handleToggle('groupNewPost')} disabled={pauseAll} />
                            <ToggleRow label="New members in groups you manage" checked={prefs.groupNewMemberAdmin} onChange={() => handleToggle('groupNewMemberAdmin')} disabled={pauseAll} />
                            <ToggleRow label="Made admin or moderator" checked={prefs.groupMadeAdmin} onChange={() => handleToggle('groupMadeAdmin')} disabled={pauseAll} />
                        </div>
                    </div>

                    {/* COMUNIDADES */}
                    <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-2 border-b border-black/10 pb-2 dark:border-white/10">
                            <Globe size={16} className="text-brand-purple" />
                            <h3 className="text-sm font-bold uppercase tracking-wider text-brand-purple">
                                Communities
                            </h3>
                        </div>
                        <div className="flex flex-col px-1">
                            <ToggleRow label="New posts in followed communities" checked={prefs.commNewPost} onChange={() => handleToggle('commNewPost')} disabled={pauseAll} />
                            <ToggleRow label="Replies to your comments" checked={prefs.commReplies} onChange={() => handleToggle('commReplies')} disabled={pauseAll} />
                            <ToggleRow label="Admin announcements" checked={prefs.commAnnouncements} onChange={() => handleToggle('commAnnouncements')} disabled={pauseAll} />
                        </div>
                    </div>

                    {/* EVENTOS */}
                    <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-2 border-b border-black/10 pb-2 dark:border-white/10">
                            <Calendar size={16} className="text-brand-purple" />
                            <h3 className="text-sm font-bold uppercase tracking-wider text-brand-purple">
                                Events
                            </h3>
                        </div>
                        <div className="flex flex-col px-1">
                            <ToggleRow label="Event rescheduled or canceled" checked={prefs.eventRescheduled} onChange={() => handleToggle('eventRescheduled')} disabled={pauseAll} />
                            <ToggleRow label="Event reminders (24h / 1h before)" checked={prefs.eventReminder} onChange={() => handleToggle('eventReminder')} disabled={pauseAll} />
                            <ToggleRow label="New events in your groups" checked={prefs.eventNew} onChange={() => handleToggle('eventNew')} disabled={pauseAll} />
                            <ToggleRow label="Event location changes" checked={prefs.eventLocationChanged} onChange={() => handleToggle('eventLocationChanged')} disabled={pauseAll} />
                        </div>
                    </div>

                    {/* SISTEMA / CUENTA */}
                    <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-2 border-b border-black/10 pb-2 dark:border-white/10">
                            <Settings size={16} className="text-brand-purple" />
                            <h3 className="text-sm font-bold uppercase tracking-wider text-brand-purple">
                                System & Account
                            </h3>
                        </div>
                        <div className="flex flex-col px-1">
                            <ToggleRow label="Recommendations (groups you might like)" checked={prefs.sysRecommendations} onChange={() => handleToggle('sysRecommendations')} disabled={pauseAll} />
                            <ToggleRow label="Product updates & new features" checked={prefs.sysUpdates} onChange={() => handleToggle('sysUpdates')} disabled={pauseAll} />
                            
                            {/* Alerta de Seguridad Fija */}
                            <div className="mt-2 border-t border-black/5 pt-3 dark:border-white/5">
                                <ToggleRow label="Security alerts (Logins, password changes)" checked={true} locked={true} />
                                <p className="mt-1 text-xs text-black/50 dark:text-white/50">
                                    For your protection, essential security notifications cannot be disabled.
                                </p>
                            </div>
                        </div>
                    </div>

                </div>

                {/* ACTIONS */}
                <div className="mt-4 flex justify-end border-t border-black/10 pt-4 dark:border-white/10">
                    <Button type="submit" tone="dark" className="w-full md:w-auto md:px-12">
                        Save preferences
                    </Button>
                </div>
            </form>
        </>
    );
}