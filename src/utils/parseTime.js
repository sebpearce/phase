export const zeroPad = (x) => {
  return x < 10 ? '0'.concat(x) : String(x);
}

export const parseSeconds = (totalSeconds) => {
  const sec = totalSeconds % 60;
  return zeroPad(sec);
}

export const parseMinutes = (totalSeconds) => {
  const min = Math.floor(totalSeconds / 60) % 60;
  return zeroPad(min);
}

export const parseHours = (totalSeconds) => {
  const hr = Math.floor(totalSeconds / 3600);
  return zeroPad(hr);
}

export const convertUnixTime = (time) => {
  const date = new Date(time);
  return [zeroPad(date.getHours()), zeroPad(date.getMinutes())].join(':');
}
