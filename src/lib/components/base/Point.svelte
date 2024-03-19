<script lang="ts">
  import * as d3 from 'd3';
  import { getContext } from 'svelte';
  import type { GraphStore } from '$lib/store.js';

  export let x: number;
  export let y: number;
  export let radius: number = 5;
  export let color: string = '#CCCCFF';
  export let borderColor: string = '#000';
  export let borderWidth: number = 1;
  export let opacity: number = 1;

  const { xScale, yScale } = getContext<GraphStore>('store');
  const xScaleLocal = $xScale as d3.ScaleLinear<number, number>;
  const yScaleLocal = $yScale as d3.ScaleLinear<number, number>;
</script>

<!--
@component
### Point
The point allows you to plot a point at a given coordinate.
It is used in combination with other components to create a chart.

#### Required attributes
  * x: number             - Non-scaled x-coordinate of the point
  * y: number             - Non-scaled y-coordinate of the point

#### Optional attributes
  * radius: number        - Radius of the point, defaulted to 5
  * color: string         - Color of the center of the point, defaulted to blue. Can be any hex-code, rgb or plain string colors
  * opacity: string       - Opacity of the circle
  * borderColor: string   - Color of the border of the point, defaulted to Black. Can be any hex-code, rgb or plain string colors
  * borderWidth: number   - Width of the border, defaulted to 1
  * opacity: number       - Opacity of the point where 0 is completely transparent and 1 is completely opaque, defaulted to 1
-->
<circle
  cx={xScaleLocal(x)}
  cy={yScaleLocal(y)}
  r={radius}
  stroke={borderColor}
  fill={color}
  stroke-width={borderWidth}
  {opacity} />
