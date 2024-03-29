import { Z_COLLECT_EFFECT } from "../consts";

export const createCollectEffect = (k) => (operator) => {
  const effect = k.add([
    k.sprite("collect"),
    k.pos(operator),
    k.scale(1.3),
    k.origin("bot"),
    k.outline(2),
    k.z(Z_COLLECT_EFFECT),
  ]);
  const effect2 = k.add([
    k.sprite("collect"),
    k.pos(operator),
    k.scale(1.9),
    k.origin("bot"),
    k.opacity(0.2),
    k.outline(2),
    k.z(Z_COLLECT_EFFECT),
  ]);

  operator.onUpdate(() => {
    effect2.pos.x = operator.pos.x;
    effect2.pos.y = operator.pos.y;
    effect.pos.x = operator.pos.x;
    effect.pos.y = operator.pos.y;
  });

  effect.play("collect");
  effect2.play("collect", {
    speed: 15,
  });

  effect.onAnimEnd("collect", () => {
    effect.destroy();
    effect2.destroy();
  });

  return effect;
};
