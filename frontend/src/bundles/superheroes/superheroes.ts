import { config } from '~/framework/config/config.js';
import { http } from '~/framework/http/http.js';

import { SuperheroesApi } from './superheroes-api.js';

const superheroesApi = new SuperheroesApi({
    baseUrl: config.ENV.API.ORIGIN_URL,
    http,
});

export { superheroesApi };
