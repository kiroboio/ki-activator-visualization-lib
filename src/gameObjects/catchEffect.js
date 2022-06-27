export const createCatchEffect = (k) => (str, _pos) => {
  const kiro_logo = k.add([
    k.z(2),
    k.sprite("kirobo_logo"),
    k.pos(_pos),
    k.origin("right"),
    k.scale(0),
    k.opacity(1),
    k.move(k.vec2(0, -100), 30),
  ]);

  const coin = k.add([
    k.z(2),
    k.sprite("gold_coin", { anim: "rotate" }),
    k.pos(_pos.add(k.vec2(9, 0))),
    k.origin("right"),
    k.scale(0),
    k.opacity(1),
    k.move(k.vec2(0, -100), 30),
  ]);

  const rewards = k.add([
    k.z(2),
    k.text(str, { size: 12 }),
    k.color(0, 255, 0),
    k.pos(_pos.add(k.vec2(10, 0))),
    k.area(),
    k.opacity(1),
    k.scale(0.5),
    k.origin("left"),
  ]);

  kiro_logo.onUpdate(() => {
    rewards.pos.y = kiro_logo.pos.y;

    rewards.scaleTo(k.lerp(rewards.scale.x, 0.8, 0.1));
    kiro_logo.scaleTo(k.lerp(kiro_logo.scale.x, 0.6, 0.1));
    coin.scaleTo(k.lerp(coin.scale.x, 0.6, 0.1));

    rewards.opacity -= 0.002;
    kiro_logo.opacity -= 0.002;
    coin.opacity -= 0.002;

    if (rewards.opacity < 0) {
      rewards.destroy();
      kiro_logo.destroy();
      coin.destroy();
    }
  });
};
