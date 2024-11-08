import {
    createSuperhero,
    deleteSuperhero,
    getSuperheroById,
    getSuperheroes,
    updateSuperhero,
    uploadImages,
} from './actions.js';
import { actions } from './slice.js';

const allActions = {
    ...actions,
    getSuperheroes,
    getSuperheroById,
    createSuperhero,
    updateSuperhero,
    deleteSuperhero,
    uploadImages,
};

export { allActions as actions };
export { reducer } from './slice.js';
