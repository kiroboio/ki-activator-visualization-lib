import { inside } from "../utils";
import { createCatchEffect } from "./catchEffect";
import { createCollectEffect } from "./collectEffect";
import { createExplosion } from "./explosion";

const polygon = [
  { x: 88, y: 298 },
  { x: 141, y: 182 },
  { x: 198, y: 175 },
  { x: 209, y: 136 },
  { x: 245, y: 138 },
  { x: 243, y: 80 },
  { x: 287, y: 94 },
  { x: 270, y: 60 },
  { x: 327, y: 65 },
  { x: 387, y: 49 },
  { x: 412, y: 85 },
  { x: 376, y: 99 },
  { x: 417, y: 122 },
  { x: 423, y: 89 },
  { x: 558, y: 49 },
  { x: 576, y: 82 },
  { x: 553, y: 104 },
  { x: 574, y: 114 },
  { x: 594, y: 111 },
  { x: 588, y: 86 },
  { x: 643, y: 68 },
  { x: 717, y: 82 },
  { x: 727, y: 149 },
  { x: 739, y: 132 },
  { x: 734, y: 99 },
  { x: 758, y: 77 },
  { x: 808, y: 93 },
  { x: 783, y: 114 },
  { x: 831, y: 133 },
  { x: 812, y: 150 },
  { x: 805, y: 179 },
  { x: 828, y: 174 },
  { x: 912, y: 262 },
  { x: 876, y: 328 },
  { x: 566, y: 233 },
  { x: 556, y: 256 },
  { x: 473, y: 274 },
  { x: 400, y: 241 },
  { x: 312, y: 277 },
  { x: 262, y: 292 },
  { x: 233, y: 253 },
  { x: 186, y: 280 },
  { x: 181, y: 319 },
  { x: 88, y: 298 },
];
const simplifiedPolygon = polygon.map(({ x, y }) => [x, y]);

const getRandomFruitInstantiationPos = (k, X_OFFSET, FRUITS_POS) => () => {
  let isInside = false;
  let _pos = k.vec2(0, 0);

  while (!isInside) {
    _pos = k.vec2(
      k.randi(X_OFFSET, k.width() - X_OFFSET),
      k.randi(FRUITS_POS.top, FRUITS_POS.bottom)
    );
    isInside = inside(_pos, simplifiedPolygon);
  }

  return _pos;
};

export const createFruit =
  (k, X_OFFSET, FRUITS_POS) => (address, amount, isAvailable) => {
    const availabilityState = k.state("available", ["available", "pending"]);

    const fruit = k.add([
      // k.sprite('fruits', {
      //     // frame: k.choose(Array(6).fill().map((_, i) => (i * 38) + 9)),
      //     frame: k.randi(38 * 6),
      // }),
      k.sprite("apple_normal"),
      // k.sprite("coin", { anim: "rotate" }),
      // k.sprite(k.choose(["gold_coin"]), { anim: "rotate" }),
      // k.sprite(k.choose(['apple_rotten', 'apple_normal', 'apple_golden'])),
      // k.choose([
      //   k.sprite("fruits", {
      //     // frame: choose(Array(6).fill().map((_, i) => (i * 38) + 9)),
      //     frame: k.randi(38 * 6),
      //   }),
      // ]),
      // k.sprite('kirobo_logo'),
      k.state("created", ["created", "idle", "dropping", "collected"]),

      k.z(0),
      k.pos(getRandomFruitInstantiationPos(k, X_OFFSET, FRUITS_POS)()),
      k.area(),
      k.scale(0),
      k.outline(2),
      k.origin("center"),
      "apple",
      "fruit",
      address,
      {
        key: address,
        speed: k.rand(4, 6),
        availabilityState,
      },
    ]);

    const clock = k.add([
      k.sprite("clock"),
      k.pos(fruit.pos.x + 7, fruit.pos.y - 15),
      k.scale(0),
      k.opacity(0),
    ]);

    const instantiation_pos = k.vec2(fruit.pos);

    const rewards = k.add([
      k.text(`+${Number(amount).toLocaleString()}`, {
        size: 14,
      }),
      k.scale(0),
      k.origin("left"),
      k.color(),
      k.pos(fruit.pos.x + 15, fruit.pos.y),
      {
        ySpeed: k.randi(3, 2),
      },
    ]);

    fruit.onDestroy(() => {
      rewards.destroy();
      clock.destroy();
    });

    fruit.onUpdate(() => {
      rewards.pos.x = fruit.pos.x + 15;
      rewards.pos.y = fruit.pos.y;

      clock.pos.x = fruit.pos.x + 4;
      clock.pos.y = fruit.pos.y - 15;
    });

    fruit.onStateUpdate("created", () => {
      const fruitScale = 0.8;

      fruit.scaleTo(k.lerp(fruit.scale.x, fruitScale, 0.1));
      rewards.scaleTo(k.lerp(rewards.scale.x, 0.7, 0.1));
      clock.scaleTo(k.lerp(clock.scale.x, 0.4, 0.1));

      if (Math.round(fruit.scale.x * 100) / 100 >= fruitScale) {
        fruit.enterState("idle");
      }
    });

    fruit.onStateUpdate("idle", () => {
      fruit.pos.y = k.wave(
        instantiation_pos.y - 2,
        instantiation_pos.y + 2,
        k.time() * fruit.speed
      );
    });

    fruit.onStateEnter("dropping", () => {
      fruit.use(k.body());

      fruit.z = 10;
      rewards.z = 10;
      clock.z = 10;

      fruit.onCollide("operator", (operator) => {
        if (fruit.collectorId != operator._id) return;

        const effectPos = k.vec2(
          operator.pos.x,
          operator.pos.y - operator.height
        );

        fruit.enterState("collected");
        fruit.destroy();
        createCollectEffect(k)(operator);
        createCatchEffect(k)(rewards.text, effectPos);
      });
    });

    fruit.enterState("created");

    availabilityState.onStateEnter("pending", () => {
      clock.opacity = 1;
      fruit.use(sprite("apple_golden"));
    });

    availabilityState.onStateEnter("available", () => {
      clock.opacity = 0;
      fruit.use(sprite("apple_normal"));
      createExplosion(k)(fruit.pos);
    });

    availabilityState.enterState(isAvailable ? "available" : "pending");

    return {
      fruit,
      rewards,
    };
  };
