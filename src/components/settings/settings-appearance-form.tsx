"use client";

import { useState, type FormEvent } from "react";
import { Palette, Sun, Moon, MonitorSmartphone } from "lucide-react";
import Button from "@/components/ui/button";
import StatusAlert from "@/components/ui/alerts/status-alert";
import { cn } from "@/lib/utils";

// --- SUBCOMPONENTE PARA LAS TARJETAS DE TEMA ---
interface ThemeCardProps {
    id: "light" | "dark" | "system";
    label: string;
    icon: React.ElementType;
    currentTheme: string;
    onClick: (theme: "light" | "dark" | "system") => void;
}

const ThemeCard = ({ id, label, icon: Icon, currentTheme, onClick }: ThemeCardProps) => {
    const isSelected = currentTheme === id;

    return (
        <button
            type="button"
            onClick={() => onClick(id)}
            className={cn(
                "relative flex w-full cursor-pointer flex-col items-center justify-center gap-4 rounded-2xl border-2 p-6 transition-all duration-300",
                isSelected
                    ? "border-brand-purple bg-brand-purple/5 shadow-[0_0_15px_rgba(139,92,246,0.1)] dark:bg-brand-purple/10"
                    : "border-black/10 bg-black/5 hover:border-black/20 hover:bg-black/10 dark:border-white/10 dark:bg-white/5 dark:hover:border-white/20 dark:hover:bg-white/10"
            )}
        >
            <div
                className={cn(
                    "flex h-14 w-14 items-center justify-center rounded-full transition-colors duration-300",
                    isSelected
                        ? "bg-brand-purple text-white"
                        : "bg-black/10 text-black/60 dark:bg-white/10 dark:text-white/60"
                )}
            >
                <Icon size={28} />
            </div>
            
            <div className="flex flex-col items-center gap-1">
                <span
                    className={cn(
                        "text-base font-bold",
                        isSelected ? "text-brand-purple" : "text-black/80 dark:text-white/80"
                    )}
                >
                    {label}
                </span>
                
                {/* Indicador visual de selección */}
                <div
                    className={cn(
                        "mt-1 h-1.5 w-1.5 rounded-full transition-all duration-300",
                        isSelected ? "scale-100 bg-brand-purple" : "scale-0 bg-transparent"
                    )}
                />
            </div>
        </button>
    );
};
// ----------------------------------------------

export default function SettingsAppearanceForm() {
    // Si usas 'next-themes', aquí normalmente usarías `const { theme, setTheme } = useTheme()`
    const [theme, setTheme] = useState<"light" | "dark" | "system">("system");
    const [statusAlert, setStatusAlert] = useState<{ description: string; type: "success" | "error" } | null>(null);

    const handleSaveChanges = (e: FormEvent) => {
        e.preventDefault();
        
        // TODO: Enviar el tema a tu API si lo guardas en base de datos, 
        // o si usas next-themes, el cambio ya ocurrió al hacer clic en las tarjetas.
        setStatusAlert({ description: "Your appearance settings have been updated.", type: "success" });
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
                        <Palette size={20} />
                        <h3 className="font-bold">Customize Appearance</h3>
                    </div>
                    <p className="text-sm text-black/70 dark:text-white/70">
                        Choose how the application looks on your device. You can force a specific theme or sync it with your operating system.
                    </p>
                </div>

                {/* THEME SELECTION */}
                <div className="flex flex-col gap-5">
                    <h3 className="border-b border-black/10 pb-2 text-sm font-bold uppercase tracking-wider text-brand-purple">
                        Theme Preferences
                    </h3>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                        <ThemeCard
                            id="light"
                            label="Light"
                            icon={Sun}
                            currentTheme={theme}
                            onClick={setTheme}
                        />
                        <ThemeCard
                            id="dark"
                            label="Dark"
                            icon={Moon}
                            currentTheme={theme}
                            onClick={setTheme}
                        />
                        <ThemeCard
                            id="system"
                            label="System"
                            icon={MonitorSmartphone}
                            currentTheme={theme}
                            onClick={setTheme}
                        />
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