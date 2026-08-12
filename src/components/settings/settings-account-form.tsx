"use client";

import { useState, type FormEvent } from "react";
import { AtSign, Mail, Trash2 } from "lucide-react";
import Button from "@/components/ui/button";
import ConfirmAlert from "@/components/ui/alerts/confirm-alert";
import StatusAlert from "@/components/ui/alerts/status-alert";
import { cn } from "@/lib/utils";

// Mismo estilo de input que usan los forms de creación (create-group-form, create-community-form)
const inputClass =
    "w-full rounded-xl border border-black/10 bg-black/5 px-4 py-3 text-black placeholder-black/30 outline-none transition-all focus:border-brand-purple focus:ring-1 focus:ring-brand-purple dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder-white/30";

interface SettingsAccountFormProps {
    username: string;
}

export default function SettingsAccountForm({ username }: SettingsAccountFormProps) {
    const [usernameValue, setUsernameValue] = useState(username);
    const [email, setEmail] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [statusAlert, setStatusAlert] = useState<{ description: string; type: "success" | "error" } | null>(null);

    const handleSaveChanges = (e: FormEvent) => {
        e.preventDefault();

        if (newPassword && newPassword !== confirmPassword) {
            setStatusAlert({ description: "New passwords don't match.", type: "error" });
            return;
        }

        // TODO: conectar con la API real cuando exista un endpoint de cuenta.
        setStatusAlert({ description: "Your account settings have been saved.", type: "success" });
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
    };

    const handleDeleteAccount = () => {
        setShowDeleteConfirm(false);
        // TODO: conectar con la API real (borrado + logout + redirect) cuando exista.
        setStatusAlert({ description: "Your account has been scheduled for deletion.", type: "success" });
    };

    return (
        <>
            <ConfirmAlert
                isOpen={showDeleteConfirm}
                onClose={() => setShowDeleteConfirm(false)}
                onConfirm={handleDeleteAccount}
                icon={Trash2}
                title="Delete account"
                description="This will permanently delete your account and all your data. This action cannot be undone."
                confirmLabel="Yes, delete my account"
                variant="danger"
            />
            <StatusAlert
                isOpen={statusAlert !== null}
                onClose={() => setStatusAlert(null)}
                description={statusAlert?.description ?? ""}
                type={statusAlert?.type ?? "success"}
                duration={3000}
            />

            <form className="flex w-full flex-col gap-8" onSubmit={handleSaveChanges}>
                {/* LOGIN INFORMATION */}
                <div className="flex flex-col gap-5">
                    <h3 className="border-b border-black/10 pb-2 text-sm font-bold uppercase tracking-wider text-brand-purple">
                        Login Information
                    </h3>

                    <div className="flex flex-col gap-1.5">
                        <label className="ml-1 text-sm font-medium text-black/70">Username</label>
                        <div className="relative">
                            <AtSign size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-black/40" />
                            <input
                                type="text"
                                className={cn(inputClass, "pl-10")}
                                placeholder="username"
                                value={usernameValue}
                                onChange={(e) => setUsernameValue(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label className="ml-1 text-sm font-medium text-black/70">Email</label>
                        <div className="relative">
                            <Mail size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-black/40" />
                            <input
                                type="email"
                                className={cn(inputClass, "pl-10")}
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                {/* PASSWORD */}
                <div className="flex flex-col gap-5">
                    <h3 className="border-b border-black/10 pb-2 text-sm font-bold uppercase tracking-wider text-brand-purple">
                        Password
                    </h3>

                    <div className="flex flex-col gap-1.5">
                        <label className="ml-1 text-sm font-medium text-black/70">Current password</label>
                        <input
                            type="password"
                            className={inputClass}
                            placeholder="••••••••"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                        />
                    </div>

                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                        <div className="flex flex-col gap-1.5">
                            <label className="ml-1 text-sm font-medium text-black/70">New password</label>
                            <input
                                type="password"
                                className={inputClass}
                                placeholder="••••••••"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className="ml-1 text-sm font-medium text-black/70">Confirm new password</label>
                            <input
                                type="password"
                                className={inputClass}
                                placeholder="••••••••"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                <div className="flex justify-end border-t border-black/10 pt-4">
                    <Button type="submit" tone="dark" className="w-full md:w-auto md:px-12">
                        Save changes
                    </Button>
                </div>

                {/* DANGER ZONE */}
                <div className="flex flex-col gap-4 rounded-2xl border border-red-500/20 bg-red-500/5 p-5">
                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-wider text-red-500">
                            Danger Zone
                        </h3>
                        <p className="mt-1 text-sm text-black/60">
                            Deleting your account is permanent and cannot be undone.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={() => setShowDeleteConfirm(true)}
                        className="flex w-fit cursor-pointer items-center gap-2 rounded-xl bg-red-500 px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-red-600 shadow-[0_4px_14px_rgba(239,68,68,0.4)] hover:shadow-[0_6px_20px_rgba(239,68,68,0.6)]"
                    >
                        <Trash2 size={16} />
                        Delete account
                    </button>
                </div>
            </form>
        </>
    );
}
