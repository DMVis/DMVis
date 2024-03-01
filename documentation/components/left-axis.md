# Left Axis component

The LeftAxis component is responsible for rendering the vertical axis with the labes on the left side.
It displays tick marks and labels based on provided data.

# Required Attributes

## yScale:

- Type: `d3.ScaleLinear<number, number>` | `d3.ScaleBand<string>`

Y scale

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

## Sample usage

```svelte
<svg {width} {height}>
  <LeftAxis {yScale} fontSize={12} color={'#FF0000'} />
</svg>
```
