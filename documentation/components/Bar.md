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

## barWidth

- Type: `number`

Width of the bar.

## value

- Type: `number`

The value of the bar, and therefore the length of the bar.

# Optional Attributes

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

## borderRadius

- Type: `number`
- Default: `0`

Border radius of the bar in pixels.

## showsNegativeHeight

- Type: `boolean`
- Default: `false`

Whether the bar flips its orientation when `height` is negative.

## hoverText

- Type: `string`
- Default: `height`

Text to display in the label when the mouse hovers over the bar. This will default to the specified `height` attribute.

> Note: in order for this text to be visible, you need to set the `labelType` attribute to either `'alwaysVisible'` or `'visibleOnHighlight'`.

## labelType

- Type: `string`
- Default: `'none'`
- Options: `'none'`, `'alwaysVisible'`, `'visibleOnHighlight'`

Determines the behaviour of the label on the bar.<br>
Setting this to `'none'`, means no label will be drawn.<br>
Setting this to `'alwaysVisible'`, means that there will always be a label inside the bar.<br>
Setting this to `'visibleOnHighlight'`, means that when the 'bar-number' label receives the class `'highlighted'`, the numbers will become visible.

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
<svg style="border: 1px solid black" width="500" height="500">
  <Bar x={250} y={250} barWidth={25} value={100} />
</svg>
```

Vertical, slightly transparent, blue bar with perfectly rounded corners.
Note that `borderRadius` is `0.5 * barWidth` here.

```svelte
<svg style="border: 1px solid black" width="500" height="500">
  <Bar x={250} y={250} barWidth={25} value={100} color={'blue'} opacity={0.8} borderRadius={12.5} />
</svg>
```
