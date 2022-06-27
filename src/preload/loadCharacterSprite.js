export const loadCharacterSprite = (k) => (name, image, options) =>
  k.loadSprite(name, image, {
    sliceX: 6,
    sliceY: 6,
    anims: {
      idle: {
        from: 0,
        to: 3,
        loop: true,
      },
      walk: {
        from: 6,
        to: 11,
        loop: true,
      },
      run: {
        from: 12,
        to: 17,
        loop: true,
      },
      "run-faster": {
        from: 18,
        to: 23,
        loop: true,
      },
      climb: {
        from: 24,
        to: 27,
        loop: true,
      },
      throw: {
        from: 30,
        to: 33,
        loop: false,
      },
    },
    ...options,
  });
