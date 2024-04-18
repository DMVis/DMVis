<script lang="ts">
  // Imports
  import { getContext, createEventDispatcher } from 'svelte';

  // DMVis imports
  import { OriginX, OriginY } from '$lib/Enums.js';
  import Icon from '$lib/components/base/Icon.svelte';
  import Label from '$lib/components/base/Label.svelte';
  import type { VisualisationStore } from '$lib/store.js';

  // Mandatory attributes
  export let x: number;
  export let width: number;
  export let height: number;

  // Optional attributes
  export let name: string = 'Column';
  export let padding: number = 10;
  const paddingSide: number = padding / 2;

  // Ready the column
  const { styleUtil } = getContext<VisualisationStore>('store');
  $styleUtil.color = '#000000';
  const dispatch = createEventDispatcher();

  // Check if we are highlighting the current column
  let highlighted: boolean = false;

  // Handle options for the column
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
    } else {
      // TODO: Display small dropdown with options
    }
    return () => {
      console.log(`Option: ${option} for column: ${column}`);
    };
  };
</script>

<!--
@component
### Column
Columns are required for visualisations such as Tabular Visualisation and LineUp.
Each columns contains a top part with information about the column and a bottom part with the actual data.

#### Required attributes
  * x: number             - Scaled x-coordinate of the column, which is the starting point of the column
  * width: number         - Width of the column

#### Optional attributes
  * ???
-->

<g class="column">
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
      text={name}
      width={width - padding}
      textColor={$styleUtil.color}
      fontSize={`${$styleUtil.fontSize}px`}
      fontFamily={$styleUtil.fontFamily}
      originX={OriginX.Middle}
      originY={OriginY.Middle}
      hasBackground={false} />
    <g class="column-options">
      <Icon
        x={x + 25}
        y={30}
        icon="sort"
        color={$styleUtil.colorBorder}
        on:mousePointClicked={handleOptions('sort', name)} />
      <Icon
        x={x + 50}
        y={30}
        icon="search"
        color={$styleUtil.colorBorder}
        on:mousePointClicked={handleOptions('search', name)} />
      <Icon
        x={x + 75}
        y={30}
        icon="filter"
        color={$styleUtil.colorBorder}
        on:mousePointClicked={handleOptions('filter', name)} />
      <Icon
        x={x + 100}
        y={30}
        icon="more"
        color={$styleUtil.colorBorder}
        on:mousePointClicked={handleOptions('more', name)} />
    </g>
    <g class="column-top-preview">
      <!-- Display a preview of the data using a barchart, if applicable -->
    </g>
    <line
      x1={x + paddingSide}
      y1={100}
      x2={x + width - paddingSide}
      y2={100}
      stroke={$styleUtil.colorBorder}
      stroke-width="1" />
  </g>
  <g class="column-bottom">
    <rect
      x={x + paddingSide}
      y={100}
      width={width - padding}
      height={height - 100}
      fill="#FFFFFF"
      fill-opacity="100%"
      role="gridcell" />
    <slot />
  </g>
</g>

<style>
</style>
