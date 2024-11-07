import { z } from 'zod';

import {
    SuperheroValidationMessage,
    SuperheroValidationRule,
} from '../enums/enums.js';

type SuperheroRequestValidationDto = {
    nickname: z.ZodString;
    realName: z.ZodString;
    originDescription: z.ZodString;
    superpowers: z.ZodString;
    catchPhrase: z.ZodString;
    imageFilenames: z.ZodArray<z.ZodString>;
};

const superheroValidationSchema = z.object<SuperheroRequestValidationDto>({
    nickname: z
        .string()
        .min(
            SuperheroValidationRule.NICKNAME.MIN_LENGTH,
            SuperheroValidationMessage.NICKNAME.MIN_LENGTH,
        )
        .max(
            SuperheroValidationRule.NICKNAME.MAX_LENGTH,
            SuperheroValidationMessage.NICKNAME.MAX_LENGTH,
        ),
    realName: z
        .string()
        .min(
            SuperheroValidationRule.REALNAME.MIN_LENGTH,
            SuperheroValidationMessage.REALNAME.MIN_LENGTH,
        )
        .max(
            SuperheroValidationRule.REALNAME.MAX_LENGTH,
            SuperheroValidationMessage.REALNAME.MAX_LENGTH,
        ),
    originDescription: z
        .string()
        .min(
            SuperheroValidationRule.ORIGIN_DESCRIPTION.MIN_LENGTH,
            SuperheroValidationMessage.ORIGIN_DESCRIPTION.MIN_LENGTH,
        )
        .max(
            SuperheroValidationRule.ORIGIN_DESCRIPTION.MAX_LENGTH,
            SuperheroValidationMessage.ORIGIN_DESCRIPTION.MAX_LENGTH,
        ),
    superpowers: z
        .string()
        .min(
            SuperheroValidationRule.SUPERPOWERS.MIN_LENGTH,
            SuperheroValidationMessage.SUPERPOWERS.MIN_LENGTH,
        )
        .max(
            SuperheroValidationRule.SUPERPOWERS.MAX_LENGTH,
            SuperheroValidationMessage.SUPERPOWERS.MAX_LENGTH,
        ),
    catchPhrase: z
        .string()
        .min(
            SuperheroValidationRule.CATCH_PHRASE.MIN_LENGTH,
            SuperheroValidationMessage.CATCH_PHRASE.MIN_LENGTH,
        )
        .max(
            SuperheroValidationRule.CATCH_PHRASE.MAX_LENGTH,
            SuperheroValidationMessage.CATCH_PHRASE.MAX_LENGTH,
        ),
    imageFilenames: z.array(z.string()),
});

const updateSuperheroValidationSchema = superheroValidationSchema.partial();

export { superheroValidationSchema, updateSuperheroValidationSchema };
