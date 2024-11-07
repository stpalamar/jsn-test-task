import { actions as superheroesActions } from '~/bundles/superheroes/store/superheroes.js';
import { Link, Loader, Pagination } from '~/common/components/components.js';
import { AppRoute, DataStatus } from '~/common/enums/enums.js';
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

    const { dataStatus, superheroes } = useAppSelector(
        ({ superheroes }) => superheroes,
    );

    const isLoading = dataStatus === DataStatus.PENDING;

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

    if (isLoading) {
        return <Loader isOverflow />;
    }

    return (
        <div className="mx-16 mb-8 flex flex-col gap-8">
            {superheroes && superheroes.items.length > 0 ? (
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
            ) : (
                <div className="flex flex-col items-center gap-4">
                    <p className="text-2xl">No superheroes found</p>
                    <p className="text-xl">
                        Although you can create a new one by clicking{' '}
                        <Link
                            to={AppRoute.CREATE}
                            className="text-blue-500 underline"
                        >
                            here
                        </Link>
                    </p>
                </div>
            )}
        </div>
    );
};

export { SuperheroesList };
