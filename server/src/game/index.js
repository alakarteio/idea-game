const ping = require('./ping')

module.exports = (store) => {
  store.listeners.add(ping)
}
