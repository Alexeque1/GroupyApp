import FeedHeader from "@/components/feed/header";
import AnimatedBackgroundDark from "@/components/ui/backgrounds/animated-background-dark";
import FloatingLiquidMenu from "@/components/feed/floated-menu";
import SideMenu from "@/components/feed/side-menu";

export default function ProtectedLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="relative min-h-screen w-full flex flex-col overflow-hidden text-white">

            {/* NAVBAR */}
            <FloatingLiquidMenu/>


            <main className="flex gap-5 justify-center align-center">
                <div className="container py-10">
                    {children}
                </div>
            </main>
        </div>
    );
}