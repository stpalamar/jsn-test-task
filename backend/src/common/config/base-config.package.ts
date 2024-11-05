import convict, { type Config as TConfig } from 'convict';
import { config } from 'dotenv';

import { AppEnvironment } from '~/common/enums/enums.js';

import { type Config, type EnvironmentSchema } from './types/types.js';

class BaseConfig implements Config {
    public ENV: EnvironmentSchema;

    public constructor() {
        config();
        this.envSchema.load({});
        this.envSchema.validate({ allowed: 'strict' });
        this.ENV = this.envSchema.getProperties();
    }

    private get envSchema(): TConfig<EnvironmentSchema> {
        return convict<EnvironmentSchema>({
            APP: {
                PORT: {
                    doc: 'Port for incoming connections',
                    format: Number,
                    env: 'PORT',
                    default: null,
                },
                ENVIRONMENT: {
                    doc: 'Application environment',
                    format: Object.values(AppEnvironment),
                    env: 'NODE_ENV',
                    default: null,
                },
                HOST: {
                    doc: 'Host for server app',
                    format: String,
                    env: 'HOST',
                    default: null,
                },
            },
            DB: {
                USERNAME: {
                    doc: 'Database connection username',
                    format: String,
                    env: 'DB_USERNAME',
                    default: null,
                },
                PASSWORD: {
                    doc: 'Database connection password',
                    format: String,
                    env: 'DB_PASSWORD',
                    default: null,
                },
                HOST: {
                    doc: 'Database connection host',
                    format: String,
                    env: 'DB_HOST',
                    default: null,
                },
                PORT: {
                    doc: 'Database connection port',
                    format: Number,
                    env: 'DB_PORT',
                    default: null,
                },
                NAME: {
                    doc: 'Database name to connect',
                    format: String,
                    env: 'DB_NAME',
                    default: null,
                },
                DIALECT: {
                    doc: 'Database dialect',
                    format: String,
                    env: 'DB_DIALECT',
                    default: null,
                },
                POOL_MIN: {
                    doc: 'Database pool min count',
                    format: Number,
                    env: 'DB_POOL_MIN',
                    default: null,
                },
                POOL_MAX: {
                    doc: 'Database pool max count',
                    format: Number,
                    env: 'DB_POOL_MAX',
                    default: null,
                },
            },
        });
    }
}

export { BaseConfig };
