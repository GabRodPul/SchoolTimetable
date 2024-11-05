import { Dialect } from "sequelize";
import { envvars } from "../../../common/env";

const dbConfig = Object.freeze({
    HOST:       "localhost",
    USER:       envvars.BEND_DB_USERNAME!,
    PASSWORD:   envvars.BEND_DB_PASSWORD!,
    DB:         envvars.BEND_DB_NAME!,
    dialect:    "mysql" as Dialect,
    pool:       {
        max:        5,
        min:        0,
        acquire:    30_000,
        idle:       10_000
    }
});

export { dbConfig };