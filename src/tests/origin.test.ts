import { describe, it, expect } from 'vitest';

import { OriginX, OriginY } from '$lib/Enums.js';
import { getOrigin, getFlippedOrigin } from '$lib/utils/OriginMapper.js';

// Note that the code coverage will never reach
// the lines that throw errors, because of type safety

describe('horizontal getOrigin tests 1/3', () => {
  it(`maps a source origin (left) to a destination origin (middle) given
      an x-coordinate (0) and a width (10) to check whether the
      x-coordinate becomes -5`, () => {
    // Arrange
    const x = 0;
    const width = 10;
    const sourceOriginX = OriginX.Left;
    const destinationOriginX = OriginX.Middle;
    const expectedCoordinate = -width / 2;

    // Act
    const originX = getOrigin(width, sourceOriginX, destinationOriginX);
    const newCoordinate = x + originX;

    // Assert
    expect(newCoordinate).toBe(expectedCoordinate);
  });

  it(`maps a source origin (left) to a destination origin (right) given
      an x-coordinate (0) and a width (10) to check whether the
      x-coordinate becomes -10`, () => {
    // Arrange
    const x = 0;
    const width = 10;
    const sourceOriginX = OriginX.Left;
    const destinationOriginX = OriginX.Right;
    const expectedCoordinate = -width;

    // Act
    const originX = getOrigin(width, sourceOriginX, destinationOriginX);
    const newCoordinate = x + originX;

    // Assert
    expect(newCoordinate).toBe(expectedCoordinate);
  });
});

describe('horizontal getOrigin tests 2/3', () => {
  it(`maps a source origin (middle) to a destination origin (left) given
      an x-coordinate (0) and a width (10) to check whether the
      x-coordinate becomes 5`, () => {
    // Arrange
    const x = 0;
    const width = 10;
    const sourceOriginX = OriginX.Middle;
    const destinationOriginX = OriginX.Left;
    const expectedCoordinate = width / 2;

    // Act
    const originX = getOrigin(width, sourceOriginX, destinationOriginX);
    const newCoordinate = x + originX;

    // Assert
    expect(newCoordinate).toBe(expectedCoordinate);
  });

  it(`maps a source origin (middle) to a destination origin (right) given
      an x-coordinate (0) and a width (10) to check whether the
      x-coordinate becomes -5`, () => {
    // Arrange
    const x = 0;
    const width = 10;
    const sourceOriginX = OriginX.Middle;
    const destinationOriginX = OriginX.Right;
    const expectedCoordinate = -width / 2;

    // Act
    const originX = getOrigin(width, sourceOriginX, destinationOriginX);
    const newCoordinate = x + originX;

    // Assert
    expect(newCoordinate).toBe(expectedCoordinate);
  });
});

describe('horizontal getOrigin tests 3/3', () => {
  it(`maps a source origin (right) to a destination origin (left) given
      an x-coordinate (0) and a width (10) to check whether the
      x-coordinate becomes 10`, () => {
    // Arrange
    const x = 0;
    const width = 10;
    const sourceOriginX = OriginX.Right;
    const destinationOriginX = OriginX.Left;
    const expectedCoordinate = width;

    // Act
    const originX = getOrigin(width, sourceOriginX, destinationOriginX);
    const newCoordinate = x + originX;

    // Assert
    expect(newCoordinate).toBe(expectedCoordinate);
  });

  it(`maps a source origin (right) to a destination origin (middle) given
      an x-coordinate (0) and a width (10) to check whether the
      x-coordinate becomes 5`, () => {
    // Arrange
    const x = 0;
    const width = 10;
    const sourceOriginX = OriginX.Right;
    const destinationOriginX = OriginX.Middle;
    const expectedCoordinate = width / 2;

    // Act
    const originX = getOrigin(width, sourceOriginX, destinationOriginX);
    const newCoordinate = x + originX;

    // Assert
    expect(newCoordinate).toBe(expectedCoordinate);
  });
});

describe('Vertical getOrigin test 1/3', () => {
  it(`maps a source origin (top) to a destination origin (middle) given
      a y-coordinate (0) and a height (10) to check whether the
      y-coordinate becomes -5`, () => {
    // Arrange
    const y = 0;
    const height = 10;
    const sourceOriginY = OriginY.Top;
    const destinationOriginY = OriginY.Middle;
    const expectedCoordinate = -height / 2;

    // Act
    const originY = getOrigin(height, sourceOriginY, destinationOriginY);
    const newCoordinate = y + originY;

    // Assert
    expect(newCoordinate).toBe(expectedCoordinate);
  });

  it(`maps a source origin (top) to a destination origin (bottom) given
      a y-coordinate (0) and a height (10) to check whether the
      y-coordinate becomes -10`, () => {
    // Arrange
    const y = 0;
    const height = 10;
    const sourceOriginY = OriginY.Top;
    const destinationOriginY = OriginY.Bottom;
    const expectedCoordinate = -height;

    // Act
    const originY = getOrigin(height, sourceOriginY, destinationOriginY);
    const newCoordinate = y + originY;

    // Assert
    expect(newCoordinate).toBe(expectedCoordinate);
  });
});

