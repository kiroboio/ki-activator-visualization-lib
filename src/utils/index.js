export const inside = ({ x, y }, vs) => {
  // ray-casting algorithm based on
  // https://wrf.ecse.rpi.edu/Research/Short_Notes/pnpoly.html/pnpoly.html

  let inside = false;
  for (let i = 0, j = vs.length - 1; i < vs.length; j = i++) {
    let xi = vs[i][0],
      yi = vs[i][1];
    let xj = vs[j][0],
      yj = vs[j][1];

    let intersect =
      yi > y != yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
    if (intersect) inside = !inside;
  }

  return inside;
};

export const distance = (a, b) => {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return Math.sqrt(dx * dx + dy * dy);
};

export const getProjectileVelocity = (startingPos, target, dt) => {
  const g = 9.8 * dt;
  const projectileSpeed = 500 * dt;
  const dx = target.pos.x - startingPos.x;
  const dy = target.pos.y - startingPos.y;
  const d = Math.sqrt(dx * dx + dy * dy);
  const angle = Math.atan2(dy, dx);
  const t = d / projectileSpeed;

  const vx = dx / t;
  const vy = projectileSpeed * Math.sin(angle) - (g * t) / 2;
  return { vx, vy, g };
};

export const isOutOfScreen = (k) => (pos) => {
  return pos.y > k.height() || pos.x < 0 || pos.x > k.width();
};
