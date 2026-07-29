import FloatingLiquidMenu from "@/components/feed/floated-menu";
import SideMenu from "@/components/feed/side-menu";

export default function ProtectedLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="relative min-h-screen w-full overflow-hidden text-white">

            {/* SIDEBAR */}
            <SideMenu />

            {/* CONTENIDO PRINCIPAL */}
            <main className="min-h-screen lg:pl-[80px]">
                <div className="container mx-auto py-0 md:px-6 lg:px-10 mb-[90px]">
                    {children}
                </div>
            </main>

            {/* MENÚ FLOTANTE */}
            <FloatingLiquidMenu />
        </div>
    );
}