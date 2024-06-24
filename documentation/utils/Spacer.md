# Spacer

Use the various spacer functions to space elements depending on the data. These functions work for both horizontal and vertical spacing, using width or height.

## Table of Contents

- [Functions](#functions)
  - [spacer](#spacer)
  - [spacerSide](#spacerside)
  - [spacerEqual](#spacerequal)
- [Alignments](#alignments)

## Functions

### spacer

The `spacer` function takes in the following parameters:

- dimension: `number` - The dimension of the element.
- marginLow: `number` - The margin closest to the origin.
- marginHigh: `number` - The margin furthest from the origin.
- length: `number` - The amount of elements that need to be spaced.

The function returns a number that represents the needed gap between elements to space them between the given dimension.

See an example of how `spacer` works below:

```html
<script lang="ts">
  import { spacer } from '@dmvis/dmvis/utils';

  const dimension = 500;
  const marginLow = 10;
  const marginHigh = 10;
  const length = 10;

  const gap = spacer(dimension, marginLow, marginHigh, length);
  console.log(gap); // 47.9
</script>
```

### spacerSide

The `spacerSide` function takes in the following parameters:

- dimension: `number` - The size of the dimension of the element (amount of pixels in width or height).
- marginLow: `number` - The margin closest to the origin.
- marginHigh: `number` - The margin furthest from the origin.
- columns: `string[]` - A list of column names.
- alignment: `'start' | 'end'` - The spacing's alignment, if each given column is one 'box', then start gives the coordinate at the start of the box and end at the end of the box.
- paddingInner: `number` - The padding between each step in the spacer (relating to one element in the domain). Defaults to `0`.
- paddingOuter: `number` - The padding on the outside of the spacer (before the first element and after the last element in the domain). Defaults to `0`.

The function returns a function, which, given a column name as a string, returns a number. This represents the position of the component that corresponds with the given column name should be placed.

See an example of how `spacerSide` works below:

```html
<script lang="ts">
  import { spacerSide } from '@dmvis/dmvis/utils';

  const width = 500;
  const marginLow = 10;
  const marginHigh = 10;
  const columns = ['A', 'B', 'C', 'D', 'E'];
  const alignment = 'start';
  const paddingInner = 10;
  const paddingOuter = 10;

  const position = spacerSide(
    width,
    marginLow,
    marginHigh,
    columns,
    alignment,
    paddingInner,
    paddingOuter
  );
  console.log(position('A')); // 210
  console.log(position('B')); // 230
  console.log(position('C')); // 250
  console.log(position('D')); // 270
  console.log(position('E')); // 290
</script>
```

### spacerEqual

The `spacerEqual` function takes in the following parameters:

- dimension: `number` - The size of the dimension of the element (amount of pixels in width or height).
- marginLow: `number` - The margin closest to the origin.
- marginHigh: `number` - The margin furthest from the origin.
- columns: `string[]` - List of column names.
- paddingOuter`: `number` - The padding on the outside of the spacer (before the first element and after the last element in the domain). Defaults to 0.

The function returns a function, which, given a column name as a string, returns a number. This represents the position of the component that corresponds with the given column name should be placed.

See an example of how `spacerEqual` works below:

```html
<script lang="ts">
  import { spacerEqual } from '@dmvis/dmvis/utils';

  const width = 500;
  const marginLow = 10;
  const marginHigh = 10;
  const columns = ['A', 'B', 'C'];
  const paddingOuter = 0;

  const position = spacerEqual(width, marginLow, marginHigh, columns, paddingOuter);
  console.log(position('A')); // 10
  console.log(position('B')); // 250
  console.log(position('C')); // 490
</script>
```

## Alignments

Below is a visual representation of the different alignments that can be used with the Spacer functions:

![Spacer Alignments](../media/alignments_spacer.png ':size=700')
