// ### Configurações knex, setando o banco de dados, onde vai ficar, diretório de migrations e seeds.
import type { Knex } from "knex";
import path from 'path'

const config: { [key: string]: Knex.Config } = {
  development: {
    client: "sqlite3",
    connection: {
      filename: path.resolve(__dirname, 'src', 'database', 'database.sqlite')
    },
    migrations: {
      directory: path.resolve(__dirname, 'src', 'database', 'migrations')
    },
    seeds: {
      directory: path.resolve(__dirname, 'src', 'database', 'seeds')
    },
    useNullAsDefault: true,
  },
};

module.exports = config;
