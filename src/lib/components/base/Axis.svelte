<script lang="ts">
  // Imports
  import { createEventDispatcher, onMount } from 'svelte';
  import { select, type Axis as D3Axis, type NumberValue as D3NumberValue } from 'd3';

  // DMVis imports
  import Label from '$lib/components/base/Label.svelte';
  import Draggable from '$lib/components/base/Draggable.svelte';
  import { DMVisError } from '$lib/utils/DMVisError.js';
  import type { Position } from '$lib/Types.js';

  // Required Attributes
  export let placementX: number;
  export let placementY: number;
  export let axis: D3Axis<string> | D3Axis<D3NumberValue>;

  // Optional attributes
  export let renderLabel: boolean = false;
  export let labelText: string = 'default';
  export let labelPosition: Position = 'top';
  export let labelOffset: number = 20;
  export let fontSize: number = 10;
  export let color: string = 'black';
  export let isDraggable: boolean = false;
  export let squashOuterTicks: boolean = false;

  let element: SVGGElement;

  let labelOffsetY = 0;
  let labelOffsetX = 0;
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
          break;
        case 'right':
          labelRotationDegrees = 90;
          labelOffsetY = axisY + axisHeight / 2;
          labelOffsetX = axisX + axisWidth + labelOffset;
          break;
        case 'top':
          labelOffsetX = axisX + axisWidth / 2;
          labelOffsetY = axisY - labelOffset;
          break;
        case 'bottom':
          labelOffsetX = axisX + axisWidth / 2;
          labelOffsetY = axisY + axisHeight + labelOffset;
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
The Axis component is used to render a singular Axis, given a `d3.axis` element.
This needs to be supplied by the parent through the `axis` parameter.
The axis can be oriented in any direction, depending on the provided `d3.axis`.
The axis can also have a label on any of the four sides, regardless of the axis orientation.
Furthermore, the axis can be made draggable, although how this dragging behaviour should be handled is up to the user to implement.

> Note: This component is made specifically for visualisations that require only one axis (or multiple with different orientations).
 If you want to have multiple axes created automatically from your dataset, consider using `DynamicAxis`.

#### Required Attributes
* placementX: number                              - The horizontal start position of the axis.
* placementY: number                              - The vertical start position of the axis.
* axis: d3.Axis<string> | d3.Axis<d3.NumberValue> - A D3 Axis component.
                                                    See [d3 documentation](https://d3js.org/d3-axis)
                                                    for the different kinds of axes you can create.

#### Optional Attributes
* renderLabel: boolean      - Renders a label next to the axis.
                              Defaults to `false`.
* labelText: string         - The text for the label.
                              Defaults to `'default'`.
* labelPosition: Position   - The position of the label relative to the axis.
                              Defaults to `'top'`.
* labelOffset: number       - The distance from the label to the axis.
                              Defaults to `'20'`.
* fontSize: number          - The font size of the tick labels.
                              Defaults to `12`.
* color: string             - The colour of the axis line and label.
                              Valid inputs include CSS colours specified as a string.
                              Defaults to `'black'`.
* isDraggable: boolean      - Sets whether the axis is draggable. The logic for displacement of
                              the axis should be handled outside this component. For this
                              to work, the renderLabel parameter should be set to true.
                              Defaults to `false`.
* squashOuterTicks: boolean - Whether or not to tuck in the first and last tick.
                              Defaults to `false`.
-->

<g class="axis">
  {#if renderLabel}
    {#if isDraggable}
      <Draggable elementName={labelText} on:dragMove on:dragStop>
        <Label
          x={placementX + labelOffsetX}
          y={placementY + labelOffsetY}
          text={labelText}
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
        hasBackground={false}
        rotationDegrees={labelRotationDegrees}
        textColor={color} />
    {/if}
  {/if}
  <g class="axisElement" bind:this={element} transform="translate({placementX}, {placementY})"></g>
</g>

<style>
</style>
