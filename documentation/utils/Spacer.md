# Spacer Util

Use the various Spacer functions to space elements depending on the data. These functions work for both horizontal and vertical spacing, using width or height.

# Table of Contents

- [Spacer](#spacer)
- [SpacerSide](#spacerside)
- [SpacerEqual](#spacerequal)

# Spacer

The `Spacer` function takes in the following parameters:

- `dimension`: The dimension of the element.
- `marginLow`: The margin closest to the origin.
- `marginHigh`: The margin furthest from the origin.

The function returns a number that represents the needed gap between elements to space them between the given dimension.

See an example of how `Spacer` works below:

```javascript
Spacer($width, $marginLeft, $marginRight, data[0].length);
```

# SpacerSide

The `SpacerSide` function takes in the following parameters:

- `dimension`: number - The size of the dimension of the element (amount of pixels in width or height).
- `marginLow`: number - The margin closest to the origin.
- `marginHigh`: number - The margin furthest from the origin.
- `columns`: string[] - List of column names.
- `alignment`: 'start' | 'end' - Alignment of the spacing, if each given column is one 'box', then start gives the coordinate at the start of the box and end at the end of the box.
- `paddingInner`: number - The padding between each step in the spacer (relating to one element in the domain). This defaults to 0.
- `paddingOuter`: number - The padding on the outside of the spacer (before the first element and after the last element in the domain). This defaults to 0.

The function returns a function, which, given a column name as a string, returns a number. This represents the position of the component that corresponds with the given column name should be placed.

See an example of how `SpacerSide` works below:

```javascript
SpacerSide($width, $marginLeft, $marginRight, $columns, 'start');
```

# SpacerEqual

The `SpacerEqual` function takes in the following parameters:

- `dimension`: number - The size of the dimension of the element (amount of pixels in width or height).
- `marginLow`: number - The margin closest to the origin.
- `marginHigh`: number - The margin furthest from the origin.
- `columns`: string[] - List of column names.
- `paddingOuter`: number - The padding on the outside of the spacer (before the first element and after the last element in the domain). This defaults to 0.

The function returns a function, which, given a column name as a string, returns a number. This represents the position of the component that corresponds with the given column name should be placed.

See an example of how `SpacerEqual` works below:

```javascript
SpacerEqual($width, $marginLeft, $marginRight, $columns);
```

#### Alignments for the different Spacer implementations

![Spacer Alignments](../media/alignments_spacer.png ':size=700')
