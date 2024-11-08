import { createAsyncThunk } from '@reduxjs/toolkit';

import {
    type AsyncThunkConfig,
    type Paged,
    type PaginationParameters,
    type UploadImageResponseDto,
} from '~/common/types/types.js';

import {
    type SuperheroRequestDto,
    type SuperheroResponseDto,
} from '../types/types.js';
import { name as sliceName } from './slice.js';

const getSuperheroes = createAsyncThunk<
    Paged<SuperheroResponseDto>,
    PaginationParameters,
    AsyncThunkConfig
>(`${sliceName}/get-superheroes`, async (paginationPayload, { extra }) => {
    const { superheroesApi } = extra;
    return await superheroesApi.getSuperheroes(paginationPayload);
});

const getSuperheroById = createAsyncThunk<
    SuperheroResponseDto,
    number,
    AsyncThunkConfig
>(`${sliceName}/get-superhero-by-id`, async (id, { extra }) => {
    const { superheroesApi } = extra;
    return await superheroesApi.getSuperheroById(String(id));
});

const createSuperhero = createAsyncThunk<
    SuperheroResponseDto,
    SuperheroRequestDto,
    AsyncThunkConfig
>(`${sliceName}/create-superhero`, async (payload, { extra }) => {
    const { superheroesApi } = extra;
    return await superheroesApi.createSuperhero(payload);
});

const updateSuperhero = createAsyncThunk<
    SuperheroResponseDto,
    {
        id: number;
        payload: SuperheroRequestDto;
    },
    AsyncThunkConfig
>(`${sliceName}/update-superhero`, async ({ id, payload }, { extra }) => {
    const { superheroesApi } = extra;
    return await superheroesApi.updateSuperhero(String(id), payload);
});

const deleteSuperhero = createAsyncThunk<boolean, number, AsyncThunkConfig>(
    `${sliceName}/delete-superhero`,
    async (id, { extra }) => {
        const { superheroesApi } = extra;
        return await superheroesApi.deleteSuperhero(String(id));
    },
);

const uploadImages = createAsyncThunk<
    UploadImageResponseDto[],
    File[],
    AsyncThunkConfig
>(`${sliceName}/upload-images`, async (payload, { extra }) => {
    const { superheroesApi } = extra;
    return await superheroesApi.uploadImages(payload);
});

export {
    createSuperhero,
    deleteSuperhero,
    getSuperheroById,
    getSuperheroes,
    updateSuperhero,
    uploadImages,
};
