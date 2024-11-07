import { NavigationItem as NavItemComponent } from './components/components.js';
import { type NavigationItem } from './types/types.js';

type Properties = {
    navigationItems: NavigationItem[];
};

const Header: React.FC<Properties> = ({ navigationItems }) => {
    return (
        <div className="mb-6 grid bg-blue-400 py-4 text-white shadow-lg md:grid-cols-3 md:place-items-center md:justify-items-center">
            <div className="hidden items-center gap-8 md:flex">
                <div className="text-lg font-semibold">Superheroes DB</div>
            </div>
            <div className="flex justify-center gap-12">
                {navigationItems.map((item) => (
                    <NavItemComponent key={item.to} item={item} />
                ))}
            </div>
        </div>
    );
};

export { Header };
