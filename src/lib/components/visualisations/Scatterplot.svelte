<script lang="ts">
  // Imports
  import * as d3 from 'd3';

  // DMVis imports
  import Point from '$lib/components/base/Point.svelte';
  import { ThrowError } from '$lib/utils/ThrowError.js';
  import DynamicAxis from '$lib/components/base/DynamicAxis.svelte';
  import { getVisualisationContext } from '$lib/context.js';

  // Required attributes
  export let width: number;
  export let height: number;
  export let xAxis: string;
  export let yAxis: string;

  // Optional attributes
  export let showAxis: boolean = true;
  export let numTicks: number = 5;
  export let pointOpacity: number = 1;

  //Get columns from the store
  const { columns } = getVisualisationContext();
  /*
    The attributes xAxis and yAxis specify which columns from the data to plot in this scatterplot.
    Therefore it is essential to immediately check if these
   */
  if (!$columns.includes(xAxis)) {
    throw ThrowError('Error', 'xAxis attribute is not recognised', 'Scatterplot');
  }
  if (!$columns.includes(yAxis)) {
    throw ThrowError('Error', 'yAxis attribute is not recognised', 'Scatterplot');
  }

  // Get the rest of the data from the store
  const { yScales, xScales, data } = getVisualisationContext();
  let xScaleLocal: d3.ScaleLinear<number, number>;
  let yScaleLocal: d3.ScaleLinear<number, number>;
  let xIndex: number;
  let yIndex: number;
  $: {
    // Get the corresponding scales from the store
    xIndex = $columns.indexOf(xAxis);
    yIndex = $columns.indexOf(yAxis);
    xScaleLocal = $xScales[xIndex] as d3.ScaleLinear<number, number>;
    xScaleLocal.range([width, 0]);
    yScaleLocal = $yScales[yIndex] as d3.ScaleLinear<number, number>;
    yScaleLocal.range([0, height]);
  }

  // Returns the value of the given attribute from a specific row
  // Done this way, because using `as` is not allowed when creating the component
  function getValue(row: (string | number)[], index: number): number {
    return row[index] as number;
  }
  // Returns the name of the given row
  // Done this way, because using `as` is not allowed when creating the component
  function getName(row: (string | number)[]): string {
    return row[0] as string;
  }
</script>

<!--
@component
### Scatterplot
This is a visualisation to display a dataset of points

#### Required attributes
* width: number         - Width of the visualisation.
* height: number        - Height of the visualisation.

* xAxis: string         - The name of the attribute that needs to be plotted on the x-axis.
                            This should be the same one that is provided in the data columns
* yAxis: string         - The name of the attribute that needs to be plotted on the y-axis.
                            This should be the same one that is provided in the data columns

#### Optional attributes
* showAxis: bool        - Whether or not the axis should be drawn. This defaults to `true`.
* numTicks: number      - Amount of ticks to be displayed on the axis. This defaults to `5`.
* pointOpacity: number  - Opacity of the points of the scatterplot. This defaults to `1`.
-->

<g {width} {height} class="visualisation scatterplot">
  {#key data}
    <!-- Create a brush group at the bottom of this visualisation -->
    <g class="brush" />
    <!-- If needed, draw the axis -->
    {#if showAxis}
      <DynamicAxis position="bottom" ticksNumber={numTicks} axisOrder={[$columns[xIndex]]} />
      <DynamicAxis position="left" ticksNumber={numTicks} axisOrder={[$columns[yIndex]]} />
    {/if}
    <!-- Loop over all the points and draw them -->
    {#each $data as point}
      <Point
        on:mousePointLeave
        on:mousePointEnter
        on:mousePointClick
        x={xScaleLocal(getValue(point, xIndex))}
        y={yScaleLocal(getValue(point, yIndex))}
        opacity={pointOpacity}
        name={getName(point)} />
    {/each}
  {/key}
</g>
