import { type Logger } from '~/common/logger/logger.js';
import { type ServerAppRouteParameters } from '~/common/server-application/server-application.js';

import {
    type ApiHandler,
    type ApiHandlerOptions,
    type Controller,
    type ControllerRouteParameters,
} from './types/types.js';

class BaseController implements Controller {
    private logger: Logger;

    private apiUrl: string;

    public routes: ServerAppRouteParameters[];

    public constructor(logger: Logger, apiPath: string) {
        this.logger = logger;
        this.apiUrl = apiPath;
        this.routes = [];
    }

    public addRoute(options: ControllerRouteParameters): void {
        const { handler, path } = options;
        const fullPath = this.apiUrl + path;

        this.routes.push({
            ...options,
            path: fullPath,
            handler: (request, response, next) =>
                this.mapHandler(handler, request, response, next),
        });
    }

    private async mapHandler(
        handler: ApiHandler,
        request: Parameters<ServerAppRouteParameters['handler']>[0],
        response: Parameters<ServerAppRouteParameters['handler']>[1],
        next: Parameters<ServerAppRouteParameters['handler']>[2],
    ): Promise<void> {
        this.logger.info(`${request.method.toUpperCase()} on ${request.url}`);

        const handlerOptions = this.mapRequest(request);

        try {
            const apiHandlerResponse = await handler(handlerOptions);
            const { status, payload } = apiHandlerResponse;
            response.status(status).send(payload);
        } catch (error) {
            next(error);
        }
    }

    private mapRequest(
        request: Parameters<ServerAppRouteParameters['handler']>[0],
    ): ApiHandlerOptions {
        const {
            body,
            files,
            query,
            params,
            headers: { origin },
        } = request;

        return {
            body,
            files,
            query,
            params,
            origin,
        };
    }
}

export { BaseController };
