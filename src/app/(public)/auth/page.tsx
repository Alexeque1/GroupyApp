import AuthCard from "@/components/auth/auth-card";
import AnimatedBackground from "@/components/ui/backgrounds/animated-background-dark";

interface AuthPageProps {
  searchParams: Promise<{
    mode?: string;
    registered?: string;
  }>;
}

export default async function Auth({
    searchParams,
}: AuthPageProps) {

    const { mode, registered } = await searchParams;

    return (
        <div className="relative min-h-dvh w-full flex flex-col items-center justify-center overflow-hidden bg-brand-violet text-white">

            {/* FONDO MESHY */}
            <AnimatedBackground/>

            {/* CONTENIDO */}
            <div className="relative z-10 flex flex-col items-center gap-6 rounded-3xl bg-brand-plum/40 border border-white/10 p-12 backdrop-blur-md shadow-2xl h-full">
                <AuthCard 
                key={mode ?? "register"} 
                initialMode={mode === "login" ? "login" : "register"} 
                justRegistered={registered === "1"}/>
            </div>

        </div>
    );
}