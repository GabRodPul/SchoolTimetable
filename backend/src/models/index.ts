import { BelongsTo, BelongsToManyOptions, BelongsToOptions, HasMany, HasManyOptions, HasOneOptions, Model, ModelStatic, Sequelize } from "sequelize";
import { dbConfig } from "../config/db.config";
import { UserModel } from "./user.model";
import { GroupModel } from "./group.model";
import { CourseModel } from "./course.model";
import { ModuleModel } from "./module.model";
import { relationship } from "../utils/data";

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
    courses:    CourseModel.init(sequelize),
    modules:    ModuleModel.init(sequelize)
});

// Relationships
// * Course-Groups
relationship(
    DB.courses, 
    { h: "hasMany"   }, 
    { 
        others: [DB.groups], 
        b:      "belongsTo" 
    }
);

// * Module
relationship(
    DB.modules, 
    { h: "hasOne" },
    {
        others: [DB.groups, DB.users, DB.courses],
        b: "belongsTo"
    }
);


export { DB };