"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEnv = void 0;
const getEnv = (process) => ({
    BEND_DB_NAME: process.env.BEND_DB_NAME,
    BEND_DB_USERNAME: process.env.BEND_DB_USERNAME,
    BEND_DB_PASSWORD: process.env.BEND_DB_PASSWORD,
    BEND_PORT: process.env.BEND_PORT,
    FEND_PORT: process.env.FEND_PORT
});
exports.getEnv = getEnv;
