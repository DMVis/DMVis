# Line component

The line component is meant to be used in charts like a linechart. It produces a line between given points of certain color, size and style.

> Note: This component can handle 2 or multiple points to draw a line through.

# Required Attributes

## points

- Type: `[{ x: number; y: number }]`

List of points containing a x and y value.

# Optional Attributes

## color

- Type: `string`
- Default: `#000`

Color of the line.

## width

- Type: `number`
- Default: `1`

Width of the line that is drawn.

## Sample usage

```svelte
<svg {width} {height}>
  <Line points={data} color={'#800816'} width={2} />
</svg>
```
