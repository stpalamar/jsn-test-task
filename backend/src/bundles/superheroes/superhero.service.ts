import { HttpError } from '~/common/exceptions/exceptions.js';
import { getImageUrl } from '~/common/helpers/helpers.js';
import { HttpCode } from '~/common/http/http.js';
import { type FileService } from '~/common/services/file/file.service.js';
import { type File } from '~/common/services/file/types/types.js';
import {
    type Paged,
    type PaginationParameters,
    type Service,
} from '~/common/types/types.js';

import { type ImageRepository } from '../images/images.js';
import { ImageEntity } from '../images/images.js';
import { ErrorMessage } from './enums/enums.js';
import { SuperheroEntity, type SuperheroRepository } from './superheroes.js';
import {
    type SuperheroRequestDto,
    type SuperheroResponseDto,
    type UploadImageResponseDto,
} from './types/types.js';

class SuperheroService implements Service {
    private superheroRepository: SuperheroRepository;
    private imageRepository: ImageRepository;
    private fileService: FileService;

    public constructor(
        superheroRepository: SuperheroRepository,
        imageRepository: ImageRepository,
        fileService: FileService,
    ) {
        this.superheroRepository = superheroRepository;
        this.imageRepository = imageRepository;
        this.fileService = fileService;
    }

    public async find(
        query: Record<string, unknown>,
    ): Promise<SuperheroResponseDto | null> {
        const item = await this.superheroRepository.find(query);

        if (!item) {
            throw new HttpError({
                message: ErrorMessage.NOT_FOUND,
                status: HttpCode.NOT_FOUND,
            });
        }

        return this.serializeImages(item);
    }

    public async findAll(
        query: Record<string, unknown>,
        pagination: PaginationParameters,
    ): Promise<Paged<SuperheroResponseDto>> {
        const { page = 1, limit = 5 } = pagination;
        const offset = (Number(page) - 1) * Number(limit);

        const items = await this.superheroRepository.findAll(
            query,
            offset,
            limit,
        );

        const total = await this.superheroRepository.count(query);

        return {
            items: items.map((item) => this.serializeImages(item)),
            page: Number(page),
            total: total,
            totalPages: Math.ceil(total / Number(limit)),
        };
    }

    public async create(
        payload: SuperheroRequestDto,
    ): Promise<SuperheroResponseDto> {
        const { imageFilenames, ...entity } = payload;

        const item = await this.superheroRepository.create(
            SuperheroEntity.initializeNew(entity),
        );

        const superhero = item.toObject();

        if (!imageFilenames) {
            return this.serializeImages(item);
        }
        const imagesEntities = await Promise.all(
            imageFilenames.map(
                async (filename) =>
                    await this.imageRepository.create(
                        ImageEntity.initializeNew({
                            filename: filename,
                            superheroId: superhero.id,
                        }),
                    ),
            ),
        );

        const images = imagesEntities.map((image) => image.toObject());
        const { images: _, ...createdSuperhero } = superhero;

        return {
            ...createdSuperhero,
            imageUrls: images.map((image) => getImageUrl(image.filename)),
        };
    }

    public async update(
        query: Record<string, unknown>,
        payload: SuperheroRequestDto,
    ): Promise<SuperheroResponseDto | null> {
        const { imageFilenames, ...entity } = payload;

        const item = await this.superheroRepository.update(
            query,
            SuperheroEntity.initializeNew(entity),
        );

        if (!item) {
            throw new HttpError({
                message: ErrorMessage.NOT_FOUND,
                status: HttpCode.NOT_FOUND,
            });
        }

        const superhero = item.toObject();

        await this.clearImages(
            superhero.id,
            superhero.images.map((image) => image.filename),
            imageFilenames,
        );

        const imagesEntities = await Promise.all(
            imageFilenames.map(async (filename) => {
                const image = await this.imageRepository.find({
                    filename: filename,
                    superheroId: superhero.id,
                });

                if (image) {
                    return image;
                }

                return await this.imageRepository.create(
                    ImageEntity.initializeNew({
                        filename: filename,
                        superheroId: superhero.id,
                    }),
                );
            }),
        );

        const images = imagesEntities.map((image) => image.toObject());
        const { images: _, ...updatedSuperhero } = superhero;

        return {
            ...updatedSuperhero,
            imageUrls: images.map((image) => getImageUrl(image.filename)),
        };
    }

    public async delete(query: Record<string, unknown>): Promise<boolean> {
        const item = await this.superheroRepository.find(query);

        if (!item) {
            throw new HttpError({
                message: ErrorMessage.NOT_FOUND,
                status: HttpCode.NOT_FOUND,
            });
        }

        const superhero = item.toObject();

        await Promise.all(
            superhero.images.map(
                async () =>
                    await this.imageRepository.delete({
                        superheroId: superhero.id,
                    }),
            ),
        );

        return this.superheroRepository.delete(query);
    }

    public uploadImage(file: File): UploadImageResponseDto {
        try {
            const filename = this.fileService.saveLocalFile(file);

            return {
                filename: filename,
                url: getImageUrl(filename),
            };
        } catch {
            throw new HttpError({
                message: 'Error occured while uploading image',
                status: HttpCode.BAD_REQUEST,
            });
        }
    }

    private async clearImages(
        superheroId: number,
        currentFilenames: string[],
        newFilenames: string[],
    ): Promise<void> {
        const imagesToDelete = currentFilenames.filter(
            (filename) => !newFilenames.includes(filename),
        );

        await Promise.all(
            imagesToDelete.map(async (filename) => {
                await this.imageRepository.delete({
                    filename: filename,
                    superheroId: superheroId,
                });
            }),
        );
    }

    private serializeImages(superhero: SuperheroEntity): SuperheroResponseDto {
        const { images, ...rest } = superhero.toObject();

        return {
            ...rest,
            imageUrls: images.map((image) => getImageUrl(image.filename)),
        };
    }
}

export { SuperheroService };
