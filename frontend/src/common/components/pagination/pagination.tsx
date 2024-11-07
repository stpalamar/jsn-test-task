import {
    ChevronDoubleLeftIcon,
    ChevronDoubleRightIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
} from '@heroicons/react/16/solid';

import { Button, ButtonSize, ButtonVariant } from '../components.js';

type Properties = {
    page: number;
    totalPages: number;
    onPageChange: (page: number) => void;
};

const Pagination: React.FC<Properties> = ({
    page,
    totalPages,
    onPageChange,
}) => {
    const isPreviosPage = page === 1;
    const isNextPage = page !== totalPages;
    const isTwoPagesAfter = page < totalPages - 1;

    const middleButtonStyle =
        'h-12 min-w-12 rounded-none border-r-2 border-blue-200';

    return (
        <div className="flex">
            <Button
                label=""
                onClick={() => onPageChange(1)}
                size={ButtonSize.ICON}
                leftIcon={<ChevronDoubleLeftIcon className="size-6" />}
                variant={ButtonVariant.PRIMARY}
                className="h-12 min-w-12 rounded-r-none border-r-2 border-blue-200"
                isDisabled={page === 1}
            />
            <Button
                label=""
                onClick={() => onPageChange(page - 1)}
                size={ButtonSize.ICON}
                leftIcon={<ChevronLeftIcon className="size-6" />}
                variant={ButtonVariant.PRIMARY}
                className={middleButtonStyle}
                isDisabled={page === 1}
            />

            {page === totalPages && (
                <Button
                    label={String(page - 2)}
                    onClick={() => onPageChange(page - 2)}
                    size={ButtonSize.ICON}
                    variant={ButtonVariant.PRIMARY}
                    className={middleButtonStyle}
                />
            )}

            {!isPreviosPage && (
                <Button
                    label={String(page - 1)}
                    onClick={() => onPageChange(page - 1)}
                    size={ButtonSize.ICON}
                    variant={ButtonVariant.PRIMARY}
                    className={middleButtonStyle}
                />
            )}
            <Button
                label={String(page)}
                onClick={() => onPageChange(page - 1)}
                size={ButtonSize.ICON}
                variant={ButtonVariant.PRIMARY}
                className="h-12 min-w-12 rounded-none border-r-2 border-blue-200 p-4"
                isDisabled={true}
            />

            {isNextPage && (
                <Button
                    label={String(page + 1)}
                    onClick={() => onPageChange(page + 1)}
                    size={ButtonSize.ICON}
                    variant={ButtonVariant.PRIMARY}
                    className={middleButtonStyle}
                    isDisabled={page === totalPages}
                />
            )}

            {isTwoPagesAfter && page === 1 && (
                <Button
                    label={String(page + 2)}
                    onClick={() => onPageChange(page + 2)}
                    size={ButtonSize.ICON}
                    variant={ButtonVariant.PRIMARY}
                    className={middleButtonStyle}
                />
            )}

            <Button
                label=""
                onClick={() => onPageChange(page + 1)}
                size={ButtonSize.ICON}
                leftIcon={<ChevronRightIcon className="size-6" />}
                variant={ButtonVariant.PRIMARY}
                className={middleButtonStyle}
                isDisabled={page === totalPages}
            />
            <Button
                label=""
                onClick={() => onPageChange(totalPages)}
                size={ButtonSize.ICON}
                leftIcon={<ChevronDoubleRightIcon className="size-6" />}
                variant={ButtonVariant.PRIMARY}
                className="rounde h-12 min-w-12 rounded-l-none"
                isDisabled={page === totalPages}
            />
        </div>
    );
};

export { Pagination };
