import { type Config } from '../config/config.js';
import {
    type ServerAppApi,
    type ServerAppRouteParameters,
} from './types/types.js';

class BaseServerAppApi implements ServerAppApi {
    public version: string;

    public routes: ServerAppRouteParameters[];

    private config: Config;

    public constructor(
        version: string,
        config: Config,
        ...handlers: ServerAppRouteParameters[]
    ) {
        this.version = version;
        this.config = config;
        this.routes = handlers.map((handler) => ({
            ...handler,
            path: this.buildFullPath(handler.path),
        }));
    }

    public buildFullPath(path: string): string {
        return `/api/${this.version}${path}`;
    }
}

export { BaseServerAppApi };
