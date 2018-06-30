const ping = require('./ping')
const addPlayer = require('./addPlayer')
const move = require('./move')

module.exports = (store) => {
  store.listeners.add(ping)
  store.listeners.add(addPlayer)
  store.listeners.add(move)
}
