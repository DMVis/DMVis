# Styling visualisations using `StyleUtils`

To ensure consistent and visually appealing visualisations, we have developed a utility class, `StyleUtils`, that facilitates the management of styles, fonts, and colours across various visualisation components.

The `StyleUtils` class contains methods and properties that help in generating and managing colour schemes and other style-related settings.

# Table of contents

- [Constructor](#constructor)
- [Class Properties](#class-properties)
- [Functions](#functions)
  - [generateColors](#generatecolors)

## Constructor

The constructor accepts an optional `styleOptions` object with the following properties:

- `fontSize`: Overrides the default font size.
- `fontFamily`: Overrides the default font family.
- `color`: Overrides the default primary colour.
- `colorBorder`: Overrides the default border colour.
- `focusColor`: Overrides the default focus colour.
- `colorSet`: Specifies the identifier for a colour set, which can be found on [Colorbrewer](https://colorbrewer2.org/).
- `numColors`: Specifies the number of colours to generate from the set.
- `selectionColor`: Overrides the default selection colour.

The following example demonstrates how to instantiate the `StyleUtils` class with the default options:

```html
<script lang="ts">
  import { StyleUtils } from '@dmvis/dmvis/utils';

  const styleUtil = new StyleUtils();
</script>
```

Below is an example of how to instantiate the `StyleUtils` class with some custom options changed:

```html
<script lang="ts">
  import { StyleUtils } from '@dmvis/dmvis/utils';

  const styleOptions = {
    color: '#333333',
    colorSet: 'Paired',
    focusColor: '#FF4500',
    fontFamily: 'Helvetica',
    numColors: 10
  };

  const styleUtil = new StyleUtils(styleOptions);
</script>
```

In this last example, the class is instantiated with custom options for all the possible style options. The `styleUtil` object can now be used to generate colour schemes and manage styles across visualisations.:

```html
<script lang="ts">
  import { StyleUtils } from '@dmvis/dmvis/utils';

  const styleOptions = {
    fontSize = '12px',
    fontFamily = 'Arial',
    color = '#333333',
    colorBorder = '#000000',
    focusColor = '#FF4500',
    colorSet = 'Paired',
    numColors = 10,
    selectionColor = '#FF0000'
  };

  const styleUtil = new StyleUtils(styleOptions);
</script>
```

## Class Properties

- `color`: The default colour for the primary elements of the visualisation.
- `colorBorder`: The default border colour for the visualisation elements.
- `colorScheme`: An array of strings that represents the current colour scheme for the visualisation.
- `colorSchemeDark`: An array of strings that represents the darkened version of the current colour scheme, suitable for night mode or darker backgrounds.
- `focusColor`: The colour used for elements in focus (e.g., during interactions).
- `fontFamily`: The default font family used in the visualisation, unless overridden.
- `fontSize`: The default font size used in the visualisation, unless overridden.
- `selectionColor`: The colour used for selection boxes in visualisations (e.g. during brushing).

## Functions

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
