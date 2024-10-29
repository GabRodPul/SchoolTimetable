import { config } from "dotenv";
import * as path from "path"

config({ path: path.resolve(`${__dirname}/../../.env`) });
const envvars = {
    BEND_DB_NAME:       process.env.BEND_DB_NAME,
    BEND_DB_USERNAME:   process.env.BEND_DB_USERNAME,
    BEND_DB_PASSWORD:   process.env.BEND_DB_PASSWORD,
    BEND_PORT:          process.env.BEND_PORT,
    
    FEND_PORT:          process.env.FEND_PORT
};

export { envvars };