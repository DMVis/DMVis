<script lang="ts">
  // Imports
  import { sum } from 'd3';

  // DMVis imports
  import {
    getVisualisationContext,
    setVisualisationContext,
    updateVisualisationContext
  } from '$lib/Context.js';
  import BarColumn from '$lib/components/columns/BarColumn.svelte';
  import SumColumn from '$lib/components/columns/SumColumn.svelte';
  import TextColumn from '$lib/components/columns/TextColumn.svelte';
  import Scrollable from '$lib/components/base/Scrollable.svelte';
  import { IconType } from '$lib/Enums.js';
  import { StyleUtils } from '$lib/utils/StyleUtils.js';
  import BaseVisualisation from '$lib/components/base/BaseVisualisation.svelte';
  import type { DataUtils } from '$lib/utils/DataUtils.js';
  import type { ScaleLinear } from '$lib/Types.js';

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
  export let autoDistributeWeight: boolean = true;
  export let isScrollable: boolean = false;
  export let showFilter: boolean = false;

  // Local variables
  let valueChartRef: SVGGElement;
  let weightSumTotal = 100;
  const marginBetweenTopAndBottom = 10;
  const topHeight = height / 2 - marginBetweenTopAndBottom / 2;
  const bottomHeight = height / 2 - marginBetweenTopAndBottom / 2;
  const bottomYPosition = topHeight + marginBetweenTopAndBottom;
  const lineYPosition = topHeight + marginBetweenTopAndBottom / 2;
  const { visualisationData } = dataUtil;

  // Logic about weights
  const startWeight = weightSumTotal / (dataUtil.data[0].length - 1);
  let columnWeights = Array(dataUtil.data[0].length - 1).fill(startWeight);
  let columnScales: ScaleLinear[];

  // Local variables to be set in the reactive block below
  let transposedData: (string | number)[][];
  let labelColumn: string[];
  let numericalColumns: number[][];
  let numericalRows: number[][];
  let columnWidths: number[] = [];

  $: {
    // Reactively update weights and scales
    for (let i = 0; i < transposedData.length - 1; i++) {
      columnWidths[i] = (columnWeights[i] / weightSumTotal) * (width - marginLeft - marginRight);
      columnScales[i] = columnScales[i].range([columnWidths[i] - 10, 0]);
    }
  }

  $: {
    updateVisualisationContext({ data: $visualisationData });
    transposedData = $visualisationData[0].map((_, colIndex) =>
      $visualisationData.map((row) => row[colIndex])
    );
    labelColumn = transposedData[0] as string[];
    numericalColumns = transposedData.slice(1) as number[][];
    // Transpose the entire data to now work with columns instead of rows
    numericalRows = $visualisationData.map((row) => {
      return row as number[];
    });
  }

  // Fill the visualisation store
  setVisualisationContext({
    marginLeft,
    marginBottom,
    marginRight,
    marginTop,
    padding,
    width,
    height,
    data: dataUtil.data,
    columns: dataUtil.columns,
    styleUtil
  });

  const { xScales } = getVisualisationContext();
  columnScales = $xScales.slice(1) as ScaleLinear[];
  // Sort the weight the moment the scales are loaded in
  dataUtil.sortByWeights(columnScales, false);

  function calculateHeight(numRows: number): number {
    // 20 is the height of the rows, 120 is the margin for the column top
    return numRows * 20 + 120;
  }

  // Function that fires once a box is scrolled
  function onScroll(e: Event) {
    // scrolledBox is the box that is actually scrolled
    const scrolledBox = e.target as Element;
    // scrollBoxes are all the boxes on the screen that are scrollable
    const scrollBoxes = [...valueChartRef.querySelectorAll('.scrollable')];
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

  // Function that fires when the weights are changed in any of the barColumns
  // Will update the columnWeights array to be up to date
  function onWeightChanged(e: { detail: { value: number; column: string } }): void {
    const newWeight = e.detail.value;
    const changedColumn = e.detail.column;
    const changedColumnIndex = dataUtil.columns.indexOf(changedColumn) - 1;
    // Redistribute the other weights if needed, otherwise update the sum of all the weights
    if (autoDistributeWeight) {
      updateWeights(changedColumnIndex, newWeight);
    } else {
      columnWeights[changedColumnIndex] = newWeight;
      weightSumTotal = sum(columnWeights);
    }

    // Update the the width and scales of the columns
    for (let i = 0; i < columnWidths.length; i++) {
      let newWidth = (columnWeights[i] / weightSumTotal) * (width - marginLeft - marginRight);
      columnScales[i] = columnScales[i].range([newWidth - 10, 0]);
    }

    // Automatically sort the columns by the sum of all the bars
    dataUtil.sortByWeights(columnScales, true);
  }

  // Function that updates the weights when one weight changes
  // This makes sure that all weights always add up to 100
  function updateWeights(changedColumnIndex: number, newWeight: number): void {
    const otherColumnsWeight =
      columnWeights.reduce((sum, weight) => sum + weight, 0) - columnWeights[changedColumnIndex];
    const weightDifference = newWeight - columnWeights[changedColumnIndex];
    columnWeights[changedColumnIndex] = newWeight;

    // Change the weights of all other columns relative to their old weight to adjust for the weight change
    columnWeights.forEach((weight, i) => {
      if (changedColumnIndex !== i) {
        let proportion = weight / otherColumnsWeight;
        let adjustment = weightDifference * proportion;
        columnWeights[i] = weight - adjustment;
      }
    });

    // Because of rounding, change the weight of the last column so that the total weight is equal to 100
    let totalWeightFinal = columnWeights.reduce((sum, weight) => sum + weight, 0);
    if (totalWeightFinal !== 100) {
      const adjustment = 100 - totalWeightFinal;
      columnWeights[columnWeights.length - 1] =
        columnWeights[columnWeights.length - 1] + adjustment;
    }
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
* autoDistributeWeight: boolean             - Determines whether the total of the weights should be 100.
                                                This will mean that when set to true all other weights will be redistributed.
                                                This defaults to true
* isScrollable: boolean                     - Whether the visualisation should be scrollable. The default value is `false`.
* showFilter: boolean                       - Whether the filter should be shown next to the visualisation. The default value is `false`.
-->
<BaseVisualisation {isScrollable} showFilter={showFilter ? dataUtil : null}>
  <svg {width} {height} class="valuechart" bind:this={valueChartRef}>
    {#key $visualisationData}
      <!-- Start of top half of the visualisation -->
      <Scrollable
        className={'valuechart-top'}
        {width}
        height={topHeight}
        allowHorizontalScrolling={false}
        on:scroll={onScroll}>
        <svg {width} height={calculateHeight($visualisationData.length)}>
          <!-- Create a colum for the labels -->
          <TextColumn
            x={0}
            width={marginLeft}
            {height}
            data={labelColumn}
            name={'Labels'}
            icons={[]} />
          <!-- Loop over all the columns and create a bar column for every column -->
          {#each numericalColumns as column, i}
            {#if typeof column[0] === 'number'}
              <BarColumn
                x={marginLeft + sum(columnWidths.slice(0, i))}
                width={columnWidths[i]}
                {height}
                data={column}
                name={dataUtil.columns[i + 1]}
                barColor={styleUtil.colorScheme[i % styleUtil.colorScheme.length]}
                icons={[IconType.Weight]}
                weight={columnWeights[i]}
                scale={columnScales[i]}
                barLabelVisibility={'alwaysVisible'}
                on:weightChanged={onWeightChanged} />
            {/if}
          {/each}
        </svg>
      </Scrollable>
      <!-- Line to seperate top and bottom half -->
      <line
        x1={0}
        x2={width}
        y1={lineYPosition}
        y2={lineYPosition}
        stroke="black"
        stroke-width="2" />
      <!-- Scrollable logic -->
      <Scrollable
        className={'valuechart-bottom'}
        y={bottomYPosition}
        {width}
        height={bottomHeight}
        allowHorizontalScrolling={false}
        on:scroll={onScroll}>
        <!-- Bottom half of the visualisation -->
        <svg {width} height={calculateHeight($visualisationData.length)}>
          <!-- Draw a column for the labels -->
          <TextColumn
            x={0}
            width={marginLeft}
            {height}
            data={transposedData[0].map(String)}
            name={'Labels'}
            icons={[]} />
          <!-- Draw a very wide columns for a stacked bar for each row -->
          <SumColumn
            x={marginLeft}
            width={width - marginLeft - marginRight}
            {height}
            data={numericalRows}
            name={'Sum'}
            attributeScales={columnScales}
            icons={[]} />
        </svg>
      </Scrollable>
    {/key}
  </svg>
</BaseVisualisation>
