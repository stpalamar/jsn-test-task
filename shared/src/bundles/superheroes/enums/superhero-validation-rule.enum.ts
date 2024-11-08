const SuperheroValidationRule = {
    NICKNAME: {
        MIN_LENGTH: 2,
        MAX_LENGTH: 80,
    },
    REALNAME: {
        MIN_LENGTH: 2,
        MAX_LENGTH: 80,
    },
    ORIGIN_DESCRIPTION: {
        MIN_LENGTH: 3,
        MAX_LENGTH: 1000,
    },
    SUPERPOWERS: {
        MIN_LENGTH: 3,
        MAX_LENGTH: 250,
    },
    CATCH_PHRASE: {
        MIN_LENGTH: 3,
        MAX_LENGTH: 250,
    },
} as const;

export { SuperheroValidationRule };
