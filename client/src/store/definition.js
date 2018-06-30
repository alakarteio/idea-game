import { types } from 'k-ramel'

// TODO: share this code with server
export default {
  data: {
    players: types.keyValue(),
  },
  client: {
    id: types.string(),
  }
}
