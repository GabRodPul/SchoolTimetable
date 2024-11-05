import { config } from "dotenv";
import * as path from "path"
import { getEnv } from "../../common/get_env"

config({ path: path.resolve(`${__dirname}/../.env`) });
const envvars = getEnv( process );
export { envvars };