# StackedBar

The StackedBar component is a visual representation of a data row. It is used to compare the parts to the whole and show the relationship of individual items to the total.

> Note: This creates a single stacked bar as opposed to a stacked bar chart.

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
      <td><a href="#/components/Bar.md">Bar</a></td>
      <td>A bar that can be used for bar visualisations.</td>
    </tr>
    <tr>
      <td><a href="#/components/Label.md">Label</a></td>
      <td>Provides labelling functionality for data points.</td>
    </tr>
  </tbody>
</table>

## Required Attributes

### y

- Type: `number`

The y-coordinate of the stacked bar.

### barWidth

- Type: `number`

The width of the stacked bar in pixels.

### row

- Type: `(number|string)[]`

An entire row of the `DataUtils` instance, which will be represented as a stacked bar.

### attributeScales

- Type: `d3.scaleLinear<number,number>[]`

An array of scales where the first entry is the scale for the first numerical entry in the row attribute and so on.

### Optional Attributes

### opacity

- Type: `Opacity`
- Default: `1`

The opacity of the stacked bar.
It can be a number between `0` and `1` (inclusive) or a string representing a percentage (e.g. `'50%'`).

### showLabel

- Type: `boolean`
- Default: `false`

Whether or not to display the sum of all bars at the end as a number.

## Example Usage

Note that this component requires a predefined [dataUtil](../utils/DataUtils), which in this case is to be set by a parent component.

<b>Create a stacked bar for a given row.</b>

```svelte
<script lang="ts">
  import { setVisualisationContext } from '$lib/utils/Context.js';
  import type { DataUtils } from '$lib/utils/DataUtils.js';
  import StackedBar from './StackedBar.svelte';
  import { scaleLinear } from 'd3';

  export let dataUtil: DataUtils;

  const size = 500;

  // Fill the visualisation context
  setVisualisationContext({
    width: size,
    height: size,
    data: dataUtil.data,
    columns: dataUtil.columns
  });

  // Create a random row to be shown in a stacked bar
  const rowValues = ['Row', 73, 59, 61, 57, 97];

  // Create a scale for each value, with random values
  const rowScales = Array(5).fill(
    scaleLinear()
      .domain([0, 100])
      .range([0, 500 / 5])
  );
</script>

<svg width={500} height={500}>
  <StackedBar y={100} barWidth={50} row={rowValues} attributeScales={rowScales} />
</svg>
```

<b>Create a `StackedBar` with a color scheme.</b>

```svelte
<script lang="ts">
  import { scaleLinear } from 'd3';

  import { StyleUtils } from '$lib/Utils.js';
  import { setVisualisationContext } from '$lib/utils/Context.js';
  import type { DataUtils } from '$lib/utils/DataUtils.js';
  import StackedBar from './StackedBar.svelte';

  export let dataUtil: DataUtils;

  const size = 500;

  setVisualisationContext({
    width: size,
    height: size,
    data: dataUtil.data,
    columns: dataUtil.columns,
    styleUtil: new StyleUtils({ colorSet: 'Set1', numColors: 5 })
  });

  const rowValues = ['Row', 73, 59, 61, 57, 97];
  const rowScales = Array(5).fill(
    scaleLinear()
      .domain([0, 100])
      .range([0, 500 / 5])
  );
</script>

<svg width={500} height={500}>
  <StackedBar y={100} barWidth={50} row={rowValues} attributeScales={rowScales} />
</svg>
```
