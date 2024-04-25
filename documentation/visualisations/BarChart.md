# BarChart

This is visualisation that represents categorical data with rectangular bars.
The length of each bar corresponds to the numerical value of the data being represented.
Depending on if the `BarChart` should be horizontal or vertical, the axes can have different meanings.
One axis has the categorical data, which represents a data entry.
The other axis goes in the direction of the length of the bars and has the numerical values.

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

Minimum value of the numerical length of bar.

## maxValue

- Type: `number`
- Default: `Highest value in the dataset`

Maximum value of the numerical length of bar.

## isVertical

- Type: `boolean`
- Default: `false`

Orients the barchart Vertically when true.

## ticks

- Type: `number`
- Default: `10`

Specifies the number of ticks for the value axis.

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

Color of each bar.

## opacity

- Type: `number | string`
- Default: `1`

Opacity of each bar as a number in range [0..1] or
a percentage string formatted as '{number}%'.

## radiusX

- Type: `number | string`
- Default: `5`

Horizontal corner radius of each bar as a number in range [0..1] or
a percentage string formatted as '{number}%'.

## radiusY

- Type: `number | string`
- Default: `5`

Vertical corner radius of each bar as a number in range [0..1] or
a percentage string formatted as '{number}%'.

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