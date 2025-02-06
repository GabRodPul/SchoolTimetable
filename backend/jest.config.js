const tsconfig         = require("./tsconfig.json");
const { pathsToModuleNameMapper } = require("ts-jest");
// const moduleNameMapper = require("tsconfig-paths-jest")(tsconfig);


/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  moduleNameMapper: pathsToModuleNameMapper(tsconfig.compilerOptions.paths, { prefix: "<rootDir>" }),
  testEnvironment: "node",
  transform: {
    "^.+.ts?$": ["ts-jest",{}],
  },
  moduleDirectories: [ 
    "node_modules",
    "../common"
  ],
  testMatch: [ "**/__tests__/*.tests.ts"  ],
  rootDir: "./",
  preset: "ts-jest",
  setupFiles: ["./src/env.ts"]
};