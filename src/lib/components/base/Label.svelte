<script lang="ts">
  import { OriginX, OriginY } from '$lib/Enums.js';
  import { getOrigin } from '$lib/utils/OriginMapper.js';
  import { onMount } from 'svelte';
  import * as d3 from 'd3';

  // Required attributes
  export let x: number;
  export let y: number;
  export let text: string;

  // Optional attributes
  export let color: string = 'red';
  export let opacity: string = '100%';
  export let originX: OriginX = OriginX.Middle;
  export let originY: OriginY = OriginY.Middle;
  export let rotationDegrees: number = 0;
  export let radiusX: string = '0';
  export let radiusY: string = '0';
  export let padding: number = 20;
  export let textColor: string = 'black';
  export let fontSize: string = '12px';
  export let fontWeight: string = 'normal';
  export let fontFamily: string = 'Arial';
  export let hasBackground: boolean = true;

  // Private attributes
  let rectWidth: number = 50;
  let rectHeight: number = 25;
  let textBlock: SVGTextElement;
  let rectBlock: SVGRectElement;

  onMount(() => {
    // Set attributes for the text
    d3.select(textBlock)
      .attr('fill', textColor)
      .attr('font-size', fontSize)
      .attr('font-weight', fontWeight)
      .attr('font-family', fontFamily);

    // Calculate the width and height of the text
    const textLen = d3.select(textBlock)?.node()?.getComputedTextLength() || 0;
    const textHeight = d3.select(textBlock)?.node()?.getBBox()?.height || 0;
    rectWidth = textLen + padding;
    rectHeight = textHeight + padding;

    // Update the text
    d3.select(textBlock)
      .attr('x', x + getOrigin(rectWidth, OriginX.Middle, originX))
      .attr('y', y + getOrigin(rectHeight, OriginY.Middle, originY));

    // Update the rectangle
    d3.select(rectBlock)
      .attr('x', x + getOrigin(rectWidth, OriginX.Left, originX))
      .attr('y', y + getOrigin(rectHeight, OriginY.Top, originY))
      .attr('width', rectWidth)
      .attr('height', rectHeight);
  });
</script>

<!--
@component
### Label
The label allows you to add text to a visualization.
It can be used in combination with other components.
Coordinates are relative to the parent SVG element.
The default origin is the middle of the rectangle.

#### Required attributes
* x: number               - Non-scaled x coordinate of the label
* y: number               - Non-scaled y coordinate of the label
* text: string            - Text to display in the label

#### Optional attributes
* color: string           - Color of the rectangle behind the label
* opacity: string         - Opacity of the label
* originX: OriginX        - Horizontal origin of the label.
                            Possible values: `OriginX.Left`, `OriginX.Middle`, `OriginX.Right`
* originY: OriginY        - Vertical origin of the label.
                            Possible values: `OriginY.Top`, `OriginY.Middle`, `OriginY.Bottom`
* rotationDegrees: number - Rotation of the label in degrees
* radiusX: number         - Horizontal corner radius of the rectangle behind the label
* radiusY: number         - Vertical corner radius of the rectangle behind the label
* padding: number         - Padding around the text in the label
* textColor: string       - Color of the text in the label
* fontSize: string        - Font size of the text in the label
* fontWeight: string      - Font weight of the text in the label
* fontFamily: string      - Font family of the text in the label
* hasBackground: bool     - Whether the label has a background or not
-->

<g transform="rotate({rotationDegrees}, {x}, {y})">
  {#if hasBackground}
    <rect
      bind:this={rectBlock}
      {x}
      {y}
      rx={radiusX}
      ry={radiusY}
      width={rectWidth}
      height={rectHeight}
      fill={color}
      fill-opacity={opacity} />
  {/if}

  <text
    bind:this={textBlock}
    {x}
    {y}
    {opacity}
    text-anchor="middle"
    alignment-baseline="middle"
    dominant-baseline="middle">{text}</text>
</g>
