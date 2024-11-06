import { type Paged, type PaginationParameters } from '~/common/types/types.js';

type Service<T = unknown> = {
    find(query: Record<string, T>): Promise<T>;
    findAll(
        query: Record<string, T>,
        pagination?: PaginationParameters,
    ): Promise<Paged<T>>;
    create(payload: unknown): Promise<T>;
    update(
        query: Record<string, unknown>,
        payload: Record<string, unknown>,
    ): Promise<T | null>;
    delete(qquery: Record<string, unknown>): Promise<boolean>;
};

export { type Service };
