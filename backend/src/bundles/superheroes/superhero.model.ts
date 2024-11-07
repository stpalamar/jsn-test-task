import { type RelationMappings } from 'objection';

import {
    AbstractModel,
    DatabaseTableName,
} from '~/common/database/database.js';

import { ImageModel } from '../images/images.js';

class SuperheroModel extends AbstractModel {
    public 'nickname': string;

    public 'realName': string;

    public 'originDescription': string;

    public 'superpowers': string;

    public 'catchPhrase': string;

    public 'images': ImageModel[];

    public static override get tableName(): string {
        return DatabaseTableName.SUPERHEROES;
    }

    public static override get relationMappings(): RelationMappings {
        return {
            images: {
                relation: AbstractModel.HasManyRelation,
                modelClass: ImageModel,
                join: {
                    from: 'superheroes.id',
                    to: 'images.superheroId',
                },
            },
        };
    }
}

export { SuperheroModel };
