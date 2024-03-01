<script lang="ts">
  import * as d3 from 'd3';
  import { onMount } from 'svelte';
  import type { AxisScale } from 'd3-axis';

  export let yScale: d3.ScaleLinear<number, number> | d3.ScaleBand<string>;
  export let ticks: boolean = true; // Whether to display tick marks
  export let fontSize: number = 17;
  export let color: string = '#000000';
  export let offsetX: number = 0;
  export let margin: { top: number; right: number; bottom: number; left: number } = {
    top: 40,
    right: 40,
    bottom: 40,
    left: 40
  };

  let yAxisElement: SVGGElement;

  onMount(() => {
    let axisGenerator;

    if (ticks) {
      axisGenerator = d3.axisLeft(yScale as AxisScale<d3.AxisDomain>).tickSizeOuter(0);
    } else {
      axisGenerator = d3.axisLeft(yScale as AxisScale<d3.AxisDomain>).tickSize(0);
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

#### Required attributes
  * yScale: d3.ScaleLinear<number, number> - A D3 scale function for the y-axis that maps a data domain to a range on the graph.

#### Optional attributes
  * ticks: boolean                 - Whether to display tick marks. Defaults to true.
  * fontSize: number               - The font size of the tick labels. Defaults to 17.
  * color: string                  - The color of the axis line. Defaults to 'black'.
  * xOffset: number                - The offset of the axis from the left side of the graph. Defaults to 0.
  * margin: { top: number; right: number; bottom: number; left: number } - The margin of the graph area. Defaults to { top: 40, right: 20, bottom: 20, left: 40 }.
-->

<g bind:this={yAxisElement} transform="translate({margin.left + offsetX}, 0)"></g>

<style>
</style>
