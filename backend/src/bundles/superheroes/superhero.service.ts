import { HttpError } from '~/common/exceptions/exceptions.js';
import { HttpCode } from '~/common/http/http.js';
import {
    type Paged,
    type PaginationParameters,
    type Service,
} from '~/common/types/types.js';

import { ErrorMessage } from './enums/enums.js';
import { SuperheroEntity, type SuperheroRepository } from './superheroes.js';
import {
    type SuperheroRequestDto,
    type SuperheroResponseDto,
} from './types/types.js';

class SuperheroService implements Service {
    private superheroRepository: SuperheroRepository;

    public constructor(superheroRepository: SuperheroRepository) {
        this.superheroRepository = superheroRepository;
    }

    public async find(
        query: Record<string, unknown>,
    ): Promise<SuperheroResponseDto | null> {
        const item = await this.superheroRepository.find(query);

        if (!item) {
            throw new HttpError({
                message: ErrorMessage.NOT_FOUND,
                status: HttpCode.NOT_FOUND,
            });
        }

        return item.toObject();
    }

    public async findAll(
        query: Record<string, unknown>,
        pagination: PaginationParameters,
    ): Promise<Paged<SuperheroResponseDto>> {
        const { page = 1, limit = 5 } = pagination;
        const offset = (Number(page) - 1) * Number(limit);

        const items = await this.superheroRepository.findAll(
            query,
            offset,
            limit,
        );

        const total = await this.superheroRepository.count(query);

        return {
            items: items.map((item) => item.toObject()),
            page: Number(page),
            total: total,
            totalPages: Math.ceil(total / Number(limit)),
        };
    }

    public async create(
        payload: SuperheroRequestDto,
    ): Promise<SuperheroResponseDto> {
        const item = await this.superheroRepository.create(
            SuperheroEntity.initializeNew(payload),
        );

        return item.toObject();
    }

    public async update(
        query: Record<string, unknown>,
        payload: SuperheroRequestDto,
    ): Promise<SuperheroResponseDto | null> {
        const item = await this.superheroRepository.update(
            query,
            SuperheroEntity.initializeNew(payload),
        );

        if (!item) {
            throw new HttpError({
                message: ErrorMessage.NOT_FOUND,
                status: HttpCode.NOT_FOUND,
            });
        }

        return item.toObject();
    }

    public async delete(query: Record<string, unknown>): Promise<boolean> {
        return this.superheroRepository.delete(query);
    }
}

export { SuperheroService };
