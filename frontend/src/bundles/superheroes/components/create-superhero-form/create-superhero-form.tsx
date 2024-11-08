import { PencilIcon } from '@heroicons/react/16/solid';
import { PlusIcon } from '@heroicons/react/24/solid';
import { zodResolver } from '@hookform/resolvers/zod';

import { actions as superheroesActions } from '~/bundles/superheroes/store/superheroes.js';
import { type SuperheroRequestDto } from '~/bundles/superheroes/types/types.js';
import {
    Button,
    ButtonSize,
    ButtonVariant,
    ImagePicker,
    Input,
} from '~/common/components/components.js';
import {
    useAppDispatch,
    useAppForm,
    useCallback,
} from '~/common/hooks/hooks.js';

import { DEFAULT_CREATE_SUPERHERO_PAYLOAD } from './constants/constants.js';
import { type CreateSuperheroPayload } from './types/types.js';
import { createSuperheroValidationSchema } from './validation-schemas/validation-schemas.js';

type Properties = {
    onSubmit: (payload: SuperheroRequestDto) => void;
    isEdit?: boolean;
    defaultValues?: CreateSuperheroPayload;
};

const CreateSuperheroForm: React.FC<Properties> = ({
    onSubmit,
    isEdit,
    defaultValues,
}) => {
    const dispatch = useAppDispatch();

    const {
        control,
        formState: { errors },
        setValue,
        getValues,
        handleSubmit,
    } = useAppForm<CreateSuperheroPayload>({
        resolver: zodResolver(createSuperheroValidationSchema),
        defaultValues: defaultValues ?? DEFAULT_CREATE_SUPERHERO_PAYLOAD,
        mode: 'onTouched',
    });

    const handleFormSubmit = useCallback(
        (event_: React.BaseSyntheticEvent): void => {
            void handleSubmit(async (data) => {
                const files = getValues('files');
                if (files.length > 0) {
                    await dispatch(superheroesActions.uploadImages(files))
                        .unwrap()
                        .then((result) => {
                            const payload = {
                                ...data,
                                imageFilenames: result.map(
                                    (image) => image.filename,
                                ),
                            };
                            onSubmit(payload);
                        });
                }

                if (files.length === 0) {
                    const payload = {
                        ...data,
                        imageFilenames: [],
                    };
                    onSubmit(payload);
                }
            })(event_);
        },
        [handleSubmit, onSubmit, dispatch, getValues],
    );

    const handleUpload = useCallback(
        (files: File[]) => {
            setValue('files', files);
        },
        [setValue],
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
            <ImagePicker className="md:col-span-2" onUpload={handleUpload} />
            <Button
                label={isEdit ? 'Edit' : 'Create new'}
                size={ButtonSize.MEDIUM}
                variant={ButtonVariant.PRIMARY}
                type="submit"
                leftIcon={
                    isEdit ? (
                        <PencilIcon className="size-6" />
                    ) : (
                        <PlusIcon className="size-6" />
                    )
                }
                className="mx-auto max-w-[18rem] md:col-span-2"
            />
        </form>
    );
};

export { CreateSuperheroForm };
