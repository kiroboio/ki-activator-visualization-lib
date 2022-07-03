import apple_normal from "../assets/images/apple_normal.png";
import apple_golden from "../assets/images/apple_golden.png";
import apple_rotten from "../assets/images/apple_rotten.png";
import rock from "../assets/images/rock.png";
import hourglass from "../assets/images/hourglass.png";
import check from "../assets/images/check.png";
import circle_check from "../assets/images/circle_check.png";
import clock from "../assets/images/clock.png";
import coin from "../assets/images/coin.png";
import gold_coin from "../assets/images/gold_coin.png";
import bless from "../assets/images/bless.png";
import bg from "../assets/images/bg.png";
import bg2 from "../assets/images/bg2.png";
import dude from "../assets/images/dude.png";
import owlet from "../assets/images/owlet.png";
import fruits from "../assets/images/fruits.png";
import collect from "../assets/images/collect.png";
import collect2 from "../assets/images/collect2.png";
import kirobo_logo from "../assets/images/kirobo-logo.png";
import explosionBlue from "../assets/images/explosion-blue-circle.png";
import monster2 from "../assets/images/monster.png";
import { loadCharacterSprite } from "./loadCharacterSprite";

export const preload = (k) => {
  loadCharacterSprite(k)("monster2", monster2);
  loadCharacterSprite(k)("owlet", owlet);
  loadCharacterSprite(k)("dude", dude);

  k.loadSprite("bg", bg);
  k.loadSprite("bg2", bg2);
  k.loadSprite("rock", rock);
  k.loadSprite("clock", clock);
  k.loadSprite("check", check);
  k.loadSprite("hourglass", hourglass);
  k.loadSprite("kirobo_logo", kirobo_logo);
  k.loadSprite("apple_golden", apple_golden);
  k.loadSprite("apple_normal", apple_normal);
  k.loadSprite("apple_rotten", apple_rotten);
  k.loadSprite("circle_check", circle_check);

  k.loadSprite("coin", coin, {
    sliceX: 6,
    anims: {
      rotate: {
        from: 1,
        to: 5,
        loop: true,
      },
    },
  });

  k.loadSprite("gold_coin", gold_coin, {
    sliceX: 5,
    anims: {
      rotate: {
        from: 1,
        to: 4,
        loop: true,
      },
    },
  });

  k.loadSprite("bless", bless, {
    sliceX: 4,
    anims: {
      rotate: {
        from: 1,
        to: 3,
        loop: true,
      },
    },
  });

  k.loadSprite("explosion", explosionBlue, {
    sliceX: 10,
    anims: {
      explode: {
        from: 1,
        to: 9,
        speed: 15,
      },
    },
  });

  k.loadSprite("fruits", fruits, {
    sliceX: 38,
    sliceY: 6,
  });

  k.loadSprite("collect", collect, {
    sliceX: 13,
    anims: {
      collect: {
        from: 1,
        to: 12,
      },
    },
  });

  k.loadSprite("collect2", collect2, {
    sliceX: 11,
    anims: {
      collect: {
        from: 1,
        to: 10,
      },
    },
  });
};
