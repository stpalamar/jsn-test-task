import { type SuperheroRequestDto } from '~/bundles/superheroes/types/types.js';

type EditSuperheroPayload = Omit<SuperheroRequestDto, 'imageFilenames'> & {
    imageUrls: string[];
    files: File[];
};

export { type EditSuperheroPayload };
