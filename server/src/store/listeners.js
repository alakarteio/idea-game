const { when } = require('k-ramel')
const { broadcast, log } = require('./reactions')

const PRIVATE_ACTIONS = [
  '@@krml/EXCEPTION',
  '@@game/ping',
  '@@krf/SET>CLIENT>ID',
]

module.exports = [
  // TODO: maybe this is a bad idea since all players could see the game status and then cheat
  // send actions to client if
  // - this is not a private action (from regular exception -begins with @@server-)
  // - this is not a private action (from type -private server action hardcoded-)
  // - there is no socketId (meaning this is a private action -client-)
  when(
    ({ type }) => !/@@server\/.*/.test(type),
    ({ type }) => !PRIVATE_ACTIONS.includes(type),
    ({ socketId }) => socketId === undefined,
  )(broadcast),

  // log exceptions
  when('@@krml/EXCEPTION')(log('error')),
]
