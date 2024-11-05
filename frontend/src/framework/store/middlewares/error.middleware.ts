import { isRejected, type Middleware } from '@reduxjs/toolkit';

import { type HttpError } from '~/framework/http/http.js';

const errorMiddleware: Middleware = () => {
    return (next) => {
        return (action) => {
            if (isRejected(action)) {
                const { message = 'Something went wrong' } =
                    action.error as HttpError;
                // eslint-disable-next-line no-console
                console.error(message);
            }
            next(action);
        };
    };
};

export { errorMiddleware };
