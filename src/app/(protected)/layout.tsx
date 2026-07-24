import FeedHeader from "@/components/feed/header";
import AnimatedBackgroundDark from "@/components/ui/backgrounds/animated-background-dark";


export default function ProtectedLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="relative min-h-screen w-full flex flex-col overflow-hidden text-white">

            {/* NAVBAR */}

            <main className="flex justify-center align-center">
                <div className="container py-10">
                    {children}
                </div>
            </main>
        </div>
    );
}