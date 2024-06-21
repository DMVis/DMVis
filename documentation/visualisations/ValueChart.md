# ValueChart

![ValueChart example](../media/valuechart-example.png ':size=700')

ValueChart is a visualisation that lets the user give weights to different attributes to aid in decision-making, depending on how important the user thinks the attribute is. The visualisation exists of two major components; at the top, there are `BarColumn` components (one for each numerical attribute). These same bars are shown at the bottom as well, except for each row entry in the dataset, there is a `SumColumn`.
Both parts of the visualisation are scrollable, to allow for visualising large datasets in a compact window.

[Carenini, G., & Loyd, J. (2004). ValueCharts. Proceedings of the Working Conference on Advanced Visual Interfaces - AVI ’04. doi:10.1145/989863.989885 ](https://dl.acm.org/doi/abs/10.1145/989863.989885)

## Table of Contents

- [Referenced Components](#referenced-components)
- [Required Attributes](#required-attributes)
- [Optional Attributes](#optional-attributes)
- [Interactivity](#interactivity)
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
      <td><a href="#/columns/BarColumn.md">BarColumn</a></td>
      <td>BarColumn is a column that displays a bar chart. It is useful for visualising the relative size of values in a column.</td>
    </tr>
    <tr>
      <td><a href="#/components/BaseVisualisation.md">BaseVisualisation</a></td>
      <td>The BaseVisualisation component is a wrapper component that handles a few default tasks for your visualisation.</td>
    </tr>
    <tr>
      <td><a href="#/components/Scrollable.md">Scrollable</a></td>
      <td>Makes any visualisation scrollable, allowing for smaller display areas.</td>
    </tr>
    <tr>
      <td><a href="#/columns/SumColumn.md">SumColumn</a></td>
      <td>SumColumn is a column that shows the stacked bar of the given columns.</td>
    </tr>
    <tr>
      <td><a href="#/columns/TextColumn.md">TextColumn</a></td>
      <td>TextColumn is a column that shows the text of the given column.</td>
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

### dataUtil

- Type: `DataUtils`

An instance of `dataUtils`, which holds all the data. See [DataUtils](utils/DataUtils.md) for more information.

## Optional Attributes

### styleUtil

- Type: `StyleUtils`
- Default: `new StyleUtils({ colorSet: 'Set1', numColors: dataUtil.columns.length - 1})`

An instance of `StyleUtils`, which contains styling for the visualisation. See [StyleUtils](utils/StyleUtils.md) for more information.

### marginLeft

- Type: `number`
- Default: `100`

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
- Default: `0.1`

The padding between the different visualisations.

### autoDistributeWeights

- Type: `boolean`
- Default: `true`

Whether the total of the weights should be `100`. This means that when the weight of one attribute is changed, all of the other weights will be redistributed such that their sum will be equal to `100`. When set to `false`, it will take the sum of all the weights as the total and scale with this number as opposed to 100%.

### isScrollable

- Type: `boolean`
- Default: `false`

Determines whether the visualisation is [scrollable](components/Scrollable.md) in its parent container.

### showFilterPanel

- Type: `boolean`
- Default: `false`

Determines whether the [Filter](components/Filter.md) component is displayed next to the visualisation.

## Interactivity

### Scaling

![Valuechart scaling](../media/valuechart-scaling.png ':size=200')

At the top of any column, press the icon to set the horizontal size of that column.

## Example Usage

<b>Creating a basic `ValueChart` visualisation from a csv string.</b>

```svelte
<script lang="ts">
  import { ValueChart } from '@dmvis/dmvis';
  import { DataUtils } from '@dmvis/dmvis/utils';

  const dataCsv =
    'Name,Column1,Column2,Column3,Column4\nJohn,54,23,78,12\nSarah,87,45,91,63\nMichael,32,68,15,77\nEmily,96,42,19,55\nDavid,21,84,37,29\nLisa,73,10,56,88\nMatthew,49,27,83,14\nEmma,17,36,70,92\nJames,61,79,24,47\nSophia,38,52,66,31\n';

  const dataUtil = new DataUtils();

  // Load promise
  $: load = (async () => {
    await dataUtil.parseData(dataCsv);
  })();
</script>

{#await load then}
  <ValueChart {dataUtil} width={1000} height={1000} />
{/await}
```

<b>Creating a custom `ValueChart` visualisation from a datapath.</b>

```svelte
<script lang="ts">
  import { ValueChart } from '@dmvis/dmvis';
  import { DataUtils, StyleUtils } from '@dmvis/dmvis/utils';

  const dataUrl = 'FILEPATH';
  const dataUtil = new DataUtils();

  const height = 1000;
  const width = 1000;

  const styleUtil = new StyleUtils({ color: 'lime', focusColor: 'magenta' });

  // Load promising
  $: load = (async () => {
    await dataUtil.parseCSV(dataUrl);
  })();
</script>

{#await load then}
  <ValueChart {dataUtil} {height} {width} {styleUtil} />
{/await}
```
