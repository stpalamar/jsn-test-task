import { type ApiHandlerResponse } from '~/common/controller/controller.js';
import { BaseController } from '~/common/controller/controller.js';
import { ApiPath } from '~/common/enums/enums.js';
import { HttpCode } from '~/common/http/http.js';
import { type Logger } from '~/common/logger/logger.js';

class HealthController extends BaseController {
    public constructor({ logger }: { logger: Logger }) {
        super(logger, ApiPath.HEALTH);

        this.addRoute({
            path: '/',
            method: 'GET',
            handler: () => this.healthCheck(),
        });
    }

    private healthCheck(): ApiHandlerResponse {
        return {
            status: HttpCode.OK,
            payload: 'OK',
        };
    }
}

export { HealthController };
