import { type AppEnvironment } from '~/common/enums/enums.js';
import { type ValueOf } from '~/common/types/types.js';

type EnvironmentSchema = {
    APP: {
        ENVIRONMENT: ValueOf<typeof AppEnvironment>;
    };
    API: {
        ORIGIN_URL: string;
    };
};

export { type EnvironmentSchema };
