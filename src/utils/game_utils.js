export const collectFruit =
  (k) =>
  (fruitTag, operatorTag = "operator") => {
    if (!fruitTag) return console.error("fruitTag is required");

    const fruit = k.get(fruitTag)[0];
    if (!fruit) return console.error("fruit not found", fruitTag);

    const operator = k.get(operatorTag)[0] || k.get("operator")[0];
    if (!operator) return console.error("operator not found", operatorTag);

    operator.higherState.enterState("collect", fruitTag);
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
