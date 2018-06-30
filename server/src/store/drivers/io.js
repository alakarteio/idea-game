module.exports = io => ({
  init: (store) => {
    io.on('connection', (socket) => {
      const dispatch = (action) => store.dispatch({ ...action, socketId: socket.id })

      // uppon connection, all messages are send to k-ramel, with socketId added
      socket.on('k-ramel/action', dispatch)
      socket.on('disconnect', () => dispatch({ type: '@@io/disconnect' }))
    })
  },

  // io (from socket.io is public in reactions)
  getDriver: () => ({
    // emit an action to
    // - all socket if first function parameter is null
    // - only one socket if the first function parameter is a string
    // - to all socket given with the first function parameter (array of socket id)
    emit: (socketId) => (action) => {
      if (socketId === undefined) {
        io.volatile.emit('k-ramel/action', action)
        return
      }

      const ids = [].concat(socketId)

      Object.keys(io.clients().sockets)
        .filter(id => ids.includes(id))
        .forEach(id => io.clients().sockets[id].volatile.emit('k-ramel/action', action))
    },
  })
})
