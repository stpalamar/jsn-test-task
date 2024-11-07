import { actions as superheroesActions } from '~/bundles/superheroes/store/superheroes.js';
import { Pagination } from '~/common/components/components.js';
import {
    useAppDispatch,
    useAppSelector,
    useCallback,
    useEffect,
    useSearchParams,
    useState,
} from '~/common/hooks/hooks.js';

import { SuperheroItem } from '../components/components.js';

const SuperheroesList: React.FC = () => {
    const dispatch = useAppDispatch();

    const [searchParameters, setSearchParameters] = useSearchParams();
    const [page, setPage] = useState(Number(searchParameters.get('page')) || 1);
    const [limit] = useState('5');

    const { superheroes } = useAppSelector(({ superheroes }) => superheroes);

    useEffect(() => {
        void dispatch(
            superheroesActions.getSuperheroes({
                page: Number(page),
                limit: Number(limit),
            }),
        );
    }, [dispatch, page, limit]);

    const handlePageChange = useCallback(
        (page: number): void => {
            setPage(page);
            setSearchParameters({ page: String(page) });
        },
        [setPage, setSearchParameters],
    );

    return (
        <div className="mx-16 mb-8 flex flex-col gap-8">
            {superheroes && (
                <>
                    <div className="grid gap-y-16 md:grid-cols-2 md:gap-x-32 md:gap-y-24 lg:grid-cols-3 lg:gap-x-36 lg:gap-y-28 xl:gap-x-48 xl:gap-y-36">
                        {superheroes.items.map((superhero) => (
                            <SuperheroItem
                                key={superhero.id}
                                superhero={superhero}
                            />
                        ))}
                    </div>
                    <div className="flex justify-center">
                        <Pagination
                            onPageChange={handlePageChange}
                            page={page}
                            totalPages={superheroes.totalPages}
                        />
                    </div>
                </>
            )}
        </div>
    );
};

export { SuperheroesList };
