import { getValidClassNames } from '~/common/helpers/helpers.js';
import { type ValueOf } from '~/common/types/types.js';

import { ButtonSize, ButtonVariant } from './enums/enums.js';

type ButtonType = 'button' | 'submit';

type Properties = {
    label: string;
    size: ValueOf<typeof ButtonSize>;
    variant: ValueOf<typeof ButtonVariant>;
    type: ButtonType;
    className?: string;
    isDisabled?: boolean;
    leftIcon?: React.ReactNode;
    onClick?: () => void | Promise<void>;
};

const Button: React.FC<Properties> = ({
    label,
    size,
    variant,
    type,
    className,
    isDisabled,
    leftIcon,
    onClick,
}) => {
    const baseCLasses =
        'flex w-full justify-center font-bold rounded-md transition ease-in-out duration-300 items-center';

    const buttonVariantToClasses: Record<
        ValueOf<typeof ButtonVariant>,
        string
    > = {
        [ButtonVariant.PRIMARY]: 'bg-blue-500 text-white hover:bg-blue-600',
        [ButtonVariant.DANGER]: 'bg-red-500 text-white hover:bg-red-600',
        [ButtonVariant.SUCCESS]: 'bg-green-500 text-white hover:bg-green-600',
    };

    const buttonSizesToClasses: Record<ValueOf<typeof ButtonSize>, string> = {
        [ButtonSize.SMALL]: 'px-4 py-2 text-sm gap-1',
        [ButtonSize.MEDIUM]: 'px-6 py-3 text-base gap-2',
        [ButtonSize.LARGE]: 'px-8 py-4 text-lg gap-3',
        [ButtonSize.ICON]: 'p-2',
    };

    return (
        <button
            type={type}
            disabled={isDisabled}
            className={getValidClassNames(
                baseCLasses,
                buttonSizesToClasses[size],
                buttonVariantToClasses[variant],
                className,
            )}
            onClick={onClick}
        >
            {leftIcon}
            {label}
        </button>
    );
};

export { Button };
export { ButtonSize, ButtonVariant } from './enums/enums.js';
