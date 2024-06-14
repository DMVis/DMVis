# StackedBarChart

The stacked BarChart component is a visual representation of data in a stacked bar chart format. It is used to compare the parts to the whole and show the relationship of individual items to the total.

# Table of contents

- [Referenced Components](#referenced-components)
- [Required attributes](#required-attributes)
- [Optional attributes](#optional-attributes)
- [Example usage](#example-usage)

# Referenced Components

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
      <td><a href="#/components/BaseVisualisation.md">BaseVisualisation</a></td>
      <td>The BaseVisualisation component is a wrapper component that handles a few default tasks for your visualisation.</td>
    </tr>
    <tr>
      <td><a href="#/components/DynamicAxis.md">DynamicAxis</a></td>
      <td>The DynamicAxis component is responsible for rendering axes
based on the data with labels along the correct side of the visualisation.</td>
    </tr>
    <tr>
      <td><a href="#/components/StackedBar.md">StackedBar</a></td>
      <td>It is used to compare the parts to the whole and show the relationship of individual items to the total.</td>
    </tr>
  </tbody>
</table>

# Required attributes

## dataUtil

- Type: `DataUtils`

The `DataUtils` class which contains all the data to be displayed in the chart. See [DataUtils](utils/DataUtils.md).

# Optional attributes

## height

- Type: `number`
- Default: `numberOfRows * 15`

The height of the visualisation.

## width

- Type: `number`
- Default: `1500`

The width of the visualisation.

## marginLeft

- Type: `number`
- Default: `40`

The margin on the left side of the chart.

## marginRight

- Type: `number`
- Default: `40`

The margin on the right side of the chart.

## marginTop

- Type: `number`
- Default: `40`

The margin on the top side of the chart.

## marginBottom

- Type: `number`
- Default: `40`

The margin on the bottom side of the chart.

## padding

- Type: `number`
- Default: `0.2`

Value for the distance between each bar in the range [0..1].

## opacity

- Type: `number | string`
- Default: `1`

Sets the opacity of the bars.
Either a number between 0 and 1, or a string representing a percentage between 0% and 100%.

## showTotals

- Type: `boolean`
- Default: `false`

Whether or not to display the sum of all bars at the end as a number.

## styleUtils

- Type: `StyleUtils`
- Default: `new StyleUtils({ colorSet: 'Set1', numColors: dataUtil.columns.length - 1})`

The `StyleUtils` class contains all the style information for the chart. See [StyleUtils](utils/StyleUtils.md).

## isScrollable

- Type: `boolean`
- Default: `false`

Determines whether the visualisation is [scrollable](components/Scrollable.md) in its parent container.

## showFilter

- Type: `boolean`
- Default: `false`

Determines whether the [Filter](components/Filter.md) component is displayed next to the visualisation.

# Example usage

<b>Creating a StackedBarChart from a csv string, with custom styling.</b>

```svelte
<script lang="ts">
  import { StackedBarChart } from '@dmvis/dmvis';
  import { DataUtils, StyleUtils } from '@dmvis/dmvis/utils';

  const dataCsv =
    'Name,Column1,Column2,Column3,Column4\nJohn,54,23,78,12\nSarah,87,45,91,63\nMichael,32,68,15,77\nEmily,96,42,19,55\nDavid,21,84,37,29\nLisa,73,10,56,88\nMatthew,49,27,83,14\nEmma,17,36,70,92\nJames,61,79,24,47\nSophia,38,52,66,31\n';

  const dataUtil = new DataUtils();

  // Load promise
  $: load = (async () => {
    await dataUtil.parseData(dataCsv);
  })();

  const styleUtil = new StyleUtils({ colorSet: 'Pastel2', numColors: 5 });
</script>

{#await load then}
  <StackedBarChart {dataUtil} {styleUtil} />
{/await}
```
