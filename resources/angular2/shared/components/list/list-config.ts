export interface ListConfig {
    sortOptions: { name: string, value: string }[],
    perPageOptions: number[],
    sort: { by: string, descending: boolean },
    page: {
        currentPage: number,
        from: number,
        to: number,
        total: number,
        lastPage: number,
        perPage: number
    }
};
