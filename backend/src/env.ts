import { config } from "dotenv";
import * as path from "path"
import { getEnv } from "../../common/get-env"

config({ path: `${__dirname}/../../../../.env` });
const envvars = getEnv( process );
export { envvars };