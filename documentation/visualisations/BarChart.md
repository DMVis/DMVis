# BarChart

This is a visualisation that represents categorical data with rectangular bars.
The length of each bar corresponds to the numerical value of the data being represented.
The axes have different meanings depending on `isVertical`.
One axis has categorical data, which represents a data entry, whereas
the other axis goes in the direction of the length of the bars and has numerical values.

# Required Attributes

## width

- Type: `number`

Width of the visualisation.

## height

- Type: `number`

Height of the visualisation.

## data

- Type: `{ label: string; value: number }[]`

List of bars.

# Optional Attributes

## minValue

- Type: `number`
- Default: `0`

Minimum value of the numerical length of each bar.

## maxValue

- Type: `number`
- Default: `Highest value in the dataset`

Maximum value of the numerical length of each bar.

## isVertical

- Type: `boolean`
- Default: `false`

Orients `BarChart` vertically as opposed to horizontally if `true`.

## ticks

- Type: `number`
- Default: `10`

Number of ticks on the value axis.

## showLeftAxis

- Type: `boolean`
- Default: `true`

Toggle left axis.

## showBottomAxis

- Type: `boolean`
- Default: `true`

Toggle bottom axis.

## marginLeft

- Type: `number`
- Default: `40`

Margin to the left of the visualisation.

## marginRight

- Type: `number`
- Default: `40`

Margin to the right of the visualisation.

## marginTop

- Type: `number`
- Default: `40`

Margin to the top of the visualisation.

## marginBottom

- Type: `number`
- Default: `40`

Margin to the bottom of the visualisation.

## padding

- Type: `number`
- Default: `0.2`

Value for the distance between each bar in the range [0..1].

## color

- Type: `string`
- Default: `'blue'`

Colour of each bar.

## opacity

- Type: `number | string`
- Default: `1`

The opacity of each bar as a number in the range [0..1] or
a percentage string formatted as '{number}%'.

## borderRadius

- Type: `number`
- Default: `5`

Border radius of each bar in pixels.

# Example usage

```svelte
<BarChart
  width={500}
  height={500}
  {data}
  minValue={0}
  maxValue={100}
  isVertical={true}
  ticks={1}
  padding={0}
  showBottomAxis={true}
  showLeftAxis={false} />
```
