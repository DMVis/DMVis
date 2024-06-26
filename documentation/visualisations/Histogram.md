# Histogram

![Barchart example](../media/histogram-example.png ':size=700')

Histogram is an extension upon [BarChart](visualisations/BarChart.md), that automatically calculates bins based on frequency of given data.

It can group data categorically or numerically in one axis, as the other axis holds corresponding numerical values.

## Table of Contents

- [Referenced Components](#referenced-components)
- [Attributes](#attributes)
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

## Attributes

<table style="width: 60%">
  <thead>
    <tr>
      <th style="width: 33%;">Attribute</th>
      <th style="width: 33%;">Type</th>
      <th style="width: 33%;">Default Value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><a href='#visualisations/Histogram?id=width'>width</a>*</td>
      <td><code>number</code></td>
      <td>-</td>
    </tr>
    <tr>
    <tr>
      <td><a href='#visualisations/Histogram?id=height'>height</a>*</td>
      <td><code>number</code></td>
      <td>-</td>
    </tr>
    <tr>
      <td><a href='#visualisations/Histogram?id=data'>data*</a></td>
      <td><code>string[] | number[]</code></td>
      <td>-</td>
    </tr>
    <tr>
      <td><a href='#visualisations/Histogram?id=x'>x</a></td>
      <td><code>number</code></td>
      <td><code>0</code></td>
    </tr>
    <tr>
      <td><a href='#visualisations/Histogram?id=y'>y</a></td>
      <td><code>number</code></td>
      <td><code>0</code></td>
    </tr>
    </tr>
      <td><a href='#visualisations/Histogram?id=marginleft'>marginLeft</a></td>
      <td><code>number</code></td>
      <td><code>40</code></td>
    </tr>
    <tr>
      <td><a href='#visualisations/Histogram?id=marginright'>marginRight</a></td>
      <td><code>number</code></td>
      <td><code>40</code></td>
    </tr>
    <tr>
      <td><a href='#visualisations/Histogram?id=margintop'>marginTop</a></td>
      <td><code>number</code></td>
      <td><code>40</code></td>
    </tr>
    <tr>
      <td><a href='#visualisations/Histogram?id=marginbottom'>marginBottom</a></td>
      <td><code>number</code></td>
      <td><code>40</code></td>
    </tr>
    <tr>
      <td><a href='#visualisations/Histogram?id=bins'>bins</a></td>
      <td><code>number</code></td>
      <td><code>10</code></td>
    </tr>
    <tr>
      <td><a href='#visualisations/Histogram?id=showouterticks'>showOuterTicks</a></td>
      <td><code>boolean</code></td>
      <td><code>true</code></td>
    </tr>
    <tr>
      <td><a href='#visualisations/Histogram?id=forcecategorical'>forceCategorical</a></td>
      <td><code>boolean</code></td>
      <td><code>true</code></td>
    </tr>
    <tr>
      <td><a href='#visualisations/Histogram?id=color'>color</a></td>
      <td><code>string</code></td>
      <td><code>'blue'</code></td>
    </tr>
    <tr>
      <td><a href='#visualisations/Histogram?id=opacity'>opacity</a></td>
      <td><code>Opacity</code></td>
      <td><code>1</code></td>
    </tr>
    <tr>
      <td><a href='#visualisations/Histogram?id=borderradius'>borderRadius</a></td>
      <td><code>number</code></td>
      <td><code>0</code></td>
    </tr>
  </tbody>
</table>

## Required Attributes

### width

- Type: `number`
- <span style="color:coral">Required</span>

The width of the visualisation.

### height

- Type: `number`
- <span style="color:coral">Required</span>

The height of the visualisation.

### data

- Type: `string[]` | `number[]`
- <span style="color:coral">Required</span>

An array of data (either strings or numbers) which should be shown in the histogram. They will be represented as bars.

## Optional Attributes

### x

- Type: `number`
- Default: `0`

The x position of the histogram.

### y

- Type: `number`
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
However, this function call does not enforce the precise amount of buckets you wish to have.
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

- Type: `Opacity`
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
