import { fileService } from '~/common/services/services.js';

import { ImageModel } from './image.model.js';
import { ImageRepository } from './image.repository.js';

const imageRepository = new ImageRepository(ImageModel, fileService);

export { imageRepository };
export { ImageEntity } from './image.entity.js';
export { ImageModel } from './image.model.js';
export { ImageRepository } from './image.repository.js';
