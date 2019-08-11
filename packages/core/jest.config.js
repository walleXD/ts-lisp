/* eslint-disable @typescript-eslint/no-var-requires */
const base = require('../../jest.base.js')
const pack = require('./package')

module.exports = {
  ...base,
  name: pack.name,
  displayName: pack.name
}
