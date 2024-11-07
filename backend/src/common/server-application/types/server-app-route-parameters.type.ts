import { type NextFunction, type Request, type Response } from 'express';

import { type HttpMethod } from '~/common/http/http.js';
import { type ValidationSchema } from '~/common/types/types.js';

type ServerAppRouteParameters = {
    path: string;
    method: HttpMethod;
    preHandler?: (
        request: Request,
        response: Response,
        next: NextFunction,
    ) => Promise<void> | void;
    handler: (
        request: Request,
        response: Response,
        next: NextFunction,
    ) => Promise<void> | void;
    validation?: {
        body?: ValidationSchema;
        query?: ValidationSchema;
        params?: ValidationSchema;
    };
};

export { type ServerAppRouteParameters };
