<script lang="ts">
  // Imports
  import { createEventDispatcher } from 'svelte';

  // DMVis imports
  import Column from '$lib/components/base/Column.svelte';
  import StackedBar from '$lib/components/base/StackedBar.svelte';
  import type { ScaleLinear } from '$lib/Types.js';
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

#### Required Attributes
* x: number                      - The x-coordinate of the column.
* width: number                  - The width of the column in pixels.
* height: number                 - The height of the column in pixels.
* data: Array<Array<number>>     - The data for the column.
* attributeScales: ScaleLinear[] - An array of scales where the first entry
                                   is the scale for the first numerical entry in the row attribute and so on.

#### Optional Attributes
* name                           - The name of the column.
                                   It should contain the names of the attributes you're comparing.
                                   It could also contain weights.
                                   Defaults to `'Column'`.
* padding: number                - The padding around the column in pixels.
* icons: IconType[]              - A list of what icons to display in the top of the column.
                                   Defaults to `[IconType.Sort, IconType.Group, IconType.More]`.

#### Events
* Please check the documentation for detailed information about dispatches.
-->

<!-- The sum column -->
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
