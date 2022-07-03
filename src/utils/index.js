import { GRAVITY } from "../consts";

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

export const getProjectileVelocity = (startingPos, targetPos, speed) => {
  const g = GRAVITY;
  const dx = targetPos.x - startingPos.x;
  const dy = targetPos.y - startingPos.y;
  const d = Math.sqrt(dx * dx + dy * dy);
  const angle = Math.atan2(dy, dx);
  const t = d / speed;

  const vx = dx / t;
  const vy = speed * Math.sin(angle) - (g * t) / 2;

  return { vx, vy };
};

export const isOutOfScreen = (k) => (pos) => {
  return pos.y > k.height() || pos.x < 0 || pos.x > k.width();
};
