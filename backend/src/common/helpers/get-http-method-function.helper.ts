import { type HttpMethod } from '~/common/http/http.js';

const getHttpMethodFunction = (
    method: HttpMethod,
): 'get' | 'post' | 'put' | 'patch' | 'delete' => {
    return method.toLowerCase() as 'get' | 'post' | 'put' | 'patch' | 'delete';
};

export { getHttpMethodFunction };
