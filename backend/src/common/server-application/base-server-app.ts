import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import express from 'express';

import { type Database } from '~/common/database/database.js';
import { getHttpMethodFunction } from '~/common/helpers/helpers.js';
import { type Logger } from '~/common/logger/logger.js';

import { type Config } from '../config/config.js';
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
        const { path, method, handler } = parameters;

        this.app[getHttpMethodFunction(method)](path, handler);

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

    public init(): void {
        this.logger.info('Server initialization started');

        this.initServe();
        this.initRoutes();

        this.database.connect();

        this.app.listen(this.config.ENV.APP.PORT, this.config.ENV.APP.HOST);

        this.logger.info(
            `Server is listening on PORT - ${this.config.ENV.APP.PORT}, on ENVIROMENT - ${this.config.ENV.APP.ENVIRONMENT}`,
        );
    }
}

export { BaseServerApp };
