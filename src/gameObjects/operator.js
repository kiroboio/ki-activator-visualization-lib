import { distance } from "../utils";
import { createProjectile } from "./projectile";

export const createOperator = (k, X_OFFSET, GROUND_Y) => (address) => {
  const dir = k.choose([k.LEFT, k.RIGHT]);
  const higherState = k.state("random", [
    "random",
    "clear-random",
    "run-to-target",
    "collect",
  ]);

  const operator = k.add([
    address,
    "operator",
    k.z(1),
    k.sprite(k.choose(["monster2", "owlet", "dude"]), {
      anim: "idle",
      flipX: dir === k.LEFT,
    }),
    k.state("idle", ["idle", "walk", "run", "throw"]),
    k.pos(k.rand(X_OFFSET, k.width() - X_OFFSET), GROUND_Y),
    k.area(),
    k.origin("bot"),
    k.outline(2),
    k.scale(1),
    k.opacity(1),
    {
      acc: 1,
      dir: dir,
      speed: k.rand(40, 50),
      fruitsToPickup: [],
      higherState,
      setDir(dir) {
        this.dir = dir;
        this.flipX(dir === k.LEFT);
      },
      getDir(targetPos) {
        return targetPos.x > this.pos.x ? k.RIGHT : k.LEFT;
      },
    },
  ]);

  const moveOperator = () => {
    if (operator.pos.x > k.width() - X_OFFSET) {
      operator.setDir(LEFT);
    } else if (operator.pos.x < X_OFFSET) {
      operator.setDir(RIGHT);
    }
    operator.move(operator.dir.scale(operator.speed * operator.acc));
  };

  const getProjectilePos = () => {
    return k.vec2(operator.pos.x, operator.pos.y - operator.height / 2);
  };

  const getNextFruitToPickUp = () => {
    // get the closest fruit to the operator
    const fruits = operator.fruitsToPickup;
    const closestFruit = fruits.reduce(
      (closest, fruit) => {
        const dist = distance(operator.pos, fruit.pos);
        if (dist < closest.dist) {
          return { dist, fruit };
        }
        return closest;
      },
      { dist: Infinity, fruit: null }
    );
    return closestFruit.fruit;
  };

  const fruitsMap = {};

  const addFruitToPickup = (fruit) => {
    if (!operator.fruitsToPickup.includes(fruit)) {
      operator.fruitsToPickup.push(fruit);
    }
  };

  const removeFruitFromPickup = (fruit) => {
    operator.fruitsToPickup = operator.fruitsToPickup.filter(
      (f) => f !== fruit
    );
  };

  const increaseSpeedAndPlayRun = () => {
    operator.acc = 3;
    operator.play("run-faster");
  };

  const decreaseSpeed = () => {
    operator.acc = 1;
  };

  const blurOtherOperators = () => {
    const others = k
      .get("operator")
      .filter(
        (o) => !["collect", "run-to-target"].includes(o.higherState.state)
      );
    others.forEach((o) => (o.opacity = 0.3));
  };

  const unblurAllOperators = () => {
    k.get("operator").forEach((o) => (o.opacity = 1));
  };

  operator.onStateEnter("idle", operator.play.bind(null, "idle"));

  operator.onStateEnter("walk", operator.play.bind(null, "walk"));
  operator.onStateUpdate("walk", moveOperator);

  operator.onStateEnter("run", increaseSpeedAndPlayRun);
  operator.onStateUpdate("run", moveOperator);
  operator.onStateLeave("run", decreaseSpeed);

  operator.onStateEnter("throw", (target) => {
    operator.setDir(operator.getDir(target.pos));
    operator.projectile = createProjectile(k)(getProjectilePos(), target);
    operator.projectile.enterState("shoot");

    operator.play("throw", {
      onEnd: () => {
        setTimeout(() => {
          operator.projectile = null;
          higherState.enterState("run-to-target", target);
        }, 0);
      },
    });
  });

  higherState.onStateEnter("run-to-target", (target) => {
    operator.setDir(operator.getDir(target.pos));
    operator.enterState("run");
  });

  higherState.onStateEnter("collect", (keyTag) => {
    if (keyTag === undefined) return console.error("keyTag is undefined");

    const fruit = k.get(keyTag)[0];
    if (!fruit) {
      console.error("Something went wrong, no fruit found, keyTag:", keyTag);
      return higherState.enterState("random");
    }

    operator.z = 2;

    addFruitToPickup(fruit);
    fruit.collectorId = operator._id;

    fruit.onStateEnter("collected", () => {
      removeFruitFromPickup(fruit);
      const nextFruitToPickup = getNextFruitToPickUp();
      if (nextFruitToPickup) {
        higherState.enterState("run-to-target", nextFruitToPickup);
      } else {
        higherState.enterState("random");
      }
    });

    higherState.enterState("clear-random");
    operator.enterState("throw", fruit);
  });

  higherState.onStateEnter("random", () => {
    operator.enterState("idle");
    operator.z = 1;

    operator.interval = setInterval(() => {
      const state = k.choose(["idle", "walk"]);
      if (operator.state != state) operator.enterState(state);
    }, k.randi(1600, 2000));
  });

  higherState.onStateEnter("clear-random", () => {
    clearInterval(operator.interval);
  });

  higherState.enterState("random");

  return operator;
};
