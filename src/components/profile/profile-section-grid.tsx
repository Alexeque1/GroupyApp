import { Fragment, ReactNode } from "react";

export default function ProfileSectionGrid<T extends { id: number }>({
    items,
    renderItem,
    columns = "grid-cols-[repeat(auto-fill,minmax(240px,1fr))]",
}: {
    items: T[];
    renderItem: (item: T) => ReactNode;
    columns?: string;
}) {
    return (
        <div className={`grid ${columns} gap-6 w-full`}>
            {items.map((item) =>
                <Fragment key={item.id}>{renderItem(item)}</Fragment>
            )}
        </div>
    );
}
