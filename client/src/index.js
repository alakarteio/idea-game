import { Application, Graphics } from 'pixi.js'
import store from './store'

const app = new Application()


const printPlayers = () => {
  const players = store.data.players.getAsArray()

  players.forEach(({ position }) => {
    console.log('draw a player')
    const rectangle = new Graphics();
    rectangle.lineStyle(4, 0xFF3300, 1);
    rectangle.beginFill(0xff0000);
    rectangle.drawRect(0, 0, 64, 64);
    rectangle.endFill();
    rectangle.x = position.x;
    rectangle.y = position.y;
    app.stage.addChild(rectangle);
  })
}

// FIXME: don't use setTimeout, but wait the document to be ready
setTimeout(() => {
  window.document.body.appendChild(app.view)

  printPlayers()
  store.subscribe(printPlayers)
}, 1000)
