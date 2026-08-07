"use client";

import { Users, Globe } from "lucide-react";
import ButtonCreate from "@/components/ui/button-create";
import CreateGroupForm from "./create-group-form";
import CreateCommunityForm from "./create-community-form";
import { useCreateContext } from "./create-context";

export default function CreateMainSection() {
    const { creationType, setCreationType } = useCreateContext();

    return (
        <section className="relative z-10 flex min-h-[60vh] w-full flex-col items-center justify-center">
            
            {/* VISTA 1: SELECCIÓN */}
            {creationType === null && (
                <div className="flex flex-col items-center justify-center animate-in fade-in zoom-in-95 duration-300">
                    <h2 className="mb-8 text-center text-3xl md:text-6xl font-bold color-black dark-mesh-gradient">
                        What are we creating today?
                    </h2>
                    
                    <div className="flex flex-wrap gap-6 sm:gap-8 justify-center">

                        <ButtonCreate
                            title="Group"
                            icon={<Users size={32} />}
                            tone="dark"
                            onClick={() => setCreationType("group")}
                        />

                        <ButtonCreate
                            title="Community"
                            icon={<Globe size={32} />}
                            tone="dark"
                            onClick={() => setCreationType("community")}
                        />

                    </div>
                </div>
            )}

            {/* VISTA 2: FORMULARIO DE GRUPO */}
            {creationType === "group" && (
                <div className="w-full animate-in slide-in-from-bottom-4 fade-in duration-300">
                    <CreateGroupForm onBack={() => setCreationType(null)} />
                </div>
            )}

            {/* VISTA 3: FORMULARIO DE COMUNIDAD */}
            {creationType === "community" && (
                <div className="w-full animate-in slide-in-from-bottom-4 fade-in duration-300">
                    <CreateCommunityForm onBack={() => setCreationType(null)} />
                </div>
            )}

        </section>
    );
}