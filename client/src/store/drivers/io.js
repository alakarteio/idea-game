import io from 'socket.io-client'
import { when } from 'k-ramel'

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

      // dispatch all k-ramel events to socket.io server
      store.listeners.add([
        when(/.*/)(action => socket.emit('k-ramel/action', action))
      ])
    },

    getDriver: () => socket,
  }
}
