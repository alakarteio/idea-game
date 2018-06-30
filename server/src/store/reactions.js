module.exports = {
  broadcast: (action, store, { io }) => {
    console.log('broadcast', action.type)
    io.emit()({ ...action, server: true })
  },

  log: severity => (action) => {
    console[severity](`[${severity}] idea-game`, action)
  }
}
