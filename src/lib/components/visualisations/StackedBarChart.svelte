<script lang="ts">
  // Imports
  import { max, sum, scaleLinear, type ScaleBand } from 'd3';

  // DMVis imports
  import {
    setVisualisationContext,
    updateVisualisationContext,
    getVisualisationContext
  } from '$lib/utils/Context.js';
  import StackedBar from '$lib/components/base/StackedBar.svelte';
  import DynamicAxis from '$lib/components/base/DynamicAxis.svelte';
  import { StyleUtils } from '$lib/utils/StyleUtils.js';
  import type { Opacity } from '$lib/Types.js';
  import BaseVisualisation from '$lib/components/base/BaseVisualisation.svelte';
  import type { DataUtils } from '$lib/utils/DataUtils.js';

  // Required attributes
  export let dataUtil: DataUtils;

  // Optional attributes
  export let styleUtil: StyleUtils = new StyleUtils({
    colorSet: 'Set1',
    numColors: dataUtil.columns.length - 1
  });
  export let width: number = 1500;
  export let height: number = calculateHeight(dataUtil.data.length);
  export let marginLeft: number = 40;
  export let marginRight: number = 40;
  export let marginBottom: number = 40;
  export let marginTop: number = 40;
  export let padding: number = 0.2;
  export let opacity: Opacity = 1;
  export let showTotals: boolean = false;
  export let isScrollable: boolean = false;
  export let showFilterPanel: boolean = false;

  const { visualisationData } = dataUtil;

  // Set store values
  setVisualisationContext({
    width: showFilterPanel ? width - 150 : width,
    height,
    data: $visualisationData,
    columns: dataUtil.columns,
    styleUtil,
    marginLeft,
    marginRight,
    marginBottom,
    marginTop,
    padding
  });

  const { yScales } = getVisualisationContext();
  let yScale = $yScales[0] as ScaleBand<string>;

  // Set reactive store values
  $: {
    height = calculateHeight($visualisationData.length);
    updateVisualisationContext({ data: $visualisationData, height });
    yScale = $yScales[0] as ScaleBand<string>;
  }

  // Calculate height based on number of rows stackedbarchart
  // Use the fontsize per row and multiply by 1.5 for padding
  function calculateHeight(numRows: number): number {
    return numRows * styleUtil.fontSize * 1.5 + 100;
  }

  // Maximum value of all the sums, used for scaling all bars properly
  const maxValue = max($visualisationData.map((row) => sum(row.slice(1) as number[])));

  // Function that gets the y value for a given row
  function getY(rowName: string | number): number {
    return yScale(rowName as string) as number;
  }

  // Create a scale to be used for all stacked bars
  const barXScales = Array(dataUtil.columns.length - 1).fill(
    scaleLinear()
      .domain([0, Number(maxValue)])
      .range([0, width - marginLeft - marginRight])
  );
</script>

<!--
@component
### StackedBarChart
This visualisation is an extension of the normal barchart,
where it allows comparing attributes to each other and their total.
The length of each bar corresponds to the numerical value of the data being represented,
but instead of a normal barchart,
we combine multiple categories or attributes to show their total.
The x-axis represents the numerical values of the data.
The y-axis represents the categories of the data.

#### Required Attributes
* dataUtil: dataUtils       - An instance of `dataUtils`, which holds all the data. See its documentation for more information.

#### Optional Attributes
* width: number             - The width of the visualisation in pixels.
                              Defaults to `numberOfRows * 15`.
* height: number            - The height of the visualisation in pixels.
                              Defaults to `1500`.
* marginLeft: number        - The margin to the left of the visualisation in pixels.
                              Defaults to `40`.
* marginRight: number       - The margin to the right of the visualisation in pixels.
                              Defaults to `40`.
* marginTop: number         - The margin to the top of the visualisation in pixels.
                              Defaults to `40`.
* marginBottom: number      - The margin to the bottom of the visualisation in pixels.
                              Defaults to `40`.
* padding: number           - The distance between each bar.
                              It can be a number between `0` and `1` (inclusive).
                              Defaults to `0.2`.
* opacity: Opacity          - The opacity of each bar.
                              It can be a number between `0` and `1` (inclusive) or a string representing a percentage (e.g. `'50%'`).
                              Defaults to `1`.
* styleUtil: StyleUtils     - An instance of `StyleUtils`, which contains styling for the visualisation. See its documentation for more information.
                              Defaults to `new StyleUtils({ colorSet: 'Set1', numColors: dataUtil.columns.length - 1})`.
* showTotals: boolean       - Whether or not to display the sum of all bars at the end as a number.
                              Defaults to `false`.
* isScrollable: boolean     - Whether the visualisation is scrollable in its parent container.
                              Defaults to `false`.
* showFilterPanel: boolean       - Whether the filter is displayed next to the visualisation.
                              Defaults to `false`.
-->
<BaseVisualisation {isScrollable} showFilterPanel={showFilterPanel ? dataUtil : null}>
  <svg
    class="visualisation stackedBarchart"
    width={isScrollable ? width : '100%'}
    height={isScrollable ? height : '100%'}>
    {#key dataUtil || $visualisationData}
      {#each dataUtil.data as row}
        <StackedBar
          {opacity}
          {showTotals}
          y={getY(row[0])}
          {row}
          attributeScales={barXScales}
          barWidth={yScale.bandwidth()} />
      {/each}
      <DynamicAxis position="left" axisOrder={dataUtil.columns.slice(0, 1)} />
    {/key}
  </svg>
</BaseVisualisation>
