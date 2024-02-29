# Point component

The point component is meant to be used in charts like a scatterplot. It produces a point at a given coordinate of certain color, size and style.

> Note: This component produces a single point, use it repeatedly to plot multiple points.

# Required Attributes

## x

- Type: `number`

Scaled x-coordinate of the point.

## y

-Type: `number`

Scaled y-coordinate of the point.

# Optional Attributes

## color

- Type: `string`
- Default: `#CCCCFF`

Fill color of the point

> Note: can be set to `none`, to give it no fill.

## radius

- Type: `number`
- Default: `5`

Radius of circle that represents the point.

## borderColor

- Type: `string`
- Default: `#000`

Color of the border around the point.

## borderWidth

- Type: `number`
- Default: `1`

Width of the border around the point.

> Note: the border can be removed entirely by setting the value to 0.

## Sample usage

```svelte
<svg {width} {height}>
  {#each data as p}
    <Point
      x={p.x}
      y={p.y}
      radius={6}
      color="rgb(255,102,255)"
      borderColor="purple"
      borderWidth={4} />
  {/each}
</svg>
```
