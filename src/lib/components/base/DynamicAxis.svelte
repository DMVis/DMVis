<script lang="ts">
  // Imports
  import * as d3 from 'd3';
  import { createEventDispatcher } from 'svelte';

  // DMVis imports
  import Axis from '$lib/components/base/Axis.svelte';
  import { DMVisError } from '$lib/utils/DMVisError.js';
  import { SpacerEqual, SpacerSide } from '$lib/utils/Spacer.js';
  import { getVisualisationContext } from '$lib/context.js';

  // Get store information
  const {
    xScales,
    yScales,
    width,
    height,
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
    columns,
    styleUtil
  } = getVisualisationContext();

  // Public variables
  export let axisOrder: string[] = [];
  export let renderLabel: boolean = false;
  export let labelPosition: 'left' | 'right' | 'top' | 'bottom' = 'top';
  export let labelOffset: number = 20;
  export let hasTicks: boolean = true;
  export let alignment: 'start' | 'end' | 'spaced' = 'start';
  export let fontSize: number = $styleUtil.fontSize;
  export let color: string = 'black';
  export let offset: number = 0;
  export let ticksNumber: number = 10;
  export let position: 'bottom' | 'top' | 'left' | 'right' = 'bottom';
  export let spacingDirection: 'vertical' | 'horizontal' = 'horizontal';
  export let padding: number = 0;

  export let isDraggable: boolean = false;
  const dispatch = createEventDispatcher();

  // Private variables
  let placementX: number = 0;
  let placementY: number = 0;
  let axisGenerator: AxisConfig[] = [];
  let drawingOrder: string[] = [];
  let drawingIndices: number[] = [];
  let draggedAxis: string | null = null;
  let draggingOffset: number = 0;
  // Non-nullable operator because they will be set in createSpacer
  let spacerHorizontal!: d3.ScaleBand<string> | d3.ScalePoint<string>;
  let spacerVertical!: d3.ScaleBand<string> | d3.ScalePoint<string>;
  let spacerStepSizeHorizontal!: number;
  let spacerStepSizeVertical!: number;

  // Create a spacer, which is a scaleBand or scalePoint, which will handle the positions for all the axis
  function createSpacer() {
    drawingOrder = axisOrder.length > 0 ? axisOrder : $columns;
    drawingIndices = drawingOrder.map((attributeName: string) => {
      let index = $columns.indexOf(attributeName);
      if (index === -1) {
        throw DMVisError(`${attributeName} is not a valid column name`, 'DynamicAxis');
      }
      return index;
    });
    switch (alignment) {
      // For alignment 'start' and 'end', the spacer is the same
      case 'start':
      case 'end':
        spacerHorizontal = SpacerSide(
          $width,
          $marginLeft,
          $marginRight,
          drawingOrder,
          alignment,
          padding
        );
        spacerStepSizeHorizontal = spacerHorizontal.bandwidth();
        spacerVertical = SpacerSide(
          $height,
          $marginTop,
          $marginBottom,
          drawingOrder,
          alignment,
          padding
        );
        spacerStepSizeVertical = spacerVertical.bandwidth();
        break;
      case 'spaced': {
        spacerHorizontal = SpacerEqual($width, $marginLeft, $marginRight, drawingOrder, padding);
        spacerVertical = SpacerEqual($height, $marginTop, $marginBottom, drawingOrder, padding);
        spacerStepSizeHorizontal = spacerHorizontal.step();
        spacerStepSizeVertical = spacerVertical.step();

        break;
      }
      default:
        throw DMVisError('Invalid alignment provided.', 'DynamicAxis');
    }
  }

  // If any of the variables in the if statement change, update the spacer
  $: if (
    axisOrder ||
    alignment ||
    $width ||
    $marginLeft ||
    $marginRight ||
    $marginTop ||
    $marginBottom
  ) {
    createSpacer();
  }

  // Create initial spacer
  createSpacer();

  interface AxisConfig {
    column: string;
    axis: d3.Axis<string> | d3.Axis<d3.NumberValue>;
    x: number;
    y: number;
  }

  // Every different position requires a different axis to be drawn
  $: {
    axisGenerator = [];
    switch (position) {
      case 'top':
        drawingIndices.forEach((colIndex, index) => {
          // colIndex is the index of this attribute in the columns array in the store
          // Index is just the index of this number in the drawingIndices array
          // Non-nullable because it is certain this will be instantiated
          let newAxis!: d3.Axis<string> | d3.Axis<d3.NumberValue>;
          // ColumnName is the attribute name of this axis
          let columnName = drawingOrder[index];
          // Scale is the scale of this attribute
          let scale = $xScales[colIndex];

          // Create proper axis
          if ('padding' in scale) {
            // If the scale is a scaleband
            newAxis = d3.axisTop(scale as d3.ScaleBand<string>);
          } else if (spacingDirection === 'vertical') {
            /* If the scale is a scalelinear and vertical spacing
               Note that the range needs to be flipped,
                  this is because the range is flipped by default in the store */
            const oldRange = scale.range();
            newAxis = d3.axisTop(
              scale.range([oldRange[1], oldRange[0]]) as d3.ScaleLinear<number, number>
            );
          } else if (spacingDirection === 'horizontal') {
            // If the scale is a scalelinear and horizontal spacing
            newAxis = d3.axisTop(
              scale.range([spacerStepSizeHorizontal, 0]) as d3.ScaleLinear<number, number>
            );
          } else {
            throw DMVisError('Invalid spacing direction', 'DynamicAxis');
          }

          // Set the ticks of the scaleLinear axis
          if (hasTicks) {
            newAxis = newAxis.tickSizeOuter(0) as d3.Axis<d3.NumberValue> | d3.Axis<string>;
            newAxis = newAxis.ticks(ticksNumber);
          } else {
            newAxis = newAxis.tickSize(0) as d3.Axis<d3.NumberValue> | d3.Axis<string>;
          }

          // Set the placement of the axis
          placementY = $marginTop - offset;
          placementX = 0;

          // Edit the placement depending on the spacing direction
          // Note that it is enforced earlier that the column names are, in fact, present in the spacer
          if (spacingDirection === 'vertical') {
            placementY = spacerVertical(columnName)! - offset;
          } else if (spacingDirection === 'horizontal') {
            placementX = spacerHorizontal(columnName)!;
          } else {
            throw DMVisError('Invalid spacing direction', 'DynamicAxis');
          }

          // Create an axis config to be drawn later on
          axisGenerator.push({
            column: columnName,
            axis: newAxis,
            x: placementX,
            y: placementY
          } as AxisConfig);
        });
        break;
      case 'bottom':
        drawingIndices.forEach((colIndex, index) => {
          // colIndex is the index of this attribute in the columns array in the store
          // Index is just the index of this number in the drawingIndices array
          // Non-nullable because it is certain this will be instantiated
          let newAxis!: d3.Axis<string> | d3.Axis<d3.NumberValue>;
          // ColumnName is the attribute name of this axis
          let columnName = drawingOrder[index];
          // Scale is the scale of this attribute
          let scale = $xScales[colIndex];

          // Create proper axis
          if ('padding' in scale) {
            // If the scale is a scaleband
            newAxis = d3.axisBottom(scale as d3.ScaleBand<string>);
          } else if (spacingDirection === 'vertical') {
            /* If the scale is a scalelinear and vertical spacing
               Note that the range needs to be flipped,
                  this is because the range is flipped by default in the store */
            const oldRange = scale.range();
            newAxis = d3.axisBottom(
              scale.range([oldRange[1], oldRange[0]]) as d3.ScaleLinear<number, number>
            );
          } else if (spacingDirection === 'horizontal') {
            // If the scale is a scalelinear and horizontal spacing
            newAxis = d3.axisBottom(
              scale.range([spacerStepSizeHorizontal, 0]) as d3.ScaleLinear<number, number>
            );
          } else {
            throw DMVisError('Invalid spacing direction', 'DynamicAxis');
          }

          // Set the ticks of the scaleLinear axis
          if (hasTicks) {
            newAxis = newAxis.tickSizeOuter(0) as d3.Axis<d3.NumberValue> | d3.Axis<string>;
            newAxis = newAxis.ticks(ticksNumber);
          } else {
            newAxis = newAxis.tickSize(0) as d3.Axis<d3.NumberValue> | d3.Axis<string>;
          }

          // Set the placement of the axis
          placementY = $height - $marginBottom + offset;
          placementX = 0;

          // Edit the placement depending on the spacing direction
          // Note that it is enforced earlier that the column names are, in fact, present in the spacer
          if (spacingDirection === 'vertical') {
            placementY = spacerVertical(columnName)! + offset;
          } else if (spacingDirection === 'horizontal') {
            placementX = spacerHorizontal(columnName)!;
          } else {
            throw DMVisError('Invalid spacing direction', 'DynamicAxis');
          }

          // Create an axis config to be drawn later on
          axisGenerator.push({
            column: columnName,
            axis: newAxis,
            x: placementX,
            y: placementY
          } as AxisConfig);
        });
        break;

      case 'left':
        drawingIndices.forEach((colIndex, index) => {
          // colIndex is the index of this attribute in the columns array in the store
          // Index is just the index of this number in the drawingIndices array
          // Non-nullable because it is certain this will be instantiated
          let newAxis!: d3.Axis<string> | d3.Axis<d3.NumberValue>;
          // ColumnName is the attribute name of this axis
          let columnName = drawingOrder[index];
          // Scale is the scale of this attribute
          let scale = $yScales[colIndex];

          // Create proper axis
          if ('padding' in scale) {
            // If the scale is a scaleband
            newAxis = d3.axisLeft(scale as d3.ScaleBand<string>);
          } else if (spacingDirection === 'vertical') {
            // If the scale is a scalelinear and vertical spacing
            newAxis = d3.axisLeft(
              scale.range([0, spacerStepSizeVertical]) as d3.ScaleLinear<number, number>
            );
          } else if (spacingDirection === 'horizontal') {
            // If the scale is a scalelinear and horizontal spacing
            newAxis = d3.axisLeft(scale as d3.ScaleLinear<number, number>);
          } else {
            throw DMVisError('Invalid spacing direction', 'DynamicAxis');
          }

          // Set the ticks of the scaleLinear axis
          if (hasTicks) {
            newAxis = newAxis.tickSizeOuter(0) as d3.Axis<d3.NumberValue> | d3.Axis<string>;
            newAxis = newAxis.ticks(ticksNumber);
          } else {
            newAxis = newAxis.tickSize(0) as d3.Axis<d3.NumberValue> | d3.Axis<string>;
          }

          // Set the placement of the axis
          placementY = 0;
          placementX = $marginLeft - offset;

          // Edit the placement depending on the spacing direction
          // Note that it is enforced earlier that the column names are, in fact, present in the spacer
          if (spacingDirection === 'vertical') {
            placementY = spacerVertical(columnName)!;
          } else if (spacingDirection === 'horizontal') {
            placementX = spacerHorizontal(columnName)! - offset;
          } else {
            throw DMVisError('Invalid spacing direction', 'DynamicAxis');
          }

          // Create an axis config to be drawn later on
          axisGenerator.push({
            column: columnName,
            axis: newAxis,
            x: placementX,
            y: placementY
          } as AxisConfig);
        });
        break;

      case 'right':
        drawingIndices.forEach((colIndex, index) => {
          // colIndex is the index of this attribute in the columns array in the store
          // Index is just the index of this number in the drawingIndices array
          // Non-nullable because it is certain this will be instantiated
          let newAxis!: d3.Axis<string> | d3.Axis<d3.NumberValue>;
          // ColumnName is the attribute name of this axis
          let columnName = drawingOrder[index];
          // Scale is the scale of this attribute
          let scale = $yScales[colIndex];

          // Create proper axis
          if ('padding' in scale) {
            // If the scale is a scaleband
            newAxis = d3.axisRight(scale as d3.ScaleBand<string>);
          } else if (spacingDirection === 'vertical') {
            // If the scale is a scalelinear and vertical spacing
            newAxis = d3.axisRight(
              scale.range([0, spacerStepSizeVertical]) as d3.ScaleLinear<number, number>
            );
          } else if (spacingDirection === 'horizontal') {
            // If the scale is a scalelinear and horizontal spacing
            newAxis = d3.axisRight(scale as d3.ScaleLinear<number, number>);
          } else {
            throw DMVisError('Invalid spacing direction', 'DynamicAxis');
          }

          // Set the ticks of the scaleLinear axis
          if (hasTicks) {
            newAxis = newAxis.tickSizeOuter(0) as d3.Axis<d3.NumberValue> | d3.Axis<string>;
            newAxis = newAxis.ticks(ticksNumber);
          } else {
            newAxis = newAxis.tickSize(0) as d3.Axis<d3.NumberValue> | d3.Axis<string>;
          }

          // Set the placement of the axis
          placementY = 0;
          placementX = $width - $marginRight + offset;

          // Edit the placement depending on the spacing direction
          // Note that it is enforced earlier that the column names are, in fact, present in the spacer
          if (spacingDirection === 'vertical') {
            placementY = spacerVertical(columnName)!;
          } else if (spacingDirection === 'horizontal') {
            placementX = spacerHorizontal(columnName)! + offset;
          } else {
            throw DMVisError('Invalid spacing direction', 'DynamicAxis');
          }

          // Create an axis config to be drawn later on
          axisGenerator.push({
            column: columnName,
            axis: newAxis,
            x: placementX,
            y: placementY
          } as AxisConfig);
        });
        break;
      // If this point is reached, the input was not recognised. So throw an error
      // Note that due to TypeScript, this will never happen
      default:
        throw DMVisError('Invalid axis position', 'DynamicAxis');
    }
  }

  // Handle the axis movement logic while the user is dragging an axis
  function onDragMove(e: CustomEvent) {
    let elementName = e.detail.elementName;
    let movementX = e.detail.movementX;
    draggedAxis = elementName;
    draggingOffset += movementX;
  }

  // Handle the logic when the user stops dragging an axis
  function onDragStop() {
    swapAxes();
    draggedAxis = null;
    draggingOffset = 0;
  }

  // Handles the logic for swapping axes when the user stops dragging an axis
  function swapAxes() {
    // If the user moved the axis far enough that it crossed at least one other axis
    if (Math.abs(draggingOffset) > spacerHorizontal.step()) {
      // Get the index of the dragged axis and how many positions it should move
      const axisIndex = axisOrder.indexOf(draggedAxis!);
      const positionsToSwap =
        draggingOffset > 0
          ? Math.floor(draggingOffset / spacerHorizontal.step())
          : Math.ceil(draggingOffset / spacerHorizontal.step());
      let newIndex = axisIndex + positionsToSwap;
      // Clamp newIndex so it does not go out of bounds in the array
      if (newIndex < 0 || newIndex > axisOrder.length - 1) {
        newIndex = newIndex < 0 ? 0 : axisOrder.length - 1;
      }
      axisOrder.splice(axisIndex, 1)[0];
      axisOrder.splice(newIndex, 0, draggedAxis!);
      dispatch('axisOrderChanged', { axisOrder });
    }
  }
