import { describe, it, expect } from 'vitest';
import { StyleUtils } from '$lib/utils/StyleUtils.js';
import chroma from 'chroma-js';

describe('StyleUtils tests', () => {
  it('should generate a color scheme', () => {
    // Prepare
    const colorSet = 'qualitative'; // Using a ColorBrewer color set as an example
    const n = 5; // Number of colors to generate

    // Test
    const colorUtils = new StyleUtils();
    const colors = colorUtils.generateColors(colorSet, n);

    // Assertions
    expect(colors).toBeDefined();
    expect(colors).toBeInstanceOf(Array);
    expect(colors.length).toBe(n);
    // Verify that each color in the array is a valid hex color
    colors.forEach((color) => {
      expect(chroma.valid(color)).toBe(true);
    });
  });

  it('should generate the correct color set', () => {
    // Prepare
    const colorSet = 'Set1'; // Using a ColorBrewer color set as an example
    const n = 5; // Number of colors to generate

    // Test
    const colorUtils = new StyleUtils();
    const colors = colorUtils.generateColors(colorSet, n);

    // Assertions
    expect(colors).toBeDefined();
    expect(colors).toBeInstanceOf(Array);
    expect(colors.length).toBe(n);
    // Verify that the generated colors match the expected color set
    expect(colors).toEqual(['#e41a1c', '#377eb8', '#4daf4a', '#984ea3', '#ff7f00']);
  });

  it('should darken the generated colors', () => {
    // Prepare
    const colorSet = 'OrRd';
    const n = 5;

    // Test
    const colorUtils = new StyleUtils();
    colorUtils.generateColors(colorSet, n);
    const { colorScheme, colorSchemeDark } = colorUtils;

    // Assertions
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
    // Prepare
    const colorSet = 'OrRd';
    const n = 5;

    // Test
    const colorUtils = new StyleUtils();
    colorUtils.generateColors(colorSet, n);
    const { colorScheme, colorSchemeDark } = colorUtils;

    // Assertions
    expect(colorScheme.length).toBe(colorSchemeDark.length);
  });

  it('should return the highest n of a color set', () => {
    // Prepare
    const colorSet = 'Set3';

    // Test
    const colorUtils = new StyleUtils();
    const highestN = colorUtils.findMaximumColorCount(colorSet);

    // Assertions
    expect(highestN).toBe(12);
  });

  it('should return the scheme group of a color set', () => {
    // Prepare
    const colorSet = 'Spectral';

    // Test
    const colorUtils = new StyleUtils();
    const schemeGroup = colorUtils.findSchemeGroup(colorSet);

    // Assertions
    expect(schemeGroup).toBe('diverging');
  });

  it('should throw an error for an invalid color scheme', () => {
    // Prepare
    const colorSet = 'InvalidScheme';
    const n = 5;

    // Test
    const colorUtils = new StyleUtils();

    // Assertions
    expect(() => colorUtils.generateColors(colorSet, n)).toThrowError(
      'Invalid color scheme. Look up the available color schemes in ColorBrewer2.org.'
    );
  });

  it('should wrap around the color set if the number of colors exceeds the maximum', () => {
    // Prepare
    const scheme = 'Set1';
    const colorSet = 'OrRd';
    const n = 10;

    // Test
    const colorUtils = new StyleUtils();
    const wrappedColors = colorUtils.wrapColorSet(scheme, colorSet, n);

    // Assertions
    expect(wrappedColors).toBeDefined();
    expect(wrappedColors).toBeInstanceOf(Array);
    expect(wrappedColors.length).toBe(n);
    expect(wrappedColors).toEqual([
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
    ]);
  });

  it('should throw an error if n is not a number or negative', () => {
    // Prepare
    const colorSet = 'OrRd';
    const n = -5;

    // Test
    const colorUtils = new StyleUtils();

    // Assertions
    expect(() => colorUtils.generateColors(colorSet, n)).toThrowError(
      'Invalid number of colors. Please provide a positive number.'
    );
  });

  it('should change only the values that are passed', () => {
    // Prepare
    const options = {
      fontSize: 15,
      color: 'red'
    };

    // Test
    const colorUtils = new StyleUtils(options);

    // Assertions
    expect(colorUtils.fontSize).toBe(15);
    expect(colorUtils.color).toBe('red');
    expect(colorUtils.fontFamily).toBe('Arial');
    expect(colorUtils.colorBorder).toBe('#8C8C8C');
    expect(colorUtils.focusColor).toBe('#FF0000');
  });
});
