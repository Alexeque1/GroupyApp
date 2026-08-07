import Link from "next/link";
import { Fragment, ReactNode } from "react";

export default function ProfileSectionGrid<T extends { id: number }>({
    items,
    renderItem,
    // Grid intrínseco: tantas columnas como quepan con cada card >= 240px.
    // Responde al ancho REAL del contenedor, no al del viewport, así las
    // cards no se achican dentro de la columna angosta del profile.
    columns = "grid-cols-[repeat(auto-fill,minmax(240px,1fr))]",
    // Ruta a la que debe navegar cada card. Opcional: las cards de grupos/
    // comunidades ya traen su propio Link interno (EntityCard), así que
    // envolverlas de nuevo generaría un <a> anidado. Solo se pasa para
    // ítems "planos" como los amigos, que no tienen link propio.
    linkTo,
}: {
    items: T[];
    renderItem: (item: T) => ReactNode;
    columns?: string;
    linkTo?: (item: T) => string;
}) {
    return (
        <div className={`grid ${columns} gap-6 w-full`}>
            {items.map((item) =>
                linkTo ? (
                    <Link key={item.id} href={linkTo(item)}>
                        {renderItem(item)}
                    </Link>
                ) : (
                    <Fragment key={item.id}>{renderItem(item)}</Fragment>
                )
            )}
        </div>
    );
}
