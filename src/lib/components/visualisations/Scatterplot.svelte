<script lang="ts">
  import * as d3 from 'd3';
  import { getContext } from 'svelte';
  import { VisualisationStore } from '$lib/store.js';

  import Point from '$lib/components/base/Point.svelte';
  import DynamicAxis from '../base/DynamicAxis.svelte';

  //Mandatory exports
  export let width: number;
  export let height: number;

  export let xAxis: string;
  export let yAxis: string;

  //Optional exports
  export let showAxis: boolean = true;
  export let numTicks: number = 5;

  export let pointColor: string = '#CCCCFF';
  export let pointOpacity: number = 1;

  //Get from visualisationstore
  const { columns } = getContext<VisualisationStore>('store');
  if (!$columns.includes(xAxis)) {
    throw new Error('xAxis is not recognised, you may need to set the xAxis parameter');
  }
  if (!$columns.includes(yAxis)) {
    throw new Error('yAxis is not recognised, you may need to set the yAxis parameter');
  }
  const { yScales, xScales, data } = getContext<VisualisationStore>('store');
  let xScaleLocal: d3.ScaleLinear<number, number>;
  let yScaleLocal: d3.ScaleLinear<number, number>;
  let xIndex: number;
  let yIndex: number;
  $: {
    xIndex = $columns.indexOf(xAxis);
    yIndex = $columns.indexOf(yAxis);
    xScaleLocal = $xScales[xIndex] as d3.ScaleLinear<number, number>;
    xScaleLocal.range([width, 0]);
    yScaleLocal = $yScales[yIndex] as d3.ScaleLinear<number, number>;
    yScaleLocal.range([0, height]);
  }

  function getValue(data: (string | number)[], index: number): number {
    return data[index] as number;
  }
  function getName(data: (string | number)[]): string {
    return data[0] as string;
  }
</script>

<!--
@component
### Scatterplot
This is a visualisation to display a dataset of points

#### Required attributes
  * width: number                                                     - Width of the visualisation
  * height: number                                                    - Height of the visualisation

  * xAxis: string - The name of the attribute that needs to be plotted on the x-axis. This should be the same one that is provided in the data
  * yAxis: string - The name of the attribute that needs to be plotted on the y-axis. This should be the same one that is provided in the data

#### Optional attributes
  * showAxis: bool - Whether or not the axis should be drawn
  * numTicks: number - Amount of ticks to be displayed on the axis

  * pointColor: string - Color of the points of the scatterplot, defaults to '#CCCCFF'
  * pointOpacity: number - Opacity of the points of the scatterplot, defaults to 1

-->
<g {width} {height} class="visualisation scatterplot">
  {#key data}
    <g class="brush" />
    {#if showAxis}
      <DynamicAxis
        position="bottom"
        ticksNumber={numTicks}
        startColumn={xIndex}
        endColumn={xIndex + 1} />
      <DynamicAxis
        position="left"
        ticksNumber={numTicks}
        startColumn={yIndex}
        endColumn={yIndex + 1} />
    {/if}
    {#each $data as p}
      <Point
        x={xScaleLocal(getValue(p, xIndex))}
        y={yScaleLocal(getValue(p, yIndex))}
        opacity={pointOpacity}
        color={pointColor}
        name={getName(p)} />
    {/each}
  {/key}
</g>