</script>

<!--
@component
### Dynamic Axis
The Dynamic Axis component renders the axes based on the data.
It displays tick marks and labels based on provided data.
You can use this component to render the axis on the top, bottom, left, or right side of the visualisation.

#### Optional attributes
* axisOrder: string[]                             - The order in which the axes should be drawn. The array should contain strings
                                                    identical to column names in the dataset. This defaults to `[]`, which draws axes
                                                    in the order that they appear in the dataset.
* alignment: 'start' | 'end' | 'spaced'           - Alignment of the axes (i.e. the side of the column where the axis is placed).
                                                    Defaults to `'start'`.
* fontSize: number                                - Font size of the tick labels. This defaults to `12`.
* color: string                                   - Color of the axis line. This defaults to `'black'`.
* renderLabel: boolean                            - Renders a label next to the axis. This defaults to `false`.
* labelPosition: 'left' | 'right' | 'top' | 'bottom'  - Position of the label relative to the axis. This defaults to `'top'`.
* labelOffset: number                             - Distance from the label to the axis. This defaults to `'20'`.
* hasTicks: boolean                               - Whether to display tick marks. This defaults to `true`.
* offset: number                                  - The offset of the axis from the side of the visualisation. This defaults to `0`.
* ticksNumber: number                             - The number of ticks you want displayed on the axes. This defaults to `10`.
* position: 'bottom' | 'top' | 'left' | 'right'   - The position of the axis. This defaults to `'bottom'`.
* spacingDirection: 'horizontal' | 'vertical'
                  | 'left' | 'right'              - The direction to space the axes. This defaults to `'horizontal'`.
* padding: number                                 - The amount of padding between axes, important for either vertically spaced
                                                    vertical axes or horizontally spaced horizontal axes. This defaults to `0`.

#### Events
* For detailed information about dispatches, check the documentation.
-->

<!-- Loop over all the axis and draw them at their corresponding position -->
{#key axisOrder}
  {#each axisGenerator as axis}
    <!-- In placementX: if the column being drawn is being dragged, then add the draggingOffset.
         This value is clamped between half marginLeft and half marginRight so that the user cannot
         drag the axis too far off of the SVG -->
    <Axis
      placementX={axis.column === draggedAxis
        ? Math.min(Math.max($marginLeft / 2, axis.x + draggingOffset), $width - $marginRight / 2)
        : axis.x}
      placementY={axis.y}
      axis={axis.axis}
      {renderLabel}
      {labelPosition}
      labelText={axis.column}
      {labelOffset}
      {fontSize}
      {color}
      {isDraggable}
      on:dragMove
      on:dragMove={onDragMove}
      on:dragStop
      on:dragStop={onDragStop} />
  {/each}
{/key}
