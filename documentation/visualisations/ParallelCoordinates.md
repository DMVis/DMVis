# Parallel Coordinates

This is a visualisation that is capable of visualising multi-dimensional data.
It creates an axis for each column in the supplied table with data
and draws a line through each axis for each row in the table.

# Table of contents

- [Referenced Components](#referenced-components)
- [Required Attributes](#required-attributes)
- [Optional Attributes](#optional-attributes)
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
      <td><a href="#/components/Line.md">Line</a></td>
      <td>Produces a line between the points with a certain colour, size and style.</td>
    </tr>
  </tbody>
</table>

# Required Attributes

## dataUtil

- Type: `DataUtils`

Class holding all the data. See [DataUtils](utils/DataUtils.md).

# Optional Attributes

## width

- Type: `number`
- Default: `numberOfColumns * 175`

Width of the visualisation.

## height

- Type: `number`
- Default: `numberOfRows * 15`

Height of the visualisation.

## marginLeft

- Type: `number`
- Default: `40`

Margin left of the visualisation.

## marginRight

- Type: `number`
- Default: `40`

Margin right of the visualisation.

## marginTop

- Type: `number`
- Default: `40`

Margin above the visualisation.

## marginBottom

- Type: `number`
- Default: `40`

Margin under the visualisation.

## styleUtils

- Type: `StyleUtils`
- Default: `new StyleUtils()`

Class holding all the style information, see [StyleUtils](utils/StyleUtils.md).

## isScrollable

- Type: `boolean`
- Default: `false`

Determines whether the visualisation is [scrollable](components/Scrollable.md) in its parent container.

## showFilter

- Type: `boolean`
- Default: `false`

Determines whether the [Filter](components/Filter.md) component is displayed next to the visualisation.

# Example usage

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
