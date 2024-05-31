# DynamicAxis component

The DynamicAxis component is responsible for rendering axes
based on the data with labels along the correct side of the visualisation.
It displays tick marks and labels based on provided data.

# Optional Attributes

## axisOrder

- Type: `string[]`
- Default: `[]`

The order that the axes should be drawn in. The array should contain strings identical to column names in the dataset. This defaults to `[]`, which draws axes in the order that they appear in the dataset.

## squashOuterTicks

- Type: `boolean`
- Default: `false`

Whether or not to tuck in the first and last tick.

## alignment

- Type: `string`
- Default: `'start'`
- Options: `'start'`, `'end'`, `'spaced'`

Alignment of the axes (i.e. the side of the column where the axis is placed).

## fontSize

- Type: `number`
- Default: `10`

The font size of the tick labels.

## color

- Type: `string`
- Default: `'#000000'`

Color of the axis line.

## renderLabel

- Type: `boolean`
- Default: `false`

Renders a label next to the axis.

## labelPosition:

- Type: `string`
- Default: `'top'`
- Options: `'left'`, `'right'`, `'top'`, `'bottom'`

Position of the label relative to the axis.

## labelOffset

- Type: `number`
- Default: `20`

Distance from the label to the axis.

## hasTicks

- Type: `boolean`
- Default: `true`

Whether to display tick marks.

## offset

- Type: `number`
- Default: `0`

The offset of the axis from the side of the visualisation.

## ticksNumber

- Type: `number`
- Default: `10`

The number of ticks to display on the axes.

## position

- Type: `string`
- Default: `'bottom'`
- Options: `'bottom'`, `'top'`, `'left'`, `'right'`

The position of the axis.

## spacingDirection

- Type: `string`
- Default: `'horizontal'`
- Options: `'horizontal'`, `'vertical'`

The direction to space the axes.

## padding

- Type: `number`
- Default: `0`

The amount of padding between axes is important for either vertically spaced vertical axes or horizontally spaced horizontal axes.

# Events

This component emits the following events:

- `axisOrderChanged`
- `dragMove`
- `dragStop`
- `renderAxis`

To read more about these events, see the [Events](../utils/events.md) documentation.

# Example usage

Creating a bottom axis with a custom colour and no tick marks.

```svelte
<svg {width} {height}>
  <DynamicAxis fontSize={12} color={'#FF0000'} hasTicks={false} position="bottom" />
</svg>
```

Creating a left axis with a custom font size and 5 ticks.

```svelte
<svg {width} {height}>
  <DynamicAxis fontSize={12} ticksNumber={5} position="left" />
</svg>
```
