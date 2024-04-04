# DynamicAxis component

The DynamicAxis component is responsible for rendering axes based on the data with labels along the correct side of the visualisation.
It displays tick marks and labels based on provided data.

# Optional Attributes

## fontSize

- Type: `number`
- Default: `10`

The font size of the tick labels.

## color

- Type: `string`
- Default: `#000000`

The color of the axis line.

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
- Default: `bottom`
- Options: `bottom`, `top`, `left`, `right`

The position of the axis.

## spacingDirection

- Type: `string`
- Default: `horizontal`
- Options: `horizontal`, `vertical`

The direction to space the axes.

## hasPadding

- Type: `boolean`
- Default: `false`

Does the visualisation include padding.

## startColumn

- Type: `number`
- Default: `0`

Index of first column that is drawn, starting from 0.

## endColumn

- Type: `number`
- Default: `$xScales.length`

Index of last column that is drawn, defaults to last one.

## customPadding

- Type: `number`
- Default: `0`

Custom padding between columns, defaults to 0.

# Sample usage

Creating a bottom axis with custom color and no tick marks.

```svelte
<svg {width} {height}>
  <DynamicAxis fontSize={12} color={'#FF0000'} hasTicks={false} position="bottom" />
</svg>
```

Creating a left axis with custom font size and 5 ticks.

```svelte
<svg {width} {height}>
  <DynamicAxis fontSize={12} ticksNumber={5} position="left" />
</svg>
```