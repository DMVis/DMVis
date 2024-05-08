<script lang="ts">
  // Required attributes
  export let points: { x: number; y: number }[];

  // Optional attributes
  export let color: string = '#000';
  export let lineWidth: number = 1;
  export let dashLength: string = '0';
  export let opacity: number = 1;

  // Create a path based on the given points
  $: path = `M${points.map((p) => `${p.x},${p.y}`).join('L')}`;
</script>

<!--
@component
### StaticLine
The Line allows you to plot a line between given coordinates.
It is used in combination with other components to create a chart.

#### Required attributes
* points: [{ x: number; y: number }]  - List of scaled points on the visualisation

#### Optional attributes
* color: number                       - Color of the line. This defaults to `'#000'` (i.e. blue).
                                        This can be any hex-code, RGB or plain string colour.
* lineWidth string                    - Width of the line. This defaults to `1`.
* dashLength: string                  - Width of the strokes of the line.
                                        By default, this is a normal line. If set to a higher value, it will result in a dotted line.
                                        If set to a higher value, it will result in a dotted line.
                                        This defaults to `'0'`, meaning it is a normal line.
* opacity: number                     - Opacity of the line, where `1` represents a fully opaque line and `0` is a fully transparent line.
                                        This defaults to `1`.
-->
<path
  stroke={color}
  fill="none"
  stroke-width={lineWidth}
  d={path}
  class="line"
  stroke-dasharray={dashLength}
  {opacity} />

<style>
  path {
    pointer-events: none;
  }
</style>
