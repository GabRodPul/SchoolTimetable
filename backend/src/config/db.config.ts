import { Dialect } from "sequelize";
import { envvars } from "../env";

const dbConfig = Object.freeze({
    HOST:       envvars.BEND_DB_HOST!,
    USER:       envvars.BEND_DB_USERNAME!,
    PASSWORD:   envvars.BEND_DB_PASSWORD!,
    DB:         envvars.BEND_DB_NAME!,
    dialect:    envvars.BEND_DB_DIALECT! as Dialect,
    pool:       {
        max:        5,
        min:        0,
        acquire:    30_000,
        idle:       10_000
    }
});

export { dbConfig };
