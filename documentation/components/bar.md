# Bar component

The bar can be used for bar visualizations.
Positive values are expected for the width and value, but
negative values are supported as well.
Since both the width and height could be associated with
the x-axis or y-axis, one must explicitly mention which
is the case (i.e. horizontal versus vertical bars).
Coordinates are relative to the parent SVG element.

> Note: This component only produces a single bar.

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

## value

- Type: `number`

Value of the bar.

## isValueAlongYAxis

- Type: `boolean`

Whether the value is along the x-axis or y-axis (i.e. horizontal or vertical bars).

# Optional Attributes

## color

- Type: `string`
- Default: `rgb(255, 0, 0)`

Color of the bar

## opacity

- Type: `number | string`
- Default: `0`

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

## showsNegativeValue

- Type: `boolean`
- Default: `false`

Whether the bar flips its orientation when `value` is negative or not.

## hoverText

- Type: `string`
- Default: `''`

Text to display in the label on hover.
The resulting text is formatted as '{`hoverText`}{`value`}'.

# Example usage

```svelte
<svg {width} {height}>
  <Bar
    x={100}
    y={100}
    width={25}
    value={64}
    isValueAlongYAxis={true}
    originX={OriginX.Middle}
    originY={OriginY.Bottom}
    opacity={0.5}
    radiusX={5}
    radiusY={5} />
</svg>
```
