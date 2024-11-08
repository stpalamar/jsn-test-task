type DefaultApiHandlerOptions = {
    body?: unknown;
    files?: unknown;
    query?: unknown;
    params?: unknown;
    origin?: unknown;
};

type ApiHandlerOptions<
    T extends DefaultApiHandlerOptions = DefaultApiHandlerOptions,
> = {
    body: T['body'];
    files: T['files'];
    query: T['query'];
    params: T['params'];
    origin: T['origin'];
};

export { type ApiHandlerOptions };
