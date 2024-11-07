type DefaultApiHandlerOptions = {
    body?: unknown;
    file?: unknown;
    query?: unknown;
    params?: unknown;
    origin?: unknown;
};

type ApiHandlerOptions<
    T extends DefaultApiHandlerOptions = DefaultApiHandlerOptions,
> = {
    body: T['body'];
    file: T['file'];
    query: T['query'];
    params: T['params'];
    origin: T['origin'];
};

export { type ApiHandlerOptions };
