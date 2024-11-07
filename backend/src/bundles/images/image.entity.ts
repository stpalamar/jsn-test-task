import { type Entity } from '~/common/types/types.js';

class ImageEntity implements Entity {
    private 'id': number | null;

    private 'superheroId': number;

    private 'filename': string;

    private constructor({
        id,
        superheroId,
        filename,
    }: {
        id: number | null;
        superheroId: number;
        filename: string;
    }) {
        this.id = id;
        this.superheroId = superheroId;
        this.filename = filename;
    }

    public static initialize({
        id,
        superheroId,
        filename,
    }: {
        id: number;
        superheroId: number;
        filename: string;
    }): ImageEntity {
        return new ImageEntity({
            id,
            superheroId,
            filename,
        });
    }

    public static initializeNew({
        superheroId,
        filename,
    }: {
        superheroId: number;
        filename: string;
    }): ImageEntity {
        return new ImageEntity({
            id: null,
            superheroId,
            filename,
        });
    }

    public toObject(): {
        id: number;
        superheroId: number;
        filename: string;
    } {
        return {
            id: this.id as number,
            superheroId: this.superheroId,
            filename: this.filename,
        };
    }

    public toNewObject(): {
        superheroId: number;
        filename: string;
    } {
        return {
            superheroId: this.superheroId,
            filename: this.filename,
        };
    }
}

export { ImageEntity };
