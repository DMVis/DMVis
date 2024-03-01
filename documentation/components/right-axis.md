# Right Axis component

The RightAxis component is responsible for rendering the vertical axis with the labes on the right side.
It displays tick marks and labels based on provided data.

# Required Attributes

## yScale:

- Type: `d3.ScaleLinear<number, number>` | `d3.ScaleBand<string>`

Y scale

## width

- Type: `number`

Width of the svg

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
  <RightAxis {yScale} {width} fontSize={12} color={'#FF0000'} />
</svg>
```
