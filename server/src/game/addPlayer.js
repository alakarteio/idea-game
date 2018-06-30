const { when } = require('k-ramel')

const USERNAMES = [
  'Conjursa',
  'Laserpent',
  'Troutwards',
  'Draccoon',
  'OldRascal',
  'ScienceHorse',
  'CheeryPuggle',
  'NaughtyGeneral',
  'FastCub',
  'DietBanshee',
]

const random = max => Math.round(Math.random() * max)

module.exports = [
  when('@@io/connect')(({ socketId }, store, { io }) => {
    const username = USERNAMES[random(USERNAMES.length - 1)]

    io.emit(socketId)({ type: '@@krf/SET>CLIENT>ID', payload: socketId })
    io.emit(socketId)({ type: '@@krf/SET>DATA>PLAYERS', payload: store.data.players.getAsArray() })

    store.data.players.add({
      id: socketId,
      username,
      position: {
        x: random(800),
        y: random(600),
      },
    })
  }),

  when('@@io/disconnect')(({ socketId }, store) => {
    store.data.players.remove(socketId)
  }),
]
