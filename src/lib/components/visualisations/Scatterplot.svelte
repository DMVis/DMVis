<script lang="ts">
  // Imports
  import { type ScaleLinear } from 'd3';

  // DMVis imports
  import Point from '$lib/components/base/Point.svelte';
  import { DMVisError } from '$lib/utils/DMVisError.js';
  import DynamicAxis from '$lib/components/base/DynamicAxis.svelte';
  import { getVisualisationContext, setVisualisationContext } from '$lib/Context.js';
  import type { DataUtils } from '$lib/Index.js';

  // Required attributes
  export let width: number;
  export let height: number;
  export let xAxis: string;
  export let yAxis: string;

  // Optional attributes
  export let dataUtil: DataUtils | null = null;
  export let showAxis: boolean = true;
  export let numTicks: number = 5;
  export let pointOpacity: number = 1;
  export let marginLeft: number = 40;
  export let marginRight: number = 40;
  export let marginTop: number = 40;
  export let marginBottom: number = 40;

  if (dataUtil !== null) {
    setVisualisationContext({
      data: dataUtil.data,
      columns: dataUtil.columns,
      width,
      height,
      marginBottom,
      marginLeft,
      marginRight,
      marginTop
    });
  }

  // Check if store is defined, if not throw an error
  // Note that if the dataUtil is used, the store is defined by now
  try {
    getVisualisationContext();
  } catch (error) {
    throw DMVisError(
      'Visualisation Context is not defined, please ensure that either the context is defined or the dataUtil is passed as an attribute',
      'scatterplot'
    );
  }

  //Get columns from the store
  const { columns } = getVisualisationContext();
  /*
    The attributes xAxis and yAxis specify which columns from the data to plot in this scatterplot.
    Therefore, it is essential to immediately check if these are included in the columns.
   */
  if (!$columns.includes(xAxis)) {
    throw DMVisError(
      `Cannot assign '${xAxis}' to the xAxis attribute. Please ensure that the value assigned to the xAxis parameter is a column name in your DataUtils instance.`,
      'Scatterplot'
    );
  }
  if (!$columns.includes(yAxis)) {
    throw DMVisError(
      `Cannot assign '${yAxis}' to the yAxis attribute. Please ensure that the value assigned to the yAxis parameter is a column name in your DataUtils instance.`,
      'Scatterplot'
    );
  }

  // Get the rest of the data from the store
  const { yScales, xScales, data } = getVisualisationContext();
  let xScaleLocal: ScaleLinear<number, number>;
  let yScaleLocal: ScaleLinear<number, number>;
  let xIndex: number;
  let yIndex: number;
  $: {
    // Get the corresponding scales from the store
    xIndex = $columns.indexOf(xAxis);
    yIndex = $columns.indexOf(yAxis);
    xScaleLocal = $xScales[xIndex] as ScaleLinear<number, number>;
    xScaleLocal.range([width - marginRight, marginLeft]);
    yScaleLocal = $yScales[yIndex] as ScaleLinear<number, number>;
    yScaleLocal.range([marginTop, height - marginBottom]);
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
* dataUtil: DataUtils   - Adds the possibility to use scatterplot without a predefined store.
                            By default the scatterplot assumes a defined store. Therefore the dataUtil is `null`
* showAxis: bool        - Whether or not the axis should be drawn. This defaults to `true`.
* numTicks: number      - Amount of ticks to be displayed on the axis. This defaults to `5`.
* pointOpacity: number  - Opacity of the points of the scatterplot. This defaults to `1`.
* marginLeft: number     - Margin to the left of the visualisation. This defaults to `40`.
* marginRight: number    - Margin to the right of the visualisation. This defaults to `40`.
* marginTop: number      - Margin to the top of the visualisation. This defaults to `40`.
* marginBottom: number   - Margin to the bottom of the visualisation. This defaults to `40`.
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
