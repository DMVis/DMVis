# StaticLine component

The static line component is meant to be used in charts like a linechart. It produces a line between given points of certain color, size and style.

> Note: The points passed to the StaticLine component are true coordinates, meaning that they will be plotted at these exact coordinates.

# Required Attributes

## points

- Type: `{ x: number; y: number }[]`

List of points containing an x and y value.

# Optional Attributes

## color

- Type: `string`
- Default: `#000`

Color of the line.

## width

- Type: `number`
- Default: `1`

Width of the line that is drawn.

## dashWidth

- Type: `string`
- Default: `'0'`

Width of the strokes of the line. By default this is a normal line. If set to a higher value, it will result in a dotted line

## Sample usage

```svelte
<svg {width} {height}>
  <StaticLine points={data} color={'#800816'} width={2} />
</svg>
```
