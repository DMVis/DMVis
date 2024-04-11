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
  export let label: string = '';
  export let color: string = 'red';
  export let opacity: number | string = '100%';
  export let originX: OriginX = OriginX.Middle;
  export let originY: OriginY = OriginY.Bottom;
  export let rotationDegrees: number = 0;
  export let radiusX: number | string = 0;
  export let radiusY: number | string = 0;
  export let showsNegativeValue: boolean = false;

  // Private attributes.
  let rectBlock: SVGRectElement;
  let showLabel: boolean = false;

  if (!isValueAlongYAxis) {
    // Swap width and height.
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
* isValueAlongYAxis           - Whether the value is along the x-axis or y-axis (i.e. horizontal versus vertical bars)

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
-->
<!-- Bar itself. -->
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
    showLabel = true;
  }}
  on:focus={() => {
    showLabel = true;
  }}
  on:mouseleave={() => {
    showLabel = false;
  }}
  on:blur={() => {
    showLabel = false;
  }} />
<!-- Label, which shows on hover. -->
{#if showLabel}
  <Label
    {x}
    {y}
    text={`${label != '' ? label + ': ' : ''} ${isValueAlongYAxis ? value : width}`}
    color={'#000000bb'}
    originX={OriginX.Left}
    originY={OriginY.Bottom}
    {rotationDegrees}
    textColor={'#ffffff'}
    name={'bar'} />
{/if}
