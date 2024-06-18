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
The static line component is meant to be used in charts like a line chart.
It produces a line between the points with a certain colour, size and style.

#### Required Attributes
* points: [{ x: number; y: number }]  - A list of scaled points on the visualisation.

#### Optional Attributes
* color: number                       - The colour of the line.
                                        Valid inputs include CSS colours specified as a string.
                                        Defaults to `'#000'` (i.e. blue).
* lineWidth string                    - The width of the line.
                                        Defaults to `1`.
* dashLength: string                  - The length of the strokes of the line.
                                        If set to a higher value, it will result in a dotted line.
                                        Defaults to `'0'` (i.e. a normal line).
* opacity: number                     - The opacity of the line.
                                        It can be a number between `0` and `1` (inclusive) or a string representing a percentage (e.g. `'50%'`).
                                        Defaults to `1`.
-->

<!-- The static line -->
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
