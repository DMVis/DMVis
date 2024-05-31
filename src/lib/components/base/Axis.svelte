<script lang="ts">
  // Imports
  import { select, type Axis, type NumberValue } from 'd3';
  import { createEventDispatcher, onMount } from 'svelte';

  // DMVis imports
  import Label from '$lib/components/base/Label.svelte';
  import Draggable from './Draggable.svelte';
  import { DMVisError } from '$lib/utils/DMVisError.js';
  import { OriginX, OriginY } from '$lib/Enums.js';

  // Required Attributes
  export let placementX: number;
  export let placementY: number;
  export let axis: Axis<string> | Axis<NumberValue>;

  // Optional attributes
  export let renderLabel: boolean = false;
  export let labelText: string = 'default';
  export let labelPosition: 'left' | 'right' | 'top' | 'bottom' = 'top';
  export let labelOffset: number = 20;
  export let fontSize: number = 10;
  export let color: string = 'black';
  export let isDraggable: boolean = false;
  export let squashOuterTicks: boolean = false;

  let element: SVGGElement;

  let labelOffsetY = 0;
  let labelOffsetX = 0;
  let labelOriginX: OriginX = OriginX.Middle;
  let labelOriginY: OriginY = OriginY.Middle;
  let labelRotationDegrees: number = 0;

  const dispatch = createEventDispatcher();

  $: if (isDraggable && !renderLabel) {
    throw DMVisError(
      `Cannot make the Axis draggable. Please enable the 'renderLabel' attribute.`,
      'Axis'
    );
  }

  onMount(() => {
    if (element !== undefined) {
      // Render the axis
      select(element).call(axis).style('font-size', `${fontSize}px`).style('color', color);
    }
    // Render the label
    if (renderLabel) {
      // Retrieve axis bounding box
      let axisRef = select(element);
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
          throw DMVisError(
            `Cannot assign '${labelPosition}' to the labelPosition attribute. Please use: 'left', 'right', 'top', or 'bottom'.`,
            'Axis'
          );
      }
    }

    // Apply squashing to the outer ticks if required
    if (squashOuterTicks) {
      const orientation = findAxisOrientation();
      const ticks = Array.from(element.getElementsByClassName('tick'));
      if (orientation === 'horizontal') {
        // If this is a horizontal axis (so axisBottom or axisTop), change the horizontal allignment of the first and last tick

        // Get the x position of the first drawn tick
        const tick1 = ticks[0];
        let { x } = getTransformCoordinates(tick1.getAttribute('transform'));
        const tick1X = x;

        // Get the x position of the last drawn tick
        const tick2 = ticks[ticks.length - 1];
        ({ x } = getTransformCoordinates(tick2.getAttribute('transform')));
        const tick2X = x;
        // Sometimes the axis is drawn the wrong way around, so see which tick is the first one and which one is the last one
        // Then tuck them in
        if (tick1X < tick2X) {
          tick1.getElementsByTagName('text')[0].setAttribute('text-anchor', 'start');
          tick2.getElementsByTagName('text')[0].setAttribute('text-anchor', 'end');
        } else if (tick2X < tick1X) {
          tick2.getElementsByTagName('text')[0].setAttribute('text-anchor', 'start');
          tick1.getElementsByTagName('text')[0].setAttribute('text-anchor', 'end');
        }
      } else if (orientation === 'vertical') {
        // If this is a vertical axis (so axisLeft or axisRight), change the vertical allignment of the first and last tick

        // Get the y position of the first drawn tick
        const tick1 = ticks[0];
        let { y } = getTransformCoordinates(tick1.getAttribute('transform'));
        const tick1Y = y;

        // Get the y position of the last drawn tick
        const tick2 = ticks[ticks.length - 1];
        ({ y } = getTransformCoordinates(tick2.getAttribute('transform')));
        const tick2Y = y;

        // Sometimes the axis is drawn the wrong way around, so see which tick is the first one and which one is the last one
        // Then tuck them in
        if (tick1Y < tick2Y) {
          tick1.getElementsByTagName('text')[0].setAttribute('dominant-baseline', 'central');
          tick2
            .getElementsByTagName('text')[0]
            .setAttribute('dominant-baseline', 'text-after-edge');
        } else if (tick2Y < tick1Y) {
          tick2.getElementsByTagName('text')[0].setAttribute('dominant-baseline', 'central');
          tick1
            .getElementsByTagName('text')[0]
            .setAttribute('dominant-baseline', 'text-after-edge');
        }
      }
    }

    dispatch('renderAxis');
  });

  function findAxisOrientation(): 'horizontal' | 'vertical' | 'unknown' {
    const ticks = Array.from(element.getElementsByClassName('tick'));
    let foundX: number | null = null;
    let foundY: number | null = null;
    ticks.forEach((tick) => {
      const translateAttr = tick.getAttribute('transform');
      const { x, y } = getTransformCoordinates(translateAttr);
      if (foundX === null) {
        foundX = x;
        foundY = y;
      } else {
        foundX = foundX !== x ? -1 : foundX;
        foundY = foundY !== y ? -1 : foundY;
      }
    });
    if (foundX === -1 && foundY === -1) return 'unknown';
    if (foundX === -1) return 'horizontal';
    if (foundY === -1) return 'vertical';
    return 'unknown';
  }

  function getTransformCoordinates(transform: string | null | undefined) {
    const translateRegex = /translate\(([^,]+),([^)]+)\)/;
    const matches = transform?.match(translateRegex);
    return {
      x: matches ? parseFloat(matches[1]) : 0,
      y: matches ? parseFloat(matches[2]) : 0
    };
  }
</script>

<!--
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
* renderLabel: boolean                                - Renders a label next to the axis. This defaults to `false`.
* labelText: string                                   - Text for the label. This defaults to `'default'`.
* labelPosition: 'left' | 'right' | 'top' | 'bottom'  - Position of the label relative to the axis. This defaults to `'top'`.
* labelOffset: number                                 - Distance from the label to the axis. This defaults to `'20'`.
* fontSize: number                                    - Font size of the tick labels. This defaults to `12`.
* color: string                                       - Color of the axis line and label. This defaults to `'black'`.
* isDraggable: boolean                                - Sets whether the axis is draggable. The logic for displacement of
                                                        the axis should be handled outside this component.  For this
                                                        to work, the renderLabel parameter should be set to true.
                                                        Defaults to false.
* squashOuterTicks: boolean                           - Whether or not to tuck in the first and last tick. This defaults to `false`.
-->

<g class="axis">
  {#if renderLabel}
    {#if isDraggable}
      <Draggable elementName={labelText} on:dragMove on:dragStop>
        <Label
          x={placementX + labelOffsetX}
          y={placementY + labelOffsetY}
          text={labelText}
          originX={labelOriginX}
          originY={labelOriginY}
          hasBackground={false}
          rotationDegrees={labelRotationDegrees}
          textColor={color}
          hasPointerEvents={true} />
      </Draggable>
    {:else}
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
  {/if}
  <g class="axisElement" bind:this={element} transform="translate({placementX}, {placementY})"></g>
</g>

<style>
</style>
