import FloatingLiquidMenu from "@/components/feed/floated-menu";
import SideMenu from "@/components/feed/side-menu";
import IdleLogout from "@/components/auth/idle-logout";

export default function ProtectedLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="relative min-h-dvh w-full text-white">
            {/* Signs the user out after 10 minutes of inactivity */}
            <IdleLogout />

            {/* SIDEBAR */}
            <SideMenu />

            {/* MAIN CONTENT */}
            <main className="min-h-dvh lg:pl-[80px]">
                <div className="w-full max-w-[1280px] mx-auto py-0 md:px-6 lg:px-10 mb-[90px]">
                    {children}
                </div>
            </main>

            {/* FLOATING MENU */}
            <FloatingLiquidMenu />
        </div>
    );
}