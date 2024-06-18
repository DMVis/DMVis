# Histogram

This visualisation shows frequencies of data. It can group data categorically or numerically.

## Table of Contents

- [Referenced Components](#referenced-components)
- [Required Attributes](#required-attributes)
- [Optional Attributes](#optional-attributes)
- [Example Usage](#example-usage)

## Referenced Components

This component utilises the following components:

<table style="width: 50%">
  <thead>
    <tr>
      <th style="width: 20%;">Component</th>
      <th style="width: 80%;">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><a href="#/components/Axis.md">Axis</a></td>
      <td>Renders an axis using a provided D3 axis element, with options to place and label the axis on any side of a visualisation.</td>
    </tr>
    <tr>
      <td><a href="#/components/Bar.md">Bar</a></td>
      <td>A bar that can be used for bar visualisations.</td>
    </tr>
    <tr>
      <td><a href="#/components/BaseVisualisation.md">BaseVisualisation</a></td>
      <td>The BaseVisualisation component is a wrapper component that handles a few default tasks for your visualisation.</td>
    </tr>
  </tbody>
</table>

## Required Attributes

### width

- Type: `number`

The width of the visualisation.

### height

- Type: `number`

The height of the visualisation.

### data

- Type: `string[]` | `number[]`

An array of data (either strings or numbers) which should be shown in the histogram. They will be represented as bars.

## Optional Attributes

### x

- Type: `number`
- Default: `0`

The x position of the histogram.

### y

-Type: `number`

- Default: `0`

The y position of the histogram.

### marginLeft

- Type: `number`
- Default: `40`

The margin to the left of the visualisation.

### marginRight

- Type: `number`
- Default: `40`

The margin to the right of the visualisation.

### marginTop

- Type: `number`
- Default: `40`

The margin to the top of the visualisation.

### marginBottom

- Type: `number`
- Default: `40`

The margin to the bottom of the visualisation.

### bins

- Type: `number`
- Default: `10`

The number of bins of numerical values. This only has an impact on numerical data.
Categorical data is divided into unique categories (strings).
Bucketing multiple strings together makes the histogram less useful/clear.
To make buckets for numerical data we use the [d3.bin](https://d3js.org/d3-array/bin) function which groups numerical values in buckets with equally large ranges.
This d3.bin function has a parameter called 'thresholds()' where you can enter a number to specify how many buckets you want. Here we use the bins variable as its input and thus should specify the number of buckets.
However, the d3.bin().thresholds(bins) function call does not enforce the precise amount of buckets you wish to have.
It only tries to get as close as possible to the specified number of 'bins' and may make more or less than the value assigned to 'bins'.
This is heavily influenced by the data you give it; with bins set to 5 it could make 5 buckets with one set of data, but 7 with another.

### showOuterTicks

- Type: `boolean`
- Default: `true`

A toggle to show only outer ticks.
When `true`: show only the outer ticks.
Otherwise: show all ticks.

### forceCategorical

- Type: `boolean`
- Default: `true`

A toggle to force numerical data into a categorical format.
When `true`: forces numerical data into a categorical format.
Otherwise: keep numerical as is.

### padding

- Type: `number`
- Default: `0.03`

The distance between each bar.
It can be a number between `0` and `1` (inclusive).

### color

- Type: `string`
- Default: `'blue'`

The colour of each bar.
Valid inputs include CSS colours specified as a string.

### opacity

- Type: `number | string`
- Default: `1`

The opacity of each bar.
It can be a number between `0` and `1` (inclusive) or a string representing a percentage (e.g. `'50%'`).

### borderRadius

- Type: `number`
- Default: `0`

The border radius of each bar in pixels.

## Example Usage

<b> Using a `Histogram` with numerical values.</b>

```svelte
<script lang="ts">
  import { Histogram } from '@dmvis/dmvis';

  const data = [34, 67, 12, 89, 45, 23, 78, 90, 56, 41, 74, 62, 33, 88, 27, 59, 95, 18, 81, 50];
</script>

<Histogram width={500} height={200} {data} />
```

<b> Using a `Histogram` with categorical values.</b>

```svelte
<script lang="ts">
  import { Histogram } from '@dmvis/dmvis';

  const data = [
    'Mango',
    'Banana',
    'Kiwi',
    'Kiwi',
    'Mango',
    'Apple',
    'Banana',
    'Kiwi',
    'Mango',
    'Pear',
    'Banana',
    'Banana',
    'Banana',
    'Pear',
    'Kiwi',
    'Apple',
    'Kiwi',
    'Banana',
    'Kiwi',
    'Banana'
  ];
</script>

<Histogram width={500} height={200} {data} />
```
