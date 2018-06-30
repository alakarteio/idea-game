const { createStore } = require('k-ramel')
const definitions = require('./definition')
const listeners = require('./listeners')
const drivers = require('./drivers')

module.exports = (context) => createStore(
  definitions,
  {
    listeners,
    drivers: drivers(context),
  },
)
