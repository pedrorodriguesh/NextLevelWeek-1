import { Knex } from 'knex'
// migrations para criação das tabelas.

export async function up(knex: Knex): Promise<any> { // ### Criar a tabela.
   return knex.schema.createTable('points', table => {
        table.increments('id').primary();
        table.string('image').notNullable()
        table.string('name').notNullable()
        table.string('email').notNullable()
        table.string('whatsapp').notNullable()
        table.decimal('latitude').notNullable()
        table.decimal('longitude').notNullable()
        table.string('city').notNullable()
        table.string('uf', 2).notNullable()
    })
} 

export async function down(knex: Knex) { // ### Rollback.
    return knex.schema.dropTable('points')
} 