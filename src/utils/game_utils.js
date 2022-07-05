export const required = (arg, errorMessage) => {
  if (!arg) throw new Error(errorMessage);
  return arg;
};

const requiredFruitTag = (f) => required(f, "fruitTag not found");
const requiredFruit = (f) => required(f, "fruit not found");
const requiredOpertaor = (o) => required(o, "operator not found");

export const withErrorHandle = (func) => {
  try {
    return func();
  } catch (e) {
    console.log(e);
    return null;
  }
};

const getOperatorOrRandom = (k) => (operatorTag) => {
  let operator = null;
  if (!operatorTag) {
    operator = k.choose(k.get("operator"));
  } else {
    operator = k.get(operatorTag)[0];
  }
  return requiredOpertaor(operator);
};

export const collectFruit = (k) => (fruitTag, operatorTag, callback) => {
  return withErrorHandle(() => {
    requiredFruitTag(fruitTag);
    requiredFruit(k.get(fruitTag)[0]);

    const operator = getOperatorOrRandom(k)(operatorTag);
    operator.higherState.enterState("collect", fruitTag, callback);
  });
};


export const destroyFruit = (k) => (fruitTag) => {
  return withErrorHandle(() => {
    requiredFruitTag(fruitTag);

    const fruit = requiredFruit(k.get(fruitTag)[0]);
    fruit.destroy();
  });
};

export const setFruitAvailability = (k) => (fruitTag, isAvailable) => {
  return withErrorHandle(() => {
    requiredFruitTag(fruitTag);

    const fruit = requiredFruit(k.get(fruitTag)[0]);
    fruit.availabilityState.enterState(isAvailable ? "available" : "pending");
  });
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
