import { dbConfig } from "#src/config/db.config";
import { Sequelize, DataTypes } from "sequelize";
import { readdirSync } from "fs";
import { enumStrVals } from "#src/utils/data";

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: undefined,
  pool: dbConfig.pool,
});

const queryInterface = sequelize.getQueryInterface();
const mConfig = {
  tableName: "__META_MIGRATIONS",
  folder:    `${__dirname}/../migrations`,
}

type Migration = {
  name: string,
  date: Date
}

const MigrationModel = {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  date: {
    type: DataTypes.DATE,
    defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
    allowNull: false,
  },
}

enum MigArgs {
  Migrate = "migrate",
  MigrateAll = "migrate:all",
  Undo = "migrate:undo",
  UndoAll = "migrate:undo:all",
}

const args = enumStrVals(MigArgs).values;

/**
 * This is a VERY incomplete implementation of migrations.
 * It'll just take every migration file you have and run them
 * one by one if they're not on the database.
 */
const migrate = async () => {
  // Parse args
  const arg = process.argv.find(v => args.includes(v));

  // QueryInterface.createDatabase isn't working.
  // await queryInterface.createDatabase(dbConfig.DB);
  if (arg === MigArgs.MigrateAll || arg === MigArgs.UndoAll) {
    await sequelize.query(`DROP DATABASE IF EXISTS ${dbConfig.DB}`);
  }

  // FIXME: THIS WON'T CREATE THE DATABASE???
  await sequelize.query(`CREATE DATABASE IF NOT EXISTS ${dbConfig.DB}`);
  
  await sequelize.query(`USE ${dbConfig.DB}`);
  await queryInterface.createTable(mConfig.tableName, MigrationModel);

  const mFiles = readdirSync(mConfig.folder).map(f => f.replace(".ts", ""));
  if (mFiles.length === 0) 
    throw new Error(`No migration files found.`);

  let mCurrent = ((await sequelize.query(
    `SELECT * FROM ${mConfig.tableName} ORDER BY date DESC`
  ))[0] as Migration[])
    .map(m => m.name);

  switch (arg) {
    case MigArgs.Undo: {
      // ORDER BY DESC returns last migration at index 0.
      mCurrent = [ mCurrent[0] ];
    } // Fallthrough

    case MigArgs.UndoAll: {
      // This comes from the database. It is safe to compare with undefined.
      if (mCurrent[0] === undefined) {
        console.log(`[${arg}]: Nothing to undo.`);
        break;
      }

      mCurrent.forEach(async (f) => {
        const { down } = require(`${mConfig.folder}/${f}.ts`)
        await down(queryInterface, DataTypes);

        await sequelize.query(
          `DELETE FROM ${mConfig.tableName} WHERE name = "${f}"`
        );
      });
    } break;

    default: {
      const pending = mFiles.filter(f => !mCurrent.includes(f));
      if (pending.length === 0) {
        console.log(`[${arg}]: Nothing to migrate.`)
      }

      pending.forEach(async (f) => {
        const { up } = require(`${mConfig.folder}/${f}.ts`);
        await up(queryInterface, DataTypes);

        await sequelize.query(
          `INSERT INTO ${mConfig.tableName} (name) VALUES ("${f}")`
        );
      });
    } break;
  }
};

migrate().then();