import { type Request, type Response } from 'express';

import { type HttpMethod } from '~/common/http/http.js';

type ServerAppRouteParameters = {
    path: string;
    method: HttpMethod;
    handler: (request: Request, response: Response) => Promise<void> | void;
};

export { type ServerAppRouteParameters };
