import { actions as superheroesActions } from '~/bundles/superheroes/store/superheroes.js';
import { Loader } from '~/common/components/components.js';
import { AppRoute, DataStatus } from '~/common/enums/enums.js';
import {
    useAppDispatch,
    useAppSelector,
    useCallback,
    useEffect,
    useNavigate,
    useParams,
} from '~/common/hooks/hooks.js';

import { CreateSuperheroForm } from '../components/components.js';
import { type SuperheroRequestDto } from '../types/types.js';

const EditSuperHero: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

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

    const handleEditSuperhero = useCallback(
        async (payload: SuperheroRequestDto): Promise<void> => {
            await dispatch(
                superheroesActions.updateSuperhero({ id: Number(id), payload }),
            )
                .unwrap()
                .then((result) => {
                    navigate(
                        AppRoute.SUPERHERO.replace(':id', result.id.toString()),
                    );
                });
        },
        [dispatch, navigate, id],
    );

    if (dataStatus === DataStatus.PENDING) {
        return <Loader isOverflow />;
    }

    return (
        <div className="mx-8 flex flex-col lg:items-center">
            {superhero && (
                <div className="lg:w-[50%]">
                    <h2 className="mb-4 text-xl font-bold">
                        Edit the superhero!
                    </h2>

                    <CreateSuperheroForm
                        onSubmit={handleEditSuperhero}
                        isEdit
                        defaultValues={{ ...superhero, files: [] }}
                    />
                </div>
            )}
        </div>
    );
};

export { EditSuperHero };
