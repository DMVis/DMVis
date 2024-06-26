<script lang="ts">
  // DMVis imports
  import Point from '$lib/components/base/Point.svelte';
  import DynamicAxis from '$lib/components/base/DynamicAxis.svelte';
  import { DMVisError } from '$lib/utils/DMVisError.js';
  import { DataUtils } from '$lib/utils/DataUtils.js';
  import type { ScaleLinear } from '$lib/Types.js';
  import { getVisualisationContext, setVisualisationContext } from '$lib/utils/Context.js';

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
  export let marginLeft: number = 50;
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
  const { yScales, xScales, data, styleUtil } = getVisualisationContext();
  let xScaleLocal: ScaleLinear;
  let yScaleLocal: ScaleLinear;
  let xIndex: number;
  let yIndex: number;
  $: {
    // Get the corresponding scales from the store
    xIndex = $columns.indexOf(xAxis);
    yIndex = $columns.indexOf(yAxis);
    xScaleLocal = $xScales[xIndex] as ScaleLinear;
    xScaleLocal.range([width - marginRight, marginLeft]);
    yScaleLocal = $yScales[yIndex] as ScaleLinear;
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
This is a visualisation to display a dataset of points.

#### Required Attributes
* width: number         - The width of the visualisation in pixels.
* height: number        - The height of the visualisation in pixels.

* xAxis: string         - The name of the attribute to be plotted along the x-axis.
                          Note that this should be the same name as the one that is provided in the input `dataUtil`.
* yAxis: string         - The name of the attribute to be plotted along the y-axis.
                          Note that this should be the same name as the one that is provided in the input `dataUtil`.

#### Optional Attributes
* dataUtil: DataUtils   - An instance of `dataUtils`, which holds all the data.
                          See its documentation for more information.
                          It adds the possibility to use `Scatterplot` without a predefined store.
                          By default, the scatterplot assumes a defined store.
                          Defaults to `null`.
* showAxis: bool        - Whether or not the axis should be drawn.
                          Defaults to `true`.
* numTicks: number      - The amount of ticks to display on each axis.
                          Defaults to `5`.
* pointOpacity: number  - The opacity of each point in the visualisation.
                          It can be a number between `0` and `1` (inclusive) or a string representing a percentage (e.g. `'50%'`).
                          Defaults to `1`.
* marginLeft: number    - The margin to the left of the visualisation in pixels.
                          Defaults to `50`.
* marginRight: number   - The margin to the right of the visualisation in pixels.
                          Defaults to `40`.
* marginTop: number     - The margin to the top of the visualisation in pixels.
                          Defaults to `40`.
* marginBottom: number  - The margin to the bottom of the visualisation in pixels.
                          Defaults to `40`.
-->

<g {width} {height} class="visualisation scatterplot">
  {#key data}
    <!-- Create a brush group at the bottom of this visualisation -->
    <g class="brush">
      <rect class="overlay" style="cursor: crosshair;" />
      <rect class="selection" style="fill:{$styleUtil.selectionColor}; cursor:move" />
    </g>
    <!-- If needed, draw the axis -->
    {#if showAxis}
      <DynamicAxis
        position="bottom"
        ticksNumber={numTicks}
        axisOrder={[$columns[xIndex]]}
        renderLabel={true}
        labelPosition="bottom"
        labelOffset={30} />
      <DynamicAxis
        position="left"
        ticksNumber={numTicks}
        axisOrder={[$columns[yIndex]]}
        renderLabel={true}
        labelPosition="left"
        labelOffset={40} />
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
