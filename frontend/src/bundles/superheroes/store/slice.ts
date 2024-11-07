import { createSlice } from '@reduxjs/toolkit';

import { DataStatus } from '~/common/enums/enums.js';
import { type Paged, type ValueOf } from '~/common/types/types.js';

import { type SuperheroResponseDto } from '../types/types.js';
import {
    createSuperhero,
    deleteSuperhero,
    getSuperheroById,
    getSuperheroes,
    updateSuperhero,
} from './actions.js';

type State = {
    dataStatus: ValueOf<typeof DataStatus>;
    superheroes: Paged<SuperheroResponseDto> | null;
    superhero: SuperheroResponseDto | null;
};

const initialState: State = {
    dataStatus: DataStatus.IDLE,
    superheroes: null,
    superhero: null,
};

const { reducer, actions, name } = createSlice({
    name: 'superheroes',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getSuperheroes.pending, (state) => {
            state.dataStatus = DataStatus.PENDING;
        });
        builder.addCase(getSuperheroes.fulfilled, (state, { payload }) => {
            state.dataStatus = DataStatus.FULFILLED;
            state.superheroes = payload;
        });
        builder.addCase(getSuperheroes.rejected, (state) => {
            state.dataStatus = DataStatus.REJECTED;
        });

        builder.addCase(getSuperheroById.pending, (state) => {
            state.dataStatus = DataStatus.PENDING;
        });
        builder.addCase(getSuperheroById.fulfilled, (state, { payload }) => {
            state.dataStatus = DataStatus.FULFILLED;
            state.superhero = payload;
        });
        builder.addCase(getSuperheroById.rejected, (state) => {
            state.dataStatus = DataStatus.REJECTED;
        });
        builder.addCase(createSuperhero.pending, (state) => {
            state.dataStatus = DataStatus.PENDING;
        });
        builder.addCase(createSuperhero.fulfilled, (state, { payload }) => {
            state.dataStatus = DataStatus.FULFILLED;
            if (state.superheroes) {
                state.superheroes.items.push(payload);
            }
        });
        builder.addCase(createSuperhero.rejected, (state) => {
            state.dataStatus = DataStatus.REJECTED;
        });

        builder.addCase(updateSuperhero.pending, (state) => {
            state.dataStatus = DataStatus.PENDING;
        });
        builder.addCase(updateSuperhero.fulfilled, (state, { payload }) => {
            state.dataStatus = DataStatus.FULFILLED;
            if (state.superheroes) {
                state.superheroes.items = state.superheroes.items.map((item) =>
                    item.id === payload.id ? payload : item,
                );
            }
        });
        builder.addCase(updateSuperhero.rejected, (state) => {
            state.dataStatus = DataStatus.REJECTED;
        });

        builder.addCase(deleteSuperhero.pending, (state) => {
            state.dataStatus = DataStatus.PENDING;
        });
        builder.addCase(deleteSuperhero.fulfilled, (state, action) => {
            state.dataStatus = DataStatus.FULFILLED;
            if (state.superheroes) {
                state.superheroes.items = state.superheroes.items.filter(
                    (item) => item.id !== action.meta.arg,
                );
            }
        });
        builder.addCase(deleteSuperhero.rejected, (state) => {
            state.dataStatus = DataStatus.REJECTED;
        });
    },
});

export { actions, name, reducer, type State };
