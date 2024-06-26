// Imports
import { type ScaleBand, type ScalePoint } from 'd3';
import { describe, it, expect, expectTypeOf } from 'vitest';

// DMVis imports
import { spacerSide, spacerEqual } from '$lib/utils/Spacer.js';

describe('SpacerSide placement test', () => {
  it(`creates a SpacerSide and checks the type`, () => {
    // Arrange
    const dimension = 1000;
    const marginLow = 0;
    const marginHigh = 0;
    const columns = ['p1', 'p2', 'p3', 'p4'];
    const alignment = 'start';

    // Act
    const spacer = spacerSide(dimension, marginLow, marginHigh, columns, alignment);

    // Assert
    expectTypeOf(spacer).toEqualTypeOf<ScaleBand<string>>();
  });

  it(`creates a SpacerSide and checks the positions with 'start' alignment with zero margins`, () => {
    // Arrange
    const dimension = 1000;
    const marginLow = 0;
    const marginHigh = 0;
    const columns = ['p1', 'p2', 'p3', 'p4'];
    const alignment = 'start';

    // Act
    const spacer = spacerSide(dimension, marginLow, marginHigh, columns, alignment);

    // Assert
    expect(spacer('p1')).toBe(0);
    expect(spacer('p2')).toBe(250);
    expect(spacer('p3')).toBe(500);
    expect(spacer('p4')).toBe(750);
    expect(spacer.step()).toBe(250);
    expect(spacer.bandwidth()).toBe(250);
  });

  it(`creates a SpacerSide and checks the positions with 'end' alignment with zero margins`, () => {
    // Arrange
    const dimension = 1000;
    const marginLow = 0;
    const marginHigh = 0;
    const columns = ['p1', 'p2', 'p3', 'p4'];
    const alignment = 'end';

    // Act
    const spacer = spacerSide(dimension, marginLow, marginHigh, columns, alignment);

    // Assert
    expect(spacer('p1')).toBe(250);
    expect(spacer('p2')).toBe(500);
    expect(spacer('p3')).toBe(750);
    expect(spacer('p4')).toBe(1000);
    expect(spacer.step()).toBe(250);
    expect(spacer.bandwidth()).toBe(250);
  });

  it(`creates a SpacerSide and checks the positions with 'start' alignment with margins`, () => {
    // Arrange
    const dimension = 1000;
    const marginLow = 100;
    const marginHigh = 100;
    const columns = ['p1', 'p2', 'p3', 'p4'];
    const alignment = 'start';

    // Act
    const spacer = spacerSide(dimension, marginLow, marginHigh, columns, alignment);

    // Assert
    expect(spacer('p1')).toBe(100);
    expect(spacer('p2')).toBe(300);
    expect(spacer('p3')).toBe(500);
    expect(spacer('p4')).toBe(700);
    expect(spacer.step()).toBe(200);
    expect(spacer.bandwidth()).toBe(200);
  });

  it(`creates a SpacerSide and checks the positions with 'end' alignment with margins`, () => {
    // Arrange
    const dimension = 1000;
    const marginLow = 100;
    const marginHigh = 100;
    const columns = ['p1', 'p2', 'p3', 'p4'];
    const alignment = 'end';

    // Act
    const spacer = spacerSide(dimension, marginLow, marginHigh, columns, alignment);

    // Assert
    expect(spacer('p1')).toBe(300);
    expect(spacer('p2')).toBe(500);
    expect(spacer('p3')).toBe(700);
    expect(spacer('p4')).toBe(900);
    expect(spacer.step()).toBe(200);
    expect(spacer.bandwidth()).toBe(200);
  });

  it(`creates a SpacerSide and checks the positions with 'start' alignment with margins and padding`, () => {
    // Arrange
    const dimension = 1000;
    const marginLow = 100;
    const marginHigh = 100;
    const columns = ['p1', 'p2', 'p3', 'p4'];
    const alignment = 'start';
    const paddingInner = 0.1;

    // Act
    const spacer = spacerSide(dimension, marginLow, marginHigh, columns, alignment, paddingInner);

    // Assert
    // Hard coded numbers because padding calculations in ScaleBand return ugly numbers
    expect(spacer('p1')).toBe(100);
    expect(spacer('p2')).toBe(305.12820512820514);
    expect(spacer('p3')).toBe(510.2564102564103);
    expect(spacer('p4')).toBe(715.3846153846155);
    expect(spacer.step()).toBe(205.12820512820514);
    expect(spacer.bandwidth()).toBe(184.61538461538464);
  });

  it(`creates a SpacerSide and checks the positions with 'end' alignment with margins and padding`, () => {
    // Arrange
    const dimension = 1000;
    const marginLow = 100;
    const marginHigh = 100;
    const columns = ['p1', 'p2', 'p3', 'p4'];
    const alignment = 'end';
    const paddingInner = 0.1;

    // Act
    const spacer = spacerSide(dimension, marginLow, marginHigh, columns, alignment, paddingInner);

    // Assert
    // Hard coded numbers because padding calculations in ScaleBand return ugly numbers
    expect(spacer('p1')).toBe(284.61538461538464);
    expect(spacer('p2')).toBe(489.74358974358984);
    expect(spacer('p3')).toBe(694.8717948717949);
    expect(spacer('p4')).toBe(900.0000000000001);
    expect(spacer.step()).toBe(205.12820512820517);
    expect(spacer.bandwidth()).toBe(184.61538461538464);
  });
});

