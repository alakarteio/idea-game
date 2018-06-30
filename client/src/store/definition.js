import { types } from 'k-ramel'

// TODO: share this code with server
export default {
  data: {
    players: types.keyValue(),
  },
  client: {
    id: types.string(),
    velocity: {
      x: types.object({ defaultData: 0 }), // TODO: make it types.number
      y: types.object({ defaultData: 0 }),
    },
  }
}
