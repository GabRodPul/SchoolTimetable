export enum NodeEnv {
    Development = "DEV",
    Testing     = "TEST",
    Production  = "PROD",
}

export type Envvars = {
    NODE_ENV         : NodeEnv
    BEND_DB_DIALECT  : string    
    BEND_DB_NAME     : string    
    BEND_DB_USERNAME : string        
    BEND_DB_PASSWORD : string        
    BEND_PORT        : string
    BEND_VIEWS       : string
    SESSION_SECRET   : string
    JWT_SECRET       : string
    FEND_PORT        : string
    ADMIN_EMAIL      : string
    ADMIN_PASSWORD   : string
}