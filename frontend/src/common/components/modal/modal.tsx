import { XMarkIcon } from '@heroicons/react/16/solid';

import { getValidClassNames } from '~/common/helpers/helpers.js';
import { useMemo } from '~/common/hooks/hooks.js';

type Properties = {
    isOpen: boolean;
    title: string;
    onClose: () => void;
    children?: React.ReactNode;
};

const Modal: React.FC<Properties> = ({ isOpen, title, onClose, children }) => {
    const onBackdropClick = useMemo(
        () => (event: React.MouseEvent<HTMLDivElement>) => {
            if (event.target === event.currentTarget) {
                onClose();
            }
        },
        [onClose],
    );

    const classes = {
        overlayClass: getValidClassNames(
            'overlay bg-black/[.6] fixed inset-0 z-50',
            isOpen ? 'opacity-1' : 'opacity-0 pointer-events-none',
        ),
        contentClass:
            'mx-auto max-h-[95%] bg-white rounded-xl fixed left-1/2 top-1/2 z-50 flex -translate-x-1/2 -translate-y-1/2 flex-col items-start justify-center px-8 md:px-12 py-8 shadow-md transition-all',
        closeIconClass:
            'fill-gray-500 hover:stroke-blue-400 absolute right-8 top-8 h-5 w-5 cursor-pointer transition-all ',
        titleClass:
            'mb-8 text-left text-md md:text-[1.875rem] font-bold text-card',
    };

    return (
        <div
            className={getValidClassNames(classes.overlayClass)}
            onClick={onBackdropClick}
            role="presentation"
        >
            <div className={getValidClassNames(classes.contentClass)}>
                <XMarkIcon
                    onClick={onClose}
                    className={getValidClassNames(classes.closeIconClass)}
                />
                <div className="w-full overflow-y-auto">
                    <h3 className={getValidClassNames(classes.titleClass)}>
                        {title}
                    </h3>

                    {children}
                </div>
            </div>
        </div>
    );
};

export { Modal };
