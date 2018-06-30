import { Application, Graphics } from 'pixi.js'
import store from './store'

const app = new Application()

let players = {}

const printPlayers = () => {
  // remove old players
  Object.entries(players).forEach(([id, rectangle]) => {
    const toRemove = !store.data.players.hasKey(id)
    if (toRemove) {
      delete players[id]
      app.stage.removeChild(rectangle)
    }
  })

  // for all remaining players
  store.data.players.getAsArray().forEach((player) => {
    let rectangle = players[player.id]

    if (!rectangle) {
      rectangle = new Graphics();
      rectangle.beginFill(player.id === store.client.id.get() ? 0x00ff00 : 0xff0000);
      rectangle.drawRect(0, 0, 64, 64);
      rectangle.endFill();

      players[player.id] = rectangle
      app.stage.addChild(rectangle);
    }

    rectangle.x = player.position.x;
    rectangle.y = player.position.y;
  })
}

document.addEventListener('DOMContentLoaded', () => {
  window.document.body.appendChild(app.view)

  printPlayers()
  store.subscribe(printPlayers)
})
