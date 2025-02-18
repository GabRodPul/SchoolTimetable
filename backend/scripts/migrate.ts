import { dbConfig } from "#src/config/db.config";
import { Sequelize, DataTypes } from "sequelize";
import { readdirSync } from "fs";
import { enumStrVals } from "#src/utils/data";
import { Metadata } from "./_types";
import { envvars } from "#src/env";
import { createConnection as mariaConn } from "mariadb"
import { Connection, ConnectionOptions, createConnection as mysqlConn } from "mysql2/promise"

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: undefined,
  pool: dbConfig.pool,
});

const queryInterface = sequelize.getQueryInterface();

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

enum Args {
  Migrate = "migrate",
  MigrateAll = "migrate:all",
  MigrateUndo = "migrate:undo",
  MigrateUndoAll = "migrate:undo:all",
  Seed = "seed",
  SeedAll = "seed:all",
  SeedUndo = "seed:undo",
  SeedUndoAll = "seed:undo:all",
}


const args = enumStrVals(Args).values;

/**
 * This is a VERY incomplete implementation of migrations.
 * It'll just take every migration file you have and run them
 * one by one if they're not on the database.
 */
const migrations = async () => {
  // Parse args
  const arg = process.argv.find(v => args.includes(v));
  let folder; {
    switch ((arg ?? "").split(":")[0]) {
      case "migrate": { folder = "migrations" } break;
      case "seed": { folder = "seeders" } break;
      default:
        throw new Error(`MISSING ARGS: [${args}]`);
    }
  }

  const mConfig = {
    tableName: `__META_${folder.toUpperCase()}`,
    folder: `${__dirname}/../${folder.toLowerCase()}`,
  }

  /*
    Ensure the database exists for "migrate". 
    Trying to use either queryInterface or sequelize if it doesn't will
    result in an error.
  */
  if (arg === Args.Migrate || arg === Args.MigrateAll) {
    const poolArgs = {
      host: dbConfig.HOST,
      user: dbConfig.USER,
      password: dbConfig.PASSWORD,
      connectionLimit: 5
    } as ConnectionOptions;

    let query = { 
      "mariadb":  { connFn: mariaConn, execFn: "query"   },
      "mysql":    { connFn: mysqlConn, execFn: "execute" }
    }[dbConfig.dialect as "mariadb" | "mysql"]; 

    if (dbConfig.dialect === "mariadb") {
      const conn = await mariaConn(poolArgs as any);
      try {
        if (arg === Args.MigrateAll) {
          await conn.query(`DROP DATABASE IF EXISTS ${dbConfig.DB}`);
        }

        await conn.query(`CREATE DATABASE IF NOT EXISTS ${dbConfig.DB}`);
      } catch (err: any) {
        console.log(err);
      } finally {
        if (conn) await conn.end();
      }
    } else {
      const conn = await mysqlConn(poolArgs as any);
      try {
        if (arg === Args.MigrateAll) {
          await conn.query(`DROP DATABASE IF EXISTS ${dbConfig.DB}`);
        }

        await conn.query(`CREATE DATABASE IF NOT EXISTS ${dbConfig.DB}`);
      } catch (err: any) {
        console.log(err);
      } finally {
        if (conn) await conn.end();
      }
    }
  }

  await sequelize.query(`USE ${dbConfig.DB}`);
  await queryInterface.createTable(mConfig.tableName, MigrationModel);

  const mFiles = readdirSync(mConfig.folder).map(f => f.replace(".ts", ""));
  if (mFiles.length === 0)
    throw new Error(`No migration files found.`);

  let mCurrent = ((await sequelize.query(
    `SELECT * FROM ${mConfig.tableName} ORDER BY date DESC`
  ))[0] as Metadata[])
    .map(m => m.name);

  switch (arg) {
    case Args.SeedUndo:
    case Args.MigrateUndo: {
      // ORDER BY DESC returns last migration at index 0.
      mCurrent = [mCurrent[0]];
    } // Fallthrough

    case Args.SeedUndoAll:
    case Args.MigrateUndoAll: {
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

migrations().then();