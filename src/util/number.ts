const fixedNumber = (num: number, afterComma: number = 2) => {
  return Number(num.toFixed(afterComma));
};

const floorNumber = (num: number) => {
  return Math.floor(num);
};

export { fixedNumber, floorNumber };
