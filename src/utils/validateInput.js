export const validateCountdownInput = input => {
  const countdownFormat = /^((\d+\s?h(r|rs|ours?)?)?\s*?(\d+\s?m(ins?|inutes?)?)?\s*(\d+\s?s(ecs?|econds?)?)?|\d+(:(0[0-9]|[1-5]\d))?(:(0[0-9]|[1-5]\d))?)$/i;
  return countdownFormat.test(input);
};

export const validateUntilInput = input => {
  const untilFormat = /^(([01]?[0-9]|2[0-3])[:.][0-5][0-9]|[0-5]?[0-9])$/;
  return untilFormat.test(input);
};
