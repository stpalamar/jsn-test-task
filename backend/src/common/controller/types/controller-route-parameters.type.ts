import { type HttpMethod } from '~/common/http/http.js';

import { type ApiHandler } from './types.js';

type ControllerRouteParameters = {
    path: string;
    method: HttpMethod;
    handler: ApiHandler;
};

export { type ControllerRouteParameters };
