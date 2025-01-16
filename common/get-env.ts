const getEnv = (process: NodeJS.Process) => ({ // It may complay that NodeJS.Process can't be found. Ignore it.
    BEND_DB_DIALECT:    process.env.BEND_DB_DIALECT,
    BEND_DB_NAME:       process.env.BEND_DB_NAME,
    BEND_DB_USERNAME:   process.env.BEND_DB_USERNAME,
    BEND_DB_PASSWORD:   process.env.BEND_DB_PASSWORD,
    BEND_PORT:          process.env.BEND_PORT,
    BEND_VIEWS:         process.env.BEND_VIEWS,
    JWT_SECRET:         process.env.JWT_SECRET,
    
    FEND_PORT:          process.env.FEND_PORT
});

export { getEnv };
