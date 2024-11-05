import { type ServerAppRouteParameters } from './types.js';

type ServerAppApi = {
    version: string;
    routes: ServerAppRouteParameters[];
    buildFullPath(path: string): string;
};

export { type ServerAppApi };
