import AuthCard from "@/components/auth/auth-card";
import AnimatedBackground from "@/components/ui/backgrounds/animated-background";

interface AuthPageProps {
  searchParams: Promise<{
    mode?: string;
  }>;
}

export default async function Auth({
    searchParams,
}: AuthPageProps) {

    const { mode } = await searchParams;

    return (
        <div className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[#1a0f2e] text-white">

            {/* FONDO MESHY */}
            <AnimatedBackground/>

            {/* CONTENIDO */}
            <div className="relative z-10 flex flex-col items-center gap-6 rounded-3xl bg-[#251842]/40 border border-white/10 p-12 backdrop-blur-md shadow-2xl h-full">
                <AuthCard initialMode={mode === "login" ? "login" : "register"} />
            </div>

        </div>
    );
}