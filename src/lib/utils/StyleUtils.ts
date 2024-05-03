// Imports
import chroma from 'chroma-js';
import colorbrewer from 'colorbrewer';

// DMVis Imports
import { ThrowError } from '$lib/utils/ThrowError.js';

interface styleOptions {
  fontSize?: number;
  fontFamily?: string;
  color?: string;
  colorBorder?: string;
  focusColor?: string;
  colorSet?: string;
  numColors?: number;
}

/**
 * A class that provides utility functions to work with colors, allowing
 * the generation of color schemes based on color sets and datatypes.
 */
export class StyleUtils {
  public colorScheme: Array<string>;
  public colorSchemeDark: Array<string>;
  public fontSize;
  public fontFamily;
  public color;
  public colorBorder;
  public focusColor;

  constructor(options?: styleOptions) {
    this.colorScheme = [];
    this.colorSchemeDark = [];
    this.fontSize = options?.fontSize ? options.fontSize : 12;
    this.fontFamily = options?.fontFamily ? options.fontFamily : 'Arial';
    this.color = options?.color ? options.color : '#BBBBBB';
    this.colorBorder = options?.colorBorder ? options.colorBorder : '#8C8C8C';
    this.focusColor = options?.focusColor ? options.focusColor : '#FF0000';

    if (options?.colorSet && options?.numColors) {
      this.generateColors(options.colorSet, options.numColors);
    }
  }

  /**
   * Returns a color scheme based on colorbrewer.
   *
   * @param colorSet The color set identifier (e.g., from ColorBrewer).
   * @param numberOfColors The number of colors to generate.
   * @returns An array of color strings.
   */
  generateColors(colorSet: string, numberOfColors: number): Array<string> {
    // Check if n is a positive integer
    if (!Number.isInteger(numberOfColors) || numberOfColors <= 0) {
      throw ThrowError(
        'Error',
        'Invalid number of colors. Please provide a positive number.',
        'StyleUtils'
      );
    }

    // Assert that colorSet is indeed a keyof typeof colorbrewer
    if (colorSet in colorbrewer) {
      // Get the color scheme based on the number of colors
      const set: keyof typeof colorbrewer = colorSet as keyof typeof colorbrewer;
      if (colorbrewer[set][numberOfColors]) {
        this.colorScheme = colorbrewer[set][numberOfColors];
      }

      // If the number of colors is not available in the color set generate the colors
      else {
        // Find scheme group of the color set
        const schemeGroup = this.findSchemeGroup(colorSet);
        if (schemeGroup === 'qualitative') {
          // Wrap around the color set if the number of colors exceeds the maximum
          this.colorScheme = this.wrapColorSet(set, colorSet, numberOfColors);
        } else {
          this.colorScheme = chroma.scale(colorSet).mode('lab').colors(numberOfColors);
        }
      }
    }
    // Check if the colorSet is a colorScheme group type
    // @ts-expect-error property 'schemeGroups' does not exist on type 'Base'.
    else if (colorSet in colorbrewer.schemeGroups) {
      // @ts-expect-error property 'schemeGroups' does not exist on type 'Base'.
      const possibleSchemes = colorbrewer.schemeGroups[colorSet];

      // Pick a random color set from the group
      const scheme = possibleSchemes[Math.floor(Math.random() * possibleSchemes.length)];

      // Generates the colors based on the color set
      this.colorScheme = this.generateColors(scheme, numberOfColors);
    } else {
      throw ThrowError(
        'Error',
        'Invalid color scheme. Look up the available color schemes in ColorBrewer2.org.',
        'StyleUtils'
      );
    }

    // Generate darkened colors for night mode
    this.colorSchemeDark = this.colorScheme.map((color) => chroma(color).darken().hex());

    return this.colorScheme;
  }

  // Helper function to wrap around the color set if the number of colors exceeds the maximum
  wrapColorSet(scheme: keyof typeof colorbrewer, colorSet: string, n: number): Array<string> {
    const colors = colorbrewer[scheme][this.findMaximumColorCount(scheme)];

    // Calculate the number of times the full color set is needed
    const fullSetsNeeded = Math.floor(n / colors.length);
    const remainingColorsNeeded = n % colors.length;

    // Create the final array by repeating the full set and adding any remaining colors
    let wrappedColors = Array(fullSetsNeeded).fill(colors).flat();
    wrappedColors = wrappedColors.concat(colors.slice(0, remainingColorsNeeded));

    return wrappedColors;
  }

  // Helper function finding the highest n of a color set
  findMaximumColorCount(colorSet: string): number {
    // Find the highest n in the color set
    const scheme: keyof typeof colorbrewer = colorSet as keyof typeof colorbrewer;
    const n = Object.keys(colorbrewer[scheme]).reduce((a, b) => Math.max(a, parseInt(b)), 0);
    return n;
  }

  // Helper function to find the scheme group of a color set
  findSchemeGroup(colorSet: string): string | null {
    // @ts-expect-error property 'schemeGroups' does not exist on type 'Base'.
    for (const group in colorbrewer.schemeGroups) {
      // @ts-expect-error property 'schemeGroups' does not exist on type 'Base'.
      if (colorbrewer.schemeGroups[group].includes(colorSet)) {
        return group;
      }
    }
    return null; // Return null if the colorSet is not found in any group
  }
}
