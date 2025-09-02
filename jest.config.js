module.exports = {
  testEnvironment: "node",
  setupFilesAfterEnv: ["<rootDir>/__tests__/setup.js"],
  testMatch: ["<rootDir>/__tests__/**/*.test.js"],
  collectCoverageFrom: ["src/**/*.js", "!src/app.js", "!src/server.js"],
  coverageDirectory: "coverage",
  verbose: true,
  testTimeout: 30000,
};
