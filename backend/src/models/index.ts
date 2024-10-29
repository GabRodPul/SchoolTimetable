import { Sequelize } from "sequelize";
import { dbConfig } from "../config/db.config";
import { UserModel } from "./user.model";
import { GroupModel } from "./group.model";
import { CourseModel } from "./course.model";

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
    courses:    CourseModel.init(sequelize)
});

export { DB };