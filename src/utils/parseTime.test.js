import * as parseTime from './parseTime';

describe('zeroPad', () => {
  test('when x is 0', () => {
    expect(parseTime.zeroPad(0)).toBe('00');
  });

  test('when x is 2', () => {
    expect(parseTime.zeroPad(2)).toBe('02');
  });

  test('when x is 10', () => {
    expect(parseTime.zeroPad(10)).toBe('10');
  });
});

describe('parseSeconds', () => {
  test('when seconds is 0', () => {
    const seconds = 0;
    expect(parseTime.parseSeconds(seconds)).toBe('0');
  });

  test('when seconds is under 60', () => {
    const seconds = 23;
    expect(parseTime.parseSeconds(seconds)).toBe('23');
  });

  test('when seconds is 60', () => {
    const seconds = 60;
    expect(parseTime.parseSeconds(seconds)).toBe('00');
  });

  test('when seconds is 61', () => {
    const seconds = 61;
    expect(parseTime.parseSeconds(seconds)).toBe('01');
  });

  test('when seconds is -5', () => {
    const seconds = -5;
    expect(parseTime.parseSeconds(seconds)).toBe('5');
  });
});

describe('parseMinutes', () => {
  test('when seconds is -61', () => {
    const seconds = -61;
    expect(parseTime.parseMinutes(seconds)).toBe('01');
  });

  test('when seconds is -8', () => {
    const seconds = -8;
    expect(parseTime.parseMinutes(seconds)).toBe('00');
  });

  test('when seconds is 0', () => {
    const seconds = 0;
    expect(parseTime.parseMinutes(seconds)).toBe('00');
  });

  test('when seconds is 60', () => {
    const seconds = 60;
    expect(parseTime.parseMinutes(seconds)).toBe('01');
  });

  test('when seconds is 61', () => {
    const seconds = 61;
    expect(parseTime.parseMinutes(seconds)).toBe('01');
  });

  test('when seconds is 119', () => {
    const seconds = 119;
    expect(parseTime.parseMinutes(seconds)).toBe('01');
  });

  test('when seconds is 120', () => {
    const seconds = 120;
    expect(parseTime.parseMinutes(seconds)).toBe('02');
  });

  test('when seconds is 3600', () => {
    const seconds = 3600;
    expect(parseTime.parseMinutes(seconds)).toBe('00');
  });

  test('when seconds is 7200', () => {
    const seconds = 7200;
    expect(parseTime.parseMinutes(seconds)).toBe('00');
  });
});

describe('parseHours', () => {
  test('when seconds is -3600', () => {
    const seconds = -3600;
    expect(parseTime.parseHours(seconds)).toBe('01');
  });

  test('when seconds is -5', () => {
    const seconds = -5;
    expect(parseTime.parseHours(seconds)).toBe('00');
  });

  test('when seconds is 0', () => {
    const seconds = 0;
    expect(parseTime.parseHours(seconds)).toBe('00');
  });

  test('when seconds is 60', () => {
    const seconds = 60;
    expect(parseTime.parseHours(seconds)).toBe('00');
  });

  test('when seconds is 3599', () => {
    const seconds = 3599;
    expect(parseTime.parseHours(seconds)).toBe('00');
  });

  test('when seconds is 3600', () => {
    const seconds = 3600;
    expect(parseTime.parseHours(seconds)).toBe('01');
  });

  test('when seconds is 7200', () => {
    const seconds = 7200;
    expect(parseTime.parseHours(seconds)).toBe('02');
  });
});

describe('convertUnixTime', () => {
  test('when time is 1491793663611 (13:07)', () => {
    const time = 1491793663611;
    expect(parseTime.convertUnixTime(time)).toBe('13:07');
  });
});
