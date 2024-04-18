<script lang="ts">
  // Imports
  import { createEventDispatcher, getContext } from 'svelte';

  // DMVis imports
  import type { VisualisationStore } from '$lib/store.js';

  // Required attributes
  export let x: number;
  export let y: number;

  // Optional attributes
  export let radius: number = 5;
  export let borderWidth: number = 1;
  export let opacity: number = 1;
  export let name: string = `(${x},${y})`;

  // Get styles from the store
  const { styleUtil } = getContext<VisualisationStore>('store');

  const dispatch = createEventDispatcher();

  // Function that fires when the mouse enters this point
  function onMouseEnter() {
    // Create a dispatch to be catched by parent components
    dispatch('mousePointEntered', { name: name, x: x, y: y });
  }
  // Function that fires when the mouse leaves this point
  function onMouseLeave() {
    // Create a dispatch to be catched by parent components
    dispatch('mousePointLeft', { name: name, x: x, y: y });
  }
  // Function that fires when this point is clicked
  function onMouseDown() {
    // Create a dispatch to be catched by parent components
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
  * borderWidth: number   - Width of the border, defaulted to 1
  * opacity: number       - Opacity of the point where 0 is completely transparent and 1 is completely opaque, defaulted to 1
  * name: string          - Class name of the point, is used as identifier. Defaults to (x-coordinate,y-coordinate)
-->

<circle
  cx={x}
  cy={y}
  r={radius}
  stroke={$styleUtil.colorBorder}
  fill={$styleUtil.color}
  stroke-width={borderWidth}
  {opacity}
  class={`point ${name}`}
  on:mouseenter={onMouseEnter}
  on:focus={onMouseEnter}
  on:mouseleave={onMouseLeave}
  on:blur={onMouseLeave}
  on:mousedown={onMouseDown}
  role="button"
  tabindex="0" />

<style>
  /* Styling for the point, these classes will be set by parent components */
  .highlighted {
    opacity: 1;
    stroke-width: 2;
    fill: #f42b03;
  }
  .greyed {
    fill: grey;
  }
</style>
