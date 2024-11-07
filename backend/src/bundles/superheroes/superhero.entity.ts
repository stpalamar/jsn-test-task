import { type Entity } from '~/common/types/types.js';

import { type ImageEntity } from '../images/image.entity.js';

class SuperheroEntity implements Entity {
    private 'id': number | null;

    private 'nickname': string;

    private 'realName': string;

    private 'originDescription': string;

    private 'superpowers': string;

    private 'catchPhrase': string;

    private 'images': ImageEntity[];

    private 'createdAt': string | null;

    private 'updatedAt': string | null;

    private constructor({
        id,
        nickname,
        realName,
        originDescription,
        superpowers,
        catchPhrase,
        images = [],
        createdAt,
        updatedAt,
    }: {
        id: number | null;
        nickname: string;
        realName: string;
        originDescription: string;
        superpowers: string;
        catchPhrase: string;
        images?: ImageEntity[];
        createdAt?: string | null;
        updatedAt?: string | null;
    }) {
        this.id = id;
        this.nickname = nickname;
        this.realName = realName;
        this.originDescription = originDescription;
        this.superpowers = superpowers;
        this.catchPhrase = catchPhrase;
        this.images = images;
        this.createdAt = createdAt || null;
        this.updatedAt = updatedAt || null;
    }

    public static initialize({
        id,
        nickname,
        realName,
        originDescription,
        superpowers,
        catchPhrase,
        images,
        createdAt,
        updatedAt,
    }: {
        id: number;
        nickname: string;
        realName: string;
        originDescription: string;
        superpowers: string;
        catchPhrase: string;
        images: ImageEntity[];
        createdAt: string;
        updatedAt: string;
    }): SuperheroEntity {
        return new SuperheroEntity({
            id,
            nickname,
            realName,
            originDescription,
            superpowers,
            catchPhrase,
            images,
            createdAt,
            updatedAt,
        });
    }

    public static initializeNew({
        nickname,
        realName,
        originDescription,
        superpowers,
        catchPhrase,
    }: {
        nickname: string;
        realName: string;
        originDescription: string;
        superpowers: string;
        catchPhrase: string;
    }): SuperheroEntity {
        return new SuperheroEntity({
            id: null,
            nickname,
            realName,
            originDescription,
            superpowers,
            catchPhrase,
        });
    }

    public toObject(): {
        id: number;
        nickname: string;
        realName: string;
        originDescription: string;
        superpowers: string;
        catchPhrase: string;
        images: {
            id: number;
            filename: string;
        }[];
        createdAt: string;
        updatedAt: string;
    } {
        return {
            id: this.id as number,
            nickname: this.nickname,
            realName: this.realName,
            originDescription: this.originDescription,
            superpowers: this.superpowers,
            catchPhrase: this.catchPhrase,
            images: this.images.map((image) => {
                const { id, filename } = image.toObject();
                return { id, filename };
            }),
            createdAt: this.createdAt as string,
            updatedAt: this.updatedAt as string,
        };
    }

    public toNewObject(): {
        nickname: string;
        realName: string;
        originDescription: string;
        superpowers: string;
        catchPhrase: string;
    } {
        return {
            nickname: this.nickname,
            realName: this.realName,
            originDescription: this.originDescription,
            superpowers: this.superpowers,
            catchPhrase: this.catchPhrase,
        };
    }
}

export { SuperheroEntity };
