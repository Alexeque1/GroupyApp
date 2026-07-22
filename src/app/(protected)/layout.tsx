import FeedHeader from "@/components/feed/header";
import AnimatedBackground from "@/components/ui/backgrounds/animated-background";


export default function ProtectedLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="relative min-h-screen w-full flex flex-col overflow-hidden bg-[#1a0f2e] text-white">
            {/* FONDO MESHY */}
            <AnimatedBackground />

            {/* NAVBAR */}
            <FeedHeader />

            <main className="flex justify-center align-center">
                <div className="container py-10">
                    {children}
                </div>
            </main>
        </div>
    );
}