describe('SpacerEqual placement test', () => {
  it(`creates a SpacerEqual and checks the type`, () => {
    // Arrange
    const dimension = 1000;
    const marginLow = 0;
    const marginHigh = 0;
    const columns = ['p1', 'p2', 'p3', 'p4'];

    // Act
    const spacer = spacerEqual(dimension, marginLow, marginHigh, columns);

    // Assert
    expectTypeOf(spacer).toEqualTypeOf<ScalePoint<string>>();
  });

  it(`creates a SpacerEqual and checks the positions with zero margins`, () => {
    // Arrange
    const dimension = 1000;
    const marginLow = 0;
    const marginHigh = 0;
    const columns = ['p1', 'p2', 'p3', 'p4'];

    // Act
    const spacer = spacerEqual(dimension, marginLow, marginHigh, columns);

    // Assert
    expect(spacer('p1')).toBe(0);
    expect(spacer('p2')).toBe(333.3333333333333);
    expect(spacer('p3')).toBe(666.6666666666666);
    expect(spacer('p4')).toBe(1000);
    expect(spacer.step()).toBe(333.3333333333333);
  });

  it(`creates a SpacerEqual and checks the positions with margins`, () => {
    // Arrange
    const dimension = 1000;
    const marginLow = 50;
    const marginHigh = 50;
    const columns = ['p1', 'p2', 'p3', 'p4'];

    // Act
    const spacer = spacerEqual(dimension, marginLow, marginHigh, columns);

    // Assert
    expect(spacer('p1')).toBe(50);
    expect(spacer('p2')).toBe(350);
    expect(spacer('p3')).toBe(650);
    expect(spacer('p4')).toBe(950);
    expect(spacer.step()).toBe(300);
  });

  it(`creates a SpacerEqual and checks the positions with margins and outer padding`, () => {
    // Arrange
    const dimension = 1000;
    const marginLow = 50;
    const marginHigh = 50;
    const columns = ['p1', 'p2', 'p3', 'p4'];
    const paddingOuter = 0.1;

    // Act
    const spacer = spacerEqual(dimension, marginLow, marginHigh, columns, paddingOuter);

    // Assert
    // Hard coded numbers because padding calculations in ScaleBand return ugly numbers
    expect(spacer('p1')).toBe(78.125);
    expect(spacer('p2')).toBe(359.375);
    expect(spacer('p3')).toBe(640.625);
    expect(spacer('p4')).toBe(921.875);
    expect(spacer.step()).toBe(281.25);
  });
});
