<script lang="ts">
  // Imports
  import { createEventDispatcher, onMount } from 'svelte';

  // DMVis imports
  import Column from '$lib/components/base/Column.svelte';
  import { ColumnType, IconType } from '$lib/Enums.js';
  import { select } from 'd3';

  // Required attributes
  export let x: number;
  export let y: number;
  export let width: number;
  export let height: number;

  // Optional attributes
  export let padding: number = 10;
  export let name: string = 'Column';
  export let type: ColumnType = ColumnType.Text;
  export let icons: IconType[] =
    type === ColumnType.Text
      ? [IconType.Sort, IconType.Search, IconType.Filter, IconType.More]
      : [IconType.Sort, IconType.Filter, IconType.More];

  let filterElem: SVGGElement;

  // Column standards
  const paddingSide: number = padding / 2;
  let showFilterPanel: boolean = false;
  let showSearch: boolean = false;

  // Dispatch search data
  const dispatch = createEventDispatcher();

  const dispatchFilterData = (event: Event, isMin: boolean) => {
    dispatch('filter', {
      column: name,
      value: (event.target as HTMLInputElement).value,
      isMin
    });
  };

  onMount(() => {
    select(filterElem).selectAll('column-bottom').remove();
  });
</script>

<!--
@component
### FilterColumn
FilterColumn is a component that displays a filter input for each column.

#### Required Attributes
* x       - The x-coordinate of the column.
* y       - The y-coordinate of the column.
* width   - The width of the column in pixels.
* height  - The height of the column in pixels.

#### Optional Attributes
* name    - The name of the column to display at its top. Set this to the attribute name.
            Defaults to `'Column'`.
* padding - The padding around the column in pixels.
            Defaults to `10`.
* type    - The type of the column that is being filtered.
            Defaults to `ColumnType.Text`.
* icons: IconType[] - A list of what icons to display at the top of the column. Defaults
                      to `[IconType.Sort, IconType.Search, IconType.Filter, IconType.More]`
                      if the type is `ColumnType.Text`, else it defaults to
                      `[IconType.Sort, IconType.Filter, IconType.More]`.

#### Events
* Please check the documentation for detailed information about dispatches.
-->

<!-- The filter column -->
<g bind:this={filterElem}>
  <Column
    {type}
    {x}
    {y}
    {height}
    {width}
    {padding}
    {name}
    {icons}
    on:sort
    on:filter={() => {
      showFilterPanel = !showFilterPanel;
      showSearch = false;
    }}
    on:search={() => {
      showSearch = !showSearch;
      showFilterPanel = false;
    }}>
    <g slot="overview">
      <!-- Insert histogram using bar chart -->
      {#if type === ColumnType.Bar}
        <foreignObject x={x + paddingSide} y={y - 40} width={width / 3} height={30}>
          <input
            type="number"
            placeholder="Min"
            aria-label="MinInput"
            style="width: 100%; padding:0; margin:0; border:1;"
            on:change={(e) => dispatchFilterData(e, true)} />
        </foreignObject>
        <foreignObject x={x + paddingSide * 8 + width / 3} y={y - 40} width={width / 3} height={30}>
          <input
            type="number"
            placeholder="Max"
            aria-label="MaxInput"
            style="width: 100%; padding:0; margin:0; border:1;"
            on:change={(e) => dispatchFilterData(e, false)} />
        </foreignObject>
      {/if}
    </g>
    <g slot="overlay">
      {#if showSearch || showFilterPanel}
        <rect
          class="column-overlay"
          x={x + paddingSide}
          y={y - 40}
          width={width - padding}
          height={100}
          fill="#f8f8f8"
          fill-opacity="0"
          role="gridcell" />
        <foreignObject x={x + paddingSide} y={y - 40} width={width - padding - 1} height={100}>
          <input
            type="text"
            placeholder={showSearch ? 'Search...' : 'Filter...'}
            list="filter-data"
            aria-label="TextInput"
            style="font-size: 12px; font-family: Arial; padding: 5px; border: 1px solid black;" />
          {#if showFilterPanel && type === ColumnType.Bar}
            <datalist id="filter-data">
              {#each ['Option 1', 'Option 2', 'Option 3'] as option}
                <option value={option} />
              {/each}
            </datalist>
          {/if}
        </foreignObject>
      {/if}
    </g>
  </Column>
</g>

<style>
  .column-overlay {
    fill: #ffffff;
    fill-opacity: 100%;
    stroke: black;
    stroke-width: 1;
  }
</style>
