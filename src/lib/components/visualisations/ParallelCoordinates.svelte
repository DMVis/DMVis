<script lang="ts">
  // Imports
  import { select } from 'd3';

  // DMVis imports
  import Line from '$lib/components/base/Line.svelte';
  import DynamicAxis from '$lib/components/base/DynamicAxis.svelte';
  import { StyleUtils } from '$lib/utils/StyleUtils.js';
  import BaseVisualisation from '$lib/components/base/BaseVisualisation.svelte';
  import type { DataUtils } from '$lib/utils/DataUtils.js';
  import type { UndefineableString } from '$lib/Types.js';
  import { setVisualisationContext, updateVisualisationContext } from '$lib/utils/Context.js';
  import { afterUpdate } from 'svelte';

  // Required attributes
  export let dataUtil: DataUtils;

  // Optional attributes
  export let styleUtil: StyleUtils = new StyleUtils({ color: '#BBBBBB' });
  export let width: number = calculateWidth(dataUtil.columns.length);
  export let height: number = calculateHeight(dataUtil.data.length);
  export let marginLeft: number = 40;
  export let marginRight: number = 40;
  export let marginTop: number = 40;
  export let marginBottom: number = 40;
  export let isScrollable: boolean = false;
  export let showFilterPanel: boolean = false;

  let parallelCoordinatesRef: SVGElement;

  // Variables that keep track of axis dragging
  let draggedAxis: UndefineableString = undefined;
  let draggingOffset: number = 0;

  // Variables that keep track of line highlighting
  let highlightedLine: number = -1;
  let clickedLine: boolean = false;

  const { visualisationData } = dataUtil;

  // Fill the store
  setVisualisationContext({
    width: showFilterPanel ? width - 150 : width,
    height,
    data: $visualisationData,
    columns: dataUtil.columns,
    styleUtil,
    marginLeft,
    marginRight,
    marginTop,
    marginBottom
  });

  // Set reactive store values
  $: {
    updateVisualisationContext({ data: $visualisationData });
  }

  // Calculate height based on number of rows
  // Use the fontsize per row and multiply by 1.5 for padding
  function calculateHeight(numRows: number): number {
    return numRows * styleUtil.fontSize * 1.5;
  }

  // Calculate width based on number of columns
  // Use 175 as the width of each column, as a default
  function calculateWidth(numColumns: number): number {
    return numColumns * 175;
  }

  // Locally keeping track of the order of the axes
  let axisOrder: string[] = dataUtil.columns.slice();

  // Function that handles updating the position of the axis that is being dragged
  function onDragMove(e: CustomEvent) {
    let elementName = e.detail.elementName;
    let movementX = e.detail.movementX;
    draggedAxis = elementName;
    draggingOffset += movementX;
  }

  // Reset local dragging variables when we stop dragging
  function onDragStop() {
    draggedAxis = undefined;
    draggingOffset = 0;
  }

  // Update the order of the axes; the actual logic for this is handled in DynamicAxis
  function onAxisOrderChanged(e: CustomEvent) {
    axisOrder = e.detail.axisOrder;
    draggingOffset = 0;
  }

  // Function that fires when the mouse enters any line
  function onMouseLineEnter(e: CustomEvent): void {
    const id = e.detail.id;
    if (draggedAxis === undefined && !clickedLine && highlightedLine !== id) {
      highlightedLine = id;
    }
  }

  // Function that fires when the mouse leaves any line
  function onMouseLineLeave(): void {
    if (!clickedLine) {
      highlightedLine = -1;
    }
  }

  // Function that fires when the mouse clicks any line
  function onMouseLineClick(e: CustomEvent): void {
    const id = e.detail.id;
    if (clickedLine && highlightedLine !== id) {
      highlightedLine = id;
    } else {
      clickedLine = !clickedLine;
      highlightedLine = clickedLine ? highlightedLine : -1;
    }
  }

  // If a line is highlighted (or not highlighted anymore), update the tick font-weight for the line
  $: if (typeof highlightedLine === 'number') {
    highlightAxisTick();
  }

  // If the order of the axes changes, update the tick font-weight for the highlighted line
  function onRenderAxis(): void {
    highlightAxisTick();
  }

  function highlightAxisTick() {
    // If user is hovering a line, select the tick that is to be highlighted and make it bold
    if (highlightedLine !== -1) {
      const highlightText = $visualisationData[highlightedLine][0];
      select(parallelCoordinatesRef)
        .selectAll('.tick text')
        .filter(function () {
          return select(this).text() === highlightText;
        })
        .attr('font-weight', 'bold');
    }
    // If no line is being hovered, revert all ticks to normal font-weight
    else {
      select(parallelCoordinatesRef).selectAll('.tick text').attr('font-weight', 'normal');
    }
  }

  function onKeyDown(e: KeyboardEvent) {
    if (e.key !== 'Escape') {
      return;
    }
    clickedLine = false;
    highlightedLine = -1;
  }

  // Add the correct cursor to axis title
  afterUpdate(() => {
    const axes = parallelCoordinatesRef.querySelectorAll('.axis > .draggable > .label');
    for (let i = 0; i < axes.length; i++) {
      (axes[i] as HTMLElement).style.cursor = 'grab';
    }
  });
