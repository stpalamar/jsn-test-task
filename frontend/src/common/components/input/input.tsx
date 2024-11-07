import { getValidClassNames } from '~/common/helpers/helpers.js';
import { useFormController } from '~/common/hooks/hooks.js';
import {
    type Control,
    type FieldErrors,
    type FieldPath,
    type FieldValues,
} from '~/common/types/types.js';

type Properties<T extends FieldValues> = {
    className?: string;
    control: Control<T, null>;
    errors: FieldErrors<T>;
    label?: string;
    name: FieldPath<T>;
    placeholder?: string;
    required?: boolean;
    rows?: number;
};

const Input = <T extends FieldValues>({
    className,
    control,
    errors,
    label,
    name,
    placeholder,
    rows,
}: Properties<T>): JSX.Element => {
    const { field } = useFormController({ name, control });

    const error = errors[name]?.message;
    const hasError = Boolean(error);
    const isTextArea = Boolean(rows);

    const inputStyles = getValidClassNames(
        'border-2 border-gray-400 rounded-md p-2 w-full',
        hasError && 'border-red-500',
    );

    const textAreaStyles = getValidClassNames(
        'border-2 border-gray-400 rounded-md p-2 resize-none w-full',
        hasError && 'border-red-500',
    );

    return (
        <label
            className={getValidClassNames(
                className,
                'flex w-full flex-col text-black',
            )}
        >
            <span>{label}</span>
            <div>
                {isTextArea ? (
                    <textarea
                        {...field}
                        className={textAreaStyles}
                        placeholder={placeholder}
                        rows={rows}
                        autoComplete="off"
                    />
                ) : (
                    <input
                        {...field}
                        className={inputStyles}
                        placeholder={placeholder}
                        autoComplete="off"
                    />
                )}
            </div>
            {hasError && (
                <span className="text-rose-600">{error as string}</span>
            )}
        </label>
    );
};

export { Input };
