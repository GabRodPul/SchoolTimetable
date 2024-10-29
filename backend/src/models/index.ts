import { Sequelize } from "sequelize";
import { dbConfig } from "../config/db.config";
import { read } from "fs";
import { UserModel } from "./user.model";
import { GroupModel } from "./group.model";

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host:               dbConfig.HOST,
    dialect:            dbConfig.dialect,
    operatorsAliases:   undefined,
    pool:               dbConfig.pool
});

const DB = Object.freeze({
    sequelize,
    users:      UserModel.init(sequelize),
    groups:     GroupModel.init(sequelize),
});

export { DB };