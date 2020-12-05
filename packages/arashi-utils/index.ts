export const range = (value, min, max) => {
    return value < min ? min : value > max ? max : value;
  };
  