/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
export default {
  preset: "ts-jest/presets/default-esm",
  testEnvironment: "node",
  modulePathIgnorePatterns: ["<rootDir>/bin", "<rootDir>/node_modules"],
  verbose: true,
  clearMocks: true,
};
