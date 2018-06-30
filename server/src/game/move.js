const { when } = require('k-ramel')

module.exports = [
  when('@@krf/SET>CLIENT_VELOCITY>X')(({ socketId, payload }, store) => {
    const player = store.data.players.get(socketId)
    if (!player) return

    store.data.players.update({ id: socketId, velocity: { ...player.velocity, x: payload } })
  }),
  when('@@krf/SET>CLIENT_VELOCITY>Y')(({ socketId, payload }, store) => {
    const player = store.data.players.get(socketId)
    if (!player) return

    store.data.players.update({ id: socketId, velocity: { ...player.velocity, y: payload } })
  }),
]
