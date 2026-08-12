"use client";

import { useState, type FormEvent } from "react";
import { User, MapPin, Sparkles } from "lucide-react";
import Button from "@/components/ui/button";
import StatusAlert from "@/components/ui/alerts/status-alert";
import { cn } from "@/lib/utils";

// Reutilizamos el estilo de input
const inputClass =
    "w-full rounded-xl border border-black/10 bg-black/5 px-4 py-3 text-black placeholder-black/30 outline-none transition-all focus:border-brand-purple focus:ring-1 focus:ring-brand-purple dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder-white/30";

interface SettingsProfileFormProps {
    initialName?: string;
    initialLastName?: string;
    initialBio?: string;
    initialInterests?: string;
    initialLocation?: string;
}

export default function SettingsProfileForm({
    initialName = "",
    initialLastName = "",
    initialBio = "",
    initialInterests = "",
    initialLocation = "",
}: SettingsProfileFormProps) {
    const [name, setName] = useState(initialName);
    const [lastName, setLastName] = useState(initialLastName);
    const [bio, setBio] = useState(initialBio);
    const [interests, setInterests] = useState(initialInterests);
    const [location, setLocation] = useState(initialLocation);
    
    const [statusAlert, setStatusAlert] = useState<{ description: string; type: "success" | "error" } | null>(null);

    const handleSaveChanges = (e: FormEvent) => {
        e.preventDefault();

        // Validación básica de ejemplo
        if (name.trim().length === 0) {
            setStatusAlert({ description: "First name cannot be empty.", type: "error" });
            return;
        }

        if (lastName.trim().length === 0) {
            setStatusAlert({ description: "Last name cannot be empty.", type: "error" });
            return;
        }

        setStatusAlert({ description: "Your profile has been updated successfully.", type: "success" });
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
                
                {/* PUBLIC PROFILE INFORMATION */}
                <div className="flex flex-col gap-5">
                    <h3 className="border-b border-black/10 pb-2 text-sm font-bold uppercase tracking-wider text-brand-purple">
                        Public Profile
                    </h3>

                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                        <div className="flex flex-col gap-1.5">
                            <label className="ml-1 text-sm font-medium text-black/70">First Name</label>
                            <div className="relative">
                                <User size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-black/40" />
                                <input
                                    type="text"
                                    className={cn(inputClass, "pl-10")}
                                    placeholder="Jane"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className="ml-1 text-sm font-medium text-black/70">Last Name</label>
                            <div className="relative">
                                <User size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-black/40" />
                                <input
                                    type="text"
                                    className={cn(inputClass, "pl-10")}
                                    placeholder="Doe"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label className="ml-1 text-sm font-medium text-black/70">Bio</label>
                        <textarea
                            className={cn(inputClass, "min-h-[120px] resize-none")}
                            placeholder="Tell us a little bit about yourself..."
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                        />
                        <p className="ml-1 text-xs text-black/40">
                            Brief description for your profile. URLs are hyperlinked.
                        </p>
                    </div>
                </div>

                {/* ADDITIONAL DETAILS */}
                <div className="flex flex-col gap-5">
                    <h3 className="border-b border-black/10 pb-2 text-sm font-bold uppercase tracking-wider text-brand-purple">
                        Additional Details
                    </h3>

                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                        <div className="flex flex-col gap-1.5">
                            <label className="ml-1 text-sm font-medium text-black/70">Interests</label>
                            <div className="relative">
                                <Sparkles size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-black/40" />
                                <input
                                    type="text"
                                    className={cn(inputClass, "pl-10")}
                                    placeholder="Design, Coding, Music..."
                                    value={interests}
                                    onChange={(e) => setInterests(e.target.value)}
                                />
                            </div>
                            <p className="ml-1 text-xs text-black/40">
                                Separate interests with commas.
                            </p>
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <label className="ml-1 text-sm font-medium text-black/70">Location</label>
                            <div className="relative">
                                <MapPin size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-black/40" />
                                <input
                                    type="text"
                                    className={cn(inputClass, "pl-10")}
                                    placeholder="Buenos Aires, Argentina"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* ACTIONS */}
                <div className="flex justify-end border-t border-black/10 pt-4">
                    <Button type="submit" tone="dark" className="w-full md:w-auto md:px-12">
                        Save profile
                    </Button>
                </div>
            </form>
        </>
    );
}