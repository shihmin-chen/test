import type { Config } from '@jest/types';

import { getXuiAssetsAlias } from './scripts/getViteAlias';

/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

process.env.TZ = 'UTC';

const jestConfig: Config.InitialOptions = {
  // Automatically clear mock calls and instances between every test
  clearMocks: true,

  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: false,

  // The directory where Jest should output its coverage files
  coverageDirectory: 'coverage',

  // An array of regexp pattern strings used to skip coverage collection
  coveragePathIgnorePatterns: [
    '/node_modules/',
    'demo\\.vue',
    'dist/',
    'config\\.json',
    '/demo/',
    '\\.data\\.ts',
    '\\.data\\.js',
  ],
  testPathIgnorePatterns: ['ignore\\.spec\\.ts'],

  coverageReporters: ['text', 'lcov', 'text-summary'],

  verbose: true,

  // An array of glob patterns indicating a set of files for which coverage information should be collected. If a file matches the specified glob pattern, coverage information will be collected for it even if no tests exist for this file and it's never required in the test suite.
  collectCoverageFrom: ['**/src/**', '!**/*ignore.spec.ts'],

  // An array of file extensions your modules use
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'vue'],

  // A preset that is used as a base for Jest's configuration
  preset: 'ts-jest',

  // A list of paths to modules that run some code to configure or set up the testing framework before each test
  setupFilesAfterEnv: ['./jest-setup.js'],

  setupFiles: ['fake-indexeddb/auto'],

  // The test environment that will be used for testing
  testEnvironment: 'jsdom',

  testEnvironmentOptions: {
    customExportConditions: ['node', 'node-addons'],
  },

  // A map from regular expressions to paths to transformers
  transform: {
    '^.+\\.js$': 'babel-jest',
    '^.+\\.(jsx|mjs|cjs|ts|tsx)$': 'babel-jest',
    '^.+\\.vue$': './vue3-jest-hack.js',
    '^.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2|svg|svg\\?url)$':
      'jest-transform-stub',
  },

  // rootDir: '.',

  // moduleDirectories: ['src', 'node_modules'],

  // modulePathIgnorePatterns: ['<rootDir>/dist/'],

  moduleNameMapper: {
    // override
    '^.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2|svg|svg\\?url)$':
      'jest-transform-stub',
    '^.+\\.(svg\\?component)$': '<rootDir>/__mocks__/svgComponentMock.js',
    '\\.(css|less)$': '<rootDir>/__mocks__/styleMock.js',
    '^@xui-assets(.*)$': getXuiAssetsAlias()['@xui-assets'] + '$1',
  },

  transformIgnorePatterns: [
    '^(node_modules\\/).+(node_modules\\/p-queue\\/dist\\/index.js)$',
  ],

  coverageProvider: 'v8',
};

export default jestConfig;
