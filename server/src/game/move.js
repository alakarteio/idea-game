const { when } = require('k-ramel')

module.exports = [
  // on tick (time -60 FPS-), we update all players positions
  when('@@server/tick')((action, store) => {
    const players = store.data.players.getAsArray()

    players.forEach(player => {
      store.data.players.update({
        ...player,
        position: {
          x: player.position.x + player.velocity.x,
          y: player.position.y + player.velocity.y,
        }
      })
    })
  }),

  when('@@krf/SET>CLIENT_VELOCITY>X')(({ socketId, payload }, store) => {
    const player = store.data.players.get(socketId)
    if (!player) return

    store.data.players.add({
      ...player,
      velocity: { ...player.velocity, x: payload },
    })
  }),
  when('@@krf/SET>CLIENT_VELOCITY>Y')(({ socketId, payload }, store) => {
    const player = store.data.players.get(socketId)
    if (!player) return

    store.data.players.add({
      ...player,
      velocity: { ...player.velocity, y: payload },
    })
  }),
]
