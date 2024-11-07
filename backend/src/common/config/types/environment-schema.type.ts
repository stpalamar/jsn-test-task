import { type AppEnvironment } from '~/common/enums/enums.js';
import { type ValueOf } from '~/common/types/types.js';

type EnvironmentSchema = {
    APP: {
        ENVIRONMENT: ValueOf<typeof AppEnvironment>;
        PORT: number;
        HOST: string;
        BASE_URL: string;
    };
    DB: {
        USERNAME: string;
        PASSWORD: string;
        HOST: string;
        PORT: number;
        NAME: string;
        DIALECT: string;
        POOL_MIN: number;
        POOL_MAX: number;
    };
};

export { type EnvironmentSchema };
