import { HttpError } from '~/common/exceptions/exceptions.js';
import { HttpCode } from '~/common/http/http.js';
import { type FileService } from '~/common/services/file/file.service.js';
import { type Repository } from '~/common/types/types.js';

import { type ImageModel } from './images.js';
import { ImageEntity } from './images.js';

class ImageRepository implements Repository {
    private imageModel: typeof ImageModel;
    private fileService: FileService;

    public constructor(
        imageModel: typeof ImageModel,
        fileService: FileService,
    ) {
        this.imageModel = imageModel;
        this.fileService = fileService;
    }

    public async find(
        query: Record<string, unknown>,
    ): Promise<ImageEntity | null> {
        const image = await this.imageModel.query().findOne(query).execute();

        if (!image) {
            return null;
        }

        return ImageEntity.initialize({
            ...image,
        });
    }

    public async findAll(
        query: Record<string, unknown>,
    ): Promise<ImageEntity[]> {
        const images = await this.imageModel.query().where(query).execute();

        return images.map((image) => ImageEntity.initialize({ ...image }));
    }

    public async create(entity: ImageEntity): Promise<ImageEntity> {
        const data = entity.toNewObject();

        if (!this.fileService.isFileExists(data.filename)) {
            throw new HttpError({
                message: 'File does not exist',
                status: HttpCode.BAD_REQUEST,
            });
        }

        const image = await this.imageModel.query().insert(data).execute();

        return ImageEntity.initialize({
            ...image,
        });
    }

    public async update(
        query: Record<string, unknown>,
        entity: ImageEntity,
    ): Promise<ImageEntity | null> {
        const data = entity.toObject();

        if (!this.fileService.isFileExists(data.filename)) {
            throw new HttpError({
                message: 'File does not exist',
                status: HttpCode.BAD_REQUEST,
            });
        }

        const image = await this.imageModel
            .query()
            .update(data)
            .findOne(query)
            .where(query)
            .execute();

        if (!image) {
            return null;
        }

        return ImageEntity.initialize({
            ...image,
        });
    }

    public async delete(query: Record<string, unknown>): Promise<boolean> {
        const image = await this.imageModel.query().findOne(query).execute();
        if (!image) {
            return false;
        }

        this.fileService.removeLocalFile(
            ImageEntity.initialize(image).toObject().filename,
        );

        return (await this.imageModel.query().delete().where(query).execute())
            ? true
            : false;
    }
}

export { ImageRepository };
