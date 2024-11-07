import {
    createSuperhero,
    deleteSuperhero,
    getSuperheroById,
    getSuperheroes,
    updateSuperhero,
} from './actions.js';
import { actions } from './slice.js';

const allActions = {
    ...actions,
    getSuperheroes,
    getSuperheroById,
    createSuperhero,
    updateSuperhero,
    deleteSuperhero,
};

export { allActions as actions };
export { reducer } from './slice.js';
