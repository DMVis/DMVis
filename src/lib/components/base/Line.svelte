<script lang="ts">
  // imports
  import type { ScaleLinear } from 'd3';

  // exports
  export let points: [{ x: number; y: number }];
  export let xScale: ScaleLinear<number, number>;
  export let yScale: ScaleLinear<number, number>;

  // Optional exports
  export let color: string = '#000';
  export let width: number = 1;

  // logic
  $: path = `M${points.map((p) => `${xScale(p.x)},${yScale(p.y)}`).join('L')}`;
</script>

<path stroke={color} stroke-width={width} class="path" d={path} />

<style>
  /* Insert component styling  */
</style>
