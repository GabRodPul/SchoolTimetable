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


const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host:               dbConfig.HOST,
    dialect:            dbConfig.dialect,
    operatorsAliases:   undefined,
    pool:               dbConfig.pool
});

const DB = Object.freeze({
    sequelize,
    users:           UserModel.init(sequelize),
    groups:          GroupModel.init(sequelize),
    courses:         CourseModel.init(sequelize),
    modules:         ModuleModel.init(sequelize),
    igt_modules:     IGTModuleModel.init(sequelize),
    enrollments:     EnrollmentModel.init(sequelize),
    warnings:        WarningModel.init(sequelize),
    classHour:       ClassHourModel.init(sequelize),
    sessions:        SessionModel.init(sequelize),
    sessionsChanged: SessionChangedModel.init(sequelize),
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
    DB.groups, { h: "hasMany" }, {
        others: [ DB.igt_modules ],
        b:      "belongsTo"
    }
)

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

// * ModuleIGP
relationship(
    DB.igt_modules, { h: "hasMany" }, { 
        others: [DB.groups, DB.modules, DB.users],
        b:      "belongsTo",
})


// * Sessions
relationship(
    DB.sessions, { h: "hasMany" }, {
        others:  [DB.classHour, DB.igt_modules],
        b:      "belongsTo",
    }
)

//* SessionsChanged
relationship(
    DB.sessionsChanged, { h: "hasMany" }, {
        others: [DB.sessions, DB.classHour],
        b: "belongsTo",
    }
)

// * Enrrollment
relationship(
    DB.enrollments, { h: "hasMany" }, { 
        others: [DB.users, DB.modules],
        b:      "belongsTo",
})

export { DB };