describe('Vertical getOrigin test 2/3', () => {
  it(`maps a source origin (middle) to a destination origin (top) given
      a y-coordinate (0) and a height (10) to check whether the
      y-coordinate becomes 5`, () => {
    // Arrange
    const y = 0;
    const height = 10;
    const sourceOriginY = OriginY.Middle;
    const destinationOriginY = OriginY.Top;
    const expectedCoordinate = height / 2;

    // Act
    const originY = getOrigin(height, sourceOriginY, destinationOriginY);
    const newCoordinate = y + originY;

    // Assert
    expect(newCoordinate).toBe(expectedCoordinate);
  });

  it(`maps a source origin (middle) to a destination origin (bottom) given
      a y-coordinate (0) and a height (10) to check whether the
      y-coordinate becomes -5`, () => {
    // Arrange
    const y = 0;
    const height = 10;
    const sourceOriginY = OriginY.Middle;
    const destinationOriginY = OriginY.Bottom;
    const expectedCoordinate = -height / 2;

    // Act
    const originY = getOrigin(height, sourceOriginY, destinationOriginY);
    const newCoordinate = y + originY;

    // Assert
    expect(newCoordinate).toBe(expectedCoordinate);
  });
});

describe('Vertical getOrigin test 3/3', () => {
  it(`maps a source origin (bottom) to a destination origin (top) given
      a y-coordinate (0) and a height (10) to check whether the
      y-coordinate becomes 10`, () => {
    // Arrange
    const y = 0;
    const height = 10;
    const sourceOriginY = OriginY.Bottom;
    const destinationOriginY = OriginY.Top;
    const expectedCoordinate = height;

    // Act
    const originY = getOrigin(height, sourceOriginY, destinationOriginY);
    const newCoordinate = y + originY;

    // Assert
    expect(newCoordinate).toBe(expectedCoordinate);
  });

  it(`maps a source origin (bottom) to a destination origin (middle) given
      a y-coordinate (0) and a height (10) to check whether the
      y-coordinate becomes 5`, () => {
    // Arrange
    const y = 0;
    const height = 10;
    const sourceOriginY = OriginY.Bottom;
    const destinationOriginY = OriginY.Middle;
    const expectedCoordinate = height / 2;

    // Act
    const originY = getOrigin(height, sourceOriginY, destinationOriginY);
    const newCoordinate = y + originY;

    // Assert
    expect(newCoordinate).toBe(expectedCoordinate);
  });
});

describe('getFlippedOrigin x tests', () => {
  it('checks whether OriginX.Right is returned for OriginX.Left', () => {
    // Arrange
    const origin = OriginX.Left;
    const expectedOrigin = OriginX.Right;

    // Act
    const flippedOrigin = getFlippedOrigin(origin);

    // Assert
    expect(flippedOrigin).toBe(expectedOrigin);
  });

  it('checks whether OriginX.Middle is returned for itself', () => {
    // Arrange
    const origin = OriginX.Middle;
    const expectedOrigin = OriginX.Middle;

    // Act
    const flippedOrigin = getFlippedOrigin(origin);

    // Assert
    expect(flippedOrigin).toBe(expectedOrigin);
  });

  it('checks whether OriginX.Left is returned for OriginX.Right', () => {
    // Arrange
    const origin = OriginX.Right;
    const expectedOrigin = OriginX.Left;

    // Act
    const flippedOrigin = getFlippedOrigin(origin);

    // Assert
    expect(flippedOrigin).toBe(expectedOrigin);
  });
});

describe('getFlippedOrigin y tests', () => {
  it('checks whether OriginY.Bottom is returned for OriginY.Top', () => {
    // Arrange
    const origin = OriginY.Top;
    const expectedOrigin = OriginY.Bottom;

    // Act
    const flippedOrigin = getFlippedOrigin(origin);

    // Assert
    expect(flippedOrigin).toBe(expectedOrigin);
  });

  it('checks whether OriginY.Middle is returned for itself', () => {
    // Arrange
    const origin = OriginY.Middle;
    const expectedOrigin = OriginY.Middle;

    // Act
    const flippedOrigin = getFlippedOrigin(origin);

    // Assert
    expect(flippedOrigin).toBe(expectedOrigin);
  });

  it('checks whether OriginY.Top is returned for OriginX.Bottom', () => {
    // Arrange
    const origin = OriginY.Bottom;
    const expectedOrigin = OriginY.Top;

    // Act
    const flippedOrigin = getFlippedOrigin(origin);

    // Assert
    expect(flippedOrigin).toBe(expectedOrigin);
  });
});
