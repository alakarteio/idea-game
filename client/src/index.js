import { Application, Graphics } from 'pixi.js'
import store from './store'

const app = new Application()

// from https://github.com/kittykatattack/learningPixi#keyboard
function keyboard(keyCode) {
  let key = {};
  key.code = keyCode;
  key.isDown = false;
  key.isUp = true;
  key.press = undefined;
  key.release = undefined;
  //The `downHandler`
  key.downHandler = event => {
    if (event.keyCode === key.code) {
      if (key.isUp && key.press) key.press();
      key.isDown = true;
      key.isUp = false;
    }
    event.preventDefault();
  };

  //The `upHandler`
  key.upHandler = event => {
    if (event.keyCode === key.code) {
      if (key.isDown && key.release) key.release();
      key.isDown = false;
      key.isUp = true;
    }
    event.preventDefault();
  };

  //Attach event listeners
  window.addEventListener(
    "keydown", key.downHandler.bind(key), false
  );
  window.addEventListener(
    "keyup", key.upHandler.bind(key), false
  );
  return key;
}

let players = {}
const createPlayers = () => {
  // remove old players
  Object.entries(players).forEach(([id, rectangle]) => {
    const toRemove = !store.data.players.hasKey(id)
    if (toRemove) {
      delete players[id]
      app.stage.removeChild(rectangle)
    }
  })

  // for all remaining players, create them
  store.data.players.getAsArray().forEach((player) => {
    let rectangle = players[player.id]

    if (!rectangle) {
      rectangle = new Graphics();
      rectangle.beginFill(player.id === store.client.id.get() ? 0x00ff00 : 0xff0000);
      rectangle.drawRect(0, 0, 64, 64);
      rectangle.endFill();
      rectangle.x = player.position.x
      rectangle.y = player.position.y

      players[player.id] = rectangle
      app.stage.addChild(rectangle);
    }
  })
}

const updatePlayers = () => {
  store.data.players.getAsArray().forEach((player) => {
    let rectangle = players[player.id]

    if (!rectangle) return

    rectangle.x += player.velocity.x
    rectangle.y += player.velocity.y
  })
}

document.addEventListener('DOMContentLoaded', () => {
  window.document.body.appendChild(app.view)

  // me
  const getId = () => store.client.id.get()
  const getVelocity = () => store.data.players.get(getId()).velocity

  // print players
  createPlayers()
  store.subscribe(createPlayers)
  app.ticker.add(updatePlayers)

  // keyboard events
  const up = keyboard(38)
  const down = keyboard(40)
  const left = keyboard(37)
  const right = keyboard(39)

  up.press = () => store.client.velocity.y.set(-10)
  up.release = () => store.client.velocity.y.set(0)
  down.press = () => store.client.velocity.y.set(10)
  down.release = () => store.client.velocity.y.set(0)
  left.press = () => store.client.velocity.x.set(-10)
  left.release = () => store.client.velocity.x.set(0)
  right.press = () => store.client.velocity.x.set(10)
  right.release = () => store.client.velocity.x.set(0)
})
