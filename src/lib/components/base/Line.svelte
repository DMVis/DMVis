<script lang="ts">
  import * as d3 from 'd3';
  import type { GraphStore } from '$lib/store.js';
  import { getContext } from 'svelte';

  export let points: { x: number; y: number }[];
  export let color: string = '#000';
  export let width: number = 1;

  const { yScale, xScale } = getContext<GraphStore>('store');
  const xScaleLocal = $xScale as d3.ScaleLinear<number, number>;
  const yScaleLocal = $yScale as d3.ScaleLinear<number, number>;

  $: path = `M${points.map((p) => `${xScaleLocal(p.x)},${yScaleLocal(p.y)}`).join('L')}`;
</script>

<!--
@component
### Line
The Line allows you to plot a line between given coordinates.
It is used in combination with other components to create a chart.

#### Required attributes
  * points: [{ x: number; y: number }]  - List of scaled points on the graph

#### Optional attributes
  * color: number                       - Color of the line(s), defaulted to blue. Can be any hex-code, rgb or plain string colors
  * width: string                       - Width of the line(s), defaulted to 1
-->
<path stroke={color} fill="none" stroke-width={width} d={path} />
