<script lang="ts">
  // Imports
  import { createEventDispatcher } from 'svelte';

  // DMVis imports
  import Label from '$lib/components/base/Label.svelte';
  import Column from '$lib/components/base/Column.svelte';
  import { ColumnType, IconType } from '$lib/Enums.js';
  import { getVisualisationContext } from '$lib/utils/Context.js';

  // Required attributes
  export let x: number;
  export let width: number;
  export let height: number;
  export let data: string[];

  // Optional attributes
  export let filter: string = '';
  export let padding: number = 10;
  export let name: string = 'Column';
  export let icons: IconType[] = [IconType.Sort, IconType.Search, IconType.Filter, IconType.More];

  // Column standards
  const type = ColumnType.Text;
  const paddingSide: number = padding / 2;
  let showFilterPanel: boolean = false;
  let showSearch: boolean = false;

  // Get the y position of the column
  function getY(index: number) {
    // 20 = height of row, 120 = height of top part
    return index * 20 + 120 + $styleUtil.fontSize;
  }

  // Get store values
  const { styleUtil } = getVisualisationContext();

  // Dispatches
  const dispatch = createEventDispatcher();
  const dispatchFilterData = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      dispatch('filter', { column: name, value: (event.target as HTMLInputElement).value });
    }
  };

  const dispatchSearchData = (event: Event) => {
    dispatch('search', { column: name, value: (event.target as HTMLInputElement).value });
  };
</script>

<!--
@component
### TextColumn
TextColumn is a Column component that displays text for each value in the data array.

#### Required Attributes
* x: number           - The x-coordinate of the column.
* width: number       - The width of the column in pixels.
* height: number      - The height of the column in pixels.
* data: number[] - The data to display as text.

#### Optional Attributes
* name                - The name of the column. It should contain the name of the attribute you're displaying.
                        Defaults to `'Column'`.
* padding             - The padding around the column in pixels.
                        Defaults to `10`.
* icons: IconType[]   - A list of what icons to display in the top of the column.
                        Defaults to `[IconType.Sort, IconType.Search, IconType.Filter, IconType.More]`.

#### Events
* Please check the documentation for detailed information about dispatches.
-->

<!-- The text column -->
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
  on:sort
  on:filter={() => {
    showFilterPanel = !showFilterPanel;
    showSearch = false;
  }}
  on:mouseHover
  on:mouseRowClick
  on:remove
  on:search={() => {
    showSearch = !showSearch;
    showFilterPanel = false;
  }}>
  <g slot="overlay">
    {#if showSearch || showFilterPanel}
      <rect
        class="column-overlay"
        x={x + paddingSide}
        y={60}
        width={width - padding}
        height={27}
        role="gridcell" />
      <!-- Height is set to the input height -->
      <foreignObject x={x + paddingSide} y={60} width={width - padding - 1} height={27}>
        <input
          type="text"
          placeholder={showSearch ? 'Search...' : 'Filter...'}
          list="filter-data"
          style="font-size: 12px; font-family: Arial; padding: 5px; border: 1px solid black;"
          value={filter}
          on:input={dispatchSearchData}
          on:keydown={dispatchFilterData} />
        {#if showFilterPanel}
          <datalist id="filter-data">
            {#each data as option}
              <option value={String(option)} />
            {/each}
          </datalist>
        {/if}
      </foreignObject>
    {/if}
  </g>
  <g slot="data" class="labelNames">
    {#each data as value, i}
      <Label
        x={x + width / 2}
        y={getY(i)}
        width={width - padding}
        showEllipsis={true}
        height={20}
        {padding}
        hasPointerEvents={true}
        hasBackground={false}
        text={value}
        name={value}
        on:mouseLabelEnter
        on:mouseLabelLeave />
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
