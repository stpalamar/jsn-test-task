import { type SuperheroResponseDto } from '~/bundles/superheroes/types/types.js';

type Properties = {
    superhero: SuperheroResponseDto;
};

const SuperheroItem: React.FC<Properties> = ({ superhero }) => {
    const { nickname, imageUrls } = superhero;

    const firstLetter = nickname.charAt(0).toUpperCase();

    return (
        <div className="duration-400 cursor-pointer flex-col rounded-2xl border-4 border-blue-500 text-center shadow-xl transition ease-in-out hover:border-blue-900">
            <div>
                {imageUrls.length > 0 ? (
                    <img
                        src={imageUrls[0]}
                        className="h-full w-full rounded-t-2xl border-b-2 border-blue-500"
                        alt={nickname}
                    />
                ) : (
                    <img
                        src={`https://placehold.co/300x400?text=${firstLetter}`}
                        className="h-full w-full rounded-t-2xl border-b-2 border-blue-500"
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
