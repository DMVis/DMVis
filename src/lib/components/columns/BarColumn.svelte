<script lang="ts">
  // Imports
  import * as d3 from 'd3';
  import { createEventDispatcher } from 'svelte';

  // DMVis imports
  import Column from '$lib/components/base/Column.svelte';
  import { Bar } from '$lib/components.js';
  import { ColumnType, OriginX, OriginY } from '$lib/Enums.js';

  // Mandatory attributes
  export let x: number;
  export let width: number;
  export let height: number;
  export let data: Array<number>;

  // Optional attributes
  export let name: string = 'Column';
  export let padding: number = 10;
  export let barColor: string = 'red';

  // Column standards
  const type = ColumnType.Bar;
  const paddingSide: number = padding / 2;
  let showFilter = false;

  // Scale for the width of each bar
  const scale = d3
    .scaleLinear()
    .domain([0, d3.max(data) ?? 0])
    .range([0, width - padding]);

  // Dispatch filter
  const dispatch = createEventDispatcher();
  const dispatchFilter = (event: Event) => {
    dispatch('filterData', { column: name, min: 0, max: 200 });
  };
</script>

<!--
@component
### BarColumn
Work in progress

#### Required attributes
  * T.B.D.

#### Optional attributes
  * T.B.D.
-->

<Column
  {type}
  {x}
  {height}
  {width}
  {padding}
  {name}
  on:filter={() => (showFilter = !showFilter)}
  on:sortData>
  <g slot="overlay">
    {#if showFilter}
      <rect
        class="column-overlay"
        x={x + paddingSide}
        y={60}
        width={width - padding}
        height={100}
        role="gridcell" />
      <foreignObject x={x + paddingSide} y={60} width={width - padding - 1} height={100}>
        <button on:click={(e) => dispatchFilter(e)}>Filter on range</button>
      </foreignObject>
    {/if}
  </g>
  <g slot="overview">
    <!-- Insert histogram using barchart -->
  </g>
  <g slot="data">
    {#each data as value, i}
      <Bar
        x={x + paddingSide}
        y={i * 20 + 105 + 1}
        width={scale(value)}
        height={18}
        originX={OriginX.Left}
        originY={OriginY.Top}
        isVertical={true}
        color={barColor}
        hoverText={value.toString()}
        on:mouseBarEntered
        on:mouseBarLeft />
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
