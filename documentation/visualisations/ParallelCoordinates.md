# Parallel Coordinates

This is a visualisation that is capable of visualising multi-dimensional data.
It creates an axis for each column in the supplied table with data
and draws a line through each axis for each row in the table.

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
      <td><a href="#/components/BaseVisualisation.md">BaseVisualisation</a></td>
      <td>The BaseVisualisation component is a wrapper component that handles a few default tasks for your visualisation.</td>
    </tr>
    <tr>
      <td><a href="#/components/DynamicAxis.md">DynamicAxis</a></td>
      <td>The DynamicAxis component is responsible for rendering axes
based on the data with labels along the correct side of the visualisation.</td>
    </tr>
    <tr>
      <td><a href="#/components/Line.md">Line</a></td>
      <td>Produces a line between the points with a certain colour, size and style.</td>
    </tr>
  </tbody>
</table>

## Required Attributes

### dataUtil

- Type: `DataUtils`

An instance of `dataUtils`, which holds all the data. See [DataUtils](utils/DataUtils.md) for more information.

## Optional Attributes

### width

- Type: `number`
- Default: `numberOfColumns * 175`

The width of the visualisation in pixels.

### height

- Type: `number`
- Default: `numberOfRows * 15`

The height of the visualisation in pixels.

### marginLeft

- Type: `number`
- Default: `40`

The margin left of the visualisation in pixels.

### marginRight

- Type: `number`
- Default: `40`

The margin right of the visualisation in pixels.

### marginTop

- Type: `number`
- Default: `40`

The margin above the visualisation in pixels.

### marginBottom

- Type: `number`
- Default: `40`

The margin under the visualisation in pixels.

### styleUtils

- Type: `StyleUtils`
- Default: `new StyleUtils({ color: '#BBBBBB' })`

An instance of `StyleUtils`, which contains styling for the visualisation. See [StyleUtils](utils/StyleUtils.md) for more information.

### isScrollable

- Type: `boolean`
- Default: `false`

Whether the visualisation is [scrollable](components/Scrollable.md) in its parent container.

### showFilter

- Type: `boolean`
- Default: `false`

Whether the [Filter](components/Filter.md) component is displayed next to the visualisation.

## Example Usage

<b>Creating a basic `ParallelCoordinates` visualisation from a csv string.</b>

```svelte
<script lang="ts">
  import { ParallelCoordinates } from '@dmvis/dmvis';
  import { DataUtils } from '@dmvis/dmvis/utils';

  const dataCsv =
    'Name,Age,City,Food,Quantity\n John,34,New York,Fruit,15\nMichael,42,Chicago,Dairy,20\nSarah,28,Los Angeles,Vegetable,10\nEmily,31,Houston,Grains,12\nDavid,25,Miami,Meat,18\nLisa,39,Seattle,Fruit,22\nMatthew,47,Denver,Vegetable,16\nEmma,36,Boston,Dairy,25\nJames,29,San Francisco,Grains,14\nSophia,33,Austin,Meat,19\n';
  const dataUtil = new DataUtils();

  // Load promise
  $: load = (async () => {
    await dataUtil.parseData(dataCsv);
  })();
</script>

{#await load then}
  <ParallelCoordinates {dataUtil} />
{/await}
```

<b>Creating a custom `ParallelCoordinates` visualisation from a datapath.</b>

```svelte
<script lang="ts">
  import { ParallelCoordinates } from '@dmvis/dmvis';
  import { DataUtils, StyleUtils } from '@dmvis/dmvis/utils';

  const dataUrl = 'FILEPATH';
  const dataUtil = new DataUtils();

  // Load promise
  $: load = (async () => {
    await dataUtil.parseData(dataUrl);
  })();

  const styleUtil = new StyleUtils({ color: 'lime', focusColor: 'magenta' });
</script>

{#await load then}
  <ParallelCoordinates {dataUtil} {styleUtil} />
{/await}
```
