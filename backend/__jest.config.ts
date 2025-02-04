import type { Config } from '@jest/types';
// Sync object
export const jestConfig: Config.InitialOptions = {
  clearMocks: true,
  preset: "ts-jest",
  verbose: true,
  testMatch: ["**/tests/**.ts"],
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  testEnvironment: "node",
  coveragePathIgnorePatterns: [
      "/node_modules/"
  ]
};