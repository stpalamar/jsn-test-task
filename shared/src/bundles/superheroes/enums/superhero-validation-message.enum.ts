import { SuperheroValidationRule } from './superhero-validation-rule.enum.js';

const SuperheroValidationMessage = {
    NICKNAME: {
        MIN_LENGTH: `Nickname should have at least ${SuperheroValidationRule.NICKNAME.MIN_LENGTH} characters`,
        MAX_LENGTH: `Nickname should have at most ${SuperheroValidationRule.NICKNAME.MAX_LENGTH} characters`,
    },
    REALNAME: {
        MIN_LENGTH: `Real name should have at least ${SuperheroValidationRule.REALNAME.MIN_LENGTH} characters`,
        MAX_LENGTH: `Real name should have at most ${SuperheroValidationRule.REALNAME.MAX_LENGTH} characters`,
    },
    ORIGIN_DESCRIPTION: {
        MIN_LENGTH: `Origin description should have at least ${SuperheroValidationRule.ORIGIN_DESCRIPTION.MIN_LENGTH} characters`,
        MAX_LENGTH: `Origin description should have at most ${SuperheroValidationRule.ORIGIN_DESCRIPTION.MAX_LENGTH} characters`,
    },
    SUPERPOWERS: {
        MIN_LENGTH: `Superpowers should have at least ${SuperheroValidationRule.SUPERPOWERS.MIN_LENGTH} characters`,
        MAX_LENGTH: `Superpowers should have at most ${SuperheroValidationRule.SUPERPOWERS.MAX_LENGTH} characters`,
    },
    CATCH_PHRASE: {
        MIN_LENGTH: `Catch phrase should have at least ${SuperheroValidationRule.CATCH_PHRASE.MIN_LENGTH} characters`,
        MAX_LENGTH: `Catch phrase should have at most ${SuperheroValidationRule.CATCH_PHRASE.MAX_LENGTH} characters`,
    },
} as const;

export { SuperheroValidationMessage };
