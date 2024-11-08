import { PencilIcon } from '@heroicons/react/16/solid';
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
import { getFilenameFromUrl } from '~/common/helpers/get-filename-from-url.helper.js';
import {
    useAppDispatch,
    useAppForm,
    useCallback,
} from '~/common/hooks/hooks.js';

import { type EditSuperheroPayload } from './types/types.js';
import { editSuperheroValidationSchema } from './validation-schemas/validation-schemas.js';

type Properties = {
    onSubmit: (payload: SuperheroRequestDto) => void;
    defaultValues: EditSuperheroPayload;
};

const EditSuperheroForm: React.FC<Properties> = ({
    onSubmit,
    defaultValues,
}) => {
    const dispatch = useAppDispatch();

    const {
        control,
        formState: { errors },
        setValue,
        getValues,
        handleSubmit,
        trigger,
    } = useAppForm<EditSuperheroPayload>({
        resolver: zodResolver(editSuperheroValidationSchema),
        defaultValues: defaultValues,
        mode: 'onTouched',
    });

    const handleFormSubmit = useCallback(
        (event_: React.BaseSyntheticEvent): void => {
            void handleSubmit(async (data) => {
                const files = getValues('files');

                const imageFilenames = data.imageUrls.map((url) =>
                    getFilenameFromUrl(url),
                );

                if (files.length > 0) {
                    await dispatch(superheroesActions.uploadImages(files))
                        .unwrap()
                        .then((result) => {
                            const payload = {
                                ...data,
                                imageFilenames: [
                                    ...result.map((image) => image.filename),
                                    ...imageFilenames,
                                ],
                            };
                            onSubmit(payload);
                        });
                }

                if (files.length === 0 && data.imageUrls.length > 0) {
                    const payload = {
                        ...data,
                        imageFilenames: imageFilenames,
                    };
                    onSubmit(payload);
                }

                if (files.length === 0 && data.imageUrls.length === 0) {
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

    const onRemoveImageUrl = useCallback(
        (url: string) => {
            const imageUrls = getValues('imageUrls');
            setValue(
                'imageUrls',
                imageUrls.filter((imageUrl) => imageUrl !== url),
            );
            void trigger('imageUrls');
        },
        [getValues, setValue, trigger],
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
            <ImagePicker
                className="md:col-span-2"
                onUpload={handleUpload}
                imageUrls={getValues('imageUrls')}
                onRemoveImageUrl={onRemoveImageUrl}
            />
            <Button
                label="Edit"
                size={ButtonSize.MEDIUM}
                variant={ButtonVariant.PRIMARY}
                type="submit"
                leftIcon={<PencilIcon className="size-6" />}
                className="mx-auto max-w-[18rem] md:col-span-2"
            />
        </form>
    );
};

export { EditSuperheroForm };
