import { z } from 'zod';

import { superheroValidationSchema } from '~/bundles/superheroes/validation-schemas/validation-schemas.js';

const createSuperheroValidationSchema = superheroValidationSchema
    .omit({
        imageFilenames: true,
    })
    .extend({
        files: z.array(z.object({})),
    });

export { createSuperheroValidationSchema };
