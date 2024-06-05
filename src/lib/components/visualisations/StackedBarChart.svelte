<script lang="ts">
  // Imports
  import { max, sum, scaleLinear, type ScaleBand } from 'd3';

  // Type imports
  import type { Opacity } from '$lib/Types.js';

  // DMVis imports
  import StackedBar from '$lib/components/base/StackedBar.svelte';
  import DynamicAxis from '$lib/components/base/DynamicAxis.svelte';
  import { StyleUtils } from '$lib/utils/StyleUtils.js';
  import BaseVisualisation from '$lib/components/base/BaseVisualisation.svelte';
  import type { DataUtils } from '$lib/utils/DataUtils.js';
  import {
    setVisualisationContext,
    updateVisualisationContext,
    getVisualisationContext
  } from '$lib/Context.js';

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

  const { visualisationData } = dataUtil;

  // Set store values
  setVisualisationContext({
    width,
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
### Stacked Bar Chart
This is a visualisation that represents categorical data with rectangular bars.
The length of each bar corresponds to the numerical value of the data being represented.
The x-axis represents the numerical values of the data.
The y-axis represents the categories of the data.

#### Required attributes
* dataUtil: Array<Array<string | number>>  - Data to visualise.

#### Optional attributes
* width: number             - Width of the visualisation. This defaults to `numberOfRows * 15`.
* height: number            - Height of the visualisation. This defaults to `1500`.
* marginLeft: number        - Margin to the left of the visualisation. This defaults to `40`.
* marginRight: number       - Margin to the right of the visualisation. This defaults to `40`.
* marginTop: number         - Margin to the top of the visualisation. This defaults to `40`.
* marginBottom: number      - Margin to the bottom of the visualisation. This defaults to `40`.
* padding: number           - Value for the distance between each bar in the range [0..1].
                              Defaults to `0.2`.
* opacity: number | string  - Opacity of each bar as a number in the range [0..1] or
                              a percentage string formatted as '{number}%'. This defaults to `1`.
* styleUtil: StyleUtils     - Class holding all the styling. See its documentation.
                              Defaults to `new StyleUtils({ colorSet: 'Set1', numColors: dataUtil.columns.length - 1})`.
* showTotals: boolean       - Whether or not to display the sum of all bars at the end as a number, defaults to false.
-->
<BaseVisualisation>
  <svg class="visualisation stackedBarchart" {width} {height}>
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
