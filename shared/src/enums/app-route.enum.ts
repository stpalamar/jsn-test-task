const AppRoute = {
    ROOT: '/',
    SUPERHEROES: '/superheroes',
    SUPERHERO: '/superheroes/:id',
    CREATE: '/superheroes/create',
    EDIT: '/superheroes/edit/:id',
} as const;

export { AppRoute };
