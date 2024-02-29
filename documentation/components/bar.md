# Bar component

The bar component is meant to be used in a larger bar chart, it just produces a single bar of certain dimensions, and color.

> Note: This component only produces a bar, not an entire barchart!

# Required Attributes

## x

- Type: `number`

Non-scaled x coordinate of left-bottom of bar.

## yScale:

- Type: `d3.ScaleLinear<number, number>`

Y scale

## xScale:

- Type: `d3.ScaleLinear<number, number>`

X scale

## barWidth

- Type: `number`

Width of bar

## barHeight

- Type: `number`

Height of bar (Data)

## maxHeight

- Type: `number`

Maximum height of any bar, usually largest data point.

# Optional Attributes

## color

- Type: `string`
- Default: `rgb(50, 50, 50)`

Color of bar

## xRounding

- Type: `number [ 1-100 ]`
- Default: `0`

Rounding of corners of bar, in percentage of its width.

## yRounding

- Type: `number [ 1-100 ]`
- Default: `0`

Rounding of corners of bar, in percentage of its height.

## strokeWidth

- Type: `number`
- Default: `0`

Outline of bar

## strokeColor

- Type: `string`
- Default: `rgb(255, 255, 255)`

Color of outline of bar

## Sample usage

```svelte
<svg {width} {height}>
  {#each barData as p}
    <Bar
      x={p.x}
      barWidth={p.width}
      barHeight={p.height}
      maxHeight={height}
      {xScale}
      {yScale}
      xRounding={5}
      yRounding={5}
      strokeWidth={4} />
  {/each}
</svg>
```
