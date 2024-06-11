# Styling visualisations using `StyleUtils`

To ensure consistent and visually appealing visualisations, we have developed a utility class, `StyleUtils`, that facilitates the management of styles, fonts, and colours across various visualisation components.

The `StyleUtils` class contains methods and properties that help in generating and managing colour schemes and other style-related settings.

## Class Properties

- `colorScheme`: An array of strings that represents the current colour scheme for the visualisation.
- `colorSchemeDark`: An array of strings that represents the darkened version of the current colour scheme, suitable for night mode or darker backgrounds.
- `fontSize`: The default font size used in the visualisation, unless overridden.
- `fontFamily`: The default font family used in the visualisation, unless overridden.
- `color`: The default colour for the primary elements of the visualisation.
- `colorBorder`: The default border colour for the visualisation elements.
- `focusColor`: The colour used for elements in focus (e.g., during interactions).
- `selectionColor`: The colour used for selection boxes in visualisations (e.g. during brushing).

## Constructor

The constructor accepts an optional `styleOptions` object with the following properties:

- `fontSize`: Overrides the default font size.
- `fontFamily`: Overrides the default font family.
- `color`: Overrides the default primary colour.
- `colorBorder`: Overrides the default border colour.
- `focusColor`: Overrides the default focus colour.
- `colorSet`: Specifies the identifier for a colour set (find colorsets on https://colorbrewer2.org/).
- `numColors`: Specifies the number of colours to generate from the set.
- `selectionColor`: Overrides the default selection colour.

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

In the example above, the `StyleUtils` class is instantiated with custom options for the font family, primary colour, focus colour, and colour set.

## Methods

### `generateColors`

The `generateColors` method generates an array of colours based on the specified colour set and a number of colours. It updates the `colorScheme` and `colorSchemeDark` properties of the class.

Parameters

- `colorSet`: The identifier for a colour set (e.g., from ColorBrewer). Or a data type (e.g., 'qualitative', 'sequential', 'diverging') to generate a colour set.
- `numColors`: The number of colours to generate from the set.

Returns an array of colour strings.

Example usage:

```javascript
styleUtil.generateColors('Paired', 10);
console.log(styleUtil.colorScheme);
```

In the example above, the `generateColors` method is used to generate a colour scheme with 10 colours from the 'Paired' set.
