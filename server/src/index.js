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
