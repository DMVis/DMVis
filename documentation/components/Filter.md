# Filter

The filter component adds a filter to the right side of the visualisation. It can be used to filter and sort the data displayed in the visualisation.

> Note: Filter can be enabled inside [BaseVisualisation](components/basevisualisation.md) by passing the DataUtil to `showFilter`. If you have multiple visualisation on one page it is advised to use the `Filter` component outside of `BaseVisualisation`.

# Table of Contents

- [Referenced Components](#referenced-components)
- [Required Attributes](#required-attributes)
- [Optional Attributes](#optional-attributes)
- [Example Usage](#example-usage)

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
      <td><a href="#/columns/FilterColumn.md">FilterColumn</a></td>
      <td>Displays a filter input for each column.</td>
    </tr>
    <tr>
      <td><a href="#/components/Scrollable.md">Scrollable</a></td>
      <td>Makes any visualisation scrollable, allowing for smaller display areas.</td>
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
- Default: `150`

Width of the filter container.

## columnHeight

- Type: `number`
- Default: `100`

Height for each column in the filter.

## styleUtils

- Type: `StyleUtils`
- Default: `new StyleUtils()`

Class holding all the styles. See [StyleUtils](utils/styleUtils.md).

# Example Usage

<b> Draws a `ParallelCoordinates` combined with a `Filter` component to allow for filtering.</b>

```svelte
<script lang="ts">
  import { Filter } from '@dmvis/dmvis/components';
  import { ParallelCoordinates } from '@dmvis/dmvis';
  import { DataUtils } from '@dmvis/dmvis/utils';

  const csvData =
    'Name,Attribute1,Attribute2,Attribute3\nJohn Doe,85,90,88\nJane Smith,92,87,91\nBob Johnson,78,82,79';
  const dataUtil = new DataUtils();

  // Load promising
  $: load = (async () => {
    await dataUtil.parseData(csvData);
  })();
</script>

{#await load then}
  <Filter {dataUtil} />
  <ParallelCoordinates {dataUtil} width={700} height={700} />
{/await}
```
