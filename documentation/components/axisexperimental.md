# AxisExperimental component

The AxisExperimental component is responsible for rendering axes based on the data with labels along the correct side of the graph.
It displays tick marks and labels based on provided data.

# Optional Attributes

## color

- Type: `string`
- Default: `#000000`

Color of axis

## offset

- Type: `number`
- Default: `0`

Offset of axis from the edge of the chart

## ticks

- Type: `boolean`
- Default: `true`

Whether to display tick marks

## fontSize

- Type: `number`
- Default: `10`

Font size of labels

## ticksNumber

- Type: `number`
- Default: `10`

Number of ticks on the axis

## position

- Type: `string`
- Default: `bottom`
- Options: `bottom`, `top`, `left`, `right`

Position of the axis along the chart

## spacingDirection

- Type: `string`
- Default: `horizontal`
- Options: `horizontal`, `vertical`

Position of the axis along the chart

## Sample usage

Creating a bottom axis with custom color and no tick marks

```svelte
<svg {width} {height}>
  <AxisExperimental fontSize={12} color={'#FF0000'} ticks={false} position="bottom" />
</svg>
```

Creating a left axis with custom font size and 5 ticks

```svelte
<svg {width} {height}>
  <AxisExperimental fontSize={12} ticksNumber={5} position="left" />
</svg>
```
