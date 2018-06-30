import io from 'socket.io-client'

export default () => {
  let socket

  return {
    init: (store) => {
      socket = io('http://localhost:3001')

      // dispatch all socket.io events to k-ramel
      socket.on('k-ramel/action', store.dispatch)
    },

    getDriver: () => socket,
  }
}
