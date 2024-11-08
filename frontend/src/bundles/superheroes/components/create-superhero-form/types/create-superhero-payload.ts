import { type SuperheroRequestDto } from '~/bundles/superheroes/types/types.js';

type CreateSuperheroPayload = Omit<SuperheroRequestDto, 'imageFilenames'> & {
    files: File[];
};

export { type CreateSuperheroPayload };
