import { Z_EXPLOSION_EFFECT } from "../consts";

export const createExplosion = (k) => (vec, z) => {
  const explosion = k.add([
    k.pos(vec),
    k.z(z ?? Z_EXPLOSION_EFFECT),
    k.origin("center"),
    k.sprite("explosion"),
  ]);

  explosion.play("explode");
  explosion.onAnimEnd("explode", () => explosion.destroy());
};
