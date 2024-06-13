// Imports
import { describe, it, expect } from 'vitest';

// DMVis imports
import {
  getOriginOffsetX,
  getOriginOffsetY,
  getFlippedOriginX,
  getFlippedOriginY
} from '$lib/utils/OriginMapper.js';
import type { Origin } from '$lib/Types.js';

describe('getOriginOffsetX tests', () => {
  it(`maps a source origin (left) to a destination origin (left) given
      an x-coordinate (0) and a width (10) to check whether the
      x-coordinate remains unchanged`, () => {
    // Arrange
    const x = 0;
    const width = 10;
    // Ignore anything before the '-Left' part
    const sourceOrigins: Origin[] = ['topLeft', 'middleLeft', 'bottomLeft'];
    const destinationOrigins: Origin[] = ['topLeft', 'middleLeft', 'bottomLeft'];
    const expectedOriginCoordinate = x;

    // Test all lefts against all lefts
    for (const sourceOrigin of sourceOrigins) {
      for (const destinationOrigin of destinationOrigins) {
        // Act
        const originOffsetX = getOriginOffsetX(width, sourceOrigin, destinationOrigin);
        const originCoordinate = x + originOffsetX;

        // Assert
        expect(originCoordinate).toBe(expectedOriginCoordinate);
      }
    }
  });

  it(`maps a source origin (left) to a destination origin (middle) given
      an x-coordinate (0) and a width (10) to check whether the
      x-coordinate becomes -5`, () => {
    // Arrange
    const x = 0;
    const width = 10;
    // Ignore anything before the '-Left' part
    const sourceOrigins: Origin[] = ['topLeft', 'middleLeft', 'bottomLeft'];
    // Ignore anything before the '-Middle' part
    const destinationOrigins: Origin[] = ['topMiddle', 'middle', 'bottomMiddle'];
    const expectedOriginCoordinate = -width / 2;

    // Test all lefts against all middles
    for (const sourceOrigin of sourceOrigins) {
      for (const destinationOrigin of destinationOrigins) {
        // Act
        const originOffsetX = getOriginOffsetX(width, sourceOrigin, destinationOrigin);
        const originCoordinate = x + originOffsetX;

        // Assert
        expect(originCoordinate).toBe(expectedOriginCoordinate);
      }
    }
  });

  it(`maps a source origin (left) to a destination origin (right) given
    an x-coordinate (0) and a width (10) to check whether the
    x-coordinate becomes -10`, () => {
    // Arrange
    const x = 0;
    const width = 10;
    // Ignore anything before the '-Left' part
    const sourceOrigins: Origin[] = ['topLeft', 'middleLeft', 'bottomLeft'];
    // Ignore anything before the '-Right' part
    const destinationOrigins: Origin[] = ['topRight', 'middleRight', 'bottomRight'];
    const expectedOriginCoordinate = -width;

    // Test all lefts against all rights
    for (const sourceOrigin of sourceOrigins) {
      for (const destinationOrigin of destinationOrigins) {
        // Act
        const originOffsetX = getOriginOffsetX(width, sourceOrigin, destinationOrigin);
        const originCoordinate = x + originOffsetX;

        // Assert
        expect(originCoordinate).toBe(expectedOriginCoordinate);
      }
    }
  });

  it(`maps a source origin (middle) to a destination origin (left) given
    an x-coordinate (0) and a width (10) to check whether the
    x-coordinate becomes 5`, () => {
    // Arrange
    const x = 0;
    const width = 10;
    // Ignore anything before the '-Right' part
    const sourceOrigins: Origin[] = ['topMiddle', 'middle', 'bottomMiddle'];
    // Ignore anything before the '-Left' part
    const destinationOrigins: Origin[] = ['topLeft', 'middleLeft', 'bottomLeft'];
    const expectedOriginCoordinate = width / 2;

    // Test all middles against all lefts
    for (const sourceOrigin of sourceOrigins) {
      for (const destinationOrigin of destinationOrigins) {
        // Act
        const originOffsetX = getOriginOffsetX(width, sourceOrigin, destinationOrigin);
        const originCoordinate = x + originOffsetX;

        // Assert
        expect(originCoordinate).toBe(expectedOriginCoordinate);
      }
    }
  });

  it(`maps a source origin (middle) to a destination origin (middle) given
    an x-coordinate (0) and a width (10) to check whether the
    x-coordinate remains unchanged`, () => {
    // Arrange
    const x = 0;
    const width = 10;
    // Ignore anything before the '-Right' part
    const sourceOrigins: Origin[] = ['topMiddle', 'middle', 'bottomMiddle'];
    const destinationOrigins: Origin[] = ['topMiddle', 'middle', 'bottomMiddle'];
    const expectedOriginCoordinate = x;

    // Test all middles against all middles
    for (const sourceOrigin of sourceOrigins) {
      for (const destinationOrigin of destinationOrigins) {
        // Act
        const originOffsetX = getOriginOffsetX(width, sourceOrigin, destinationOrigin);
        const originCoordinate = x + originOffsetX;

        // Assert
        expect(originCoordinate).toBe(expectedOriginCoordinate);
      }
    }
  });

  it(`maps a source origin (middle) to a destination origin (right) given
    an x-coordinate (0) and a width (10) to check whether the
    x-coordinate becomes -5`, () => {
    // Arrange
    const x = 0;
    const width = 10;
    // Ignore anything before the '-Middle' part
    const sourceOrigins: Origin[] = ['topMiddle', 'middle', 'bottomMiddle'];
    // Ignore anything before the '-Right' part
    const destinationOrigins: Origin[] = ['topRight', 'middleRight', 'bottomRight'];
    const expectedOriginCoordinate = -width / 2;

    // Test all middles against all rights
    for (const sourceOrigin of sourceOrigins) {
      for (const destinationOrigin of destinationOrigins) {
        // Act
        const originOffsetX = getOriginOffsetX(width, sourceOrigin, destinationOrigin);
        const originCoordinate = x + originOffsetX;

        // Assert
        expect(originCoordinate).toBe(expectedOriginCoordinate);
      }
    }
  });

  it(`maps a source origin (right) to a destination origin (left) given
    an x-coordinate (0) and a width (10) to check whether the
    x-coordinate becomes 10`, () => {
    // Arrange
    const x = 0;
    const width = 10;
    // Ignore anything before the '-Right' part
    const sourceOrigins: Origin[] = ['topRight', 'middleRight', 'bottomRight'];
    // Ignore anything before the '-Left' part
    const destinationOrigins: Origin[] = ['topLeft', 'middleLeft', 'bottomLeft'];
    const expectedOriginCoordinate = width;

    // Test all rights against all lefts
    for (const sourceOrigin of sourceOrigins) {
      for (const destinationOrigin of destinationOrigins) {
        // Act
        const originOffsetX = getOriginOffsetX(width, sourceOrigin, destinationOrigin);
        const originCoordinate = x + originOffsetX;

        // Assert
        expect(originCoordinate).toBe(expectedOriginCoordinate);
      }
    }
  });

  it(`maps a source origin (right) to a destination origin (middle) given
    an x-coordinate (0) and a width (10) to check whether the
    x-coordinate becomes 5`, () => {
    // Arrange
    const x = 0;
    const width = 10;
    // Ignore anything before the '-Right' part
    const sourceOrigins: Origin[] = ['topRight', 'middleRight', 'bottomRight'];
    // Ignore anything before the '-Middle' part
    const destinationOrigins: Origin[] = ['topMiddle', 'middle', 'bottomMiddle'];
    const expectedOriginCoordinate = width / 2;

    // Test all rights against all middles
    for (const sourceOrigin of sourceOrigins) {
      for (const destinationOrigin of destinationOrigins) {
        // Act
        const originOffsetX = getOriginOffsetX(width, sourceOrigin, destinationOrigin);
        const originCoordinate = x + originOffsetX;

        // Assert
        expect(originCoordinate).toBe(expectedOriginCoordinate);
      }
    }
  });

  it(`maps a source origin (right) to a destination origin (right) given
    an x-coordinate (0) and a width (10) to check whether the
    x-coordinate remains unchanged`, () => {
    // Arrange
    const x = 0;
    const width = 10;
    // Ignore anything before the '-Right' part
    const sourceOrigins: Origin[] = ['topRight', 'middleRight', 'bottomRight'];
    const destinationOrigins: Origin[] = ['topRight', 'middleRight', 'bottomRight'];
    const expectedOriginCoordinate = x;

    // Test all rights against all rights
    for (const sourceOrigin of sourceOrigins) {
      for (const destinationOrigin of destinationOrigins) {
        // Act
        const originOffsetX = getOriginOffsetX(width, sourceOrigin, destinationOrigin);
        const originCoordinate = x + originOffsetX;

        // Assert
        expect(originCoordinate).toBe(expectedOriginCoordinate);
      }
    }
  });
});

