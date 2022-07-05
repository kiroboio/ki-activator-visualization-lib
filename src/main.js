import kaboom from "kaboom";
import { Z_BG, Z_FLOOR } from "./consts";
import { createCircleCheck } from "./gameObjects/checkIcon";
import { createFruit } from "./gameObjects/fruit";
import { createOperator } from "./gameObjects/operator";
import { preload } from "./preload";
import {
  collectFruit,
  destroyFruit,
  setFruitAvailability,
} from "./utils/game_utils";

function createGame(options) {
  const k = kaboom({
    width: 1000,
    height: 430,
    scale: 1,
    background: [0, 0, 0, 0],
    font: "sinko",
    // crisp:true,
    debug: false,
    ...options,
  });
  const _sprite = k.sprite;
  const sprites = new Set();
  k.sprite = (...args) => {
    console.log("args[0]:", args[0]);
    sprites.add(args[0]);
    console.log("sprites:", sprites);

    return _sprite(...args);
  };

  preload(k).then(() => {
    console.log("preload loaded:");
  });

  // const GROUND_Y = height() - 80
  const GROUND_Y = height() - 20;
  const X_OFFSET = 130;
  const FRUITS_POS = {
    top: 0,
    bottom: height() - 100,
  };

  k.onLoad(() => {
    console.log("game load");
    k.add([
      k.sprite("bg2"),
      k.opacity(1),
      k.pos(k.width() / 2, k.height()),
      k.origin("bot"),
      k.z(Z_BG),
    ]);

    k.add([
      k.solid(),
      k.area(),
      k.rect(k.width(), 0),
      k.pos(0, GROUND_Y - 4),
      k.z(Z_FLOOR),
      "ground",
    ]);
  });
  // window.polygon = []
  // k.onUpdate(() => {
  // 	const last = window.polygon[window.polygon.length - 1]
  // 	k.drawLine({
  // 		p1: last || k.vec2(0, 0),
  // 		p2: k.mousePos(),
  // 		width: 4,
  // 		color: k.rgb(0, 0, 255),
  // 		fixed: true,
  // 	})
  // 	k.drawLines({
  // 		pts: window.polygon,
  // 		width: 4,
  // 		color: k.rgb(0, 0, 255),
  // 	})
  // })
  // k.onClick(() => {
  // 	window.polygon.push(mousePos())
  // })

  return {
    k,
    createOperator: createOperator(k, X_OFFSET, GROUND_Y),
    createFruit: createFruit(k, X_OFFSET, FRUITS_POS),
    destroyFruit: destroyFruit(k),
    collectFruit: collectFruit(k),
    setFruitAvailability: setFruitAvailability(k),
    createCircleCheck: createCircleCheck(k),
  };
}

module.exports = {
  createGame,
};
