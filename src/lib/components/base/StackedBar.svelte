<script lang="ts">
  // Imports
  import * as d3 from 'd3';
  import { getContext } from 'svelte';

  // DMVis imports
  import Bar from '$lib/components/base/Bar.svelte';
  import { OriginX, OriginY } from '$lib/Enums.js';
  import type { VisualisationStore } from '$lib/store.js';
  import Label from '$lib/components/base/Label.svelte';

  // Required attributes
  export let width: number;

  // Optional attributes
  export let opacity: number | string = 1;
  export let showTotals: boolean = false;

  // Get store info
  const { data, columns, yScales, marginLeft, marginRight, styleUtil } =
    getContext<VisualisationStore>('store');
  const yScale = $yScales[0] as d3.ScaleBand<string>;
  // Prepare data for rendering
  const labels = $data.map((row) => row[0]);
  const numericalData: Array<Array<number>> = $data.map((row) => row.slice(1) as Array<number>);
  const numericalCols = $columns.slice(1);
  const maxValue = d3.max(numericalData.map((row) => d3.sum(row)));
  const xScale = d3
    .scaleLinear()
    .domain([0, Number(maxValue)])
    .range([0, width - $marginLeft - $marginRight]);
</script>

<!--
@component
### StackedBar
The StackedBar is used for visualising data in a
stacked bar format. It is a wrapper around the Bar
component that allows for multiple bars to be stacked
on top of each other.

#### Required attributes
* width: number           - Maximum width of the largest bar
#### Optional attributes
* opacity: number | string - Sets the opacity of the bars.
                             Either a number between 0 and 1, or a string representing a percentage between 0% and 100%.
                             Defaults to `1`.
* showTotals: boolean      - Whether or not to display the sum of all bars at the end as a number, defaults to false.
-->
<g>
  <!-- Loop over all data points -->
  {#each numericalData as row, rowIndex}
    <!-- Loop over all attributes -->
    {#each numericalCols as column, colIndex}
      <!-- Create a bar for every attribute -->
      <Bar
        x={$marginLeft + xScale(d3.sum(row.slice(0, colIndex)))}
        y={Number(yScale(String(labels[rowIndex])))}
        width={yScale.bandwidth()}
        height={xScale(Number(row[colIndex]))}
        isVertical={false}
        color={$styleUtil.colorScheme[colIndex % $styleUtil.colorScheme.length]}
        originX={OriginX.Left}
        originY={OriginY.Top}
        hoverText={`${column}: ${Number(row[colIndex])}`}
        {opacity} />
    {/each}
    {#if showTotals}
      <Label
        x={xScale(d3.sum(row)) + $marginLeft}
        y={Number((yScale(String(labels[rowIndex])) ?? 0) + yScale.bandwidth() / 2)}
        text={Math.round(d3.sum(row)).toString()}
        originX={OriginX.Left}
        originY={OriginY.Middle}
        hasBackground={false}
        fontSize={`${10}px`} />
    {/if}
  {/each}
</g>
