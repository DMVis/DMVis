<script lang="ts">
  import * as d3 from 'd3';
  import { onMount } from 'svelte';
  import type { AxisScale } from 'd3-axis';

  export let xScale: d3.ScaleLinear<number, number> | d3.ScaleBand<string>;
  export let height: number; // Height of the graph
  export let ticks: boolean = true; // Whether to display tick marks
  export let fontSize: number = 17; // Font size of the tick labels
  export let color: string = 'black'; // Color of the axis line
  export let margin: { top: number; right: number; bottom: number; left: number } = {
    top: 40,
    right: 40,
    bottom: 40,
    left: 40
  };

  let bottomAxisElement: SVGGElement;

  onMount(() => {
    let axisGenerator;

    if (ticks) {
      axisGenerator = d3.axisBottom(xScale as AxisScale<d3.AxisDomain>).tickSizeOuter(0);
    } else {
      axisGenerator = d3.axisBottom(xScale as AxisScale<d3.AxisDomain>).tickSize(0);
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

#### Required attributes
  * xScale: d3.ScaleLinear<number, number> | d3.ScaleBand<string>- A D3 scale function for the x-axis that maps a data domain to a range on the graph.
  * height: number - The height of the graph area.

#### Optional attributes
  * fontSize: number - The font size of the tick labels. Defaults to 17.
  * color: string - The color of the axis line. Defaults to 'black'.
  * ticks: boolean - Whether to display tick marks. Defaults to true.
  * margin: { top: number; right: number; bottom: number; left: number } - The margin of the graph area. Defaults to { top: 40, right: 20, bottom: 20, left: 40 }.
-->

<g bind:this={bottomAxisElement} transform="translate(0, {height - margin.bottom})"></g>

<style>
</style>
