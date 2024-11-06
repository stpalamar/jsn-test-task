import { z } from 'zod';

type SuperheroRequestValidationDto = {
    nickname: z.ZodString;
    realName: z.ZodString;
    originDescription: z.ZodString;
    superpowers: z.ZodString;
    catchPhrase: z.ZodString;
};

const superheroValidationSchema = z.object<SuperheroRequestValidationDto>({
    nickname: z.string().min(1).max(255),
    realName: z.string().min(1).max(255),
    originDescription: z.string().min(1).max(255),
    superpowers: z.string().min(1).max(255),
    catchPhrase: z.string().min(1).max(255),
});

const updateSuperheroValidationSchema = superheroValidationSchema.partial();

export { superheroValidationSchema, updateSuperheroValidationSchema };
