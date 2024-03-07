<script lang="ts">
  import * as d3 from 'd3';
  import { onMount } from 'svelte';
  import type { AxisScale } from 'd3-axis';
  import { getContext } from 'svelte';
  import type { GraphStore } from '$lib/store.js';

  const { yScale, marginLeft } = getContext<GraphStore>('store');

  export let ticks: boolean = true; // Whether to display tick marks
  export let fontSize: number = 17;
  export let color: string = '#000000';
  export let offsetX: number = 0;
  export let ticksNumber: number = 10;
  let yAxisElement: SVGGElement;

  onMount(() => {
    let axisGenerator;

    if (ticks) {
      axisGenerator = d3
        .axisLeft($yScale as AxisScale<d3.AxisDomain>)
        .tickSizeOuter(0)
        .ticks(ticksNumber);
    } else {
      axisGenerator = d3.axisLeft($yScale as AxisScale<d3.AxisDomain>).tickSize(0);
    }

    d3.select(yAxisElement)
      .call(axisGenerator)
      .selectAll('text')
      .style('font-size', `${fontSize}px`)
      .style('color', color);
  });
</script>

<!--
@component
### LeftAxis
The LeftAxis component is responsible for rendering the vertical axis with the labes on the left side.
It displays tick marks and labels based on provided data.

#### Optional attributes
  * ticks: boolean                 - Whether to display tick marks. Defaults to true.
  * fontSize: number               - The font size of the tick labels. Defaults to 17.
  * color: string                  - The color of the axis line. Defaults to 'black'.
  * xOffset: number                - The offset of the axis from the left side of the graph. Defaults to 0.
-->

<g bind:this={yAxisElement} transform="translate({$marginLeft + offsetX}, 0)"></g>

<style>
</style>
