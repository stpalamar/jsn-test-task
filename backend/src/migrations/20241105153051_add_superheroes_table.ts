import { type Knex } from 'knex';

const TableName = 'superheroes';

const ColumnName = {
    ID: 'id',
    NICKNAME: 'nickname',
    REAL_NAME: 'real_name',
    ORIGIN_DESCRIPTION: 'origin_description',
    SUPERPOWERS: 'superpowers',
    CATCH_PHRASE: 'catch_phrase',
    CREATED_AT: 'created_at',
    UPDATED_AT: 'updated_at',
};

function up(knex: Knex): Promise<void> {
    return knex.schema.createTable(TableName, (table) => {
        table.increments(ColumnName.ID).primary();
        table.string(ColumnName.NICKNAME).notNullable();
        table.string(ColumnName.REAL_NAME).notNullable();
        table.string(ColumnName.ORIGIN_DESCRIPTION).notNullable();
        table.string(ColumnName.SUPERPOWERS).notNullable();
        table.string(ColumnName.CATCH_PHRASE).notNullable();
        table
            .dateTime(ColumnName.CREATED_AT)
            .notNullable()
            .defaultTo(knex.fn.now());
        table
            .dateTime(ColumnName.UPDATED_AT)
            .notNullable()
            .defaultTo(knex.fn.now());
    });
}

function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists(TableName);
}

export { down, up };
