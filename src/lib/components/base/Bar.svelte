<script lang="ts">
  // Imports
  import * as d3 from 'd3';
  import { onMount, createEventDispatcher } from 'svelte';

  // DMVis imports
  import Tooltip from '$lib/components/base/Tooltip.svelte';
  import { OriginX, OriginY } from '$lib/Enums.js';
  import { getOrigin, getFlippedOrigin } from '$lib/utils/OriginMapper.js';

  // Required attributes
  export let x: number;
  export let y: number;
  export let width: number;
  export let height: number;

  // Optional attributes
  export let isVertical: boolean = true;
  export let color: string = 'red';
  export let opacity: number | string = 1;
  export let originX: OriginX = OriginX.Middle;
  export let originY: OriginY = OriginY.Bottom;
  export let rotationDegrees: number = 0;
  export let radiusX: number | string = 0;
  export let radiusY: number | string = 0;
  export let showsNegativeHeight: boolean = false;
  export let hoverText: string = '';
  export let name: string | undefined = undefined;

  // Private attributes
  let rectBlock: SVGRectElement;
  let isMouseOnBar: boolean = false;

  const dispatch = createEventDispatcher();

  if (!isVertical) {
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
    dispatch('mouseBarEnter', { name: name });
  }

  // Function that fires when the mouse leaves this bar
  function onMouseLeave() {
    isMouseOnBar = false;
    // Fire an event to be picked up by parent components of this bar
    dispatch('mouseBarLeave', { name: name });
  }
</script>

<!--
@component
### Bar
A bar that can be used for bar visualizations.
Coordinates are relative to the parent SVG element.
Only positive `width` values are visible.
Both positive and negative `height` values are visible
depending on `showsNegativeHeight`.
By default, the bar is vertical and its origin is the bottom middle.

#### Required attributes
* x: number                     - X-coordinate of the bar.
* y: number                     - Y-coordinate of the bar.
* width: number                 - Width of the bar.
* height: number                - Height of the bar.

#### Optional attributes
* isVertical                    - Whether the bar is vertical bar or horizontal. Defaults to `true`.
* color: string                 - Color of the bar.
* opacity: string               - Opacity of the bar as a number in range [0..1] or
                                  a percentage string formatted as '{number}%'.
                                  Defaults to `1`.
* originX: OriginX              - Horizontal origin of the bar.
                                  Possible values: `OriginX.Left`, `OriginX.Middle`, `OriginX.Right`.
                                  Which value is useful depends on one's positioning logic.
                                  Defaults to `OriginX.Middle`.
* originY: OriginY              - Vertical origin of the label.
                                  Possible values: `OriginY.Top`, `OriginY.Middle`, `OriginY.Bottom`.
                                  Which value is useful depends on one's positioning logic.
                                  Defaults to `OriginY.Bottom`.
* rotationDegrees: number       - Rotation of the bar in degrees. Defaults to `0`.
* radiusX: number | string      - Horizontal corner radius of the bar as a number
                                  or a percentage string formatted as '{number}%'.
                                  Defaults to `0`.
* radiusY: number | string      - Vertical corner radius of the bar as a number
                                  or a percentage string formatted as '{number}%'.
                                  Defaults to `0`.
* showsNegativeHeight: boolean  - Whether the bar flips its orientation when `height` is negative.
                                  Defaults to `false`.
* hoverText: string             - Text to display in the label when the mouse hovers over the bar.
                                  Defaults to `''`.
* name: string                  - Class name of the bar. It can be used as an identifier. Defaults to only `bar`.
                                  If set, the class names will be `bar` and `bar-name`.

#### Events
* For detailed information about dispatches, check the documentation.
-->

<!-- The bar -->
<rect
  class={`bar` + `${name === undefined ? '' : ' bar-' + name}`}
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
  <Tooltip
    {x}
    {y}
    text={hoverText}
    originX={OriginX.Left}
    originY={OriginY.Bottom}
    hasBackground={true}
    theme={'dark'} />
{/if}

<style>
  /* Styling for the bar, this class will be set by parent components of the bar */
  .highlighted {
    fill-opacity: 1;
  }
</style>
