<script lang="ts">
  // Imports
  import { setContext } from 'svelte';

  // DMVis imports
  import BarColumn from '$lib/components/columns/BarColumn.svelte';
  import TextColumn from '$lib/components/columns/TextColumn.svelte';
  import RankColumn from '$lib/components/columns/RankColumn.svelte';
  import SelectColumn from '$lib/components/columns/SelectColumn.svelte';
  import { StyleUtils } from '$lib/utils/StyleUtils.js';
  import type { DataUtils } from '$lib/utils/DataUtils.js';
  import { VisualisationStore } from '$lib/store.js';

  // Required attributes
  export let dataUtil: DataUtils;

  // Optional attributes
  export let width: number = calculateWidth(dataUtil.columns.length);
  export let height: number = calculateHeight(dataUtil.data.length);
  export let columnWidth: number = 150;
  export let styleUtil: StyleUtils = new StyleUtils();
  export let padding: number = 10;

  // Set store values
  const visualisationStore = new VisualisationStore();
  visualisationStore.width.set(width);
  visualisationStore.height.set(height);
  visualisationStore.data.set(dataUtil.data);
  visualisationStore.columns.set(dataUtil.columns);
  visualisationStore.styleUtil.set(styleUtil);

  // Set context of the visualisation
  setContext('store', visualisationStore);
  const columnData = dataUtil.data.map((_, colIndex) => dataUtil.data.map((row) => row[colIndex]));

  // Calculate height based on number of rows
  function calculateHeight(numRows: number): number {
    return numRows * styleUtil.fontSize * 1.5;
  }

  // Calculate width based on number of columns
  function calculateWidth(numColumns: number): number {
    return numColumns * columnWidth;
  }

  // Handle events
  function filterData(event: CustomEvent) {
    // TODO: Implement filtering functionality in DataUtils
    console.log('filter', event.detail.column, event.detail.min, event.detail.max);
  }

  function groupData(event: CustomEvent) {
    // TODO: Implement grouping functionality in DataUtils & LineUp
    console.log('group', event.detail.column);
  }

  function searchData(event: CustomEvent) {
    // TODO: Implement search functionality in DataUtils
    console.log('search', event.detail.column, event.detail.search);
  }

  function sortData(event: CustomEvent) {
    // TODO: Make sure that we can disable sorting as well, not just ascending and descending
    console.log('sort', event.detail.column, event.detail.sorting);
  }
</script>

<!--
@component
### LineUp
LineUp is a visualisation that displays multiple columns of data in a tabular format. It is used to compare and rank data. The visualisation
displays different types of columns such as text, bar, and rank columns. This is based on the type of the supplied data.

#### Required attributes
* dataUtil: DataUtils                 - The `DataUtils` class which, contains all the data to be displayed.

#### Optional attributes
* width: number                        - The width of the visualisation. Default value is calculated based on the number of columns and the column width.
* height: number                       - The height of the visualisation. Default value is calculated based on the number of rows and the font size.
* columnWidth: number                  - The width of each column. Default value is 150.
* styleUtil: StyleUtils                - The `StyleUtils` class which, contains all the styling information. Default value is a new instance of `StyleUtils`.
* padding: number                      - The padding between columns. Default value is 10.
-->

<svg class="visualisation lineUp" {width} {height}>
  {#key dataUtil}
    <RankColumn x={0} width={columnWidth} {height} {padding} length={dataUtil.data.length} />
    <SelectColumn
      x={columnWidth}
      width={columnWidth}
      {height}
      {padding}
      length={dataUtil.data.length}
      on:groupData={(e) => groupData(e)}
      on:sortData={(e) => sortData(e)} />
    {#each dataUtil.columns as column, i}
      {#if dataUtil.columnInfo[column] === 'string'}
        <TextColumn
          x={(i + 2) * columnWidth}
          width={columnWidth}
          {height}
          {padding}
          name={column}
          data={columnData[i].map(String)}
          on:searchData={(e) => searchData(e)}
          on:sortData={(e) => sortData(e)} />
      {:else if dataUtil.columnInfo[column] === 'number'}
        <BarColumn
          x={(i + 2) * columnWidth}
          width={columnWidth}
          {height}
          {padding}
          name={column}
          data={columnData[i].map(Number)}
          on:filterData={(e) => filterData(e)}
          on:sortData={(e) => sortData(e)} />
      {/if}
    {/each}
  {/key}
</svg>
