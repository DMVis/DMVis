<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let x: number;
  export let y: number;
  export let radius: number = 5;
  export let color: string = '#CCCCFF';
  export let borderColor: string = '#000';
  export let borderWidth: number = 1;
  export let opacity: number = 1;
  export let name: string = `(${x},${y})`;

  const dispatch = createEventDispatcher();

  function onMouseEnter() {
    dispatch('mousePointEntered', { name: name, x: x, y: y });
  }
  function onMouseLeave() {
    dispatch('mousePointLeft', { name: name, x: x, y: y });
  }
  function onMouseDown() {
    dispatch('pointClicked', { name: name });
  }
</script>

<!--
@component
### Point
The point allows you to plot a point at a given coordinate.
It is used in combination with other components to create a chart.

#### Required attributes
  * x: number             - Scaled x-coordinate of the point
  * y: number             - Scaled y-coordinate of the point

#### Optional attributes
  * radius: number        - Radius of the point, defaulted to 5
  * color: string         - Color of the center of the point, defaulted to blue. Can be any hex-code, rgb or plain string colors
  * opacity: string       - Opacity of the circle
  * borderColor: string   - Color of the border of the point, defaulted to Black. Can be any hex-code, rgb or plain string colors
  * borderWidth: number   - Width of the border, defaulted to 1
  * opacity: number       - Opacity of the point where 0 is completely transparent and 1 is completely opaque, defaulted to 1
  * name: string          - Name of the point, is used as identifier. Defaults to (x-coordinate,y-coordinate)
-->

<circle
  cx={x}
  cy={y}
  r={radius}
  stroke={borderColor}
  fill={color}
  stroke-width={borderWidth}
  {opacity}
  class={'point ' + name}
  on:mouseenter={onMouseEnter}
  on:focus={onMouseEnter}
  on:mouseleave={onMouseLeave}
  on:blur={onMouseLeave}
  on:mousedown={onMouseDown}
  role="button"
  tabindex="0" />

<style>
  .highlighted {
    opacity: 1;
    stroke-width: 2;
  }
  .greyed {
    fill: grey;
  }
</style>
