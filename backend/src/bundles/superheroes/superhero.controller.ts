import { BaseController } from '~/common/controller/base-controller.package.js';
import {
    type ApiHandlerOptions,
    type ApiHandlerResponse,
} from '~/common/controller/controller.js';
import { ApiPath } from '~/common/enums/enums.js';
import { HttpCode } from '~/common/http/http.js';
import { type Logger } from '~/common/logger/logger.js';
import { type PaginationParameters } from '~/common/types/types.js';
import { paginationValidationSchema } from '~/common/validation-schemas/validation-schemas.js';

import { SuperheroesApiPath } from './enums/enums.js';
import { type SuperheroService } from './superheroes.js';
import { type SuperheroRequestDto } from './types/types.js';
import {
    superheroValidationSchema,
    updateSuperheroValidationSchema,
} from './validation-schemas/validation-schemas.js';

class SuperheroController extends BaseController {
    private superheroService: SuperheroService;

    public constructor(logger: Logger, superheroService: SuperheroService) {
        super(logger, ApiPath.SUPERHEROES);

        this.superheroService = superheroService;

        this.addRoute({
            path: SuperheroesApiPath.ROOT,
            method: 'GET',
            validation: {
                query: paginationValidationSchema,
            },
            handler: (options) =>
                this.findAll(
                    options as ApiHandlerOptions<{
                        query: PaginationParameters;
                    }>,
                ),
        });

        this.addRoute({
            path: SuperheroesApiPath.ID,
            method: 'GET',
            handler: (options) =>
                this.find(
                    options as ApiHandlerOptions<{
                        params: { id: string };
                    }>,
                ),
        });

        this.addRoute({
            path: SuperheroesApiPath.ROOT,
            method: 'POST',
            validation: {
                body: superheroValidationSchema,
            },
            handler: (options) =>
                this.create(
                    options as ApiHandlerOptions<{
                        body: SuperheroRequestDto;
                    }>,
                ),
        });

        this.addRoute({
            path: SuperheroesApiPath.ID,
            method: 'PUT',
            validation: {
                body: updateSuperheroValidationSchema,
            },
            handler: (options) =>
                this.update(
                    options as ApiHandlerOptions<{
                        body: SuperheroRequestDto;
                        params: { id: string };
                    }>,
                ),
        });

        this.addRoute({
            path: SuperheroesApiPath.ID,
            method: 'DELETE',
            handler: (options) =>
                this.delete(
                    options as ApiHandlerOptions<{
                        params: { id: string };
                    }>,
                ),
        });
    }

    private async find(
        options: ApiHandlerOptions<{
            params: { id: string };
        }>,
    ): Promise<ApiHandlerResponse> {
        const { id } = options.params;

        return {
            status: HttpCode.OK,
            payload: await this.superheroService.find({ id }),
        };
    }

    private async findAll(
        options: ApiHandlerOptions<{
            query: PaginationParameters;
        }>,
    ): Promise<ApiHandlerResponse> {
        const { query } = options;

        return {
            status: HttpCode.OK,
            payload: await this.superheroService.findAll({}, query),
        };
    }

    private async create(
        options: ApiHandlerOptions<{
            body: SuperheroRequestDto;
        }>,
    ): Promise<ApiHandlerResponse> {
        const { body } = options;
        return {
            status: HttpCode.CREATED,
            payload: await this.superheroService.create(body),
        };
    }

    private async update(
        options: ApiHandlerOptions<{
            body: SuperheroRequestDto;
            params: { id: string };
        }>,
    ): Promise<ApiHandlerResponse> {
        const { body, params } = options;
        return {
            status: HttpCode.OK,
            payload: await this.superheroService.update(
                { id: params.id },
                body,
            ),
        };
    }

    private async delete(
        options: ApiHandlerOptions<{
            params: { id: string };
        }>,
    ): Promise<ApiHandlerResponse> {
        const { id } = options.params;
        return {
            status: HttpCode.OK,
            payload: await this.superheroService.delete({ id }),
        };
    }
}

export { SuperheroController };
