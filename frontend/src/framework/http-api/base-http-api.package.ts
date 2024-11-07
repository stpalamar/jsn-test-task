import { type ContentType, ServerErrorType } from '~/common/enums/enums.js';
import { configureUrlString } from '~/common/helpers/helpers.js';
import {
    type ServerErrorResponse,
    type ValueOf,
} from '~/common/types/types.js';
import { type Http, type HttpCode } from '~/framework/http/http.js';
import { HttpError, HttpHeader } from '~/framework/http/http.js';

import {
    type HttpApi,
    type HttpApiOptions,
    type HttpApiResponse,
} from './types/types.js';

type Constructor = {
    baseUrl: string;
    path: string;
    http: Http;
};

class BaseHttpApi implements HttpApi {
    private baseUrl: string;

    private path: string;

    private http: Http;

    public constructor({ baseUrl, path, http }: Constructor) {
        this.baseUrl = baseUrl;
        this.path = path;
        this.http = http;
    }

    public async load(
        path: string,
        options: HttpApiOptions,
    ): Promise<HttpApiResponse> {
        const { method, contentType, payload = null, query } = options;

        const headers = this.getHeaders(contentType);

        const response = await this.http.load(this.getUrl(path, query), {
            method,
            headers,
            payload,
        });

        return (await this.checkResponse(response)) as HttpApiResponse;
    }

    protected getFullEndpoint<T extends Record<string, string>>(
        ...parameters: [...string[], T]
    ): string {
        const copiedParameters = [...parameters];

        const options = copiedParameters.pop() as T;

        return configureUrlString(
            this.baseUrl,
            this.path,
            ...(copiedParameters as string[]),
            options,
        );
    }

    private getUrl<T extends Record<string, unknown>>(
        path: string,
        queryParameters?: T | undefined,
    ): string {
        if (!queryParameters) {
            return path;
        }

        const query = new URLSearchParams(
            queryParameters as Record<string, string>,
        ).toString();

        return `${path}?${query}`;
    }

    private getHeaders(
        contentType: ValueOf<typeof ContentType> | undefined,
    ): Headers {
        const headers = new Headers();
        if (contentType) {
            headers.append(HttpHeader.CONTENT_TYPE, contentType);
        }

        return headers;
    }

    private async checkResponse(response: Response): Promise<Response> {
        if (!response.ok) {
            await this.handleError(response);
        }

        return response;
    }

    private async handleError(response: Response): Promise<never> {
        const parsedException = (await response.json().catch(
            (): ServerErrorResponse => ({
                errorType: ServerErrorType.COMMON,
                message: response.statusText,
            }),
        )) as ServerErrorResponse;

        const isCustomException = Boolean(parsedException.errorType);

        throw new HttpError({
            status: response.status as ValueOf<typeof HttpCode>,
            errorType: isCustomException
                ? parsedException.errorType
                : ServerErrorType.COMMON,
            message: parsedException.message,
            details:
                'details' in parsedException ? parsedException.details : [],
        });
    }
}

export { BaseHttpApi };
