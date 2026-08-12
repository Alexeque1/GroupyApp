"use client";

import { useState } from "react";
import { UserCog, User, Bell, Lock, Palette, ChevronDown, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export type SettingsSection = "account" | "profile" | "notifications" | "privacy" | "appearance";

export const SETTINGS_SECTIONS: { key: SettingsSection; label: string; icon: LucideIcon }[] = [
    { key: "account", label: "Account", icon: UserCog },
    { key: "profile", label: "Profile", icon: User },
    { key: "notifications", label: "Notifications", icon: Bell },
    { key: "privacy", label: "Privacy", icon: Lock },
    { key: "appearance", label: "Appearance", icon: Palette },
];

interface SettingsAsideSectionProps {
    activeSection?: SettingsSection;
    onSectionChange?: (section: SettingsSection) => void;
}

export default function SettingsAsideSection({ activeSection, onSectionChange }: SettingsAsideSectionProps) {
    const [internalSection, setInternalSection] = useState<SettingsSection>("account");
    // Colapsado por defecto: en mobile arranca como un dropdown cerrado; en md+ el
    // colapso se ignora vía CSS (ver className del contenedor de abajo).
    const [isOpen, setIsOpen] = useState(false);
    const currentSection = activeSection ?? internalSection;
    const current = SETTINGS_SECTIONS.find((item) => item.key === currentSection);

    const handleSelect = (section: SettingsSection) => {
        setInternalSection(section);
        onSectionChange?.(section);
        setIsOpen(false); // en mobile, elegir una opción cierra el dropdown
    };

    return (
        <aside className="relative z-10 flex h-fit flex-1 flex-col rounded-3xl border border-black/10 bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
            {/* HEADER: en mobile es el trigger del dropdown; en md+ es solo un título estático */}
            <button
                type="button"
                onClick={() => setIsOpen((prev) => !prev)}
                className="flex w-full cursor-pointer items-center justify-between md:cursor-default"
            >
                <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-black/80">
                        Settings
                    </h3>
                    {current && (
                        <span className="rounded-full bg-black/5 px-2 py-0.5 text-xs font-semibold text-black/50 md:hidden">
                            {current.label}
                        </span>
                    )}
                </div>

                <ChevronDown
                    size={20}
                    className={cn(
                        "text-black/40 transition-transform duration-300 md:hidden",
                        isOpen && "rotate-180"
                    )}
                />
            </button>

            {/* CONTENEDOR COLAPSABLE: cerrado por defecto en mobile, siempre abierto en md+ */}
            <div
                className={cn(
                    "grid transition-all duration-300 ease-in-out",
                    isOpen
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0 md:grid-rows-[1fr] md:opacity-100"
                )}
            >
                <div className="overflow-hidden">
                    <nav className="flex flex-col gap-1 pt-1 md:pt-0">
                        {SETTINGS_SECTIONS.map(({ key, label, icon: Icon }) => {
                            const isActive = currentSection === key;

                            return (
                                <button
                                    key={key}
                                    type="button"
                                    onClick={() => handleSelect(key)}
                                    className={cn(
                                        "flex cursor-pointer items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-medium transition-colors",
                                        isActive
                                            ? "bg-[#6D28D9]/10 text-[#6D28D9]"
                                            : "text-black/60 hover:bg-black/5 hover:text-black"
                                    )}
                                >
                                    <Icon
                                        size={18}
                                        className={isActive ? "text-[#6D28D9]" : "text-black/40"}
                                    />
                                    {label}
                                </button>
                            );
                        })}
                    </nav>
                </div>
            </div>
        </aside>
    );
}
