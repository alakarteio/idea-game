module.exports = {
  broadcast: (action, store, { io }) => {
    io.emit()({ ...action, server: true })
  },

  log: severity => (action) => {
    console[severity](`[${severity}] idea-game`, action)
  }
}
