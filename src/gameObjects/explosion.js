export const createExplosion = (k) => (vec) => {
  const explosion = k.add([
    k.pos(vec),
    k.origin("center"),
    k.sprite("explosion"),
  ]);

  explosion.play("explode");
  explosion.onAnimEnd("explode", () => explosion.destroy());
};
