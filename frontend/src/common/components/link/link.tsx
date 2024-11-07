import { NavLink } from 'react-router-dom';

import { type AppRoute } from '~/common/enums/enums.js';
import { getValidClassNames } from '~/common/helpers/helpers.js';
import { type ValueOf } from '~/common/types/types.js';

type Properties = {
    to: ValueOf<typeof AppRoute>;
    children: React.ReactNode;
    className?: string;
};

const Link: React.FC<Properties> = ({ children, to, className }) => (
    <NavLink to={to} className={getValidClassNames(className)}>
        {children}
    </NavLink>
);

export { Link };
