# BarChart

![Barchart example](../media/barchart-example.png ':size=600')

A bar chart is one of the most used visualisations for representing density of data among bins, or categories. Amount of (density) children per capita (bins) for example. In a regular barchart, those bins (how large each bar is) is to be simply provided in the dataset. To automatically calculate density / how large a bar should be based on unorganized data, see [Histogram](visualisations/Histogram.md)

This is a visualisation that represents categorical data with rectangular bars.
The length of each bar corresponds to the numerical value of the data being represented.
The axes have different meanings depending on `isVertical`.
One axis has categorical data, which represents a data entry, whereas
the other axis goes in the direction of the length of the bars and has numerical values.

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
  </tbody>
</table>

## Required Attributes

### width

- Type: `number`

The width of the visualisation in pixels.

### height

- Type: `number`

The height of the visualisation in pixels.

### data

- Type: `{ label: string; value: number }[]`

A list of data to display as bars.

## Optional Attributes

### minValue

- Type: `number`
- Default: `0`

The minimum value of the numerical length of each bar.

### maxValue

- Type: `number`
- Default: `The highest value in the dataset`

The maximum value of the numerical length of each bar.

### isVertical

- Type: `boolean`
- Default: `true`

Whether to orient `BarChart` vertically or horizontally.

### ticks

- Type: `number`
- Default: `10`

The number of ticks on the value axis.

### showLeftAxis

- Type: `boolean`
- Default: `true`

Whether the left axis is visible.

### showBottomAxis

- Type: `boolean`
- Default: `true`

Whether the bottom axis is visible.

### marginLeft

- Type: `number`
- Default: `40`

The margin to the left of the visualisation in pixels.

### marginRight

- Type: `number`
- Default: `40`

The margin to the right of the visualisation in pixels.

### marginTop

- Type: `number`
- Default: `40`

The margin to the top of the visualisation in pixels.

### marginBottom

- Type: `number`
- Default: `40`

The margin to the bottom of the visualisation in pixels.

### padding

- Type: `number`
- Default: `0.2`

The distance between each bar.
It can be a number between `0` and `1` (inclusive).

### color

- Type: `string`
- Default: `'blue'`

The colour of each bar.

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

<b> Creating a basic `BarChart`.</b>

```svelte
<script lang="ts">
  import { BarChart } from '@dmvis/dmvis';

  const data = [
    { label: 'Point1', value: 23 },
    { label: 'Point2', value: 87 },
    { label: 'Point3', value: 45 },
    { label: 'Point4', value: 78 },
    { label: 'Point5', value: 56 }
  ];
</script>

<BarChart width={500} height={500} {data} />
```

<b>Creating a customised horizontal `BarChart`.</b>

```svelte
<script lang="ts">
  import { BarChart } from '@dmvis/dmvis';

  const data = [
    { label: 'Point1', value: 23 },
    { label: 'Point2', value: 87 },
    { label: 'Point3', value: 45 },
    { label: 'Point4', value: 78 },
    { label: 'Point5', value: 56 }
  ];
</script>

<BarChart
  width={500}
  height={500}
  {data}
  color={'green'}
  borderRadius={8}
  opacity={0.5}
  isVertical={false}
  padding={0.4} />
```
