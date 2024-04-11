<script lang="ts">
  import * as d3 from 'd3';
  import { onMount } from 'svelte';
  import { OriginX, OriginY } from '$lib/Enums.js';
  import Label from '$lib/components/base/Label.svelte';
  import { getOrigin, getFlippedOrigin } from '$lib/utils/OriginMapper.js';

  // Required attributes.
  export let x: number;
  export let y: number;
  export let width: number;
  export let value: number;
  export let isValueAlongYAxis: boolean;

  // Optional attributes.
  export let color: string = 'red';
  export let opacity: number | string = '100%';
  export let originX: OriginX = OriginX.Middle;
  export let originY: OriginY = OriginY.Bottom;
  export let rotationDegrees: number = 0;
  export let radiusX: number | string = 0;
  export let radiusY: number | string = 0;
  export let showsNegativeValue: boolean = false;
  export let hoverText: string = '';

  // Private attributes.
  let rectBlock: SVGRectElement;
  let isMouseOnBar: boolean = false;

  // This block makes it so that the rest of the code can simply
  // refer to value for the value and to width for the width
  // without worrying about `isValueAlongYAxis`.
  if (!isValueAlongYAxis) {
    // Swap width and height if the bar is horizontal.
    const temp: number = width;
    width = value;
    value = temp;
  }

  onMount(() => {
    // Update the rectangle.
    d3.select(rectBlock)
      .attr(
        'x',
        x +
          getOrigin(
            Math.abs(width),
            OriginX.Left,
            // Negative values get flipped.
            width < 0 ? getFlippedOrigin(originX) : originX
          )
      )
      .attr(
        'y',
        y +
          getOrigin(
            Math.abs(value),
            OriginY.Top,
            // Negative values get flipped.
            // showsNegativeValue determines whether this is visible for value < 0.
            value < 0 ? getFlippedOrigin(originY) : originY
          )
      );
  });

  function showLabel() {
    isMouseOnBar = true;
  }

  function unshowLabel() {
    isMouseOnBar = false;
  }
</script>

<!--
@component
### Bar
The bar can be used for bar visualizations.
It supports negative widths and heights.
Coordinates are relative to the parent SVG element.
The default origin is the bottom middle of the bar.

#### Required attributes
* x: number                   - X-coordinate of the bar.
* y: number                   - Y-coordinate of the bar.
* width: number               - Width of the bar.
* height: number              - Height of the bar.
* isValueAlongYAxis           - Whether the value is along the x-axis or y-axis (i.e. horizontal or vertical bars)

#### Optional attributes
* color: string               - Color of the bar.
* opacity: string             - Opacity of the bar as a number in range [0..1] or
                                a percentage string formatted as '{number}%'.
* originX: OriginX            - Horizontal origin of the bar.
                                Possible values: `OriginX.Left`, `OriginX.Middle`, `OriginX.Right`.
                                Which value is useful depends on your positioning logic.
* originY: OriginY            - Vertical origin of the label.
                                Possible values: `OriginY.Top`, `OriginY.Middle`, `OriginY.Bottom`.
                                Which value is useful depends on your positioning logic.
* rotationDegrees: number     - Rotation of the bar in degrees.
* radiusX: number | string    - Horizontal corner radius of the bar as a number
                                or a percentage string formatted as '{number}%'.
* radiusY: number | string    - Vertical corner radius of the bar as a number
                                or a percentage string formatted as '{number}%'.
* showsNegativeValue: boolean - Whether the bar flips its orientation when `value` is negative or not.
* hoverText: string           - Text to display in the label on hover. The resulting text is
                                formatted as '{`hoverText`}{`value`}'.
-->
<!-- The bar itself. -->
<rect
  class="bar"
  bind:this={rectBlock}
  transform="rotate({rotationDegrees}, {x}, {y})"
  {x}
  {y}
  rx={radiusX}
  ry={radiusY}
  {width}
  height={showsNegativeValue && value < 0 ? -value : value}
  fill={color}
  fill-opacity={opacity}
  role="treeitem"
  tabindex="0"
  aria-selected="false"
  on:mouseenter={() => {
    showLabel();
  }}
  on:mouseleave={() => {
    unshowLabel();
  }}
  on:focus={() => {
    showLabel();
  }}
  on:blur={() => {
    unshowLabel();
  }} />
<!-- Label, which shows on hovering over the bar. -->
{#if isMouseOnBar}
  <Label
    {x}
    {y}
    text={`${hoverText}${value}`}
    color={'#000000bb'}
    originX={OriginX.Left}
    originY={OriginY.Bottom}
    {rotationDegrees}
    textColor={'#ffffff'}
    name={'bar'} />
{/if}