</script>

<!--
@component
### ParallelCoordinates
This is a visualisation that is capable of visualising multi-dimensional data.
It creates an axis for each column in the supplied table with data
and draws a line through each axis for each row in the table.

#### Required Attributes
* dataUtil: DataUtils   - An instance of `dataUtils`, which holds all the data. See its documentation for more information.

#### Optional Attribute
* styleUtil: StyleUtils - An instance of `StyleUtils`, which contains styling for the visualisation. See its documentation for more information.
                          Defaults to `new StyleUtils({ color: '#BBBBBB' })`.
* width: number;        - The width of the visualisation in pixels.
                          Defaults to `numberOfColumns * 175`.
* height: number;       - The height of the visualisation in pixels.
                          Defaults to `numberOfRows * 15`.
* marginLeft: number    - The margin to the left of the visualisation in pixels.
                          Defaults to `40`.
* marginRight: number   - The margin to the right of the visualisation in pixels.
                          Defaults to `40`.
* marginTop: number     - The margin to the top of the visualisation in pixels.
                          Defaults to `40`.
* marginBottom: number  - The margin to the bottom of the visualisation in pixels.
                          Defaults to `40`.
* isScrollable: boolean - Whether the visualisation is scrollable in its parent container.
                          Defaults to `false`.
* showFilterPanel: boolean   - Whether the filter is displayed next to the visualisation.
                          Defaults to `false`.
-->
<BaseVisualisation {isScrollable} showFilterPanel={showFilterPanel ? dataUtil : null}>
  <svg
    class="visualisation parallelCoordinates"
    width={isScrollable ? width : '100%'}
    height={isScrollable ? height : '100%'}
    bind:this={parallelCoordinatesRef}>
    {#key $visualisationData}
      <!-- Draw all the lines -->
      <Line
        lineWidth={2}
        hoverable={true}
        {axisOrder}
        {draggedAxis}
        {draggingOffset}
        on:mouseLineEnter={onMouseLineEnter}
        on:mouseLineLeave={onMouseLineLeave}
        on:mouseLineClick={onMouseLineClick} />
      <!-- Draw all the axes -->
      <DynamicAxis
        position={'left'}
        alignment={'spaced'}
        renderLabel={true}
        labelPosition={'top'}
        {axisOrder}
        isDraggable={true}
        on:dragMove={onDragMove}
        on:dragStop={onDragStop}
        on:axisOrderChanged={onAxisOrderChanged}
        on:renderAxis={onRenderAxis} />
    {/key}
  </svg>
</BaseVisualisation>

<svelte:window on:keydown={onKeyDown} />
