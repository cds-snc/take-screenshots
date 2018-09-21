module.exports = {
  setupFiles: ["<rootDir>/jest.setup.js"],
  testPathIgnorePatterns: [
    "<rootDir>/.next/",
    "<rootDir>/node_modules/",
    "<rootDir>/__tests__/fixtures/",
    "<rootDir>/testcafe"
  ],
  collectCoverageFrom: [
    "pages/*.js",
    "components/*.js",
    "components/stats/*.js",
    "selectors/*.js",
    "utils/url_check_test.js"
  ],
  coveragePathIgnorePatterns: ["pages/_app.js", "pages/_document.js"],
  coverageThreshold: {
    global: {
      branches: 0,
      functions: 0,
      lines: 0,
      statements: 0
    }
  }
};
