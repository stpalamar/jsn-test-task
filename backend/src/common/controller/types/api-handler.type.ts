import { type ApiHandlerOptions, type ApiHandlerResponse } from './types.js';

type ApiHandler = (
    options: ApiHandlerOptions,
) => ApiHandlerResponse | Promise<ApiHandlerResponse>;

export { type ApiHandler };
