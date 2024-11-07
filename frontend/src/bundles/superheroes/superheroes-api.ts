import { ApiPath, ContentType } from '~/common/enums/enums.js';
import { type Paged, type PaginationParameters } from '~/common/types/types.js';
import { type Http } from '~/framework/http/http.js';
import { BaseHttpApi } from '~/framework/http-api/http-api.js';

import { SuperheroesApiPath } from './enums/enums.js';
import {
    type SuperheroRequestDto,
    type SuperheroResponseDto,
} from './types/types.js';

type Constructor = {
    baseUrl: string;
    http: Http;
};

class SuperheroesApi extends BaseHttpApi {
    public constructor({ baseUrl, http }: Constructor) {
        super({ path: ApiPath.SUPERHEROES, baseUrl, http });
    }

    public async getSuperheroes(
        payload: PaginationParameters,
    ): Promise<Paged<SuperheroResponseDto>> {
        const { page, limit } = payload;
        const response = await this.load(
            this.getFullEndpoint(SuperheroesApiPath.ROOT, {}),
            {
                method: 'GET',
                contentType: ContentType.JSON,
                query: {
                    page,
                    limit,
                },
            },
        );

        return await response.json<Paged<SuperheroResponseDto>>();
    }

    public async getSuperheroById(id: string): Promise<SuperheroResponseDto> {
        const response = await this.load(
            this.getFullEndpoint(SuperheroesApiPath.ID, { id }),
            {
                method: 'GET',
                contentType: ContentType.JSON,
            },
        );

        return await response.json<SuperheroResponseDto>();
    }

    public async createSuperhero(
        payload: SuperheroRequestDto,
    ): Promise<SuperheroResponseDto> {
        const response = await this.load(
            this.getFullEndpoint(SuperheroesApiPath.ROOT, {}),
            {
                method: 'POST',
                contentType: ContentType.JSON,
                payload: JSON.stringify(payload),
            },
        );

        return await response.json<SuperheroResponseDto>();
    }

    public async updateSuperhero(
        id: string,
        payload: SuperheroRequestDto,
    ): Promise<SuperheroResponseDto> {
        const response = await this.load(
            this.getFullEndpoint(SuperheroesApiPath.ID, { id }),
            {
                method: 'PUT',
                contentType: ContentType.JSON,
                payload: JSON.stringify(payload),
            },
        );

        return await response.json<SuperheroResponseDto>();
    }

    public async deleteSuperhero(id: string): Promise<boolean> {
        const response = await this.load(
            this.getFullEndpoint(SuperheroesApiPath.ID, { id }),
            {
                method: 'DELETE',
            },
        );

        return await response.json<boolean>();
    }
}

export { SuperheroesApi };
