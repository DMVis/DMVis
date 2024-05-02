# Histogram

This visualisation shows frequencies of data. It can group data categorically or numerically.

# Required Attributes

## width

- Type: `number`

Width of the visualisation.

## height

- Type: `number`

Height of the visualisation.

## data

- Type: `Array<string | number>`

Array of data which should be shown in the histogram. They will be represented as bars.

# Optional Attributes

## x

- Type: `number`
- Default: `0`

X position of the histogram.

## showOuterTicks

- Type: `boolean`
- Default: `true`

Specifies if you want to show only the outer ticks. Otherwise shows all ticks.

## bins

- Type: `number`
- Default: `d3.max(data as number[]) as number`

Specifies the number of bins. This only has impact on numerical data.
Categorical data is divided on unique catagories (strings).
Bucketing multiple strings together makes the histogram less usefull/clear.
To make buckets for numerical data we use the d3.bin function which groups numerical values together in buckets with equally large ranges.
This d3.bin function has a parameter called 'thresholds()' where you can enter a number to specify how many buckets you want. Here we use the bins variable as it's input and thus should specify the number of buckets.
However the d3.bin().thresholds(bins) does not enforce the precise amount of buckets you wish to have.
It only tries to get as close as possible to the specified number of 'bins' and may make more or less then the value assigned to 'bins'.
This is heavily influenced by the data you give it; with bins set to 5 it could make 5 buckets with one set of data, but 7 with another.

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
- Default: `0`

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
- Default: `0`

Horizontal corner radius of each bar as a number in range [0..1] or
a percentage string formatted as '{number}%'.

## radiusY

- Type: `number | string`
- Default: `0`

Vertical corner radius of each bar as a number in range [0..1] or
a percentage string formatted as '{number}%'.

# Example usage

```svelte
<Histogram width={500} height={500} {data} bins={5} />
```
