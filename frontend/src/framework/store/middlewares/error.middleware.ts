import { isRejected, type Middleware } from '@reduxjs/toolkit';

import { type HttpError } from '~/framework/http/http.js';
import { notificationManager } from '~/framework/notification/notification.js';

const errorMiddleware: Middleware = () => {
    return (next) => {
        return (action) => {
            if (isRejected(action)) {
                const { message = 'Something went wrong' } =
                    action.error as HttpError;
                notificationManager.error(message);
            }
            next(action);
        };
    };
};

export { errorMiddleware };
