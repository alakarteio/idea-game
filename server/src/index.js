const http = require('http')
const Koa = require('koa')
const socketIo = require('socket.io')

const PORT = process.env.PORT || 3000
const LISTEN_HOST = process.env.LISTEN_HOST || '0.0.0.0'

const app = new Koa()
const server = http.createServer(app.callback())
const io = socketIo(server)

server.listen(PORT, LISTEN_HOST, () => {
  console.log(`Listening on ${LISTEN_HOST}:${PORT}`)
})

// TODO: ctrl+c

io.on('connection', socket => {
  console.log({ socket })
  io.emit('some event', { for: 'everyone' })
})
