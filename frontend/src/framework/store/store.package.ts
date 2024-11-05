import {
    type ThunkMiddleware,
    Tuple,
    type UnknownAction,
} from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';

import { AppEnvironment } from '~/common/enums/enums.js';
import { type Config } from '~/framework/config/config.js';

import { errorMiddleware } from './middlewares/middlewares.js';

type RootReducer = object;

type ExtraArguments = object;

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
            reducer: {},
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
        return {};
    }
}

export { Store };
