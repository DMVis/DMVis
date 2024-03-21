<script lang="ts">
  import * as d3 from 'd3';

  import { getContext } from 'svelte';
  import { VisualisationStore } from '$lib/store.js';

  import Point from '$lib/components/base/Point.svelte';
  import Axis from '$lib/components/base/Axis.svelte';

  //Mandatory exports
  export let width: number;
  export let height: number;

  //Semi-mandatory exports
  export let xAxis: string = 'x';
  export let yAxis: string = 'y';

  //Optional exports
  export let showAxis: boolean = true;
  export let numTicks: number = 5;

  export let pointColor: string = '#CCCCFF';
  export let pointOpacity: number = 1;

  //Fill visualisationstore
  const { yScales, xScales, data, columns } = getContext<VisualisationStore>('store');

  let xScaleLocal: d3.ScaleLinear<number, number>;
  let yScaleLocal: d3.ScaleLinear<number, number>;
  let xIndex: number;
  let yIndex: number;
  $: {
    if (!$columns.includes(xAxis)) {
      throw new Error('xAxis is not recognised, you may need to set the xAxis parameter');
    }
    if (!$columns.includes(yAxis)) {
      throw new Error('yAxis is not recognised, you may need to set the yAxis parameter');
    }
    xIndex = $columns.indexOf(xAxis);
    yIndex = $columns.indexOf(yAxis);
    xScaleLocal = $xScales[xIndex] as d3.ScaleLinear<number, number>;
    xScaleLocal.range([0, width]);
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

#### Semi-Required attributes
These attributes are required when using the Map datatype
  * xAxis: string - The name of the attribute that needs to be plotted on the x-axis. This should be the same one that is provided in the data
  * yAxis: string - The name of the attribute that needs to be plotted on the y-axis. This should be the same one that is provided in the data

#### Optional attributes
  * showAxis: bool - Whether or not the axis should be drawn
  * numTicks: number - Amount of ticks to be displayed on the axis

  * pointColor: string - Color of the points of the scatterplot, defaults to '#CCCCFF'
  * pointOpacity: number - Opacity of the points of the scatterplot, defaults to 1

-->
<svg {width} {height} class="visualisation">
  {#key data}
    {#if showAxis}
      <Axis position="bottom" ticksNumber={numTicks} />
      <Axis position="left" ticksNumber={numTicks} />
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
</svg>
