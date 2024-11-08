import { type RequestHandler } from 'express';

import { type HttpMethod } from '~/common/http/http.js';
import { type ValidationSchema } from '~/common/types/types.js';

import { type ApiHandler } from './types.js';

type ControllerRouteParameters = {
    path: string;
    method: HttpMethod;
    preHandler?: RequestHandler;
    handler: ApiHandler;
    validation?: {
        body?: ValidationSchema;
        params?: ValidationSchema;
        query?: ValidationSchema;
    };
};

export { type ControllerRouteParameters };
