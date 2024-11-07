import { AppRoute } from '~/common/enums/enums.js';

import { Header, RouterOutlet } from '../components.js';
import { type NavigationItem } from '../header/types/types.js';

type Properties = {
    children?: React.ReactNode;
};

const navigationItems: NavigationItem[] = [
    {
        to: AppRoute.ROOT,
        label: 'Home',
    },
    {
        to: AppRoute.SUPERHEROES,
        label: 'List',
    },
    {
        to: AppRoute.CREATE,
        label: 'Create',
    },
];

const BaseLayout: React.FC<Properties> = () => {
    return (
        <div className="flex min-h-screen flex-grow flex-col">
            <Header navigationItems={navigationItems} />
            <div>
                <RouterOutlet />
            </div>
        </div>
    );
};

export { BaseLayout };
