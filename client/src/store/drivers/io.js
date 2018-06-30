import io from 'socket.io-client'

export default () => {
  let socket

  return {
    init: (store) => {
      socket = io('http://localhost:3001')

      // set the socket id
      socket.on('connect', () => {
        store.client.id.set(socket.id)
      })

      // dispatch all socket.io events to k-ramel
      socket.on('k-ramel/action', store.dispatch)
    },

    getDriver: () => socket,
  }
}
