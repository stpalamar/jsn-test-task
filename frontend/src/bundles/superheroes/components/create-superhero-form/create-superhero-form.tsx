import { PlusIcon } from '@heroicons/react/24/solid';
import { zodResolver } from '@hookform/resolvers/zod';

import { type SuperheroRequestDto } from '~/bundles/superheroes/types/types.js';
import { superheroValidationSchema } from '~/bundles/superheroes/validation-schemas/validation-schemas.js';
import {
    Button,
    ButtonSize,
    ButtonVariant,
    ImagePicker,
    Input,
} from '~/common/components/components.js';
import { useAppForm, useCallback } from '~/common/hooks/hooks.js';

import { DEFAULT_CREATE_SUPERHERO_PAYLOAD } from './constants/constants.js';

type Properties = {
    onSubmit: (payload: SuperheroRequestDto) => void;
};

const CreateSuperheroForm: React.FC<Properties> = ({ onSubmit }) => {
    const {
        control,
        formState: { errors },
        handleSubmit,
    } = useAppForm<SuperheroRequestDto>({
        resolver: zodResolver(superheroValidationSchema),
        defaultValues: DEFAULT_CREATE_SUPERHERO_PAYLOAD,
        mode: 'onTouched',
    });

    const handleFormSubmit = useCallback(
        (event_: React.BaseSyntheticEvent): void => {
            void handleSubmit(onSubmit)(event_);
        },
        [handleSubmit, onSubmit],
    );

    return (
        <form
            onSubmit={handleFormSubmit}
            className="mb-4 grid grid-cols-1 gap-x-4 gap-y-6 md:grid-cols-2"
        >
            <Input
                name="nickname"
                label="Nickname"
                placeholder="Enter nickname"
                control={control}
                errors={errors}
            />
            <Input
                name="realName"
                label="Real name"
                placeholder="Enter real name"
                control={control}
                errors={errors}
            />

            <Input
                name="superpowers"
                label="Superpowers"
                placeholder="Enter superpowers"
                control={control}
                errors={errors}
            />
            <Input
                name="catchPhrase"
                label="Catch phrase"
                placeholder="Enter catch phrase"
                control={control}
                errors={errors}
            />
            <Input
                name="originDescription"
                label="Origin description"
                placeholder="Enter origin description"
                control={control}
                errors={errors}
                rows={4}
                className="md:col-span-2"
            />
            <ImagePicker className="md:col-span-2" />
            <Button
                label="Create new"
                size={ButtonSize.MEDIUM}
                variant={ButtonVariant.PRIMARY}
                type="submit"
                leftIcon={<PlusIcon className="size-6" />}
                className="mx-auto max-w-[18rem] md:col-span-2"
            />
        </form>
    );
};

export { CreateSuperheroForm };
