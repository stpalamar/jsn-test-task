import { z } from 'zod';

import { superheroValidationSchema } from '~/bundles/superheroes/validation-schemas/validation-schemas.js';

const editSuperheroValidationSchema = superheroValidationSchema
    .omit({ imageFilenames: true })
    .extend({
        imageUrls: z.array(z.string()),
        files: z.array(z.object({})),
    });

export { editSuperheroValidationSchema };
