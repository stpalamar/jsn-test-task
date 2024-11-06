type Repository<T = unknown> = {
    find(query: Record<string, T>): Promise<T>;
    findAll(
        query: Record<string, T>,
        offset: number,
        limit: number,
    ): Promise<T[]>;
    create(payload: unknown): Promise<T>;
    update(query: Record<string, unknown>, payload: unknown): Promise<T>;
    delete(query: Record<string, unknown>): Promise<boolean>;
};

export { type Repository };
