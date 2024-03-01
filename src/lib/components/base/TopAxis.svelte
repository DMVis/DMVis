<script lang="ts">
  import * as d3 from 'd3';
  import { onMount } from 'svelte';
  import type { AxisScale } from 'd3-axis';

  export let xScale: d3.ScaleLinear<number, number> | d3.ScaleBand<string>;
  export let ticks: boolean = true; // Whether to display tick marks
  export let fontSize: number = 17; // Font size of the tick labels
  export let color: string = 'black'; // Color of the axis line
  export let margin: { top: number; right: number; bottom: number; left: number } = {
    top: 40,
    right: 20,
    bottom: 20,
    left: 40
  };

  let topAxisElement: SVGGElement;

  onMount(() => {
    let axisGenerator;

    if (ticks) {
      axisGenerator = d3.axisTop(xScale as AxisScale<d3.AxisDomain>).tickSizeOuter(0);
    } else {
      axisGenerator = d3.axisTop(xScale as AxisScale<d3.AxisDomain>).tickSize(0);
    }

    d3.select(topAxisElement)
      .call(axisGenerator)
      .selectAll('text')
      .style('font-size', `${fontSize}px`)
      .style('color', color);
  });
</script>

<!--
@component
### TopAxis
The TopAxis component renders the horizontal axis of a chart with ticks on tip.
It displays tick marks and labels based on provided data.

#### Required attributes
  * xScale: d3.ScaleLinear<number, number> - A D3 scale function for the x-axis that maps a data domain to a range on the graph.

#### Optional attributes
  * fontSize: number - The font size of the tick labels. Defaults to 17.
  * color: string - The color of the axis line. Defaults to 'black'.
  * ticks: boolean - Whether to display tick marks. Defaults to true.
  * margin: { top: number; right: number; bottom: number; left: number } - The margin of the graph area. Defaults to { top: 40, right: 20, bottom: 20, left: 40 }.
-->

<g bind:this={topAxisElement} transform="translate(0, {margin.top})"></g>

<style>
</style>
