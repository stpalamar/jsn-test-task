type Paged<T> = {
    items: T[];
    page: number;
    total: number;
    totalPages: number;
};

export { type Paged };
