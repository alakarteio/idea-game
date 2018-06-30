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

module.exports = [
  when('@@io/connect')(({ socketId }, store, { io }) => {
    const username = USERNAMES[Math.round(Math.random() * (USERNAMES.length - 1))]

    store.data.players.add({ id: socketId, username })

    io.emit(socketId)({ type: '@@io/id', payload: socketId })
  })
]
