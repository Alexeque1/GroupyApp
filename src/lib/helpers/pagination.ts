export interface PaginationResult<T> {
    pageItems: T[];
    totalPages: number;
    safePage: number;
}

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
