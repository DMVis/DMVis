# Point component

The point component is meant to be used in visualisations like a scatterplot. It produces a point at a given coordinate of certain color, size and style.

> Note: This component produces a single point, use it repeatedly to plot multiple points.

# Required Attributes

## x

- Type: `number`

Scaled x-coordinate of the point.

## y

-Type: `number`

Scaled y-coordinate of the point.

# Optional Attributes

## radius

- Type: `number`
- Default: `5`

The radius of the circle that represents the point.

## borderWidth

- Type: `number`
- Default: `1`

Width of the border around the point.

> Note: the border can be removed entirely by setting the value to 0.

## opacity

- Type: `number`
- Default: `1`

The opacity of the point, where 0 represents a completely transparent point and 1 represents a completely opaque point.

## name

- Type: `string`
- Default: `'point'`

The class name of the point. It can be used as an identifier. It defaults to only `'point'`. If set, the class names will be `'point'` and `'point-name'`.

# Event dispatches

These are all the events that the point component will dispatch to its parent components. Check the example usage on how to use these events.

## mousePointEnter

- Event type: `{ name: string, x: number, y: number }`

Event that fires when the mouse enters the point. The name attribute represents the classname of the point, the x- and y-attribute represent the given x- and y-coordinate of the point.

## mousePointLeave

- Event type: `{ name: string, x: number, y: number }`

Event that fires when the mouse leaves the point. The name attribute represents the class name of the point, the x- and y-attribute represent the given x- and y-coordinate of the point.

## mousePointClick

- Event type: `{ name: string }`

Event that fires when the point is clicked. The name attribute represents the class name of the one clicked.

# Example usage

```svelte
<svg {width} {height}>
  {#each data as p}
    <Point
      x={p.x}
      y={p.y}
      radius={6}
      color="rgb(255,102,255)"
      borderColor="purple"
      borderWidth={4}
      on:mousePointEnter={onMousePointEnter} />
  {/each}
</svg>
```
