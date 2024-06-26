# StackedBarChart

![StackedBarChart example](../media/stackedbarchart-example.png ':size=700')

This visualisation is an extension of the normal barchart, where it allows comparing attributes to each other and their total.
The length of each bar corresponds to the numerical value of the data being represented, but instead of a normal barchart, we combine multiple categories or attributes to show their total.

The x-axis represents the numerical values of the data, the y-axis represents the categories of the data.

## Table of Contents

- [Referenced Components](#referenced-components)
- [Attributes](#attributes)
- [Required Attribute](#required-attribute)
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
      <td><a href='#visualisations/StackedBarChart?id=datautil'>dataUtil*</a></td>
      <td><code>DataUtils</code></td>
      <td>-</td>
    </tr>
    <tr>
      <td><a href='#visualisations/StackedBarChart?id=styleutil'>styleUtil</a></td>
      <td><code>StyleUtils</code></td>
      <td><code>new StyleUtils({ colorSet: 'Set1', numColors: dataUtil.columns.length - 1})</code></td>
    </tr>
    <tr>
      <td><a href='#visualisations/StackedBarChart?id=height'>height</a></td>
      <td><code>number</code></td>
      <td><code>numberOfRows * 15</code></td>
    </tr>
    <tr>
      <td><a href='#visualisations/StackedBarChart?id=width'>width</a></td>
      <td><code>number</code></td>
      <td><code>200</code></td>
    </tr>
    <tr>
      <td><a href='#visualisations/StackedBarChart?id=marginleft'>marginLeft</a></td>
      <td><code>number</code></td>
      <td><code>40</code></td>
    </tr>
    <tr>
      <td><a href='#visualisations/StackedBarChart?id=marginright'>marginRight</a></td>
      <td><code>number</code></td>
      <td><code>40</code></td>
    </tr>
    <tr>
      <td><a href='#visualisations/StackedBarChart?id=margintop'>marginTop</a></td>
      <td><code>number</code></td>
      <td><code>40</code></td>
    </tr>
    <tr>
      <td><a href='#visualisations/StackedBarChart?id=marginbottom'>marginBottom</a></td>
      <td><code>number</code></td>
      <td><code>40</code></td>
    </tr>
    <tr>
      <td><a href='#visualisations/StackedBarChart?id=padding'>padding</a></td>
      <td><code>number</code></td>
      <td><code>0.2</code></td>
    </tr>
    <tr>
      <td><a href='#visualisations/StackedBarChart?id=opacity'>opacity</a></td>
      <td><code>Opacity</code></td>
      <td><code>1</code></td>
    </tr>
    <tr>
      <td><a href='#visualisations/StackedBarChart?id=isscrollable'>isScrollable</a></td>
      <td><code>boolean</code></td>
      <td><code>false</code></td>
    </tr>
    <tr>
      <td><a href='#visualisations/StackedBarChart?id=showfilterpanel'>showFilterPanel</a></td>
      <td><code>boolean</code></td>
      <td><code>false</code></td>
    </tr>
  </tbody>
</table>

## Required Attribute

### dataUtil

- Type: `DataUtils`
- <span style="color:coral">Required</span>

An instance of `dataUtils`, which holds all the data. See [DataUtils](utils/DataUtils.md) for more information.

## Optional Attributes

### height

- Type: `number`
- Default: `numberOfRows * 15`

The height of the visualisation in pixels.

### width

- Type: `number`
- Default: `1500`

The width of the visualisation in pixels.

### marginLeft

- Type: `number`
- Default: `40`

The margin on the left side of the visualisation in pixels.

### marginRight

- Type: `number`
- Default: `40`

The margin on the right side of the visualisation in pixels.

### marginTop

- Type: `number`
- Default: `40`

The margin on the top side of the visualisation in pixels.

### marginBottom

- Type: `number`
- Default: `40`

The margin on the bottom side of the visualisation in pixels.

### padding

- Type: `number`
- Default: `0.2`

The distance between each bar.
It can be a number between `0` and `1` (inclusive).

### opacity

- Type: `Opacity`
- Default: `1`

The opacity of each bar.
It can be a number between `0` and `1` (inclusive) or a string representing a percentage (e.g. `'50%'`).

### showTotals

- Type: `boolean`
- Default: `false`

Whether or not to display the sum of all bars at the end as a number.

### styleUtil

- Type: `StyleUtils`
- Default: `new StyleUtils({ colorSet: 'Set1', numColors: dataUtil.columns.length - 1})`

An instance of `StyleUtils`, which contains styling for the visualisation. See [StyleUtils](utils/StyleUtils.md) for more information.

### isScrollable

- Type: `boolean`
- Default: `false`

Whether the visualisation is [scrollable](components/Scrollable.md) in its parent container.

### showFilterPanel

- Type: `boolean`
- Default: `false`

Whether the [Filter](components/Filter.md) component is displayed next to the visualisation.

## Example Usage

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