describe('getOriginOffsetY tests', () => {
  it(`maps a source origin (top) to a destination origin (top) given
      a y-coordinate (0) and a height (10) to check whether the
      y-coordinate remains unchanged`, () => {
    // Arrange
    const y = 0;
    const height = 10;
    // Ignore anything after the 'top-' part
    const sourceOrigins: Origin[] = ['topLeft', 'topMiddle', 'topRight'];
    // Ignore anything after the 'top-' part
    const destinationOrigins: Origin[] = ['topLeft', 'topMiddle', 'topRight'];
    const expectedOriginCoordinate = y;

    // Test all tops against all tops
    for (const sourceOrigin of sourceOrigins) {
      for (const destinationOrigin of destinationOrigins) {
        // Act
        const originOffsetY = getOriginOffsetY(height, sourceOrigin, destinationOrigin);
        const originCoordinate = y + originOffsetY;

        // Assert
        expect(originCoordinate).toBe(expectedOriginCoordinate);
      }
    }
  });

  it(`maps a source origin (top) to a destination origin (middle) given
      a y-coordinate (0) and a height (10) to check whether the
      y-coordinate becomes -5`, () => {
    // Arrange
    const y = 0;
    const height = 10;
    // Ignore anything after the 'top-' part
    const sourceOrigins: Origin[] = ['topLeft', 'topMiddle', 'topRight'];
    // Ignore anything after the 'middle-' part
    const destinationOrigins: Origin[] = ['middleLeft', 'middle', 'middleRight'];
    const expectedOriginCoordinate = -height / 2;

    // Test all tops against all middles
    for (const sourceOrigin of sourceOrigins) {
      for (const destinationOrigin of destinationOrigins) {
        // Act
        const originOffsetY = getOriginOffsetY(height, sourceOrigin, destinationOrigin);
        const originCoordinate = y + originOffsetY;

        // Assert
        expect(originCoordinate).toBe(expectedOriginCoordinate);
      }
    }
  });

  it(`maps a source origin (top) to a destination origin (bottom) given
    a y-coordinate (0) and a height (10) to check whether the
    y-coordinate becomes -10`, () => {
    // Arrange
    const y = 0;
    const height = 10;
    // Ignore anything after the 'top-' part
    const sourceOrigins: Origin[] = ['topLeft', 'topMiddle', 'topRight'];
    // Ignore anything before the 'bottom-' part
    const destinationOrigins: Origin[] = ['bottomLeft', 'bottomMiddle', 'bottomRight'];
    const expectedOriginCoordinate = -height;

    // Test all tops against all bottoms
    for (const sourceOrigin of sourceOrigins) {
      for (const destinationOrigin of destinationOrigins) {
        // Act
        const originOffsetY = getOriginOffsetY(height, sourceOrigin, destinationOrigin);
        const originCoordinate = y + originOffsetY;

        // Assert
        expect(originCoordinate).toBe(expectedOriginCoordinate);
      }
    }
  });

  it(`maps a source origin (middle) to a destination origin (top) given
    a y-coordinate (0) and a height (10) to check whether the
    y-coordinate becomes 5`, () => {
    // Arrange
    const y = 0;
    const height = 10;
    // Ignore anything after the 'middle-' part
    const sourceOrigins: Origin[] = ['middleLeft', 'middle', 'middleRight'];
    // Ignore anything after the 'top-' part
    const destinationOrigins: Origin[] = ['topLeft', 'topMiddle', 'topRight'];
    const expectedOriginCoordinate = height / 2;

    // Test all middles against all tops
    for (const sourceOrigin of sourceOrigins) {
      for (const destinationOrigin of destinationOrigins) {
        // Act
        const originOffsetY = getOriginOffsetY(height, sourceOrigin, destinationOrigin);
        const originCoordinate = y + originOffsetY;

        // Assert
        expect(originCoordinate).toBe(expectedOriginCoordinate);
      }
    }
  });

  it(`maps a source origin (middle) to a destination origin (middle) given
    a y-coordinate (0) and a height (10) to check whether the
    y-coordinate remains unchanged`, () => {
    // Arrange
    const y = 0;
    const height = 10;
    // Ignore anything after the 'middle-' part
    const sourceOrigins: Origin[] = ['middleLeft', 'middle', 'middleRight'];
    const destinationOrigins: Origin[] = ['middleLeft', 'middle', 'middleRight'];
    const expectedOriginCoordinate = y;

    // Test all middles against all middles
    for (const sourceOrigin of sourceOrigins) {
      for (const destinationOrigin of destinationOrigins) {
        // Act
        const originOffsetY = getOriginOffsetY(height, sourceOrigin, destinationOrigin);
        const originCoordinate = y + originOffsetY;

        // Assert
        expect(originCoordinate).toBe(expectedOriginCoordinate);
      }
    }
  });

  it(`maps a source origin (middle) to a destination origin (bottom) given
    a y-coordinate (0) and a height (10) to check whether the
    y-coordinate becomes -5`, () => {
    // Arrange
    const y = 0;
    const height = 10;
    // Ignore anything after the 'middle-' part
    const sourceOrigins: Origin[] = ['middleLeft', 'middle', 'middleRight'];
    // Ignore anything after the 'bottom-' part
    const destinationOrigins: Origin[] = ['bottomLeft', 'bottomMiddle', 'bottomRight'];
    const expectedOriginCoordinate = -height / 2;

    // Test all middles against all bottoms
    for (const sourceOrigin of sourceOrigins) {
      for (const destinationOrigin of destinationOrigins) {
        // Act
        const originOffsetY = getOriginOffsetY(height, sourceOrigin, destinationOrigin);
        const originCoordinate = y + originOffsetY;

        // Assert
        expect(originCoordinate).toBe(expectedOriginCoordinate);
      }
    }
  });

  it(`maps a source origin (bottom) to a destination origin (top) given
    a y-coordinate (0) and a height (10) to check whether the
    y-coordinate becomes 10`, () => {
    // Arrange
    const y = 0;
    const height = 10;
    // Ignore anything after the 'bottom-' part
    const sourceOrigins: Origin[] = ['bottomLeft', 'bottomMiddle', 'bottomRight'];
    // Ignore anything after the 'top-' part
    const destinationOrigins: Origin[] = ['topLeft', 'topMiddle', 'topRight'];
    const expectedOriginCoordinate = height;

    // Test all bottoms against all tops
    for (const sourceOrigin of sourceOrigins) {
      for (const destinationOrigin of destinationOrigins) {
        // Act
        const originOffsetY = getOriginOffsetY(height, sourceOrigin, destinationOrigin);
        const originCoordinate = y + originOffsetY;

        // Assert
        expect(originCoordinate).toBe(expectedOriginCoordinate);
      }
    }
  });

  it(`maps a source origin (bottom) to a destination origin (middle) given
    a y-coordinate (0) and a height (10) to check whether the
    y-coordinate becomes 5`, () => {
    // Arrange
    const y = 0;
    const height = 10;
    // Ignore anything after the 'bottom-' part
    const sourceOrigins: Origin[] = ['bottomLeft', 'bottomMiddle', 'bottomRight'];
    // Ignore anything after the 'middle-' part
    const destinationOrigins: Origin[] = ['middleLeft', 'middle', 'middleRight'];
    const expectedOriginCoordinate = height / 2;

    // Test all bottoms against all middles
    for (const sourceOrigin of sourceOrigins) {
      for (const destinationOrigin of destinationOrigins) {
        // Act
        const originOffsetY = getOriginOffsetY(height, sourceOrigin, destinationOrigin);
        const originCoordinate = y + originOffsetY;

        // Assert
        expect(originCoordinate).toBe(expectedOriginCoordinate);
      }
    }
  });

  it(`maps a source origin (bottom) to a destination origin (bottom) given
    a y-coordinate (0) and a height (10) to check whether the
    y-coordinate remains unchanged`, () => {
    // Arrange
    const y = 0;
    const height = 10;
    // Ignore anything after the 'bottom-' part
    const sourceOrigins: Origin[] = ['bottomLeft', 'bottomMiddle', 'bottomRight'];
    const destinationOrigins: Origin[] = ['bottomLeft', 'bottomMiddle', 'bottomRight'];
    const expectedOriginCoordinate = y;

    // Test all bottoms against all bottoms
    for (const sourceOrigin of sourceOrigins) {
      for (const destinationOrigin of destinationOrigins) {
        // Act
        const originOffsetY = getOriginOffsetY(height, sourceOrigin, destinationOrigin);
        const originCoordinate = y + originOffsetY;

        // Assert
        expect(originCoordinate).toBe(expectedOriginCoordinate);
      }
    }
  });
});

