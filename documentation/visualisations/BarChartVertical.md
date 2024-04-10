# BarChartVertical

This is visualisation that represents categorical data with rectangular bars.
The length of each bar corresponds to the numerical value of the data being represented.
The x-axis represents the categories of the data.
The y-axis represents the numerical values of the data.

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

## minY

- Type: `number`

Minimum value of the numerical y-axis.

## maxY

- Type: `number`

Maximum value of the numerical y-axis.

# Optional Attributes

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

- Type `string`
- Default: `'blue'`

Color of each bar.

## opacity

- Type `number | string`
- Default: `1`

Opacity of each bar as a number in range [0..1] or
a percentage string formatted as '{number}%'.

## radiusX

- Type `number | string`
- Default: `5`

Horizontal corner radius of each bar as a number in range [0..1] or
a percentage string formatted as '{number}%'.

## radiusY

- Type `number | string`
- Default: `5`

Vertical corner radius of each bar as a number in range [0..1] or
a percentage string formatted as '{number}%'.

# Example usage

```svelte
<BarChartVertical width={500} height={500} data={bars} minY={0} maxY={500} />
```
