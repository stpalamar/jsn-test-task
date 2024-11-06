import { healthController } from '~/bundles/health/health.js';
import { superheroController } from '~/bundles/superheroes/superheroes.js';
import { config } from '~/common/config/config.js';
import { database } from '~/common/database/database.js';
import { logger } from '~/common/logger/logger.js';

import { BaseServerApp } from './base-server-app.js';
import { BaseServerAppApi } from './base-server-app-api.js';

const apiV1 = new BaseServerAppApi(
    'v1',
    config,
    ...healthController.routes,
    ...superheroController.routes,
);

const serverApp = new BaseServerApp({
    config,
    logger,
    database,
    apis: [apiV1],
});

export { serverApp };
export { type ServerAppRouteParameters } from './types/types.js';
