<script lang="ts">
  // Imports
  import { getContext, createEventDispatcher } from 'svelte';

  // DMVis imports
  import Icon from '$lib/components/base/Icon.svelte';
  import Label from '$lib/components/base/Label.svelte';
  import { ColumnType } from '$lib/Enums.js';
  import { OriginX, OriginY } from '$lib/Enums.js';
  import type { VisualisationStore } from '$lib/store.js';

  // Required attributes
  export let x: number;
  export let width: number;
  export let height: number;
  export let type: ColumnType;

  // Optional attributes
  export let name: string = 'Column';
  export let padding: number = 10;

  // Set column specific values
  const paddingSide: number = padding / 2;
  const columnTitle: string = type in [ColumnType.Rank, ColumnType.Select] ? type : name;

  // Ready the column
  const dispatch = createEventDispatcher();
  const { styleUtil } = getContext<VisualisationStore>('store');
  $styleUtil.color = '#000000';

  // Define the icons for the column
  let icons: string[];
  if (type == ColumnType.Rank) {
    icons = ['more'];
  } else if (type == ColumnType.Separator) {
    icons = ['item', 'band'];
  } else if (type == ColumnType.Bar) {
    icons = ['sort', 'filter', 'more'];
  } else if (type == ColumnType.Select) {
    icons = ['sort', 'group', 'more'];
  } else if (type == ColumnType.Sum) {
    icons = ['sort', 'group', 'weights', 'more'];
  } else {
    icons = ['sort', 'search', 'filter', 'more'];
  }
  const iconStart = width / 2 - (icons.length * 25) / 2;

  // Handle options for the column
  let group: boolean = false;
  let showMore: boolean = false;
  let highlighted: boolean = false;
  let sorting: 'ascend' | 'descend' | 'none' = 'none';
  const handleOptions = (option: string, column: string) => {
    if (option === 'sort') {
      // Set the sorting option
      if (sorting === 'ascend') {
        sorting = 'descend';
      } else if (sorting === 'descend') {
        sorting = 'none';
      } else {
        sorting = 'ascend';
      }

      // Sort the data
      dispatch('sortData', { column, sorting });
    } else if (option === 'search') {
      dispatch('search', { column });
    } else if (option === 'filter') {
      dispatch('filter', { column });
    } else if (option === 'group') {
      group = !group;
      dispatch('groupData', { column, group });
    } else if (option === 'more') {
      showMore = !showMore;
    } else if (option === 'item') {
      // TODO: Separator feature, requires more research
    } else if (option === 'band') {
      // TODO: Separator feature, requires more research
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
    dispatch('mousePointClicked', { row });
  }

  function getRow(e: MouseEvent): number {
    let columnRect = e.target as HTMLElement;
    if ((columnRect as HTMLElement)?.classList?.value !== 'column-bottom-background') {
      // If we're interacting with an element, get the background of the column
      columnRect = columnRect?.closest('.column-bottom')?.firstElementChild as HTMLElement;
    }

    // Get the position inside the background of the column
    const rect = (columnRect as HTMLElement)?.getBoundingClientRect();
    const y = e.clientY - rect.top - 105;

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
  * x: number             - Scaled x-coordinate of the column, which is the starting point of the column
  * width: number         - Width of the column
  * height: number        - Height of the column
  * type: ColumnType      - Type of the column. See the ColumnType enum for more information.

#### Optional attributes
  * name: string          - Name of the column. Set this to the name of the attribute. Default is 'Column'.
  * padding: number       - Padding of the column. Default is 10.
-->

<g class="column" role="tablist" tabindex={-1}>
  <g
    class="column-bottom"
    role="grid"
    tabindex="-1"
    on:mouseleave={() => highlightRow(null)}
    on:mousemove={(e) => highlightRow(e)}>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <rect
      class="column-bottom-background"
      {x}
      y={0}
      {width}
      {height}
      fill="none"
      pointer-events="all"
      tabindex="0"
      role="cell"
      on:click={(e) => selectRow(e)} />
    <slot name="data" />
  </g>
  <g class="column-top">
    <rect
      x={x + paddingSide}
      y={0}
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
      y={10}
      text={columnTitle}
      width={width - padding}
      textColor={$styleUtil.color}
      fontSize={`${$styleUtil.fontSize}px`}
      fontFamily={$styleUtil.fontFamily}
      originX={OriginX.Middle}
      originY={OriginY.Middle}
      hasBackground={false} />
    <svg class="column-options" {width} height="25px" {x} y="30">
      {#each icons as icon, i}
        <Icon
          x={iconStart + 25 * i}
          y={0}
          {icon}
          color={$styleUtil.colorBorder}
          on:mousePointClick={() => handleOptions(icon, name)} />
      {/each}
    </svg>
    <g class="column-top-overview">
      <slot name="overview" />
    </g>
    <line
      x1={x + paddingSide}
      y1={100}
      x2={x + width - paddingSide}
      y2={100}
      stroke={$styleUtil.colorBorder}
      stroke-width="1" />

    <!-- Overlays for columns -->
    <g class="column-top-overlay">
      {#if showMore}
        <g class="column-top-more">
          <rect
            class="column-overlay"
            x={x + paddingSide}
            y={60}
            width={width - padding}
            height={30}
            role="gridcell" />
          <Label
            x={x + width / 2}
            y={75}
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
</g>

<style>
  .column-overlay {
    fill: #ffffff;
    fill-opacity: 100%;
    stroke: black;
    stroke-width: 1;
  }
</style>
