import {
    type ThunkMiddleware,
    Tuple,
    type UnknownAction,
} from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';

import { reducer as superheroesReducer } from '~/bundles/superheroes/store/superheroes.js';
import { superheroesApi } from '~/bundles/superheroes/superheroes.js';
import { AppEnvironment } from '~/common/enums/enums.js';
import { type Config } from '~/framework/config/config.js';

import { errorMiddleware } from './middlewares/middlewares.js';

type RootReducer = {
    superheroes: ReturnType<typeof superheroesReducer>;
};

type ExtraArguments = {
    superheroesApi: typeof superheroesApi;
};

class Store {
    public instance: ReturnType<
        typeof configureStore<
            RootReducer,
            UnknownAction,
            Tuple<[ThunkMiddleware<RootReducer, UnknownAction, ExtraArguments>]>
        >
    >;

    public constructor(config: Config) {
        this.instance = configureStore({
            devTools: config.ENV.APP.ENVIRONMENT !== AppEnvironment.PRODUCTION,
            reducer: {
                superheroes: superheroesReducer,
            },
            middleware: (getDefaultMiddleware) =>
                new Tuple(
                    ...getDefaultMiddleware({
                        thunk: {
                            extraArgument: this.extraArguments,
                        },
                    }),
                    errorMiddleware,
                ),
        });
    }

    public get extraArguments(): ExtraArguments {
        return {
            superheroesApi,
        };
    }
}

export { Store };
