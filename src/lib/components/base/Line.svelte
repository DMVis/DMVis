<script lang="ts">
  export let points: { x: number; y: number }[];
  export let color: string = '#000';
  export let width: number = 1;

  $: path = `M${points.map((p) => `${p.x},${p.y}`).join('L')}`;
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
