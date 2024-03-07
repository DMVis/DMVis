# Left Axis component

The LeftAxis component is responsible for rendering the vertical axis with the labes on the left side.
It displays tick marks and labels based on provided data.

# Optional Attributes

## color

- Type: `string`
- Default: `#000000`

Color of axis

## ticks

- Type: `boolean`
- Default: `true`

Whether to display tick marks

## fontSize

- Type: `number`
- Default: `17`

Font size of labels

## ticksNumber

- Type: `number`
- Default: `10`

Number of ticks on the axis

## Sample usage

```svelte
<svg {width} {height}>
  <LeftAxis fontSize={12} color={'#FF0000'} />
</svg>
```
