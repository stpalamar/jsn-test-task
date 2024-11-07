import { type AppRoute } from '~/common/enums/enums.js';
import { type ValueOf } from '~/common/types/types.js';

type NavigationItem = {
    to: ValueOf<typeof AppRoute>;
    label: string;
};

export { type NavigationItem };
