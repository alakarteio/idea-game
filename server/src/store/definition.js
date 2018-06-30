const { types } = require('k-ramel')

module.exports = {
  data: {
    players: types.keyValue(),
  },
  client: {
    id: types.string(),
  },
}
