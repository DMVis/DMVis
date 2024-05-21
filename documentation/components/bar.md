# Bar component

A bar that can be used for bar visualisations.
Coordinates are relative to the parent SVG element.
Only positive `width` values are visible.
Both positive and negative `height` values are visible
depending on `showsNegativeHeight`.

> Note: By default, the bar is vertical (i.e. `isVertical` is `true`)
> and its origin is the bottom middle (see defaults for `originX` and `originY`).

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

# Optional Attributes

## showTextOnHover

- Type: `boolean`
- Default: `false`

Whether the [`hoverText`](#hovertext) is shown when the bar is being hovered over.

## isVertical

- Type: `boolean`
- Default: `true`

Whether the bar is vertical bar or horizontal.

## color

- Type: `string`
- Default: `'red'`

Colour of the bar.

## opacity

- Type: `number | string`
- Default: `1`

The opacity of the bar as a number in the range [0..1] or
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

Whether the bar flips its orientation when `height` is negative.

## hoverText

- Type: `string`
- Default: `height`

Text to display in the label when the mouse hovers over the bar. This will default to the specified `height` attribute.

> Note: In order to make use of this text, you need to set the [`showTextOnHover`](#showtextonhover) attribute to be `true`.

## name

- Type: `string`
- Default: `'bar'`

Class name of the bar. It can be used as an identifier.
Defaults to only `'bar'`.
If set, the class names will be `'bar'` and `'bar-name'`.

# Events

This component emits the following events:

- `mouseBarClick`
- `mouseBarEnter`
- `mouseBarLeave`

To read more about these events, see the [Events](../utils/events.md) documentation.

# Example usage

```svelte
<svg {width} {height}>
  <Bar
    x={100}
    y={100}
    width={25}
    height={64}
    isVertical={true}
    originX={OriginX.Middle}
    originY={OriginY.Bottom}
    opacity={0.5}
    radiusX={5}
    radiusY={5}
    on:mouseBarEnter={onMouseBarEnter} />
</svg>
```
