import { BelongsTo, BelongsToManyOptions, BelongsToOptions, HasMany, HasManyOptions, HasOneOptions, Model, ModelStatic, Sequelize } from "sequelize";
import { dbConfig } from "../config/db.config";
import { UserModel } from "./user.model";
import { GroupModel } from "./group.model";
import { CourseModel } from "./course.model";
import { ModuleModel } from "./module.model";
import { relationship } from "../utils/data";
import { EnrollmentModel } from "./enrollment.model";
import { WarningModel } from "./warning.model";
import { IGTModuleModel } from "./igt-module.model";

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host:               dbConfig.HOST,
    dialect:            dbConfig.dialect,
    operatorsAliases:   undefined,
    pool:               dbConfig.pool
});

const DB = Object.freeze({
    sequelize,
    users:          UserModel.init(sequelize),
    groups:         GroupModel.init(sequelize),
    courses:        CourseModel.init(sequelize),
    modules:        ModuleModel.init(sequelize),
    igt_modules:    IGTModuleModel.init(sequelize),
    enrollments:    EnrollmentModel.init(sequelize),
    warnings:       WarningModel.init(sequelize),
    // ...
});

// Relationships
// * Module 
relationship(
    DB.modules, { h: "hasMany" }, {
        others: [ DB.igt_modules ],
        b:      "belongsTo"
    }
);

relationship(
    DB.modules, { h: "hasMany" }, {
        others:  [ DB.users ],
        b:      "belongsToMany",
        opt:    { through: DB.enrollments }
    }
)

// * Warning
relationship(
    DB.warnings, { h: "hasMany" }, { 
        others: [DB.users],
        b:      "belongsTo",
})



export { DB };