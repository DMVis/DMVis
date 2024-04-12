# Styling visualisations using `StyleUtils`

To ensure consistent and visually appealing visualisations, we have developed a utility class, `StyleUtils`, that facilitates the management of styles, fonts, and colors across various visualisation components.

The `StyleUtils` class contains methods and properties that help in generating and managing color schemes and other style-related settings.

## Class Properties

- `colorScheme`: An array of strings that represents the current color scheme for the visualisation.
- `colorSchemeDark`: An array of strings that represents the darkened version of the current color scheme, suitable for night mode or darker backgrounds.
- `fontSize`: The default font size used in the visualisation, unless overridden.
- `fontFamily`: The default font family used in the visualisation, unless overridden.
- `color`: The default color for the primary elements of the visualisation.
- `colorBorder`: The default border color for the visualisation elements.
- `focusColor`: The color used for elements in focus (e.g., during interactions).

## Constructor

The constructor accepts an optional `styleOptions` object with the following properties:

- `fontSize`: Overrides the default font size.
- `fontFamily`: Overrides the default font family.
- `color`: Overrides the default primary color.
- `colorBorder`: Overrides the default border color.
- `focusColor`: Overrides the default focus color.
- `colorSet`: Specifies the identifier for a color set (find colorsets on https://colorbrewer2.org/).
- `numColors`: Specifies the number of colors to generate from the set.

Below is an example of how to instantiate the `StyleUtils` class with some custom options:

```javascript
import { StyleUtils } from '$lib/utils/StyleUtils.js';

const styleOptions = {
  fontFamily: 'Helvetica',
  color: '#333333',
  focusColor: '#FF4500',
  colorSet: 'Paired',
  numColors: 10
};

const styleUtil = new StyleUtils(styleOptions);
```

In the example above, the `StyleUtils` class is instantiated with custom options for the font family, primary color, focus color, and color set.

## Methods

### `generateColors`

The `generateColors` method generates an array of colors based on the specified color set and number of colors. It updates the `colorScheme` and `colorSchemeDark` properties of the class.

Parameters

- `colorSet`: The identifier for a color set (e.g., from ColorBrewer). Or a data type (e.g., 'qualitative', 'sequential', 'diverging') to generate a color set.
- `numColors`: The number of colors to generate from the set.

Returns an array of color strings.

Example usage:

```javascript
styleUtil.generateColors('Paired', 10);
console.log(styleUtil.colorScheme);
```

In the example above, the `generateColors` method is used to generate a color scheme with 10 colors from the 'Paired' set.
