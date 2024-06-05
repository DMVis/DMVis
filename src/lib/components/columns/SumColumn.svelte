<script lang="ts">
  // Imports
  import { createEventDispatcher } from 'svelte';

  // type imports
  import type { ScaleLinear } from '$lib/Types.js';

  // DMVis imports
  import Column from '$lib/components/base/Column.svelte';
  import StackedBar from '$lib/components/base/StackedBar.svelte';
  import { ColumnType, IconType } from '$lib/Enums.js';

  // Required attributes
  export let x: number;
  export let width: number;
  export let height: number;
  export let data: Array<Array<number>>;
  export let attributeScales: ScaleLinear[];

  // Optional attributes
  export let name: string = 'Column';
  export let padding: number = 10;
  export let icons: IconType[] = [IconType.Sort, IconType.Group, IconType.More];

  // Column standards
  const type = ColumnType.Sum;
  const paddingSide: number = padding / 2;
  let showFilter = false;

  // Get the y position of the column
  function getY(index: number) {
    // 20 = height of row, 120 = height of top part, 1 = padding
    return index * 20 + 120 + 1;
  }

  // Dispatch filter
  const dispatch = createEventDispatcher();
  const dispatchFilter = () => {
    dispatch('filter', { column: name, min: 0, max: 200 });
  };
</script>

<!--
@component
### SumColumn
SumColumn is a Column component that displays the StackedBar for the given attributes in the data array.

#### Required attributes
* x: number - X-coordinate of the column.
* width: number - The width of the column.
* height: number - The height of the column.
* data: number[][] - Data for the sumColum.

#### Optional attributes
* padding: number - The padding of the column.
* name: string - The name of the column. Usually the attribute name.
* icons: IconType[] - List of what icons to display in the top of the column,
                          defaults to `[IconType.Sort, IconType.Group, IconType.More]`
* attributeScales: ScaleLinear[] - An array of scales where the first entry
                                                      is the scale for the first numerical entry in the row attribute, etc.

#### Events
* For detailed information about dispatches, check the documentation.
-->

<Column
  {type}
  {x}
  {height}
  {width}
  {padding}
  {name}
  {icons}
  on:dragStart
  on:dragMove
  on:dragStop
  on:filter={() => (showFilter = !showFilter)}
  on:mouseHover
  on:group
  on:remove
  on:sort
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
        <StackedBar barWidth={18} y={getY(i)} {row} {attributeScales} showTotals={true} />
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
