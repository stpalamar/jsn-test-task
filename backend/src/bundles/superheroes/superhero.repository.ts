import { type Repository } from '~/common/types/types.js';

import { SuperheroEntity, type SuperheroModel } from './superheroes.js';

class SuperheroRepository implements Repository {
    private superheroModel: typeof SuperheroModel;

    public constructor(superheroModel: typeof SuperheroModel) {
        this.superheroModel = superheroModel;
    }

    public async find(
        query: Record<string, unknown>,
    ): Promise<SuperheroEntity | null> {
        const superhero = await this.superheroModel
            .query()
            .findOne(query)
            .execute();

        if (!superhero) {
            return null;
        }

        return SuperheroEntity.initialize({
            ...superhero,
        });
    }

    public async findAll(
        query: Record<string, unknown>,
        offset: number,
        limit: number,
    ): Promise<SuperheroEntity[]> {
        const superheroes = await this.superheroModel
            .query()
            .where(query)
            .offset(offset)
            .limit(limit)
            .execute();

        return superheroes.map((superhero) =>
            SuperheroEntity.initialize({ ...superhero }),
        );
    }

    public async count(query: Record<string, unknown>): Promise<number> {
        const result = (await this.superheroModel
            .query()
            .where(query)
            .count()
            .first()
            .execute()) as unknown as { count: string };

        return Number(result.count);
    }

    public async create(entity: SuperheroEntity): Promise<SuperheroEntity> {
        const data = entity.toNewObject();

        const superhero = await this.superheroModel
            .query()
            .insert(data)
            .returning('*')
            .execute();

        return SuperheroEntity.initialize({
            ...superhero,
        });
    }

    public async update(
        query: Record<string, unknown>,
        entity: SuperheroEntity,
    ): Promise<SuperheroEntity | null> {
        const data = entity.toNewObject();

        const superhero = await this.superheroModel
            .query()
            .update(data)
            .findOne(query)
            .returning('*')
            .execute();

        if (!superhero) {
            return null;
        }

        return SuperheroEntity.initialize({
            ...superhero,
        });
    }

    public async delete(query: Record<string, unknown>): Promise<boolean> {
        return (await this.superheroModel.query().where(query).del().execute())
            ? true
            : false;
    }
}

export { SuperheroRepository };
