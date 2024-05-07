<script lang="ts">
  // DMVis imports
  import * as d3 from 'd3';
  import { createEventDispatcher } from 'svelte';

  // DMVis imports
  import Column from '$lib/components/base/Column.svelte';
  import StackedBar from '$lib/components/base/StackedBar.svelte';
  import { ColumnType } from '$lib/Enums.js';

  // Required attributes
  export let x: number;
  export let width: number;
  export let height: number;
  export let data: Array<Array<number>>;

  // Optional attributes
  export let name: string = 'Column';
  export let padding: number = 10;

  // Column standards
  const type = ColumnType.Sum;
  const paddingSide: number = padding / 2;
  let showFilter = false;

  // Get the y position of the column
  function getY(index: number) {
    // 20 = height of row, 105 = height of top part, 1 = padding
    return index * 20 + 105 + 1;
  }

  // Code will be used later on when starting to work with weights
  let maxValue: number;
  $: maxValue = d3.max(data.map((row) => d3.sum(row.slice(1) as number[]))) ?? 0;

  // Dispatch filter
  const dispatch = createEventDispatcher();
  const dispatchFilter = () => {
    dispatch('filterData', { column: name, min: 0, max: 200 });
  };
</script>

<!--
@component
### SumColumn
SumColumn is a Column component that displays the StackedBar for the given attributes in the data array.

#### Required attributes
  * x - X-coordinate of the column.
  * width - The width of the column.
  * height - The height of the column.
  * data - data

#### Optional attributes
  * padding - The padding of the column.
  * name - The name of the column. Usually the attribute name.
-->

<Column
  {type}
  {x}
  {height}
  {width}
  {padding}
  {name}
  on:dragStart
  on:dragMove
  on:dragStop
  on:filter={() => (showFilter = !showFilter)}
  on:sortData
  on:mouseHover
  on:groupData
  on:sortData
  on:mouseRowClick>
  <g slot="overlay">
    <!-- Insert overlay for editing weights -->
    {#if showFilter}
      <rect
        class="column-overlay"
        x={x + paddingSide}
        y={60}
        width={width - padding}
        height={100}
        role="gridcell" />
      <foreignObject x={x + paddingSide} y={60} width={width - padding - 1} height={100}>
        <button on:click={() => dispatchFilter()}>Filter on range</button>
      </foreignObject>
    {/if}
  </g>
  <g slot="overview">
    <!-- Insert the sum overview of the column -->
  </g>
  <g slot="data">
    {#each data as row, i}
      <g transform="translate({paddingSide} 0)">
        <StackedBar
          barWidth={18}
          y={getY(i)}
          xScale={d3.scaleLinear().domain([0, maxValue]).range([0, width])}
          {row} />
        <!-- Domain and range need to be from data -->
      </g>
    {/each}
  </g>
</Column>

<style>
  .column-overlay {
    fill: #ffffff;
    fill-opacity: 100%;
    stroke: black;
    stroke-width: 1;
  }
</style>
