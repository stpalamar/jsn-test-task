import { useCallback } from '~/common/hooks/hooks.js';

import { CreateSuperheroForm } from '../components/components.js';
import { type SuperheroRequestDto } from '../types/types.js';

const CreateSuperHero: React.FC = () => {
    const handleCreateSuperhero = useCallback(
        (_payload: SuperheroRequestDto): void => {},
        [],
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
