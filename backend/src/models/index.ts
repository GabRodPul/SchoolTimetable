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
import { SessionModel } from "./session.model"
import { SessionChangedModel } from "./session-changed.model"
import { ClassHourModel } from "./classHour.model";

import { Store } from 'express-session';
import connect = require('connect-session-sequelize');

const _sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host:               dbConfig.HOST,
    dialect:            dbConfig.dialect,
    operatorsAliases:   undefined,
    pool:               dbConfig.pool
});

const SequelizeStore = connect(Store);

export const initDb = (sequelize: Sequelize) => {
    const DB = Object.freeze({
        sequelize,
        store: new SequelizeStore({ db: sequelize }),
        users:           UserModel.init(sequelize),
        groups:          GroupModel.init(sequelize),
        modules:         ModuleModel.init(sequelize),
        igt_modules:     IGTModuleModel.init(sequelize),
        enrollments:     EnrollmentModel.init(sequelize),
        warnings:        WarningModel.init(sequelize),
        classHour:       ClassHourModel.init(sequelize),
        sessions:        SessionModel.init(sequelize),
        sessionsChanged: SessionChangedModel.init(sequelize),
        // courses:         CourseModel.init(sequelize),
        // ...
    });
    
    return DB; // I'm so tired.

    // Relationships
    // * Module 
    // relationship(
        // DB.modules, { h: "hasMany" }, {
            // others: [ DB.igt_modules ],
            // b:      "belongsTo"
        // }
    // );
    DB.modules.hasMany(DB.igt_modules,   { foreignKey: "moduleId" });
    DB.igt_modules.belongsTo(DB.modules, { foreignKey: "moduleId" });
    
    // relationship(
        // DB.groups, { h: "hasMany" }, {
            // others: [ DB.igt_modules ],
            // b:      "belongsTo"
        // }
    // )
    DB.groups.hasMany(DB.igt_modules  , { foreignKey: "groupId" });
    DB.igt_modules.belongsTo(DB.groups, { foreignKey: "groupId" });
    
    // relationship(
        // DB.modules, { h: "hasMany" }, {
            // others:  [ DB.users ],
            // b:      "belongsToMany",
            // opt:    { through: DB.enrollments }
        // }
    // )
    DB.users.hasMany(DB.enrollments,     { foreignKey: "studentId" });
    DB.enrollments.belongsTo(DB.users,   { foreignKey: "studentId" });
    
    DB.modules.hasMany(DB.enrollments  , { foreignKey: "moduleId" });
    DB.enrollments.belongsTo(DB.modules, { foreignKey: "moduleId" });
    // DB.users.belongsTo(DB.modules, { through: DB.enrollments });
    
    
    // * Warning
    // Esta está mal. Es al revés.
    // - Gabriel
    // relationship(
        // DB.warnings, { h: "hasMany" }, { 
            // others: [DB.users],
            // b:      "belongsTo",
    // })
    DB.users.hasMany(DB.warnings);
    DB.warnings.belongsTo(DB.users);
    
    // * ModuleIGP
    // Estas ya están arriba, realmente.
    // relationship(
        // DB.igt_modules, { h: "hasMany" }, { 
            // others: [DB.groups, DB.modules, DB.users],
            // b:      "belongsTo",
    // })
    
    
    // * Sessions
    // Esta está mal. Una sesión es para un módulo
    // y una hora de clase concretas.
    // relationship(
        // DB.sessions, { h: "hasMany" }, {
            // others:  [DB.classHour, DB.igt_modules],
            // b:      "belongsTo",
        // }
    // )
    
    
    DB.classHour.hasMany(DB.sessions,     { foreignKey: "classHourId" });
    DB.sessions.belongsTo(DB.classHour,   { foreignKey: "classHourId" });
    DB.igt_modules.hasMany(DB.sessions,   { foreignKey: "igtModuleId" });
    DB.sessions.belongsTo(DB.igt_modules, { foreignKey: "igtModuleId" });
    DB.users.hasMany(DB.sessions,         { foreignKey: "teacherId"   });
    DB.sessions.belongsTo(DB.users,       { foreignKey: "teacherId"   });
    
    //* SessionsChanged
    relationship(
        DB.sessionsChanged, { h: "hasMany" }, {
            others: [DB.sessions, DB.classHour],
            b: "belongsTo",
        }
    )
    // DB.sessionsChanged.hasMany(DB.sessions);
    // DB.se
    
    // * Enrrollment
    // relationship(
        // DB.enrollments, { h: "hasMany" }, { 
            // others: [DB.users, DB.modules],
            // b:      "belongsTo",
    // })

    return DB;
}

export const DB = initDb(_sequelize);