describe(`getFlippedOriginX tests`, () => {
  it(`checks whether getFlippedOriginX correctly flips a given origin, returning the result`, () => {
    // Arrange 1/2
    // This is done this way to avoid extreme code duplication
    const origins: Origin[] = [
      'topLeft',
      'topMiddle',
      'topRight',
      'middleLeft',
      'middle',
      'middleRight',
      'bottomLeft',
      'bottomMiddle',
      'bottomRight'
    ];
    const expectedFlippedOrigins: Origin[] = [
      'topRight',
      'topMiddle',
      'topLeft',
      'middleRight',
      'middle',
      'middleLeft',
      'bottomRight',
      'bottomMiddle',
      'bottomLeft'
    ];

    // Every origin at i corresponds to every flippedOrigin at i
    for (let i = 0; i < expectedFlippedOrigins.length; ++i) {
      // Arrange 2/2
      const origin = origins[i];
      const expectedFlippedOrigin = expectedFlippedOrigins[i];

      // Act
      const flippedOrigin = getFlippedOriginX(origin);

      // Assert
      expect(flippedOrigin).toBe(expectedFlippedOrigin);
    }
  });
});

describe(`getFlippedOriginY tests`, () => {
  it(`checks whether getFlippedOriginY correctly flips a given origin, returning the result`, () => {
    // Arrange 1/2
    // This is done this way to avoid extreme code duplication
    const origins: Origin[] = [
      'topLeft',
      'topMiddle',
      'topRight',
      'middleLeft',
      'middle',
      'middleRight',
      'bottomLeft',
      'bottomMiddle',
      'bottomRight'
    ];
    const expectedFlippedOrigins: Origin[] = [
      'bottomLeft',
      'bottomMiddle',
      'bottomRight',
      'middleLeft',
      'middle',
      'middleRight',
      'topLeft',
      'topMiddle',
      'topRight'
    ];

    // Every origin at i corresponds to every flippedOrigin at i
    for (let i = 0; i < expectedFlippedOrigins.length; ++i) {
      // Arrange 2/2
      const origin = origins[i];
      const expectedFlippedOrigin = expectedFlippedOrigins[i];

      // Act
      const flippedOrigin = getFlippedOriginY(origin);

      // Assert
      expect(flippedOrigin).toBe(expectedFlippedOrigin);
    }
  });
});

