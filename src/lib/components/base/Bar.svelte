<script lang="ts">
  import { OriginX, OriginY } from '$lib/Enums.js';
  import { getOppositeOriginX, getOppositeOriginY, getOrigin } from '$lib/utils/OriginMapper.js';
  import { graphStore } from '$lib/store.js';
  import { getContext, onMount } from 'svelte';
  import * as d3 from 'd3';

  // Required attributes
  export let x: number;
  export let y: number;
  export let width: number;
  export let value: number;
  export let isValueAlongYAxis: boolean;

  // Optional attributes
  export let color: string = 'red';
  export let opacity: number | string = '100%';
  export let originX: OriginX = OriginX.Middle;
  export let originY: OriginY = OriginY.Bottom;
  export let rotationDegrees: number = 0;
  export let radiusX: number | string = 0;
  export let radiusY: number | string = 0;

  // Private attributes
  let rectBlock: SVGRectElement;

  if (!isValueAlongYAxis) {
    // Swap width and height
    const temp: number = width;
    width = value;
    value = temp;
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
            // Negative values get flipped.
            width < 0 ? getOppositeOriginX(originX) : originX
          )
      )
      .attr(
        'y',
        y +
          getOrigin(
            Math.abs(value),
            OriginY.Top,
            // Negative values get flipped.
            value < 0 ? getOppositeOriginY(originY) : originY
          )
      )
  });
</script>

<!--
@component
### Component Name
The bar can be used for bar visualizations.
It supports negative widths and heights.
Coordinates are relative to the parent SVG element.
The default origin is the bottom middle of the bar.

#### Required attributes
* x: number               - Non-scaled x coordinate of the bar.
* y: number               - Non-scaled y coordinate of the bar.
* width: number           - Width of the bar.
* height: number          - Height of the bar.
* isValueAlongYAxis       - Whether the value is along the x-axis or y-axis (i.e. horizontal versus vertical bars)

#### Optional attributes
* color: string           - Color of the bar.
* opacity: string         - Opacity of the bar as a number in range [0..1] or
                            a percentage string formatted as '{number}%'.
* originX: OriginX        - Horizontal origin of the bar.
                            Possible values: `OriginX.Left`, `OriginX.Middle`, `OriginX.Right`.
                            Which value is useful depends on your positioning logic.
* originY: OriginY        - Vertical origin of the label.
                            Possible values: `OriginY.Top`, `OriginY.Middle`, `OriginY.Bottom`.
                            Which value is useful depends on your positioning logic.
* rotationDegrees: number - Rotation of the bar in degrees.
* radiusX: number         - Horizontal corner radius of the bar as a number in range [0..1] or
                            a percentage string formatted as '{number}%'.
* radiusY: number         - Vertical corner radius of the bar as a number in range [0..1] or
                            a percentage string formatted as '{number}%'.
-->
<rect
  bind:this={rectBlock}
  transform="rotate({rotationDegrees}, {x}, {y})"
  {x}
  {y}
  rx={radiusX}
  ry={radiusY}
  {width}
  height={value}
  fill={color}
  fill-opacity={opacity} />
