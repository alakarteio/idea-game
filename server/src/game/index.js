const ping = require('./ping')
const addPlayer = require('./addPlayer')
const move = require('./move')

module.exports = (store) => {
  setInterval(
    () => { store.dispatch('@@server/tick') },
    1000 / 60, /* 60 FPS */
  )

  store.listeners.add(ping)
  store.listeners.add(addPlayer)
  store.listeners.add(move)
}
