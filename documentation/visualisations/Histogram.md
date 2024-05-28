# Histogram

This visualisation shows frequencies of data. It can group data categorically or numerically.

# Required Attributes

## width

- Type: `number`

The width of the visualisation.

## height

- Type: `number`

The height of the visualisation.

## data

- Type: `Array<string | number>`

An array of data which should be shown in the histogram. They will be represented as bars.

# Optional Attributes

## x

- Type: `number`
- Default: `0`

The x position of the histogram.

## y

-Type: `number`

- Default: `0`

The y position of the histogram.

## marginLeft

- Type: `number`
- Default: `40`

The margin to the left of the visualisation.

## marginRight

- Type: `number`
- Default: `40`

The margin to the right of the visualisation.

## marginTop

- Type: `number`
- Default: `40`

The margin to the top of the visualisation.

## marginBottom

- Type: `number`
- Default: `40`

The margin to the bottom of the visualisation.

## bins

- Type: `number`
- Default: `d3.max(data as number[]) as number`

The number of bins of numerical values. This only has an impact on numerical data.
Categorical data is divided into unique categories (strings).
Bucketing multiple strings together makes the histogram less useful/clear.
To make buckets for numerical data we use the d3.bin function which groups numerical values in buckets with equally large ranges.
This d3.bin function has a parameter called 'thresholds()' where you can enter a number to specify how many buckets you want. Here we use the bins variable as its input and thus should specify the number of buckets.
However, the d3.bin().thresholds(bins) do not enforce the precise amount of buckets you wish to have.
It only tries to get as close as possible to the specified number of 'bins' and may make more or less than the value assigned to 'bins'.
This is heavily influenced by the data you give it; with bins set to 5 it could make 5 buckets with one set of data, but 7 with another.

## showOuterTicks

- Type: `boolean`
- Default: `true`

A toggle to show only outer ticks.
When `true`: show only the outer ticks.
Otherwise: show all ticks.

## forceCategorical

- Type: `boolean`
- Default: `true`

A toggle to force numerical data into a categorical format.
When `true`: forces numerical data into a categorical format.
Otherwise: keep numerical as is.

## padding

- Type: `number`
- Default: `0.03`

The value for the distance between each bar in the range [0..1].

## color

- Type: `string`
- Default: `'blue'`

The colour of each bar.

## opacity

- Type: `number | string`
- Default: `1`

The opacity of each bar as a number in the range [0..1] or
a percentage string formatted as '{number}%'.

## borderRadius

- Type: `number`
- Default: `0`

Border radius of each bar in pixels.

# Example usage

The example below shows a histogram with numerical values formated into categories.

```svelte
<Histogram
  width={500}
  height={500}
  data={[1, 3, 4, 2, 6, 7, 1, 7, 9, 6, 1]}
  forceCategorical={true} />
```
