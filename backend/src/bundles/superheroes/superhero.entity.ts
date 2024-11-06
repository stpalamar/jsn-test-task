import { type Entity } from '~/common/types/types.js';

class SuperheroEntity implements Entity {
    public 'id': number | null;

    public 'nickname': string;

    public 'realName': string;

    public 'originDescription': string;

    public 'superpowers': string;

    public 'catchPhrase': string;

    public 'createdAt': string | null;

    public 'updatedAt': string | null;

    private constructor({
        id,
        nickname,
        realName,
        originDescription,
        superpowers,
        catchPhrase,
        createdAt,
        updatedAt,
    }: {
        id: number | null;
        nickname: string;
        realName: string;
        originDescription: string;
        superpowers: string;
        catchPhrase: string;
        createdAt?: string | null;
        updatedAt?: string | null;
    }) {
        this.id = id;
        this.nickname = nickname;
        this.realName = realName;
        this.originDescription = originDescription;
        this.superpowers = superpowers;
        this.catchPhrase = catchPhrase;
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
        createdAt,
        updatedAt,
    }: {
        id: number;
        nickname: string;
        realName: string;
        originDescription: string;
        superpowers: string;
        catchPhrase: string;
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
