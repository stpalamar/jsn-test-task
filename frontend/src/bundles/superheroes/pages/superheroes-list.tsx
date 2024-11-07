import { actions as superheroesActions } from '~/bundles/superheroes/store/superheroes.js';
import {
    useAppDispatch,
    useAppSelector,
    useEffect,
} from '~/common/hooks/hooks.js';

const SuperheroesList: React.FC = () => {
    const dispatch = useAppDispatch();

    const { superheroes } = useAppSelector(({ superheroes }) => superheroes);

    useEffect(() => {
        void dispatch(
            superheroesActions.getSuperheroes({
                page: 1,
                limit: 5,
            }),
        );
    }, [dispatch]);

    return (
        <div>
            {superheroes &&
                superheroes.items.map((superhero) => (
                    <div key={superhero.id}>
                        <h1>{superhero.nickname}</h1>
                    </div>
                ))}
        </div>
    );
};

export { SuperheroesList };
