import { Fragment, ReactNode } from "react";

export default function ProfileSectionGrid<T extends { id: number }>({
    items,
    renderItem,
    // Grid intrínseco: tantas columnas como quepan con cada card >= 240px.
    // Responde al ancho REAL del contenedor, no al del viewport, así las
    // cards no se achican dentro de la columna angosta del profile.
    columns = "grid-cols-[repeat(auto-fill,minmax(240px,1fr))]",
}: {
    items: T[];
    renderItem: (item: T) => ReactNode;
    columns?: string;
}) {
    return (
        <div className={`grid ${columns} gap-6 w-full`}>
            {items.map((item) => (
                <Fragment key={item.id}>{renderItem(item)}</Fragment>
            ))}
        </div>
    );
}
