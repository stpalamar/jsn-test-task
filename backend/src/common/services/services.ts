import { imagePath } from '../constants/constants.js';
import { FileService } from './file/file.service.js';

const fileService = new FileService(imagePath);

export { fileService };
