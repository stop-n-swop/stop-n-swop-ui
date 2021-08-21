/*
we make use of several import.meta properties exposed by vite
when testing we might need to implement / polyfill these
take a look at these resources:
'babel-plugin-transform-import-meta'
https://www.npmjs.com/package/vite-jest
*/

module.exports = {
  collectCoverage: false,
  collectCoverageFrom: [
    // '!**/dist/**',
    'src/**/*.{ts,tsx}',
  ],
  coverageDirectory: 'coverage',
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  setupFilesAfterEnv: [
    '@testing-library/jest-dom/extend-expect',
    'isomorphic-fetch',
  ],
  testMatch: ['<rootDir>/src/**/*.test.{ts,tsx}'],
  transformIgnorePatterns: [
    // ignore all node modules _except_ react-robot which doesn't have a commonjs version
    'node_modules/(?!(react-robot)/)',
  ],
  moduleNameMapper: {
    '^.+\\.(css|sass|scss)$': 'identity-obj-proxy',
    '^.+\\.(jpg|png|svg|gif)$': '<rootDir>/config/jest/fileStub.js',
  },
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
};
