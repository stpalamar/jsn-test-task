import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid';

import { actions as superheroesActions } from '~/bundles/superheroes/store/superheroes.js';
import {
    Button,
    ButtonSize,
    ButtonVariant,
    ImageCarousel,
    Loader,
    Modal,
} from '~/common/components/components.js';
import { AppRoute, DataStatus } from '~/common/enums/enums.js';
import {
    useAppDispatch,
    useAppSelector,
    useCallback,
    useEffect,
    useNavigate,
    useParams,
    useState,
} from '~/common/hooks/hooks.js';
import { notificationManager } from '~/framework/notification/notification.js';

const SuperheroDetails: React.FC = () => {
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const { superhero, dataStatus } = useAppSelector(
        ({ superheroes }) => superheroes,
    );

    useEffect(() => {
        if (!id || Number.isNaN(Number(id))) {
            navigate(AppRoute.ROOT);
            return;
        }

        void dispatch(superheroesActions.getSuperheroById(Number(id)));
    }, [id, dispatch, navigate]);

    if (dataStatus === DataStatus.REJECTED) {
        navigate(AppRoute.ROOT);
    }

    const handleOpenDeleteModal = useCallback(() => {
        setIsDeleteModalOpen(true);
    }, []);

    const handleCloseDeleteModal = useCallback(() => {
        setIsDeleteModalOpen(false);
    }, []);

    const handleDeleteSuperhero = useCallback(async () => {
        await dispatch(superheroesActions.deleteSuperhero(Number(id)))
            .unwrap()
            .then((deleted) => {
                if (deleted) {
                    notificationManager.success('Superhero has been deleted');
                }
            });
        setIsDeleteModalOpen(false);
        navigate(AppRoute.ROOT);
    }, [dispatch, id, navigate]);

    const handleClickEdit = useCallback(() => {
        if (id && !Number.isNaN(Number(id))) {
            navigate(AppRoute.EDIT.replace(':id', id));
        }
    }, [id, navigate]);

    const propertyStyle = 'text-gray-500 font-semibold';
    const valueStyle = 'text-lg max-w-[32rem]';

    const firstLetter = superhero && superhero.nickname.charAt(0).toUpperCase();

    if (dataStatus === DataStatus.PENDING) {
        return <Loader isOverflow />;
    }

    return (
        <div className="mx-8 xl:mx-24">
            {superhero && (
                <div className="flex flex-col gap-8 md:flex-row">
                    <div className="flex items-center justify-center md:w-[50%]">
                        <div className="max-w-[44rem]">
                            {superhero.imageUrls.length > 0 ? (
                                <ImageCarousel images={superhero.imageUrls} />
                            ) : (
                                <img
                                    src={`https://placehold.co/600x400?text=${firstLetter}`}
                                    className="h-full w-full rounded-md"
                                    alt={superhero.nickname}
                                />
                            )}
                        </div>
                    </div>
                    <div className="flex justify-center md:w-[50%]">
                        <div className="grid gap-y-8">
                            <div>
                                <p className={propertyStyle}>Nickname:</p>
                                <p className={valueStyle}>
                                    {superhero.nickname}
                                </p>
                            </div>
                            <div>
                                <p className={propertyStyle}>Real name:</p>
                                <p className={valueStyle}>
                                    {superhero.realName}
                                </p>
                            </div>
                            <div>
                                <p className={propertyStyle}>
                                    Origin description:
                                </p>
                                <p className={valueStyle}>
                                    {superhero.originDescription}
                                </p>
                            </div>
                            <div>
                                <p className={propertyStyle}>Superpowers:</p>
                                <p className={valueStyle}>
                                    {superhero.superpowers}
                                </p>
                            </div>
                            <div>
                                <p className={propertyStyle}>Catch phrase:</p>
                                <p className={valueStyle}>
                                    {superhero.catchPhrase}
                                </p>
                            </div>
                            <div className="flex justify-center gap-4">
                                <Button
                                    label="Edit"
                                    variant={ButtonVariant.PRIMARY}
                                    size={ButtonSize.MEDIUM}
                                    leftIcon={<PencilIcon className="size-6" />}
                                    className="max-w-[10rem]"
                                    onClick={handleClickEdit}
                                />
                                <Button
                                    label="Delete"
                                    variant={ButtonVariant.DANGER}
                                    size={ButtonSize.MEDIUM}
                                    leftIcon={<TrashIcon className="size-6" />}
                                    className="max-w-[10rem]"
                                    onClick={handleOpenDeleteModal}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <Modal
                onClose={handleCloseDeleteModal}
                isOpen={isDeleteModalOpen}
                title="Are you sure you want to delete this superhero?"
            >
                <div className="flex justify-evenly gap-4">
                    <Button
                        label="Cancel"
                        variant={ButtonVariant.PRIMARY}
                        size={ButtonSize.MEDIUM}
                        onClick={handleCloseDeleteModal}
                        className="max-w-[12rem]"
                    />
                    <Button
                        label="Delete"
                        variant={ButtonVariant.DANGER}
                        size={ButtonSize.MEDIUM}
                        className="max-w-[12rem]"
                        onClick={handleDeleteSuperhero}
                    />
                </div>
            </Modal>
        </div>
    );
};

export { SuperheroDetails };
