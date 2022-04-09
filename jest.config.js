module.exports = {
  testEnvironment: "jsdom",
  testPathIgnorePatterns: ["/node_modules"],
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.js"],
  setupFilesAfterEnv: ["<rootDir>/.jest/setup.js"],
  modulePaths: ["<rootDir>/src/"],
};
