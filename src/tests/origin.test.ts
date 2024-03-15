import { describe, it, expect } from 'vitest';
import { OriginX, OriginY } from '$lib/Enums.js';
import { getOrigin, getOppositeOriginX, getOppositeOriginY } from '$lib/utils/OriginMapper.js';

describe('horizontal getOrigin test 1a', () => {
  it(`maps a source origin (left) to a destination origin (middle) given
      an x-coordinate (0) and a width (10) to check whether the
      x-coordinate becomes -5`, () => {
    const x = 0;
    const width = 10;
    const sourceOriginX = OriginX.Left;
    const destinationOriginX = OriginX.Middle;
    const originX = getOrigin(width, sourceOriginX, destinationOriginX);
    expect(x + originX).toBe(-width / 2);
  });
});

describe('horizontal getOrigin test 1b', () => {
  it(`maps a source origin (left) to a destination origin (right) given
      an x-coordinate (0) and a width (10) to check whether the
      x-coordinate becomes -10`, () => {
    const x = 0;
    const width = 10;
    const sourceOriginX = OriginX.Left;
    const destinationOriginX = OriginX.Right;
    const originX = getOrigin(width, sourceOriginX, destinationOriginX);
    expect(x + originX).toBe(-width);
  });
});

describe('horizontal getOrigin test 2a', () => {
  it(`maps a source origin (middle) to a destination origin (left) given
      an x-coordinate (0) and a width (10) to check whether the
      x-coordinate becomes 5`, () => {
    const x = 0;
    const width = 10;
    const sourceOriginX = OriginX.Middle;
    const destinationOriginX = OriginX.Left;
    const originX = getOrigin(width, sourceOriginX, destinationOriginX);
    expect(x + originX).toBe(width / 2);
  });
});

describe('horizontal getOrigin test 2b', () => {
  it(`maps a source origin (middle) to a destination origin (right) given
      an x-coordinate (0) and a width (10) to check whether the
      x-coordinate becomes -5`, () => {
    const x = 0;
    const width = 10;
    const sourceOriginX = OriginX.Middle;
    const destinationOriginX = OriginX.Right;
    const originX = getOrigin(width, sourceOriginX, destinationOriginX);
    expect(x + originX).toBe(-width / 2);
  });
});

describe('horizontal getOrigin test 3a', () => {
  it(`maps a source origin (right) to a destination origin (left) given
      an x-coordinate (0) and a width (10) to check whether the
      x-coordinate becomes 10`, () => {
    const x = 0;
    const width = 10;
    const sourceOriginX = OriginX.Right;
    const destinationOriginX = OriginX.Left;
    const originX = getOrigin(width, sourceOriginX, destinationOriginX);
    expect(x + originX).toBe(width);
  });
});

describe('horizontal getOrigin test 3b', () => {
  it(`maps a source origin (right) to a destination origin (middle) given
      an x-coordinate (0) and a width (10) to check whether the
      x-coordinate becomes 5`, () => {
    const x = 0;
    const width = 10;
    const sourceOriginX = OriginX.Right;
    const destinationOriginX = OriginX.Middle;
    const originX = getOrigin(width, sourceOriginX, destinationOriginX);
    expect(x + originX).toBe(width / 2);
  });
});

describe('vertical getOrigin test 1a', () => {
  it(`maps a source origin (top) to a destination origin (middle) given
      a y-coordinate (0) and a height (10) to check whether the
      y-coordinate becomes -5`, () => {
    const y = 0;
    const height = 10;
    const sourceOriginY = OriginY.Top;
    const destinationOriginY = OriginY.Middle;
    const originY = getOrigin(height, sourceOriginY, destinationOriginY);
    expect(y + originY).toBe(-height / 2);
  });
});

describe('vertical getOrigin test 1b', () => {
  it(`maps a source origin (top) to a destination origin (bottom) given
      a y-coordinate (0) and a height (10) to check whether the
      y-coordinate becomes -10`, () => {
    const y = 0;
    const height = 10;
    const sourceOriginY = OriginY.Top;
    const destinationOriginY = OriginY.Bottom;
    const originY = getOrigin(height, sourceOriginY, destinationOriginY);
    expect(y + originY).toBe(-height);
  });
});

describe('vertical getOrigin test 2a', () => {
  it(`maps a source origin (middle) to a destination origin (top) given
      a y-coordinate (0) and a height (10) to check whether the
      y-coordinate becomes 5`, () => {
    const y = 0;
    const height = 10;
    const sourceOriginY = OriginY.Middle;
    const destinationOriginY = OriginY.Top;
    const originY = getOrigin(height, sourceOriginY, destinationOriginY);
    expect(y + originY).toBe(height / 2);
  });
});

describe('vertical getOrigin test 2b', () => {
  it(`maps a source origin (middle) to a destination origin (bottom) given
      a y-coordinate (0) and a height (10) to check whether the
      y-coordinate becomes -5`, () => {
    const y = 0;
    const height = 10;
    const sourceOriginY = OriginY.Middle;
    const destinationOriginY = OriginY.Bottom;
    const originY = getOrigin(height, sourceOriginY, destinationOriginY);
    expect(y + originY).toBe(-height / 2);
  });
});

describe('vertical getOrigin test 3a', () => {
  it(`maps a source origin (bottom) to a destination origin (top) given
      a y-coordinate (0) and a height (10) to check whether the
      y-coordinate becomes 10`, () => {
    const y = 0;
    const height = 10;
    const sourceOriginY = OriginY.Bottom;
    const destinationOriginY = OriginY.Top;
    const originY = getOrigin(height, sourceOriginY, destinationOriginY);
    expect(y + originY).toBe(height);
  });
});

describe('vertical getOrigin test 3b', () => {
  it(`maps a source origin (bottom) to a destination origin (middle) given
      a y-coordinate (0) and a height (10) to check whether the
      y-coordinate becomes 5`, () => {
    const y = 0;
    const height = 10;
    const sourceOriginY = OriginY.Bottom;
    const destinationOriginY = OriginY.Middle;
    const originY = getOrigin(height, sourceOriginY, destinationOriginY);
    expect(y + originY).toBe(height / 2);
  });
});

describe('getOppositeOriginX test 1', () => {
  it('checks whether OriginX.Right is returned for OriginX.Left', () => {
    expect(getOppositeOriginX(OriginX.Left)).toBe(OriginX.Right);
  });
});

describe('getOppositeOriginX test 2', () => {
  it('checks whether OriginX.Middle is returned for itself', () => {
    expect(getOppositeOriginX(OriginX.Middle)).toBe(OriginX.Middle);
  });
});

describe('getOppositeOriginX test 3', () => {
  it('checks whether OriginX.Left is returned for OriginX.Right', () => {
    expect(getOppositeOriginX(OriginX.Right)).toBe(OriginX.Left);
  });
});

describe('getOppositeOriginY test 1', () => {
  it('checks whether OriginY.Bottom is returned for OriginY.Top', () => {
    expect(getOppositeOriginY(OriginY.Top)).toBe(OriginY.Bottom);
  });
});

describe('getOppositeOriginY test 2', () => {
  it('checks whether OriginY.Middle is returned for itself', () => {
    expect(getOppositeOriginY(OriginY.Middle)).toBe(OriginY.Middle);
  });
});

describe('getOppositeOriginY test 3', () => {
  it('checks whether OriginY.Top is returned for OriginX.Bottom', () => {
    expect(getOppositeOriginY(OriginY.Bottom)).toBe(OriginY.Top);
  });
});
