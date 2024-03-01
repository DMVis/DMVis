import { describe, it, expect } from 'vitest';
import { OriginX, OriginY } from '$lib/Enums.js';
import { getOrigin } from '$lib/utils/OriginMapper.js';

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
