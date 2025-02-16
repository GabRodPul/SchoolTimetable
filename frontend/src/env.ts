import { config } from "dotenv";
import path from "path"
import { getEnv } from "#common/get-env"

// config({ path: path.resolve(`${__dirname}/../.env`) });
// config({ path: path.resolve(`./../.env`) });
const envvars = { // It may complain that NodeJS.Process can't be found. Ignore it.
    BEND_DB_NAME:       import.meta.env.BEND_DB_NAME,
    BEND_DB_USERNAME:   import.meta.env.BEND_DB_USERNAME,
    BEND_DB_PASSWORD:   import.meta.env.BEND_DB_PASSWORD,
    BEND_PORT:          import.meta.env.BEND_PORT,
    
    FEND_PORT:          import.meta.env.FEND_PORT
};

export { envvars };