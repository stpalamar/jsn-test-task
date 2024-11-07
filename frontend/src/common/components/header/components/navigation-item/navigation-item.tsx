import { Link } from '~/common/components/components.js';
import { type NavigationItem } from '~/common/components/header/types/types.js';

type Properties = {
    item: NavigationItem;
};

const NavigationItem: React.FC<Properties> = ({ item }) => {
    const { to, label } = item;

    return (
        <Link to={to} className="font-semibold uppercase hover:text-gray-200">
            {label}
        </Link>
    );
};

export { NavigationItem };