describe('OriginMapper error tests', () => {
  // These errors should not happen unless a user casts a string value to Origin

  it('checks whether getOriginOffsetX returns an error when an invalid source origin is passed', () => {
    // Arrange
    const width = 10;
    const invalidOrigin = 'invalidOrigin';
    // Note that the destination origin here is valid
    const sourceOrigin = invalidOrigin as Origin;
    const destinationOrigin = 'topLeft';

    // Act
    const getOriginOffsetXError = () => getOriginOffsetX(width, sourceOrigin, destinationOrigin);

    // Assert
    expect(getOriginOffsetXError).toThrowError(
      `Cannot assign '${sourceOrigin}' to the origin parameter in the ${getOriginOffsetX.name} function. Please use: 'topLeft', 'topMiddle', 'topRight', 'middleLeft', 'middle', 'middleRight', 'bottomLeft', 'bottomMiddle', or 'bottomRight'.`
    );
  });

  it('checks whether getOriginOffsetX returns an error when an invalid destination origin is passed', () => {
    // Arrange
    const width = 10;
    const invalidOrigin = 'invalidOrigin';
    // Note that the source origin here is valid
    const sourceOrigin = 'topLeft';
    const destinationOrigin = invalidOrigin as Origin;

    // Act
    const getOriginOffsetXError = () => getOriginOffsetX(width, sourceOrigin, destinationOrigin);

    // Assert
    expect(getOriginOffsetXError).toThrowError(
      `Cannot assign '${destinationOrigin}' to the origin parameter in the ${getOriginOffsetX.name} function. Please use: 'topLeft', 'topMiddle', 'topRight', 'middleLeft', 'middle', 'middleRight', 'bottomLeft', 'bottomMiddle', or 'bottomRight'.`
    );
  });

  it('checks whether getOriginOffsetY returns an error when an invalid source origin is passed', () => {
    // Arrange
    const width = 10;
    const invalidOrigin = 'invalidOrigin';
    // Note that the destination origin here is valid
    const sourceOrigin = invalidOrigin as Origin;
    const destinationOrigin = 'topLeft';

    // Act
    const getOriginOffsetYError = () => getOriginOffsetY(width, sourceOrigin, destinationOrigin);

    // Assert
    expect(getOriginOffsetYError).toThrowError(
      `Cannot assign '${sourceOrigin}' to the origin parameter in the ${getOriginOffsetY.name} function. Please use: 'topLeft', 'topMiddle', 'topRight', 'middleLeft', 'middle', 'middleRight', 'bottomLeft', 'bottomMiddle', or 'bottomRight'.`
    );
  });

  it('checks whether getOriginOffsetY returns an error when an invalid destination origin is passed', () => {
    // Arrange
    const width = 10;
    const invalidOrigin = 'invalidOrigin';
    // Note that the source origin here is valid
    const sourceOrigin = 'topLeft';
    const destinationOrigin = invalidOrigin as Origin;

    // Act
    const getOriginOffsetYError = () => getOriginOffsetY(width, sourceOrigin, destinationOrigin);

    // Assert
    expect(getOriginOffsetYError).toThrowError(
      `Cannot assign '${destinationOrigin}' to the origin parameter in the ${getOriginOffsetY.name} function. Please use: 'topLeft', 'topMiddle', 'topRight', 'middleLeft', 'middle', 'middleRight', 'bottomLeft', 'bottomMiddle', or 'bottomRight'.`
    );
  });

  it('checks whether getFlippedOriginX returns an error when an invalid origin is passed', () => {
    // Arrange
    const invalidOrigin = 'invalidOrigin' as Origin;

    // Act
    const getFlippedOriginXError = () => getFlippedOriginX(invalidOrigin);

    // Assert
    expect(getFlippedOriginXError).toThrowError(
      `Cannot assign '${invalidOrigin}' to the origin parameter in the ${getFlippedOriginX.name} function. Please use: 'topLeft', 'topMiddle', 'topRight', 'middleLeft', 'middle', 'middleRight', 'bottomLeft', 'bottomMiddle', or 'bottomRight'.`
    );
  });

  it('checks whether getFlippedOriginY returns an error when an invalid origin is passed', () => {
    // Arrange
    const invalidOrigin = 'invalidOrigin' as Origin;

    // Act
    const getFlippedOriginYError = () => getFlippedOriginY(invalidOrigin);

    // Assert
    expect(getFlippedOriginYError).toThrowError(
      `Cannot assign '${invalidOrigin}' to the origin parameter in the ${getFlippedOriginY.name} function. Please use: 'topLeft', 'topMiddle', 'topRight', 'middleLeft', 'middle', 'middleRight', 'bottomLeft', 'bottomMiddle', or 'bottomRight'.`
    );
  });
});
