<script lang="ts">
  // Imports
  import * as d3 from 'd3';
  import { onMount } from 'svelte';

  import Label from '$lib/components/base/Label.svelte';
  import { ThrowError } from '$lib/utils/ThrowError.js';
  import { OriginX, OriginY } from '$lib/Enums.js';

  // Required Attributes
  export let placementX: number;
  export let placementY: number;
  export let axis: d3.Axis<string> | d3.Axis<d3.NumberValue>;

  // Optional attributes
  export let renderLabel: boolean = false;
  export let labelText: string = 'default';
  export let labelPosition: 'left' | 'right' | 'top' | 'bottom' = 'top';
  export let labelOffset: number = 20;
  export let fontSize: number = 12;
  export let color: string = 'black';

  let element: SVGGElement;

  let labelOffsetY = 0;
  let labelOffsetX = 0;
  let labelOriginX: OriginX = OriginX.Middle;
  let labelOriginY: OriginY = OriginY.Middle;
  let labelRotationDegrees: number = 0;

  onMount(() => {
    if (element !== undefined) {
      // Render the axis
      d3.select(element).call(axis).style('font-size', `${fontSize}px`).style('color', color);
    }
    // Render the label
    if (renderLabel) {
      // Retrieve axis bounding box
      let axisRef = d3.select(element);
      let lineNode = axisRef.select('.domain').node()! as SVGGElement;
      let axisWidth = lineNode.getBBox().width;
      let axisHeight = lineNode.getBBox().height;
      let axisX = lineNode.getBBox().x;
      let axisY = lineNode.getBBox().y;

      // Calculate label position
      switch (labelPosition) {
        case 'left':
          labelRotationDegrees = 270;
          labelOffsetY = axisY + axisHeight / 2;
          labelOffsetX = axisX - labelOffset;
          labelOriginX = OriginX.Right;
          break;
        case 'right':
          labelRotationDegrees = 90;
          labelOffsetY = axisY + axisHeight / 2;
          labelOffsetX = axisX + axisWidth + labelOffset;
          labelOriginX = OriginX.Left;
          break;
        case 'top':
          labelOffsetX = axisX + axisWidth / 2;
          labelOffsetY = axisY - labelOffset;
          labelOriginY = OriginY.Bottom;
          break;
        case 'bottom':
          labelOffsetX = axisX + axisWidth / 2;
          labelOffsetY = axisY + axisHeight + labelOffset;
          labelOriginY = OriginY.Top;
          break;
        default:
          throw ThrowError('Error', 'Incorrect labelPosition assignment.', 'Axis');
      }
    }
  });
</script>

<!--
@component
@component
### Axis
The Axis component renders a single axis based on a single, provided d3.axis element.
You can use this component to render an axis on any side of a visualisation, with the option
of adding a label on any side of the axis.

### Required attributes
  * placementX: number                                  - Horizontal start position of the axis.
  * placementY: number                                  - Vertical start position of the axis.
  * axis: d3.Axis<string> | d3.Axis<d3.NumberValue>     - D3 Axis component.
                                                            See [d3 documentation](https://d3js.org/d3-axis)
                                                            for the different kinds of axes you can create.

#### Optional attributes
  * renderLabel: boolean                                - Renders a label next to the axis. Defaults to `false`.
  * labelText: string                                   - Text for the label. Defaults to `'default'`.
  * labelPosition: 'left' | 'right' | 'top' | 'bottom'  - Position of the label relative to the axis. Defaults to `'top'`.
  * labelOffset: number                             - Distance from the label to the axis. Defaults to `'20'`.
  * fontSize: number                                    - Font size of the tick labels. Defaults to `12`.
  * color: string                                       - Color of the axis line and label. Defaults to `'black'`.
-->

<g class="axis">
  {#if renderLabel}
    <Label
      x={placementX + labelOffsetX}
      y={placementY + labelOffsetY}
      text={labelText}
      originX={labelOriginX}
      originY={labelOriginY}
      hasBackground={false}
      rotationDegrees={labelRotationDegrees}
      textColor={color} />
  {/if}
  <g class="axisElement" bind:this={element} transform="translate({placementX}, {placementY})"></g>
</g>

<style>
</style>
