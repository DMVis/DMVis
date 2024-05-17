<script lang="ts">
  // Imports
  import { getContext, createEventDispatcher } from 'svelte';

  // DMVis imports
  import Icon from '$lib/components/base/Icon.svelte';
  import Label from '$lib/components/base/Label.svelte';
  import Draggable from '$lib/components/base/Draggable.svelte';
  import { ColumnType } from '$lib/Enums.js';
  import { OriginX, OriginY, IconType } from '$lib/Enums.js';
  import type { VisualisationStore } from '$lib/store.js';

  // Required attributes
  export let x: number;
  export let width: number;
  export let height: number;
  export let type: ColumnType;

  // Optional attributes
  export let y: number = 100;
  export let name: string = 'Column';
  export let padding: number = 10;
  export let icons: IconType[] = [];
  export let showSeparator: boolean = true;

  // Set column specific values
  const paddingSide: number = padding / 2;
  const columnTitle: string = type in [ColumnType.Rank, ColumnType.Select] ? type : name;

  // Ready the column
  const dispatch = createEventDispatcher();
  const { styleUtil } = getContext<VisualisationStore>('store');
  $styleUtil.color = '#000000';

  // Calculate the position for the icons
  let iconStart: number;
  $: iconStart = width / 2 - (icons.length * 25) / 2;

  // Handle options for the column
  let isGrouped: boolean = false;
  let showMore: boolean = false;
  let highlighted: boolean = false;
  const handleOptions = (option: string, column: string) => {
    if (option === 'group') {
      isGrouped = !isGrouped;
      dispatch('group', { column, isGrouped });
    } else if (option === 'more') {
      showMore = !showMore;
    } else {
      dispatch(option, { column });
    }
  };

  function highlightRow(e: MouseEvent | null) {
    if (e === null) {
      dispatch('mouseHover', { row: -1 });
      return;
    }

    const row = getRow(e);
    dispatch('mouseHover', { row });
  }

  function selectRow(e: MouseEvent) {
    const row = getRow(e);
    dispatch('mouseRowClick', { row });
  }

  function getRow(e: MouseEvent): number {
    let columnRect = e.target as HTMLElement;
    if ((columnRect as HTMLElement)?.classList?.value !== 'column-bottom-background') {
      // If we're interacting with an element, get the background of the column
      columnRect = columnRect?.closest('.column-bottom')?.firstElementChild as HTMLElement;
    }

    // Get the position inside the background of the column
    const rect = (columnRect as HTMLElement)?.getBoundingClientRect();
    const y = e.clientY - rect.top - 20;

    // Get the row and return it
    const row = Math.floor(y / 20);
    return row;
  }
</script>

<!--
@component
### Column
Columns are required for visualisations such as Tabular Visualisation and LineUp.
Each columns contains a top part with information about the column and a bottom part with the actual data.

#### Required attributes
* x: number              - Scaled x-coordinate of the column, which is the starting point of the column
* width: number          - Width of the column
* height: number         - Height of the column
* type: ColumnType       - Type of the column. See the ColumnType enum for more information.

#### Optional attributes
* y: number              - Scaled y-coordinate of the column. The default is `100`.
* name: string           - Name of the column. Set this to the name of the attribute. The default is 'Column'.
* padding: number        - Padding of the column. The default is 10.
* icons: IconType[]      - List of what icons to display in the top of the column.
* showSeparator: boolean - Whether to show the separator line at the bottom of the column header. The default is `true`.

#### Slots
* data                   - Slot for the data of the column.
* overview               - Slot for the overview at the top of the column.
* overlay                - Slot for the menu overlay at the top of the column. Only required if an overview is specified.

#### Events
* For detailed information about dispatches, check the documentation.
-->

<g class="column" id={`${name.replace(/[\s()/]/g, '')}-column`} role="tablist" tabindex={-1}>
  <g
    class="column-bottom"
    role="grid"
    tabindex="-1"
    on:mouseleave={() => highlightRow(null)}
    on:mousemove={(e) => highlightRow(e)}>
    <rect
      class="column-bottom-background"
      {x}
      {y}
      {width}
      {height}
      fill="none"
      pointer-events="all"
      tabindex="0"
      role="cell"
      on:click={(e) => selectRow(e)}
      on:keydown />
    <slot name="data" />
  </g>
  <Draggable elementName={name} on:dragStart on:dragMove on:dragStop>
    {#key x}
      <g class="column-top">
        <rect
          x={x + paddingSide}
          y={y - 100}
          width={width - padding}
          height={100}
          fill={highlighted ? $styleUtil.focusColor : '#FFFFFF'}
          tabindex="0"
          fill-opacity="10%"
          role="cell"
          on:mouseenter={() => {
            highlighted = true;
          }}
          on:mouseleave={() => {
            highlighted = false;
          }} />
        <Label
          x={x + width / 2}
          y={y - 90}
          text={columnTitle.includes('LineUp') ? columnTitle.split('_')[1] : columnTitle}
          width={width - padding}
          textColor={$styleUtil.color}
          fontSize={`${$styleUtil.fontSize}px`}
          fontFamily={$styleUtil.fontFamily}
          originX={OriginX.Middle}
          originY={OriginY.Middle}
          hasPointerEvents={true}
          hasBackground={false} />
        <svg class="column-options" {width} height="25px" {x} y={y - 70}>
          {#each icons as icon, i}
            <Icon
              x={iconStart + 25 * i}
              y={0}
              {icon}
              color={$styleUtil.colorBorder}
              on:mouseIconClick={() => handleOptions(icon, name)} />
          {/each}
        </svg>
        <g class="column-top-overview">
          <slot name="overview" />
        </g>
        {#if showSeparator}
          <line
            x1={x + paddingSide}
            y1={y}
            x2={x + width - paddingSide}
            y2={y}
            stroke={'#000000'}
            stroke-width="1"
            shape-rendering="crispEdges" />
        {/if}

        <!-- Overlays for columns -->
        <g class="column-top-overlay">
          {#if showMore}
            <g class="column-top-more">
              <rect
                class="column-overlay"
                x={x + paddingSide}
                y={y - 40}
                width={width - padding}
                height={30}
                role="gridcell" />
              <Label
                x={x + width / 2}
                y={y - 25}
                text="Remove column"
                width={width - padding}
                textColor={$styleUtil.color}
                fontSize={`${$styleUtil.fontSize}px`}
                fontFamily={$styleUtil.fontFamily}
                hasPointerEvents={true}
                hasBackground={false} />
            </g>
          {/if}
          <slot name="overlay" />
        </g>
      </g>
    {/key}
  </Draggable>
</g>

<style>
  .column-overlay {
    fill: #ffffff;
    fill-opacity: 100%;
    stroke: black;
    stroke-width: 1;
  }
</style>
