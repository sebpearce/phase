export const zeroPad = x => {
  return x < 10 ? '0'.concat(x) : String(x);
};

export const parseSeconds = totalSeconds => {
  const sec = Math.abs(totalSeconds) % 60;
  return Math.abs(totalSeconds) > 10 ? zeroPad(sec) : String(sec);
};

export const parseMinutes = totalSeconds => {
  const min = Math.floor(Math.abs(totalSeconds) / 60) % 60;
  return zeroPad(min);
};

export const parseHours = totalSeconds => {
  const hr = Math.floor(Math.abs(totalSeconds) / 3600);
  return zeroPad(hr);
};

export const convertUnixTime = time => {
  const date = new Date(time);
  return [zeroPad(date.getHours()), zeroPad(date.getMinutes())].join(':');
};

const parseInputAsDigital = input => {
  const t = input.split(/[:.]/);
  const startingIndex = Math.abs((t.length - 3) % 3);
  const factors = [3600, 60, 1];
  return t.reduce(
    (total, val, i) => {
      return total + val * factors[i + startingIndex];
    },
    0
  );
};

const getNumberFromMatch = match => {
  return match && match.length > 1 ? parseInt(match[1], 10) : 0;
};

const parseInputAsHuman = input => {
  let h, m, s = 0;
  h = /(\d+)\s*(?:h(?:r|rs|ours?)?)/i.exec(input);
  const hours = getNumberFromMatch(h);
  m = /(\d+)\s*(?:m(?:ins?|inutes?)?)/i.exec(input);
  const minutes = getNumberFromMatch(m);
  s = /(\d+)\s*(?:s(ecs?|econds?)?)/i.exec(input);
  const seconds = getNumberFromMatch(s);
  return hours * 3600 + minutes * 60 + seconds;
};

export const convertInputToNumber = input => {
  let result;
  if (/[:.]/.test(input) || /^\s*\d+\s*$/.test(input)) {
    result = parseInputAsDigital(input);
  } else {
    result = parseInputAsHuman(input);
  }
  return result;
};

export const convertInputToDate = input => {
  const now = new Date();
  const [y, m, d] = [now.getFullYear(), now.getMonth(), now.getDate()];
  const time = input.split(/[:.]/);
  const date = new Date(y, m, d, ...time);
  return date < now ? new Date(y, m, d + 1, ...time) : date;
};
