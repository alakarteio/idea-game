import { Application, Graphics } from 'pixi.js'
import store from './store'

const app = new Application()

const rectangle = new Graphics();
rectangle.lineStyle(4, 0xFF3300, 1);
rectangle.beginFill(0x66CCFF);
rectangle.drawRect(0, 0, 64, 64);
rectangle.endFill();
rectangle.x = 170;
rectangle.y = 170;
app.stage.addChild(rectangle);

// FIXME: don't use setTimeout, but wait the document to be ready
setTimeout(() => {
  window.document.body.appendChild(app.view)
}, 1000)
