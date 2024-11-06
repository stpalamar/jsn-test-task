import { type Knex } from 'knex';

const TableName = 'superheroes';

const ColumnName = {
    ORIGIN_DESCRIPTION: 'origin_description',
};

function up(knex: Knex): Promise<void> {
    return knex.schema.alterTable(TableName, (table) => {
        table.text(ColumnName.ORIGIN_DESCRIPTION).alter();
    });
}

function down(knex: Knex): Promise<void> {
    return knex.schema.alterTable(TableName, (table) => {
        table.string(ColumnName.ORIGIN_DESCRIPTION).alter();
    });
}

export { down, up };
