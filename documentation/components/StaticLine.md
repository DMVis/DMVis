# StaticLine component

The static line component is meant to be used in charts like a line chart. It produces a line between the points that are provided with a certain colour, size and style.

> Note: The points passed to the StaticLine component are true coordinates, meaning that they will be plotted at these exact coordinates.

# Table of Contents

- [Required Attributes](#required-attributes)
- [Optional Attributes](#optional-attributes)
- [Example usage](#example-usage)

# Required Attributes

## points

- Type: `{ x: number; y: number }[]`

List of points containing an x and y value.

# Optional Attributes

## color

- Type: `string`
- Default: `#000`

Colour of the line.

## lineWidth

- Type: `number`
- Default: `1`

Width of the line.

## dashLength

- Type: `string`
- Default: `'0'`

Length of the strokes of the line. By default, this is a normal line. If set to a higher value, it will result in a dotted line.

## opacity

- Type: `number`
- Default: `1`

The opacity of the line, where `1` represents a fully opaque line and `0` a fully transparent line.

# Example usage

<b>Creating a basic static line.</b>

```svelte
<script lang="ts">
  import { StaticLine } from '@dmvis/dmvis/components';

  const pointList = [
    { x: 0, y: 432 },
    { x: 125, y: 234 },
    { x: 250, y: 285 },
    { x: 375, y: 158 },
    { x: 500, y: 458 }
  ];
</script>

<svg width={500} height={500}>
  <StaticLine points={pointList} />
</svg>
```

<b>Creating a more customised dotted line.</b>

```svelte
<script lang="ts">
  import { StaticLine } from '@dmvis/dmvis/components';

  const pointList = [
    { x: 0, y: 432 },
    { x: 125, y: 234 },
    { x: 250, y: 285 },
    { x: 375, y: 158 },
    { x: 500, y: 458 }
  ];
</script>

<svg width={500} height={500}>
  <StaticLine points={pointList} color={'#ABCDEF'} lineWidth={5} dashLength="10" opacity={0.5} />
</svg>
```
