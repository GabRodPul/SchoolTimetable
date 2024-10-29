import { Dialect } from "sequelize";

const dbConfig = Object.freeze({
    HOST:       "localhost",
    USER:       "root",
    PASSWORD:   "1234",
    DB:         "db_schooltimetable",
    dialect:    "mysql" as Dialect,
    pool:       {
        max:        5,
        min:        0,
        acquire:    30_000,
        idle:       10_000
    }
});

export { dbConfig };