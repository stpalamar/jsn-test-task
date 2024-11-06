import {
    AbstractModel,
    DatabaseTableName,
} from '~/common/database/database.js';

class SuperheroModel extends AbstractModel {
    public 'nickname': string;

    public 'realName': string;

    public 'originDescription': string;

    public 'superpowers': string;

    public 'catchPhrase': string;

    public static override get tableName(): string {
        return DatabaseTableName.SUPERHEROES;
    }
}

export { SuperheroModel };
