import { describe, it, expect } from 'vitest';
import chroma from 'chroma-js';

import { StyleUtils } from '$lib/utils/StyleUtils.js';

describe('StyleUtils functionality test', () => {
  it('should generate a color scheme', () => {
    // Arrange
    // Using a ColorBrewer color set as an example
    const colorSet = 'qualitative';
    // Number of colors to generate
    const n = 5;
    const colorUtils = new StyleUtils();

    // Act
    const colors = colorUtils.generateColors(colorSet, n);

    // Assert
    expect(colors).toBeDefined();
    expect(colors).toBeInstanceOf(Array);
    expect(colors.length).toBe(n);
    // Verify that each color in the array is a valid hex color
    colors.forEach((color) => {
      expect(chroma.valid(color)).toBe(true);
    });
  });

  it('should generate the correct color set', () => {
    // Arrange
    // Using a ColorBrewer color set as an example
    const colorSet = 'Set1';
    // Number of colors to generate
    const n = 5;
    const colorUtils = new StyleUtils();

    // Act
    const colors = colorUtils.generateColors(colorSet, n);

    // Assert
    expect(colors).toBeDefined();
    expect(colors).toBeInstanceOf(Array);
    expect(colors.length).toBe(n);
    // Verify that the generated colors match the expected color set
    expect(colors).toEqual(['#e41a1c', '#377eb8', '#4daf4a', '#984ea3', '#ff7f00']);
  });

  it('should darken the generated colors', () => {
    // Arrange
    const colorSet = 'OrRd';
    const n = 5;
    const colorUtils = new StyleUtils();

    // Act
    colorUtils.generateColors(colorSet, n);
    const { colorScheme, colorSchemeDark } = colorUtils;

    // Assert
    expect(colorSchemeDark).toBeDefined();
    expect(colorSchemeDark).toBeInstanceOf(Array);
    expect(colorSchemeDark.length).toBe(n);
    // Ensure darkened colors are darker than the original colors
    colorScheme.forEach((color, index) => {
      const originalLuminance = chroma(color).luminance();
      const darkenedLuminance = chroma(colorSchemeDark[index]).luminance();
      expect(darkenedLuminance).toBeLessThan(originalLuminance);
    });
  });

  it('should maintain the same number of colors in both light and dark arrays', () => {
    // Arrange
    const colorSet = 'OrRd';
    const n = 5;
    const colorUtils = new StyleUtils();

    // Act
    colorUtils.generateColors(colorSet, n);
    const { colorScheme, colorSchemeDark } = colorUtils;

    // Assert
    expect(colorScheme.length).toBe(colorSchemeDark.length);
  });

  it('should return the highest n of a color set', () => {
    // Arrange
    const colorSet = 'Set3';
    const colorUtils = new StyleUtils();

    // Act
    const highestN = colorUtils.findMaximumColorCount(colorSet);

    // Assert
    expect(highestN).toBe(12);
  });

  it('should return the scheme group of a color set', () => {
    // Arrange
    const colorSet = 'Spectral';
    const colorUtils = new StyleUtils();

    // Act
    const schemeGroup = colorUtils.findSchemeGroup(colorSet);

    // Assert
    expect(schemeGroup).toBe('diverging');
  });

  it('should throw an error for an invalid color scheme', () => {
    // Arrange
    const colorSet = 'InvalidScheme';
    const n = 5;
    const colorUtils = new StyleUtils();

    // Act
    const generateInvalidColorScheme = () => colorUtils.generateColors(colorSet, n);

    // Assert
    expect(generateInvalidColorScheme).toThrowError(
      'Invalid color scheme. Look up the available color schemes in ColorBrewer2.org.'
    );
  });

  it('should wrap around the color set if the number of colors exceeds the maximum', () => {
    // Arrange
    const scheme = 'Set1';
    const colorSet = 'OrRd';
    const n = 10;
    const colorUtils = new StyleUtils();
    const expectedWrappedColors = [
      '#e41a1c',
      '#377eb8',
      '#4daf4a',
      '#984ea3',
      '#ff7f00',
      '#ffff33',
      '#a65628',
      '#f781bf',
      '#999999',
      '#e41a1c'
    ];

    // Act
    const wrappedColors = colorUtils.wrapColorSet(scheme, colorSet, n);

    // Assert
    expect(wrappedColors).toBeDefined();
    expect(wrappedColors).toBeInstanceOf(Array);
    expect(wrappedColors.length).toBe(n);
    expect(wrappedColors).toEqual(expectedWrappedColors);
  });

  it('should throw an error if n is not a number or negative', () => {
    // Arrange
    const colorSet = 'OrRd';
    const n = -5;
    const colorUtils = new StyleUtils();

    // Act
    const generateColors = () => colorUtils.generateColors(colorSet, n);

    // Assert
    expect(generateColors).toThrowError(
      'Invalid number of colors. Please provide a positive number.'
    );
  });

  it('should change only the values that are passed', () => {
    // Arrange
    const options = {
      fontSize: 15,
      color: 'red'
    };

    // Act
    const colorUtils = new StyleUtils(options);

    // Assert
    expect(colorUtils.fontSize).toBe(options.fontSize);
    expect(colorUtils.color).toBe(options.color);
    expect(colorUtils.fontFamily).toBe('Arial');
    expect(colorUtils.colorBorder).toBe('#8C8C8C');
    expect(colorUtils.focusColor).toBe('#FF0000');
  });
});
