# Bar component

A bar that can be used for bar visualizations.
Coordinates are relative to the parent SVG element.
Only positive `width` values are visible.
Both positive and negative `height` values are visible
depending on `showsNegativeHeight`.
Since both the width and height could be associated with
the x-axis or y-axis, one must explicitly mention which
is the case through setting `isHeightAlongYAxis`.

> Note: The default origin is the bottom middle of the bar.

# Required Attributes

## x

- Type: `number`

X-coordinate of the bar.

## y

- Type: `number`

Y-coordinate of the bar.

## width

- Type: `number`

Width of the bar.

## height

- Type: `number`

Height of the bar.

## isHeightAlongYAxis

- Type: `boolean`

Whether the height is along the x-axis or y-axis (i.e. horizontal or vertical bar).

# Optional Attributes

## color

- Type: `string`
- Default: `rgb(255, 0, 0)`

Color of the bar.

## opacity

- Type: `number | string`
- Default: `1`

Opacity of the bar as a number in range [0..1] or
a percentage string formatted as '{number}%'.

## originX

- Type: `OriginX`
- Default: `OriginX.Middle`

Horizontal origin of the bar.
Possible values: `OriginX.Left`, `OriginX.Middle`, `OriginX.Right`.
Which value is useful depends on your positioning logic.

## originY

- Type: `OriginY`
- Default: `OriginY.Bottom`

Vertical origin of the label.
Possible values: `OriginY.Top`, `OriginY.Middle`, `OriginY.Bottom`.
Which value is useful depends on your positioning logic.

## rotationDegrees

- Type: `number`
- Default: `0`

Rotation of the bar in degrees.

## radiusX

- Type: `string`
- Default: `0`

Horizontal corner radius of the bar as a number
or a percentage string formatted as `'{number}%'`.

## radiusY

- Type: `number | string`
- Default: `0`

Vertical corner radius of the bar as a number
or a percentage string formatted as `'{number}%'`.

## showsNegativeHeight

- Type: `boolean`
- Default: `false`

Whether the bar flips its orientation when `height` is negative or not.

## hoverText

- Type: `string`
- Default: `''`

Text to display in the label when the mouse hovers over the bar.

## name

- Type: `string`
- Default: `(x,y)`

Name of the bar. It can be used as an identifier.
Defaults to '(`x`,`y`)', which contains the actual values of `x` and `y`.

# Event dispatches

These are all the events that the bar component will dispatch to its parent components. Check the example usage on how to use these events.

## mouseBarEntered

- Event type: `{ name: string}`

Event that fires when the mouse enters the point. The name attribute represents the classname of the bar.

## mouseBarLeft

- Event type: `{ name: string}`

Event that fires when the mouse leaves the bar. The name attribute represents the classname of the bar.

# Example usage

```svelte
<svg {width} {height}>
  <Bar
    x={100}
    y={100}
    width={25}
    height={64}
    isHeightAlongYAxis={true}
    originX={OriginX.Middle}
    originY={OriginY.Bottom}
    opacity={0.5}
    radiusX={5}
    radiusY={5}
    on:mouseBarEntered={mouseBarEntered} />
</svg>
```
