import { type ContentType } from '~/common/enums/enums.js';
import { type ValueOf } from '~/common/types/types.js';
import { type HttpOptions } from '~/framework/http/http.js';

type HttpApiOptions = Omit<HttpOptions, 'headers' | 'payload'> & {
    contentType?: ValueOf<typeof ContentType>;
    payload?: HttpOptions['payload'];
    query?: Record<string, unknown>;
};

export { type HttpApiOptions };
