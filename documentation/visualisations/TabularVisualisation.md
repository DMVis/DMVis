# TabularVisualisation

![TabularVisualisation example](../media/tabular-example.png ':size=700')

This visualisation represents the numerical value of each attribute in a datapoint as a bar, and puts those bars in a table. Columns represent the different attributes, and rows the different datapoints. Tabular also allows for representing categorical data with labels in a column

> Note: Since a header label is added on top of each column, it might be necessary to adjust `marginTop` for `TabularVisualisation` to be properly displayed.

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
      <td><a href="#/components/StaticLine.md">StaticLine</a></td>
      <td>Produces a line between the points with a certain colour, size and style.</td>
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

## Optional Attributes

### styleUtil

- Type: `StyleUtils`
- Default: `new StyleUtils()`

An instance of `StyleUtils`, which contains styling for the visualisation. See [StyleUtils](utils/StyleUtils.md) for more information.

### width

- Type: `number`
- Default: `numberOfColumns * 200`

The width of the visualisation in pixels.

### height

- Type: `number`
- Default: `numberOfRows * 20 + header`

The height of the visualisation in pixels.

### marginLeft

- Type: `number`
- Default: `30`

The margin to the left of the visualisation in pixels.

### marginRight

- Type: `number`
- Default: `30`

The margin to the right of the visualisation in pixels.

### marginTop

- Type: `number`
- Default: `50`

The margin to the top of the visualisation in pixels.

### marginBottom

- Type: `number`
- Default: `30`

The margin to the bottom of the visualisation in pixels.

### showColumnLines

- Type: `boolean`
- Default: `false`

Whether to show lines at the start and end of each column. Defaults to false.

### columnPadding

- Type: `number`
- Default: `10`

The distance between each column in pixels.

### barOpacity

- Type: number
- Default: `0.6`

The opacity of each bar.
It can be a number between `0` and `1` (inclusive) or a string representing a percentage (e.g. `'50%'`).

> Note: A value lower than `1` is recommended for visible bar highlighting.

### isScrollable

- Type: `boolean`
- Default: `false`

Whether the visualisation is [scrollable](components/Scrollable.md) in its parent container.

### showFilterPanel

- Type: `boolean`
- Default: `false`

Whether the [Filter](components/Filter.md) component is displayed next to the visualisation.

## Interactivity

### Sorting

![Tabularvisualisation selecting](../media/tabular-sorting.png ':size=200')

At the top of every numerical column, pressing the two arrows will sort based on that column.

### Switching attributes

![Parallelcoordinates switching](../media/tabular-switching-columns.png ':size=500')

Grab the name of an attribute column (The top of the column) and drag it to switch attributes around.

### Switching rows

![Parallelcoordinates switching](../media/tabular-switching-rows.png ':size=500')

Grab a row and drag it to put it below or above a different row.

## Example Usage

<b>Creating a basic `TabularVisualisation` from a csv string.</b>

```svelte
<script lang="ts">
  import { TabularVisualisation } from '@dmvis/dmvis';
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
  <TabularVisualisation {dataUtil} />
{/await}
```

<b>Creating a custom `TabularVisualisation` from a datapath.</b>

```svelte
<script lang="ts">
  import { TabularVisualisation } from '@dmvis/dmvis';
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
  <TabularVisualisation {dataUtil} {styleUtil} />
{/await}
```
