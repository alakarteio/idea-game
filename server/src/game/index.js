const ping = require('./ping')
const addPlayer = require('./addPlayer')

module.exports = (store) => {
  store.listeners.add(ping)
  store.listeners.add(addPlayer)
}
