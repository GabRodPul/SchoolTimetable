const getEnv = (process: NodeJS.Process) => ({ // It may complay that NodeJS.Process can't be found. Ignore it.
    NODE_ENV:               process.env.NODE_ENV,

    DEV_BEND_DB_DIALECT:    process.env.DEV_BEND_DB_DIALECT,
    DEV_BEND_DB_NAME:       process.env.DEV_BEND_DB_NAME,
    DEV_BEND_DB_USERNAME:   process.env.DEV_BEND_DB_USERNAME,
    DEV_BEND_DB_PASSWORD:   process.env.DEV_BEND_DB_PASSWORD,
    DEV_BEND_PORT:          process.env.DEV_BEND_PORT,
    DEV_BEND_VIEWS:         process.env.DEV_BEND_VIEWS,
    DEV_JWT_SECRET:         process.env.DEV_JWT_SECRET,    
    DEV_FEND_PORT:          process.env.DEV_FEND_PORT,
    DEV_ADMIN_EMAIL:        process.env.DEV_ADMIN_EMAIL,
    DEV_ADMIN_PASSWORD:     process.env.DEV_ADMIN_PASSWORD,

    TEST_BEND_DB_DIALECT:   process.env.TEST_BEND_DB_DIALECT,
    TEST_BEND_DB_NAME:      process.env.TEST_BEND_DB_NAME,
    TEST_BEND_DB_USERNAME:  process.env.TEST_BEND_DB_USERNAME,
    TEST_BEND_DB_PASSWORD:  process.env.TEST_BEND_DB_PASSWORD,
    TEST_BEND_PORT:         process.env.TEST_BEND_PORT,
    TEST_BEND_VIEWS:        process.env.TEST_BEND_VIEWS,
    TEST_JWT_SECRET:        process.env.TEST_JWT_SECRET,
    TEST_FEND_PORT:         process.env.TEST_FEND_PORT,
    TEST_ADMIN_EMAIL:       process.env.TEST_ADMIN_EMAIL,
    TEST_ADMIN_PASSWORD:    process.env.TEST_ADMIN_PASSWORD,

    PROD_BEND_DB_DIALECT:   process.env.PROD_BEND_DB_DIALECT,
    PROD_BEND_DB_NAME:      process.env.PROD_BEND_DB_NAME,
    PROD_BEND_DB_USERNAME:  process.env.PROD_BEND_DB_USERNAME,
    PROD_BEND_DB_PASSWORD:  process.env.PROD_BEND_DB_PASSWORD,
    PROD_BEND_PORT:         process.env.PROD_BEND_PORT,
    PROD_BEND_VIEWS:        process.env.PROD_BEND_VIEWS,
    PROD_JWT_SECRET:        process.env.PROD_JWT_SECRET,
    PROD_FEND_PORT:         process.env.PROD_FEND_PORT,
    PROD_ADMIN_EMAIL:       process.env.PROD_ADMIN_EMAIL,
    PROD_ADMIN_PASSWORD:    process.env.PROD_ADMIN_PASSWORD,
});

export { getEnv };
