<script lang="ts">
  // Imports
  import * as d3 from 'd3';

  // DMVis imports
  import Bar from '$lib/components/base/Bar.svelte';
  import Label from '$lib/components/base/Label.svelte';

  // DMVis util import
  import { OriginX, OriginY } from '$lib/Enums.js';
  import { getVisualisationContext } from '$lib/context.js';

  // Required attributes
  export let y: number;
  export let barWidth: number;
  export let row: (string | number)[];
  export let xScale: d3.ScaleLinear<number, number>;

  // Optional attributes
  export let opacity: number | string = 1;
  export let showTotals: boolean = false;

  // Get store info
  const { columns, marginLeft, styleUtil } = getVisualisationContext();
  // Prepare data for rendering
  const numericalCols = $columns.slice(1);
  const rowData = row.slice(1) as number[];

  // Create the xPositions for each bar in the stacked bar
  let currentX = 0;
  const xPositions: number[] = [];
  xPositions.push(currentX);
  for (let i = 0; i < numericalCols.length; i++) {
    currentX += xScale(rowData[i]);
    xPositions.push(currentX);
  }
</script>

<!--
@component
### StackedBar
The StackedBar is used for visualising data in a
stacked bar format. It is a wrapper around the Bar
component that allows for multiple bars to be stacked
on top of each other.

#### Required attributes
* barWidth: number           - The width of the bar.
* y: number                  - The y position to place the stacked bar.
* row: (string|number)[]     - A single row of the dataUtil, which to plot as a stacked bar.
* xScale: d3.scaleLinear<number,number> - Scale for all of the bars.
                                            This holds a domain depending on the maximum value, and the range.
                                            Note that this scale needs to be uniform for all stacked bars
#### Optional attributes
* opacity: number | string - Sets the opacity of the bars.
                             Either a number between 0 and 1, or a string representing a percentage between 0% and 100%.
                             Defaults to `1`.
* showTotals: boolean      - Whether or not to display the sum of all bars at the end as a number, defaults to false.
-->
<g>
  <!-- Loop over all attributes -->
  {#each xPositions as x, i}
    <!-- Create a bar for every attribute -->
    <Bar
      x={$marginLeft + x}
      {y}
      width={barWidth}
      height={xScale(Number(rowData[i]))}
      isVertical={false}
      color={$styleUtil.colorScheme[i % $styleUtil.colorScheme.length]}
      originX={OriginX.Left}
      originY={OriginY.Top}
      hoverText={`${numericalCols[i]}: ${Number(rowData[i])}`}
      {opacity} />
  {/each}
  {#if showTotals}
    <Label
      x={xScale(d3.sum(rowData)) + $marginLeft}
      y={y + barWidth / 2}
      text={Math.round(d3.sum(rowData)).toString()}
      originX={OriginX.Left}
      originY={OriginY.Middle}
      hasBackground={false}
      fontSize={`${10}px`} />
  {/if}
</g>
