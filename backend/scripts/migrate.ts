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
  await queryInterface.createTable(mConfig.tableName, {
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
  });

  const mFiles = readdirSync(mConfig.folder).map(f => f.replace(".ts", ""));
  if (mFiles.length === 0) 
    throw new Error(`No migration files found.`);

  const mCurrent = await sequelize.query(
    `SELECT * FROM ${mConfig.tableName} ORDER BY date DESC`
  );

  switch (arg) {
    case MigArgs.Undo: {
      const last = mCurrent[0];
      const { down } = require(`${mConfig.folder}/${last}.ts`)
      await down(queryInterface, DataTypes);
    } break;

    case MigArgs.UndoAll: {
      mCurrent.forEach(async (f) => {
        const { down } = require(`${mConfig.folder}/${f}.ts`)
        await down(queryInterface, DataTypes);
      });
    } break;

    default: {
      mFiles
      .filter(f => !mCurrent.includes(f))
      .forEach(async (f) => {
        const { up } = require(`${mConfig.folder}/${f}.ts`);
        await up(queryInterface, DataTypes);
        queryInterface.insert(null, mConfig.tableName, {
          name: f
        });
      });
    } break;
  }
};

migrate().then();