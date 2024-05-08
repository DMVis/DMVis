<script lang="ts">
  // Imports
  import { setContext } from 'svelte';

  // DMVis component imports
  import BarColumn from '$lib/components/columns/BarColumn.svelte';
  import SumColumn from '$lib/components/columns/SumColumn.svelte';
  import TextColumn from '$lib/components/columns/TextColumn.svelte';

  // DMVis util imports
  import { StyleUtils } from '$lib/utils/StyleUtils.js';
  import type { DataUtils } from '$lib/utils/DataUtils.js';
  import { VisualisationStore } from '$lib/store.js';

  // Required attributes
  export let width: number;
  export let height: number;
  export let dataUtil: DataUtils;

  // Optional attributes
  export let styleUtil: StyleUtils = new StyleUtils({
    colorSet: 'Dark2',
    numColors: dataUtil.columns.length - 1
  });
  export let marginLeft: number = 100;
  export let marginRight: number = 40;
  export let marginBottom: number = 40;
  export let marginTop: number = 40;
  export let padding: number = 0.1;

  // Local variables
  const marginBetweenTopAndBottom = 10;
  const topHeight = height / 2 - marginBetweenTopAndBottom / 2;
  const bottomHeight = height / 2;
  const bottomYPosition = topHeight + marginBetweenTopAndBottom;
  const lineYPosition = topHeight + marginBetweenTopAndBottom / 2;
  const { visualisationData } = dataUtil;

  // Local variables to be set in the reactive block below
  let transposedData: (string | number)[][];
  let labelColumn: string[];
  let numericalColumns: number[][];
  let numericalRows: number[][];
  let columnWidth: number;

  $: {
    visualisationStore.data.set($visualisationData);
    transposedData = $visualisationData[0].map((_, colIndex) =>
      $visualisationData.map((row) => row[colIndex])
    );
    labelColumn = transposedData[0] as string[];
    numericalColumns = transposedData.slice(1) as number[][];
    // Transpose the entire data to now work with columns instead of rows
    numericalRows = $visualisationData.map((row) => {
      return row as number[];
    });
    // Width for all the bar columns in the top half
    columnWidth = (width - marginLeft - marginRight) / (transposedData.length - 1);
  }

  // Fill the visualisation store
  const visualisationStore = new VisualisationStore();
  visualisationStore.marginLeft.set(marginLeft);
  visualisationStore.marginRight.set(marginRight);
  visualisationStore.marginBottom.set(marginBottom);
  visualisationStore.marginTop.set(marginTop);
  visualisationStore.padding.set(padding);
  visualisationStore.width.set(width);
  visualisationStore.height.set(height);
  visualisationStore.data.set(dataUtil.data);
  visualisationStore.columns.set(dataUtil.columns);
  visualisationStore.styleUtil.set(styleUtil);
  setContext('store', visualisationStore);

  function calculateHeight(numRows: number): number {
    return numRows * 20 + 105;
  }

  // Function that fires once a box is scrolled
  function onScroll(e: Event) {
    // scrolledBox is the box that is actually scrolled
    const scrolledBox = e.target as Element;
    // scrollBoxes are all the boxes on the screen that are scrollable
    const scrollBoxes = [...document.querySelectorAll('.scrollable')];
    // Filter out the scrolledBox and sync all the other boxes
    scrollBoxes
      .filter((item) => item !== scrolledBox)
      .forEach((currentBox) => {
        syncScroll(currentBox, scrolledBox);
      });
  }

  // Function that syncs the scroll between a target scrollable box, and the box that is scrolled
  function syncScroll(currentBox: Element, scrolledBox: Element) {
    const topScroll = scrolledBox.scrollTop;
    const leftScroll = scrolledBox.scrollLeft;
    currentBox.scrollTo({
      behavior: 'instant',
      top: topScroll,
      left: leftScroll
    });
  }
</script>

<!--
@component
### ValueChart
ValueChart is a visualisation that lets the user give weights to different attributes to aid in decision-making, depending on how important the user thinks the attribute is.
The visualisation consists of two major components: namely, a visualisation close to `TabularVisualisation` at the top, and a visualisation similar to `StackedBarChart` at the bottom.

### Required Attributes
* width: number                               - Width of the visualisation.
* height: number                              - Height of the visualisation.
* dataUtil: DataUtils                         - Class holding all the data, see documentation.

### Optional Attributes
* styleUtil: StyleUtils                     - Class holding all the styling. See its documentation.
* marginLeft: number                        - Margin to the left of the visualisation. This defaults to `100`.
* marginRight: number                       - Margin to the right of the visualisation. This defaults to `40`.
* marginTop: number                         - Margin to the top of the visualisation. This defaults to `40`.
* marginBottom: number                      - Margin to the bottom of the visualisation. This defaults to `40`.
* padding: number                           - Padding between the different visualisations. This defaults to `0.1`.
-->

<svg {width} {height} class="valuechart">
  {#key $visualisationData}
    <!-- Scrollable logic -->
    <foreignObject x={0} y={0} {width} height={topHeight}>
      <div
        class="valuechart-scrollable-top scrollable"
        style={`width:${width}px; height:${topHeight}px; overflow:auto; overflow-x:hidden;`}
        on:scroll={onScroll}>
        <!-- Start of top half of the visualisation -->
        <svg {width} height={calculateHeight($visualisationData.length - 1)}>
          <!-- Create a colum for the labels -->
          <TextColumn x={0} width={marginLeft} {height} data={labelColumn} name={'Labels'} />
          <!-- Loop over all the columns and create a bar column for every column -->
          {#each numericalColumns as column, i}
            {#if typeof column[0] === 'number'}
              <BarColumn
                x={marginLeft + i * columnWidth}
                width={columnWidth}
                {height}
                data={column}
                name={dataUtil.columns[i + 1]}
                barColor={styleUtil.colorScheme[i % styleUtil.colorScheme.length]} />
            {/if}
          {/each}
        </svg>
      </div>
    </foreignObject>
    <!-- Line to seperate top and bottom half -->
    <line x1={0} x2={width} y1={lineYPosition} y2={lineYPosition} stroke="black" stroke-width="2" />
    <!-- Scrollable logic -->
    <foreignObject x={0} y={bottomYPosition} {width} height={bottomHeight}>
      <div
        class="valuechart-scrollable-bottom scrollable"
        style={`width:${width}px; height:${bottomHeight}px; overflow:auto; overflow-x:hidden;`}
        on:scroll={onScroll}>
        <!-- Bottom half of the visualisation -->
        <svg {width} height={calculateHeight($visualisationData.length - 1)}>
          <!-- Draw a column for the labels -->
          <TextColumn
            x={0}
            width={marginLeft}
            {height}
            data={transposedData[0].map(String)}
            name={'Labels'} />
          <!-- Draw a very wide columns for a stacked bar for each row -->
          <SumColumn
            x={marginLeft}
            width={width - marginLeft - marginRight}
            {height}
            data={numericalRows}
            name={'Sum'} />
        </svg>
      </div>
    </foreignObject>
  {/key}
</svg>

<style>
  .scrollable {
    scrollbar-width: thin;
    scrollbar-color: rgba(155, 155, 155, 0.7) rgba(0, 0, 0, 0);
  }
</style>
