# Axis component

The Axis component is responsible for rendering an axis with labels along the correct side of the visualisation.
It displays tick marks and labels based on provided data.

# Optional Attributes

## fontSize

- Type: `number`
- Default: `17`

Font size of the tick labels.

## color

- Type: `string`
- Default: `'black'`

Color of the axis.

## ticks

- Type: `boolean`
- Default: `true`

Whether to display tick marks.

## offset

- Type: `number`
- Default: `0`

Offset of the axis from the side of the visualisation.

## ticksNumber

- Type: `number`
- Default: `10`

Number of ticks to display on the axis.

## position

- Type: `string`
- Default: `'bottom'`
- Options: `'bottom'`, `'top'`, `'left'`, `'right'`

Position of the axis.

# Example usage

Create a bottom axis with custom color and no tick marks.

```svelte
<svg {width} {height}>
  <Axis fontSize={12} color={'#FF0000'} ticks={false} position="bottom" />
</svg>
```

Create a left axis with custom font size and five ticks.

```svelte
<svg {width} {height}>
  <Axis fontSize={12} ticksNumber={5} position="left" />
</svg>
```
