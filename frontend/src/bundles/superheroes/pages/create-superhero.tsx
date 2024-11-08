import { actions as superheroesActions } from '~/bundles/superheroes/store/superheroes.js';
import {
    useAppDispatch,
    useCallback,
    useNavigate,
} from '~/common/hooks/hooks.js';

import { CreateSuperheroForm } from '../components/components.js';
import { type SuperheroRequestDto } from '../types/types.js';

const CreateSuperHero: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleCreateSuperhero = useCallback(
        async (payload: SuperheroRequestDto): Promise<void> => {
            await dispatch(superheroesActions.createSuperhero(payload))
                .unwrap()
                .then((result) => {
                    navigate(`/superheroes/${result.id}`);
                });
        },
        [dispatch, navigate],
    );

    return (
        <div className="mx-8 flex flex-col lg:items-center">
            <div className="lg:w-[50%]">
                <h2 className="mb-4 text-xl font-bold">
                    Create a new superhero!
                </h2>
                <CreateSuperheroForm onSubmit={handleCreateSuperhero} />
            </div>
        </div>
    );
};

export { CreateSuperHero };
