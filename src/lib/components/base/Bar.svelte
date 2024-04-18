<script lang="ts">
  // Imports
  import * as d3 from 'd3';
  import { onMount, createEventDispatcher } from 'svelte';

  // DMVis imports
  import Label from '$lib/components/base/Label.svelte';
  import { OriginX, OriginY } from '$lib/Enums.js';
  import { getOrigin, getFlippedOrigin } from '$lib/utils/OriginMapper.js';

  // Required attributes
  export let x: number;
  export let y: number;
  export let width: number;
  export let height: number;
  export let isHeightAlongYAxis: boolean;

  // Optional attributes
  export let color: string = 'red';
  export let opacity: number | string = 1;
  export let originX: OriginX = OriginX.Middle;
  export let originY: OriginY = OriginY.Bottom;
  export let rotationDegrees: number = 0;
  export let radiusX: number | string = 0;
  export let radiusY: number | string = 0;
  export let showsNegativeHeight: boolean = false;
  export let hoverText: string = '';
  export let name: string = `(${x},${y})`;

  // Private attributes
  let rectBlock: SVGRectElement;
  let isMouseOnBar: boolean = false;

  const dispatchEvent = createEventDispatcher();

  if (!isHeightAlongYAxis) {
    // Swap width and height if the bar is horizontal
    const temp: number = width;
    width = height;
    height = temp;
  }

  onMount(() => {
    // Update the rectangle
    d3.select(rectBlock)
      .attr(
        'x',
        x +
          getOrigin(
            Math.abs(width),
            OriginX.Left,
            // Negative values get flipped
            width < 0 ? getFlippedOrigin(originX) : originX
          )
      )
      .attr(
        'y',
        y +
          getOrigin(
            Math.abs(height),
            OriginY.Top,
            // Negative values get flipped
            // `showsNegativeValue` determines whether this is visible for height < 0
            height < 0 ? getFlippedOrigin(originY) : originY
          )
      );
  });

  // Function that fires when the mouse enters this bar
  function onMouseEnter() {
    isMouseOnBar = true;
    // Fire an event to be picked up by parent components of this bar
    dispatchEvent('mouseBarEntered', { name: name });
  }

  // Function that fires when the mouse leaves this bar
  function onMouseLeave() {
    isMouseOnBar = false;
    // Fire an event to be picked up by parent components of this bar
    dispatchEvent('mouseBarLeft', { name: name });
  }
</script>

<!--
@component
### Bar
A single bar that can be used for bar visualizations.
Only positive `width` values are visible.
Both positive and negative `height` values are visible
depending on whether `showsNegativeHeight` is toggled.
Since both the width and height could be associated with
the x-axis or y-axis, one must explicitly mention which
is the case through toggling `isHeightAlongYAxis`
(i.e. horizontal versus vertical bar).
Coordinates are relative to the parent SVG element.
The default origin is the bottom middle of the bar.

#### Required attributes
* x: number                     - X-coordinate of the bar.
* y: number                     - Y-coordinate of the bar.
* width: number                 - Width of the bar.
* height: number                - Height of the bar.
* isHeightAlongYAxis            - Whether the height is along the x-axis or y-axis
                                  (i.e. horizontal or vertical bar).

#### Optional attributes
* color: string                 - Color of the bar.
* opacity: string               - Opacity of the bar as a number in range [0..1] or
                                  a percentage string formatted as '{number}%'.
* originX: OriginX              - Horizontal origin of the bar.
                                  Possible values: `OriginX.Left`, `OriginX.Middle`, `OriginX.Right`.
                                  Which value is useful depends on one's positioning logic.
* originY: OriginY              - Vertical origin of the label.
                                  Possible values: `OriginY.Top`, `OriginY.Middle`, `OriginY.Bottom`.
                                  Which value is useful depends on one's positioning logic.
* rotationDegrees: number       - Rotation of the bar in degrees.
* radiusX: number | string      - Horizontal corner radius of the bar as a number
                                  or a percentage string formatted as '{number}%'.
* radiusY: number | string      - Vertical corner radius of the bar as a number
                                  or a percentage string formatted as '{number}%'.
* showsNegativeHeight: boolean  - Whether the bar flips its orientation when `height` is negative or not.
* hoverText: string             - Text to display in the label when the mouse hovers over the bar.
* name: string                  - Name of the bar. It can be used as an identifier.
                                  Defaults to '(`x`,`y`)', which contains the actual values of `x` and `y`.
-->

<!-- The bar -->
<rect
  class={`bar ${name}`}
  bind:this={rectBlock}
  transform="rotate({rotationDegrees}, {x}, {y})"
  {x}
  {y}
  rx={radiusX}
  ry={radiusY}
  {width}
  height={showsNegativeHeight && height < 0 ? -height : height}
  fill={color}
  fill-opacity={opacity}
  role="treeitem"
  tabindex="0"
  aria-selected="false"
  on:mouseenter={onMouseEnter}
  on:mouseleave={onMouseLeave}
  on:focus={onMouseEnter}
  on:blur={onMouseLeave} />

<!-- The bar's label, which shows on hovering over the bar -->
{#if isMouseOnBar}
  <Label
    {x}
    {y}
    text={hoverText}
    color={'#000000bb'}
    originX={OriginX.Left}
    originY={OriginY.Bottom}
    {rotationDegrees}
    textColor={'#ffffff'}
    name={'bar'} />
{/if}

<style>
  /* Styling for the bar, this class will be set by parent components of the bar */
  .highlighted {
    fill-opacity: 1;
  }
</style>
