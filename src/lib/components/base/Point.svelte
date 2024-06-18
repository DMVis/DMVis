<script lang="ts">
  // Imports
  import { createEventDispatcher } from 'svelte';

  // DMVis imports
  import type { Writable } from 'svelte/store';
  import type { StyleUtils } from '$lib/utils/StyleUtils.js';
  import { formatClassName } from '$lib/utils/ClassNameFormat.js';
  import { getVisualisationContext } from '$lib/utils/Context.js';
  import type { UndefineableString } from '$lib/Types.js';

  // Required attributes
  export let x: number;
  export let y: number;

  // Optional attributes
  export let radius: number = 5;
  export let color: string = 'red';
  export let borderWidth: number = 1;
  export let borderColor: string = 'black';
  export let opacity: number = 1;
  export let name: UndefineableString = undefined;

  // Get styles from the store
  let styleUtil: Writable<StyleUtils> | undefined;
  try {
    const { styleUtil: styleUtilStore } = getVisualisationContext();
    styleUtil = styleUtilStore;
  } catch (error) {
    styleUtil = undefined;
  }

  const dispatch = createEventDispatcher();

  // Function that fires when the mouse enters this point
  function onMouseEnter() {
    // Create a dispatch to be catched by parent components
    dispatch('mousePointEnter', { name: name, x: x, y: y });
  }
  // Function that fires when the mouse leaves this point
  function onMouseLeave() {
    // Create a dispatch to be catched by parent components
    dispatch('mousePointLeave', { name: name, x: x, y: y });
  }
  // Function that fires when this point is clicked
  function onMouseDown() {
    // Create a dispatch to be catched by parent components
    dispatch('mousePointClick', { name: name });
  }
</script>

<!--
@component
### Point
The point component is meant to be used in visualisations like scatterplots.
It produces a point at a given coordinate of certain color, size and style.

#### Required Attributes
* x: number                - The scaled x-coordinate of the point.
* y: number                - The scaled y-coordinate of the point.

#### Optional Attributes
* radius: number           - The radius of the point in pixels.
                             Defaults to `5`.
* borderWidth: number      - The width of the border in pixels.
                             Defaults to `1`.
* borderColor: string      - The colour of the border in pixels.
                             Note that it can be removed entirely by setting the value to `0`.
                             Defaults to `styleUtil.colorBorder`, unless you do not use a `StyleUtil` instance.
                             Defaults to `borderColor`'s value otherwise, which is `'black'`.
* color: string            - The colour of the point.
                             Defaults to `styleUtil.color`, unless you do not use a `StyleUtil` instance.
                             Defaults to `color`'s value otherwise, which is `'red'`.
* opacity: number          - The opacity of the point.
                             It can be a number between `0` and `1` (inclusive) or a string representing a percentage (e.g. `'50%'`).
                             Defaults to `1`.
* name: UndefineableString - The class name of the point.
                             It can be used as an identifier.
                             If set, the class names will be set to both `'point'` and `'point-name'`.
                             Defaults to `'point'`.

#### Events
* Please check the documentation for detailed information about dispatches.
-->

<!-- The point -->
<circle
  style="--highlight-color: {$styleUtil ? $styleUtil.focusColor : color}"
  cx={x}
  cy={y}
  r={radius}
  stroke={$styleUtil ? $styleUtil.colorBorder : borderColor}
  fill={$styleUtil ? $styleUtil.color : color}
  stroke-width={borderWidth}
  {opacity}
  class={`point` + `${name === undefined ? '' : ' point-' + formatClassName(name)}`}
  on:mouseenter={onMouseEnter}
  on:focus={onMouseEnter}
  on:mouseleave={onMouseLeave}
  on:blur={onMouseLeave}
  on:mousedown={onMouseDown}
  role="button"
  tabindex="-1" />

<style>
  /* Styling for the point, these classes will be set by parent components */
  .highlighted {
    opacity: 1;
    stroke-width: 2;
    fill: var(--highlight-color);
  }
  .greyed {
    fill: grey;
  }
</style>
