const HttpCode = {
    OK: 200,
    CREATED: 201,
    NOT_FOUND: 404,
    BAD_REQUEST: 400,
    UNPROCESSED_CONTENT: 422,
    INTERNAL_SERVER_ERROR: 500,
} as const;

export { HttpCode };
