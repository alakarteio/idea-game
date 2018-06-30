const { when } = require('k-ramel')
const { broadcast, log } = require('./reactions')

const PRIVATE_ACTIONS = [
  '@@krml/EXCEPTION',
  '@@game/ping'
]

module.exports = [
  // TODO: maybe this is a bad idea since all players could see the game status and then cheat
  // send actions to client if
  // - this is not an exception
  // - this is not a private action
  when(
    /.*/,
    ({ type }) => !PRIVATE_ACTIONS.includes(type),
  )(broadcast),

  // log exceptions
  when('@@krml/EXCEPTION')(log('error')),
]
