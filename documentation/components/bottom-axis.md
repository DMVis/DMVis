# Bottom Axis component

The BottomAxis component is responsible for rendering the horizontal axis with the labes on the bottom.
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
  <BottomAxis fontSize={12} color={'#FF0000'} ticks={false} />
</svg>
```
