export interface PaginationResult<T> {
    pageItems: T[];
    totalPages: number;
    safePage: number;
}

// Paginación pura y reutilizable: clampa la página al rango válido y
// devuelve el slice correspondiente. Sirve tanto para paginación
// controlada (page desde props) como interna (page desde useState).
export function paginate<T>(
    items: T[],
    page: number,
    perPage: number
): PaginationResult<T> {
    const totalPages = Math.max(1, Math.ceil(items.length / perPage));
    const safePage = Math.min(Math.max(1, page), totalPages);
    const start = (safePage - 1) * perPage;

    return {
        pageItems: items.slice(start, start + perPage),
        totalPages,
        safePage,
    };
}
