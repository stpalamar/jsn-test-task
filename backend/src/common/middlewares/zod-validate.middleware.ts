import { type NextFunction, type Request, type Response } from 'express';

import { type ValidationSchema } from '../types/types.js';

const zodValidate = (
    schema: ValidationSchema,
    source: 'body' | 'params' | 'query',
): ((request: Request, _response: Response, next: NextFunction) => void) => {
    return (request: Request, _response: Response, next: NextFunction) => {
        schema.parse(request[source]);
        next();
    };
};

export { zodValidate };
