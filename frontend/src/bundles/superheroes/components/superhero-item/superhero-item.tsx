import { type SuperheroResponseDto } from '~/bundles/superheroes/types/types.js';
import { AppRoute } from '~/common/enums/enums.js';
import { useCallback, useNavigate } from '~/common/hooks/hooks.js';

type Properties = {
    superhero: SuperheroResponseDto;
};

const SuperheroItem: React.FC<Properties> = ({ superhero }) => {
    const { nickname, imageUrls, id } = superhero;
    const navigate = useNavigate();

    const firstLetter = nickname.charAt(0).toUpperCase();

    const handleClick = useCallback(() => {
        navigate(AppRoute.SUPERHERO.replace(':id', id.toString()));
    }, [navigate, id]);

    const handleKeyDown = useCallback(
        (event: React.KeyboardEvent) => {
            if (event.key === 'Enter') {
                handleClick();
            }
        },
        [handleClick],
    );

    return (
        <div
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            role="button"
            tabIndex={0}
            className="duration-400 cursor-pointer flex-col rounded-2xl border-4 border-blue-500 text-center shadow-xl transition ease-in-out hover:border-blue-900"
        >
            <div className="h-[80%]">
                {imageUrls.length > 0 ? (
                    <img
                        src={imageUrls[0]}
                        className="h-full w-full rounded-t-xl border-b-2 border-blue-500 object-cover"
                        alt={nickname}
                    />
                ) : (
                    <img
                        src={`https://placehold.co/300x400?text=${firstLetter}`}
                        className="h-full w-full rounded-t-xl border-b-2 border-blue-500 object-cover"
                        alt={nickname}
                    />
                )}
            </div>
            <h3 className="my-4 text-2xl font-semibold text-blue-900">
                {nickname}
            </h3>
        </div>
    );
};

export { SuperheroItem };
