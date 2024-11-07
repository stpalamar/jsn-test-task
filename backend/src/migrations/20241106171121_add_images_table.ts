import { type Knex } from 'knex';

const TableName = 'images';
const SuperheroesTableName = 'superheroes';

const ColumnName = {
    ID: 'id',
    SUPERHERO_ID: 'superhero_id',
    FILENAME: 'filename',
    CREATED_AT: 'created_at',
    UPDATED_AT: 'updated_at',
};

function up(knex: Knex): Promise<void> {
    return knex.schema.createTable(TableName, (table) => {
        table.increments(ColumnName.ID).primary();
        table
            .integer(ColumnName.SUPERHERO_ID)
            .unsigned()
            .notNullable()
            .references(ColumnName.ID)
            .inTable(SuperheroesTableName)
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
        table.string(ColumnName.FILENAME).notNullable();
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
