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
                <div className="container mx-auto px-6 py-10 lg:px-10">
                    {children}
                </div>
            </main>

            {/* MENÚ FLOTANTE */}
            <FloatingLiquidMenu />

        </div>
    );
}