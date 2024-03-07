<script lang="ts">
  import * as d3 from 'd3';
  import { getContext, onMount } from 'svelte';
  import type { AxisScale } from 'd3-axis';
  import type { GraphStore } from '$lib/store.js';

  const { xScale, marginBottom, height } = getContext<GraphStore>('store');

  export let ticks: boolean = true; // Whether to display tick marks
  export let fontSize: number = 17; // Font size of the tick labels
  export let color: string = 'black'; // Color of the axis line
  export let ticksNumber: number = 10;
  let bottomAxisElement: SVGGElement;

  onMount(() => {
    let axisGenerator;

    if (ticks) {
      axisGenerator = d3
        .axisBottom($xScale as AxisScale<d3.AxisDomain>)
        .tickSizeOuter(0)
        .ticks(ticksNumber);
    } else {
      axisGenerator = d3.axisBottom($xScale as AxisScale<d3.AxisDomain>).tickSize(0);
    }

    d3.select(bottomAxisElement)
      .call(axisGenerator)
      .selectAll('text')
      .style('font-size', `${fontSize}px`)
      .style('color', color);
  });
</script>

<!--
@component
### BottomAxis
The BottomAxis component renders the horizontal axis of a chart with the tick on the bottom.
It displays tick marks and labels based on provided data.

#### Optional attributes
  * fontSize: number - The font size of the tick labels. Defaults to 17.
  * color: string - The color of the axis line. Defaults to 'black'.
  * ticks: boolean - Whether to display tick marks. Defaults to true.
  * ticksNumber: number            - The number of ticks you want displayed on the axes, defaults to 10
-->

<g bind:this={bottomAxisElement} transform="translate(0, {$height - $marginBottom})"></g>

<style>
</style>
