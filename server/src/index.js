const socketIo = require('socket.io')
const createStore = require('./store')
const game = require('./game')

const PORT = process.env.PORT || 3000

const io = socketIo(PORT, {
  serveClient: false,
})

const store = createStore({ io })

// start game
game(store)

// TODO: ctrl+c

// from http://www.fantasynamegenerators.com/username-generator.php
// const USERNAMES = [
//   'Conjursa',
//   'Laserpent',
//   'Troutwards',
//   'Draccoon',
//   'OldRascal',
//   'ScienceHorse',
//   'CheeryPuggle',
//   'NaughtyGeneral',
//   'FastCub',
//   'DietBanshee',
// ]

// io.on('connection', (socket) => {
//   socket.on('k-ramel/action', (...args) => {
//     console.log(args)
//   })

//   // add the player
//   // store.data.players.add({ id: socket.id, name: USERNAMES[Math.round(Math.random() * (USERNAMES.length - 1))] })

//   // give it the current state
//   // socket.emit('init', store.getState())

//   /* io.on('*', (message) => {
//     console.log({ message })
//   })

//   socket.on('my-ping', () => {
//     socket.emit('my-pong', 'dummy')
//   })*/
// })
