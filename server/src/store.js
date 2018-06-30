const { createStore, types } = require('k-ramel')

module.exports = createStore({
  data: {
    players: types.keyValue(),
  },
})
