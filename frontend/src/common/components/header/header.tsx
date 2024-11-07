import { Bars3Icon } from '@heroicons/react/24/solid';

import { NavigationItem as NavItemComponent } from './components/components.js';
import { type NavigationItem } from './types/types.js';

type Properties = {
    navigationItems: NavigationItem[];
};

const Header: React.FC<Properties> = ({ navigationItems }) => {
    return (
        <div className="mb-6 grid bg-blue-400 py-4 text-white shadow-lg md:grid-cols-3 md:place-items-center md:justify-items-center">
            <div className="flex items-center gap-8">
                <div className="md:hidden">
                    <Bars3Icon className="ml-4 h-6 w-6" />
                </div>
                <div className="text-lg font-semibold">Superheroes DB</div>
            </div>
            <div className="hidden gap-12 md:flex">
                {navigationItems.map((item) => (
                    <NavItemComponent key={item.to} item={item} />
                ))}
            </div>
        </div>
    );
};

export { Header };
