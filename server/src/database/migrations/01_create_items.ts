import { Knex } from 'knex'
// migrations para criação das tabelas.

export async function up(knex: Knex): Promise<any> { // ### Criar a tabela.
   return knex.schema.createTable('items', table => {
        table.increments('id').primary()
        table.string('image').notNullable()
        table.string('title').notNullable()
    })
} 

export async function down(knex: Knex) { // ### Rollback.
    return knex.schema.dropTable('items')
} 