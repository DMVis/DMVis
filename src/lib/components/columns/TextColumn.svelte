<script lang="ts">
  // Imports
  import { createEventDispatcher, getContext } from 'svelte';

  // DMVis imports
  import Label from '$lib/components/base/Label.svelte';
  import Column from '$lib/components/base/Column.svelte';
  import { ColumnType } from '$lib/Enums.js';
  import type { VisualisationStore } from '$lib/store.js';

  // Required attributes
  export let x: number;
  export let width: number;
  export let height: number;
  export let data: Array<string>;

  // Optional attributes
  export let padding: number = 10;
  export let name: string = 'Column';

  // Column standards
  const type = ColumnType.Text;
  const paddingSide: number = padding / 2;
  let showFilter: boolean = false;
  let showSearch: boolean = false;

  // Get the y position of the column
  function getY(index: number) {
    // 20 = height of row, 105 = height of top part
    return index * 20 + 105 + $styleUtil.fontSize;
  }

  // Get store values
  const { styleUtil } = getContext<VisualisationStore>('store');

  // Dispatch search data
  const dispatch = createEventDispatcher();
  const dispatchSearchData = (event: Event) => {
    dispatch('searchData', { column: name, search: (event.target as HTMLInputElement).value });
  };
</script>

<!--
@component
### TextColumn
TextColumn is a Column component that displays text for each value in the data array.

#### Required attributes
  * x - X-coordinate of the column.
  * width - The width of the column.
  * height - The height of the column.
  * data - The data to display as text.

#### Optional attributes
  * name - The name of the column. Usually the attribute name.
  * padding - The padding of the column.
-->

<Column
  {type}
  {x}
  {height}
  {width}
  {padding}
  {name}
  on:sortData
  on:filter={() => {
    showFilter = !showFilter;
    showSearch = false;
  }}
  on:mouseHover
  on:search={() => {
    showSearch = !showSearch;
    showFilter = false;
  }}>
  <g slot="overlay">
    {#if showSearch || showFilter}
      <rect
        class="column-overlay"
        x={x + paddingSide}
        y={60}
        width={width - padding}
        height={100}
        role="gridcell" />
      <foreignObject x={x + paddingSide} y={60} width={width - padding - 1} height={100}>
        <input
          type="text"
          placeholder={showSearch ? 'Search...' : 'Filter...'}
          list="filter-data"
          style="font-size: 12px; font-family: Arial; padding: 5px; border: 1px solid black;"
          on:input={(e) => dispatchSearchData(e)} />
        {#if showFilter}
          <datalist id="filter-data">
            {#each ['Option 1', 'Option 2', 'Option 3'] as option}
              <option value={option} />
            {/each}
          </datalist>
        {/if}
      </foreignObject>
    {/if}
  </g>
  <g slot="data">
    {#each data as value, i}
      <Label
        x={x + width / 2}
        y={getY(i)}
        width={10}
        height={20}
        {padding}
        hasPointerEvents={true}
        hasBackground={false}
        text={value} />
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
