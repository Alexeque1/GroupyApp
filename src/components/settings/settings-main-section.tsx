"use client";

import { AnimatePresence, motion } from "framer-motion";
import { SETTINGS_SECTIONS, type SettingsSection } from "./settings-aside-section";
import SettingsAccountForm from "./settings-account-form";
import SettingsProfileForm from "./settings-profile-form";
import SettingsNotificationsForm from "./settings-notifications-form";
import SettingsPrivacyForm from "./settings-privacy-form";
import SettingsAppearanceForm from "./settings-appearance-form";

interface SettingsMainSectionProps {
    section: SettingsSection;
    user: {
        name: string;
        lastName: string;
        username: string;
        profileImage: string;
        groups: unknown[];
        communities: unknown[];
        friends: unknown[];
        bio: string;
        interests: string;
        location: string;
    };
}

export default function SettingsMainSection({ section, user }: SettingsMainSectionProps) {
    const current = SETTINGS_SECTIONS.find((item) => item.key === section);
    const Icon = current?.icon;

    return (
        <section className="relative z-10 flex flex-col flex-[2] rounded-3xl border border-black/10 shadow-[0_8px_30px_rgba(0,0,0,0.08)] bg-white overflow-hidden min-h-[500px]">
            <AnimatePresence mode="wait">
                <motion.div
                    key={section}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-1 flex-col gap-6 overflow-y-auto p-8"
                >
                    <div className="flex items-center gap-3">
                        {Icon && (
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#6D28D9]/10 text-[#6D28D9]">
                                <Icon size={20} />
                            </div>
                        )}
                        <div>
                            <h2 className="text-xl font-bold text-black/90">
                                {current?.label}
                            </h2>
                        </div>
                    </div>

                    {section === "account" && (
                        <SettingsAccountForm username={user.username} />
                    )}
                    {section === "profile" && (
                        <SettingsProfileForm initialName={user.name} initialLastName={user.lastName} initialBio={user.bio} initialInterests={user.interests} initialLocation={user.location} />
                    )}
                    {section === "notifications" && (
                        <SettingsNotificationsForm/>
                    )}
                    {section === "privacy" && (
                        <SettingsPrivacyForm/>
                    )}
                    {section === "appearance" && (
                        <SettingsAppearanceForm/>
                    )}
                </motion.div>
            </AnimatePresence>
        </section>
    );
}
