import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import bodyParser from 'body-parser';
import express, {
    type NextFunction,
    type Request,
    type Response,
} from 'express';
import { ZodError } from 'zod';

import { type Config } from '~/common/config/config.js';
import { type Database } from '~/common/database/database.js';
import { ServerErrorType } from '~/common/enums/enums.js';
import { HttpError } from '~/common/exceptions/exceptions.js';
import { getHttpMethodFunction } from '~/common/helpers/helpers.js';
import { type Logger } from '~/common/logger/logger.js';
import { zodValidate } from '~/common/middlewares/middlewares.js';
import {
    type ServerCommonErrorResponse,
    type ServerValidationErrorResponse,
} from '~/common/types/types.js';

import { HttpCode } from '../http/http.js';
import {
    type ServerApp,
    type ServerAppApi,
    type ServerAppRouteParameters,
} from './types/types.js';

type Constructor = {
    config: Config;
    logger: Logger;
    database: Database;
    apis: ServerAppApi[];
};

class BaseServerApp implements ServerApp {
    private config: Config;

    private logger: Logger;

    private database: Database;

    private apis: ServerAppApi[];

    private app: ReturnType<typeof express>;

    public constructor({ config, logger, database, apis }: Constructor) {
        this.config = config;
        this.logger = logger;
        this.database = database;
        this.apis = apis;

        this.app = express();
    }

    public addRoute(parameters: ServerAppRouteParameters): void {
        const { path, method, handler, validation } = parameters;

        const validationMiddlewares = [
            ...(validation && validation.body
                ? [zodValidate(validation.body, 'body')]
                : []),
            ...(validation && validation.params
                ? [zodValidate(validation.params, 'params')]
                : []),
            ...(validation && validation.query
                ? [zodValidate(validation.query, 'query')]
                : []),
        ];

        this.app[getHttpMethodFunction(method)](
            path,
            validationMiddlewares,
            handler,
        );

        this.logger.info(`Route added: ${method.toUpperCase()} ${path}`);
    }

    public addRoutes(parameters: ServerAppRouteParameters[]): void {
        for (const route of parameters) {
            this.addRoute(route);
        }
    }

    public initRoutes(): void {
        const routers = this.apis.flatMap((api) => api.routes);

        this.addRoutes(routers);
    }

    private initServe(): void {
        const staticPath = join(
            dirname(fileURLToPath(import.meta.url)),
            '../../../public',
        );

        this.app.use(express.static(staticPath));
    }

    private initErrorHandler(): void {
        this.app.use(
            (
                error: Error,
                _request: Request,
                response: Response,
                _next: NextFunction,
            ) => {
                if (error instanceof ZodError) {
                    this.logger.error(`[Validation Error]: ${error}`);

                    const responseBody: ServerValidationErrorResponse = {
                        errorType: ServerErrorType.VALIDATION,
                        details: error.issues.map((issue) => ({
                            message: issue.message,
                            path: issue.path,
                        })),
                        message: 'Request body is not valid',
                    };

                    return response
                        .status(HttpCode.UNPROCESSED_CONTENT)
                        .json(responseBody);
                }

                if (error instanceof HttpError) {
                    this.logger.error(
                        `[Http Error]: ${error.status.toString()} - ${error.message}`,
                    );

                    const responseBody: ServerCommonErrorResponse = {
                        errorType: ServerErrorType.COMMON,
                        message: error.message,
                    };

                    return response.status(error.status).json(responseBody);
                }

                this.logger.error(`[Internal Server Error]: ${error.message}`);
                const responseBody: ServerCommonErrorResponse = {
                    errorType: ServerErrorType.COMMON,
                    message: 'Internal Server Error',
                };
                return response
                    .status(HttpCode.INTERNAL_SERVER_ERROR)
                    .json(responseBody);
            },
        );
    }

    private initMiddlewares(): void {
        this.app.use(bodyParser.json());
    }

    public init(): void {
        this.logger.info('Server initialization started');

        this.initServe();

        this.initMiddlewares();

        this.initRoutes();

        this.initErrorHandler();

        this.database.connect();

        this.app.listen(this.config.ENV.APP.PORT, this.config.ENV.APP.HOST);

        this.logger.info(
            `Server is listening on PORT - ${this.config.ENV.APP.PORT}, on ENVIROMENT - ${this.config.ENV.APP.ENVIRONMENT}`,
        );
    }
}

export { BaseServerApp };
