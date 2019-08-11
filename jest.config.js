/* eslint-disable @typescript-eslint/no-var-requires */
const base = require('./jest.base')

module.exports = {
  ...base,
  collectCoverage: true,
  projects: ['<rootDir>', '<rootDir>/packages/*'],
  coverageDirectory: '<rootDir>/coverage/'
}
