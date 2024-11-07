import {
    AbstractModel,
    DatabaseTableName,
} from '~/common/database/database.js';

class ImageModel extends AbstractModel {
    public 'superheroId': number;

    public 'filename': string;

    public static override get tableName(): string {
        return DatabaseTableName.IMAGES;
    }
}

export { ImageModel };
