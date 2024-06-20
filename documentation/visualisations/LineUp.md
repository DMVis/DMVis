# LineUp

LineUp is a visualisation technique for visualising different types of data in a set of columns. It is a table-based visualisation that allows users to sort, filter, and group data in a table.

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
      <td><a href="#/columns/BarColumn.md">BarColumn</a></td>
      <td>BarColumn is a column that displays a bar chart. It is useful for visualising the relative size of values in a column.</td>
    </tr>
    <tr>
      <td><a href="#/components/BaseVisualisation.md">BaseVisualisation</a></td>
      <td>The BaseVisualisation component is a wrapper component that handles a few default tasks for your visualisation.</td>
    </tr>
    <tr>
      <td><a href="#/columns/RankColumn.md">RankColumn</a></td>
      <td>RankColumn is a column that shows the index of the row in the table.</td>
    </tr>
    <tr>
      <td><a href="#/columns/SelectColumn.md">SelectColumn</a></td>
      <td>The SelectColumn is a column that allows you to select a row using a checkbox.</td>
    </tr>
    <tr>
      <td><a href="#/columns/TextColumn.md">TextColumn</a></td>
      <td>TextColumn is a column that shows the text of the given column.</td>
    </tr>
  </tbody>
</table>

## Required Attributes

### dataUtil

- Type: `DataUtils`

An instance of `dataUtils`, which holds all the data. See [DataUtils](utils/DataUtils.md) for more information.

> Note: It must be initialised with `includeId` set to `true` in order to use the `LineUp` visualisation, because each row in the data requires a unique identifier.

## Optional Attributes

### styleUtil

- Type: `StyleUtils`
- Default: `new StyleUtils()`

An instance of `StyleUtils`, which contains styling for the visualisation. See [StyleUtils](utils/StyleUtils.md) for more information.

### columnWidth

- Type: `number`
- Default: `150`

The width of each column in pixels.

### width

- Type: `number`
- Default: `dataUtil.columns.length * columnWidth`

The width of the visualisation in pixels. Defaults to a number based on the amount of columns and `columnWidth`.

### height

- Type: `number`
- Default: `number of rows * 20 + 120`

The height of the visualisation in pixels. Defaults to a number based on the amount of rows and the row height.

### padding

- Type: `number`
- Default: `10`

The padding between each column in pixels.

### isScrollable

- Type: `boolean`
- Default: `false`

Whether the visualisation is [scrollable](components/Scrollable.md) in its parent container.

### showFilterPanel

- Type: `boolean`
- Default: `false`

Whether the [Filter](components/Filter.md) component is displayed next to the visualisation.

## Example Usage

<b>Creating a `LineUp` visualisation from a csv string.</b>

```svelte
<script lang="ts">
  import { LineUp } from '@dmvis/dmvis';
  import { DataUtils } from '@dmvis/dmvis/utils';

  const dataCsv =
    'Name,Age,City,Food,Quantity\n John,34,New York,Fruit,15\nMichael,42,Chicago,Dairy,20\nSarah,28,Los Angeles,Vegetable,10\nEmily,31,Houston,Grains,12\nDavid,25,Miami,Meat,18\nLisa,39,Seattle,Fruit,22\nMatthew,47,Denver,Vegetable,16\nEmma,36,Boston,Dairy,25\nJames,29,San Francisco,Grains,14\nSophia,33,Austin,Meat,19\n';
  const dataUtil = new DataUtils(true);

  // Load promise
  $: load = (async () => {
    await dataUtil.parseData(dataCsv);
  })();
</script>

{#await load then}
  <LineUp {dataUtil} />
{/await}
```

<b>Creating a `LineUp` visualisation from a data url.</b>

```svelte
<script lang="ts">
  import { LineUp } from '@dmvis/dmvis';
  import { DataUtils } from '@dmvis/dmvis/utils';

  const dataUrl = 'FILEPATH';
  const dataUtil = new DataUtils(true);

  // Load promise
  $: load = (async () => {
    await dataUtil.parseData(dataUrl);
  })();
</script>

{#await load then}
  <LineUp {dataUtil} />
{/await}
```
