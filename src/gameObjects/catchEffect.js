import { Z_CATCH_EFFECT } from "../consts";
import { cubic } from "../utils/game_utils";

export const createCatchEffect = (k) => (str, _pos) => {
  const moveDir = k.UP;
  const moveSpeed = 45;

  const kiro_logo = k.add([
    k.z(Z_CATCH_EFFECT),
    k.sprite("kirobo_logo"),
    k.pos(_pos),
    k.origin("right"),
    k.scale(0),
    k.opacity(1),
    k.move(moveDir, moveSpeed),
    k.state("created", ["created", "disappear"]),
  ]);

  const rewards = k.add([
    k.z(Z_CATCH_EFFECT),
    k.text(str, { size: 12 }),
    k.color(0, 255, 0),
    k.pos(_pos.add(k.vec2(10, 0))),
    k.area(),
    k.opacity(1),
    k.scale(0.5),
    k.origin("left"),
    k.move(moveDir, moveSpeed),
  ]);

  kiro_logo.onStateUpdate("created", () => {
    rewards.scaleTo(k.lerp(rewards.scale.x, 0.8, 0.1));
    kiro_logo.scaleTo(k.lerp(kiro_logo.scale.x, 0.6, 0.1));
    setTimeout(() => {
      kiro_logo.enterState("disappear");
    }, 1300);
  });

  kiro_logo.onStateUpdate("disappear", () => {
    rewards.opacity -= 1 * k.dt();
    kiro_logo.opacity -= 1 * k.dt();

    if (rewards.opacity < 0) {
      rewards.destroy();
      kiro_logo.destroy();
    }
  });

  kiro_logo.enterState("created");
};
