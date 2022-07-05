import { isRoundEq } from "../utils/game_utils";

export const createCircleCheck = (k) => (pos) => {
  const check = k.add([
    "check",
    k.sprite("circle_check"),
    k.pos(pos),
    k.scale(0),
    k.origin("bot"),
    k.opacity(0),
    k.state("idle", ["idle", "created", "destroy"]),
  ]);

  const waveSpeed = k.rand(7, 8);

  check.onUpdate(() => {
    check.pos.y = k.wave(pos.y - 3, pos.y + 3, k.time() * waveSpeed);
  });

  check.onStateUpdate("created", () => {
    check.scaleTo(k.lerp(check.scale.x, 1, 0.1));
    check.opacity = k.lerp(check.opacity, 1, 0.1);
    if (isRoundEq(check.scale.x, 1)) {
      check.enterState("idle");
    }
  });

  check.onStateUpdate("destroy", (callback) => {
    check.scaleTo(k.lerp(check.scale.x, 0, 0.1));

    if (isRoundEq(check.scale.x, 0)) {
      check.destroy();
    }
  });

  check.enterState("created");

  return check;
};
