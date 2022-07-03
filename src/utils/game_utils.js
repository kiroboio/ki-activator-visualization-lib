export const isGameObj = (obj) => obj.tag === "gameObject";
export const collectFruit =
  (k) =>
  (fruitTag, operatorTag = "operator", callback) => {
    if (!fruitTag) return console.error("fruitTag is required");

    const fruit = k.get(fruitTag)[0];
    if (!fruit) return console.error("fruit not found", fruitTag);

    const operator = k.get(operatorTag)[0] || k.get("operator")[0];
    if (!operator) return console.error("operator not found", operatorTag);

    operator.higherState.enterState("collect", fruitTag, callback);
  };

export const destroyFruit = (k) => (fruitTag) => {
  if (!fruitTag) return console.error("fruitTag is required");

  const fruit = k.get(fruitTag)[0];
  if (!fruit) return console.error("fruit not found", fruitTag);
  fruit.destroy();
};

export const setFruitAvailability = (k) => (fruitTag, isAvailable) => {
  if (!fruitTag) return console.error("fruitTag is required");

  const fruit = k.get(fruitTag)[0];
  if (!fruit) return console.error("fruit not found", fruitTag);
  fruit.availabilityState.enterState(isAvailable ? "available" : "pending");
};

export const cubic = (a, b, c, d, t) => {
  return a * (t * t * t) + b * (t * t) + c * t + d;
};

export const isRoundEq = (a, b, tollerance) => {
  const aRounded = Math.round(a * 100) / 100;
  const bRounded = Math.round(b * 100) / 100;
  const offset = aRounded === bRounded;
  return tollerance ? Math.abs(aRounded - bRounded) < tollerance : offset;
};

export const getClosestFruit = (k) => () => {
  const fruits = k.get("fruit");
  return fruits.reduce((prev, curr) => {
    if (prev.pos.dist(operator.pos) > curr.pos.dist(operator.pos)) {
      return curr;
    }
    return prev;
  });
};
