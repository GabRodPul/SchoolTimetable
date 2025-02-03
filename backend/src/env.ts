import { config } from "dotenv";
// import * as path from "path"
import { getEnv } from "#common/get-env"
import { enumStrVals } from "./utils/data";
import { Envvars, NodeEnv } from "#common/@types/env"

const path = process.env.NODE_ENV?.toUpperCase() === "TEST"
           ? `${__dirname}/../../.env`
           : `${__dirname}/../../../../.env`;

config({ path });
const _env: () => Envvars = () => {
    const e         = getEnv( process );
    const NODE_ENV  = e.NODE_ENV!.toUpperCase() as NodeEnv;
    const validEnvs = enumStrVals(NodeEnv).values;
    if ( !validEnvs.includes(NODE_ENV) ) {
        const err = `Enviroment setup failed, make sure NODE_ENV is one of: ${validEnvs}`;
        throw new Error(err);
    }

    const envK
    : Record<keyof Omit<Envvars, "NODE_ENV">, string> = {
        BEND_DB_DIALECT:    `${NODE_ENV}_BEND_DB_DIALECT` ,
        BEND_DB_NAME:       `${NODE_ENV}_BEND_DB_NAME`    ,
        BEND_DB_USERNAME:   `${NODE_ENV}_BEND_DB_USERNAME`,
        BEND_DB_PASSWORD:   `${NODE_ENV}_BEND_DB_PASSWORD`,
        BEND_PORT:          `${NODE_ENV}_BEND_PORT`       ,
        BEND_VIEWS:         `${NODE_ENV}_BEND_VIEWS`      ,
        SESSION_SECRET:     `${NODE_ENV}_SESSION_SECRET`  ,
        JWT_SECRET:         `${NODE_ENV}_JWT_SECRET`      ,
        FEND_PORT:          `${NODE_ENV}_FEND_PORT`       ,
        ADMIN_EMAIL:        `${NODE_ENV}_ADMIN_EMAIL`     ,
        ADMIN_PASSWORD:     `${NODE_ENV}_ADMIN_PASSWORD`  ,
    };

    const missing = Object
                    .values(envK)
                    .filter(v => (e as any)[v] === undefined);

    if ( missing.length > 0 ) {
        let err = `Missing envvars for NODE_ENV=${NODE_ENV}: [\n`
        for ( let i = 0; i < missing.length; ++i )
            err += `\t${missing[i]},\n`;
        err += "]\nFor devs: check get-env.ts, are they missing there?";
        throw new Error(err);
    }

    return {
        NODE_ENV,
        BEND_DB_DIALECT     : (e as any)[envK.BEND_DB_DIALECT ]!,
        BEND_DB_NAME        : (e as any)[envK.BEND_DB_NAME    ]!,    
        BEND_DB_USERNAME    : (e as any)[envK.BEND_DB_USERNAME]!,        
        BEND_DB_PASSWORD    : (e as any)[envK.BEND_DB_PASSWORD]!,        
        BEND_PORT           : (e as any)[envK.BEND_PORT       ]!,
        BEND_VIEWS          : (e as any)[envK.BEND_VIEWS      ]!,
        SESSION_SECRET      : (e as any)[envK.SESSION_SECRET  ]!,
        JWT_SECRET          : (e as any)[envK.JWT_SECRET      ]!,
        FEND_PORT           : (e as any)[envK.FEND_PORT       ]!,
        ADMIN_EMAIL         : (e as any)[envK.ADMIN_EMAIL     ]!,
        ADMIN_PASSWORD      : (e as any)[envK.ADMIN_PASSWORD  ]!,
    } as Envvars;
};

const envvars = _env();
console.log( `Loaded enviroment NODE_ENV="`+envvars.NODE_ENV+`"` );

export { envvars };