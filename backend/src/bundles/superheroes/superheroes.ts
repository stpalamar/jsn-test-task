import { logger } from '~/common/logger/logger.js';

import { SuperheroController } from './superhero.controller.js';
import { SuperheroModel } from './superhero.model.js';
import { SuperheroRepository } from './superhero.repository.js';
import { SuperheroService } from './superhero.service.js';

const superheroRepository = new SuperheroRepository(SuperheroModel);
const superheroService = new SuperheroService(superheroRepository);
const superheroController = new SuperheroController(logger, superheroService);

export { superheroController, superheroRepository, superheroService };
export { SuperheroController } from './superhero.controller.js';
export { SuperheroEntity } from './superhero.entity.js';
export { SuperheroModel } from './superhero.model.js';
export { SuperheroRepository } from './superhero.repository.js';
export { SuperheroService } from './superhero.service.js';
