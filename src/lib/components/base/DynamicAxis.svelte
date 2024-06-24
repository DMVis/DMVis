<script lang="ts">
  // Imports
  import {
    type ScaleBand,
    type ScalePoint,
    type Axis as AxisType,
    type NumberValue,
    axisTop,
    axisBottom,
    axisLeft,
    axisRight
  } from 'd3';
  import { createEventDispatcher } from 'svelte';

  // DMVis imports
  import type {
    Position,
    Alignment,
    Orientation,
    ScaleLinear,
    UndefineableString
  } from '$lib/Types.js';
  import Axis from '$lib/components/base/Axis.svelte';
  import { DMVisError } from '$lib/utils/DMVisError.js';
  import { getVisualisationContext } from '$lib/utils/Context.js';
  import { spacerEqual, spacerSide } from '$lib/utils/Spacer.js';

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

  // Optional attributes
  export let axisOrder: string[] = [];
  export let squashOuterTicks: boolean = false;
  export let renderLabel: boolean = false;
  export let labelPosition: Position = 'top';
  export let labelOffset: number = 20;
  export let hasTicks: boolean = true;
  export let alignment: Alignment = 'start';
  export let fontSize: number = $styleUtil ? $styleUtil.fontSize : 12;
  export let color: string = 'black';
  export let offset: number = 0;
  export let ticksNumber: number = 10;
  export let position: Position = 'bottom';
  export let spacingDirection: Orientation = 'horizontal';
  export let padding: number = 0;

  export let isDraggable: boolean = false;
  const dispatch = createEventDispatcher();

  // Private variables
  let placementX: number = 0;
  let placementY: number = 0;
  let axisGenerator: AxisConfig[] = [];
  let drawingOrder: string[] = [];
  let drawingIndices: number[] = [];
  let draggedAxis: UndefineableString = undefined;
  let draggingOffset: number = 0;
  // Non-nullable operator because they will be set in createSpacer
  let spacerHorizontal!: ScaleBand<string> | ScalePoint<string>;
  let spacerVertical!: ScaleBand<string> | ScalePoint<string>;
  let spacerStepSizeHorizontal!: number;
  let spacerStepSizeVertical!: number;

  // Create a spacer, which is a scaleBand or scalePoint, which will handle the positions for all the axis
  function createSpacer() {
    drawingOrder = axisOrder.length > 0 ? axisOrder : $columns;
    drawingIndices = drawingOrder.map((attributeName: string) => {
      let index = $columns.indexOf(attributeName);
      if (index === -1) {
        throw DMVisError(
          `'${attributeName}' is not a column name in the columns attribute of your DataUtils instance. Please ensure that the value assigned to the axisOrder parameter only contains column names in your DataUtils instance.`,
          'DynamicAxis'
        );
      }
      return index;
    });
    switch (alignment) {
      // For alignment 'start' and 'end', the spacer is the same
      case 'start':
      case 'end':
        spacerHorizontal = spacerSide(
          $width,
          $marginLeft,
          $marginRight,
          drawingOrder,
          alignment,
          padding
        );
        spacerStepSizeHorizontal = spacerHorizontal.bandwidth();
        spacerVertical = spacerSide(
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
        spacerHorizontal = spacerEqual($width, $marginLeft, $marginRight, drawingOrder, padding);
        spacerVertical = spacerEqual($height, $marginTop, $marginBottom, drawingOrder, padding);
        spacerStepSizeHorizontal = spacerHorizontal.step();
        spacerStepSizeVertical = spacerVertical.step();

        break;
      }
      default:
        throw DMVisError(
          `Cannot assign '${alignment}' to the alignment attribute. Please use: 'start', 'end', or 'spaced'.`,
          'DynamicAxis'
        );
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
    axis: AxisType<string> | AxisType<NumberValue>;
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
          let newAxis!: AxisType<string> | AxisType<NumberValue>;
          // ColumnName is the attribute name of this axis
          let columnName = drawingOrder[index];
          // Scale is the scale of this attribute
          let scale = $xScales[colIndex];

          // Create proper axis
          if ('padding' in scale) {
            // If the scale is a scaleband
            newAxis = axisTop(scale as ScaleBand<string>);
          } else if (spacingDirection === 'vertical') {
            /* If the scale is a scalelinear and vertical spacing
               Note that the range needs to be flipped,
                  this is because the range is flipped by default in the store */
            const oldRange = scale.range();
            newAxis = axisTop(scale.range([oldRange[1], oldRange[0]]) as ScaleLinear);
          } else if (spacingDirection === 'horizontal') {
            // If the scale is a scalelinear and horizontal spacing
            newAxis = axisTop(scale.range([spacerStepSizeHorizontal, 0]) as ScaleLinear);
          } else {
            throw DMVisError(
              `Cannot assign '${spacingDirection}' to the spacingDirection attribute. Please use: 'vertical' or 'horizontal'.`,
              'DynamicAxis'
            );
          }

          // Set the ticks of the scaleLinear axis
          if (hasTicks) {
            newAxis = newAxis.tickSizeOuter(0) as AxisType<NumberValue> | AxisType<string>;
            newAxis = newAxis.ticks(ticksNumber);
          } else {
            newAxis = newAxis.tickSize(0) as AxisType<NumberValue> | AxisType<string>;
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
            throw DMVisError(
              `Cannot assign '${spacingDirection}' to the spacingDirection attribute. Please use: 'vertical' or 'horizontal'.`,
              'DynamicAxis'
            );
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
          let newAxis!: AxisType<string> | AxisType<NumberValue>;
          // ColumnName is the attribute name of this axis
          let columnName = drawingOrder[index];
          // Scale is the scale of this attribute
          let scale = $xScales[colIndex];

          // Create proper axis
          if ('padding' in scale) {
            // If the scale is a scaleband
            newAxis = axisBottom(scale as ScaleBand<string>);
          } else if (spacingDirection === 'vertical') {
            /* If the scale is a scalelinear and vertical spacing
               Note that the range needs to be flipped,
                  this is because the range is flipped by default in the store */
            const oldRange = scale.range();
            newAxis = axisBottom(scale.range([oldRange[1], oldRange[0]]) as ScaleLinear);
          } else if (spacingDirection === 'horizontal') {
            // If the scale is a scalelinear and horizontal spacing
            newAxis = axisBottom(scale.range([spacerStepSizeHorizontal, 0]) as ScaleLinear);
          } else {
            throw DMVisError(
              `Cannot assign '${spacingDirection}' to the spacingDirection attribute. Please use: 'vertical' or 'horizontal'.`,
              'DynamicAxis'
            );
          }

          // Set the ticks of the scaleLinear axis
          if (hasTicks) {
            newAxis = newAxis.tickSizeOuter(0) as AxisType<NumberValue> | AxisType<string>;
            newAxis = newAxis.ticks(ticksNumber);
          } else {
            newAxis = newAxis.tickSize(0) as AxisType<NumberValue> | AxisType<string>;
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
            throw DMVisError(
              `Cannot assign '${spacingDirection}' to the spacingDirection attribute. Please use: 'vertical' or 'horizontal'.`,
              'DynamicAxis'
            );
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
          let newAxis!: AxisType<string> | AxisType<NumberValue>;
          // ColumnName is the attribute name of this axis
          let columnName = drawingOrder[index];
          // Scale is the scale of this attribute
          let scale = $yScales[colIndex];

          // Create proper axis
          if ('padding' in scale) {
            // If the scale is a scaleband
            newAxis = axisLeft(scale as ScaleBand<string>);
          } else if (spacingDirection === 'vertical') {
            // If the scale is a scalelinear and vertical spacing
            newAxis = axisLeft(scale.range([0, spacerStepSizeVertical]) as ScaleLinear);
          } else if (spacingDirection === 'horizontal') {
            // If the scale is a scalelinear and horizontal spacing
            newAxis = axisLeft(scale as ScaleLinear);
          } else {
            throw DMVisError(
              `Cannot assign '${spacingDirection}' to the spacingDirection attribute. Please use: 'vertical' or 'horizontal'.`,
              'DynamicAxis'
            );
          }

          // Set the ticks of the scaleLinear axis
          if (hasTicks) {
            newAxis = newAxis.tickSizeOuter(0) as AxisType<NumberValue> | AxisType<string>;
            newAxis = newAxis.ticks(ticksNumber);
          } else {
            newAxis = newAxis.tickSize(0) as AxisType<NumberValue> | AxisType<string>;
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
            throw DMVisError(
              `Cannot assign '${spacingDirection}' to the spacingDirection attribute. Please use: 'vertical' or 'horizontal'.`,
              'DynamicAxis'
            );
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
          let newAxis!: AxisType<string> | AxisType<NumberValue>;
          // ColumnName is the attribute name of this axis
          let columnName = drawingOrder[index];
          // Scale is the scale of this attribute
          let scale = $yScales[colIndex];

          // Create proper axis
          if ('padding' in scale) {
            // If the scale is a scaleband
            newAxis = axisRight(scale as ScaleBand<string>);
          } else if (spacingDirection === 'vertical') {
            // If the scale is a scalelinear and vertical spacing
            newAxis = axisRight(scale.range([0, spacerStepSizeVertical]) as ScaleLinear);
          } else if (spacingDirection === 'horizontal') {
            // If the scale is a scalelinear and horizontal spacing
            newAxis = axisRight(scale as ScaleLinear);
          } else {
            throw DMVisError(
              `Cannot assign '${spacingDirection}' to the spacingDirection attribute. Please use: 'vertical' or 'horizontal'.`,
              'DynamicAxis'
            );
          }

          // Set the ticks of the scaleLinear axis
          if (hasTicks) {
            newAxis = newAxis.tickSizeOuter(0) as AxisType<NumberValue> | AxisType<string>;
            newAxis = newAxis.ticks(ticksNumber);
          } else {
            newAxis = newAxis.tickSize(0) as AxisType<NumberValue> | AxisType<string>;
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
            throw DMVisError(
              `Cannot assign '${spacingDirection}' to the spacingDirection attribute. Please use: 'vertical' or 'horizontal'.`,
              'DynamicAxis'
            );
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
      // If this point is reached, then the input was not recognised (error)
      // Note that due to TypeScript, this will never happen
      default:
        throw DMVisError(
          `Cannot assign '${position}' to the position attribute. Please use: 'bottom', 'top', 'left', or 'right'.`,
          'DynamicAxis'
        );
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
    draggedAxis = undefined;
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
### DynamicAxis
DynamicAxis is a component used for rendering any number of axes, depending on the given dataset.
By default, it will generate an axis per column in the dataset. This means that for a column with numerical data,
a numerical axis is generated, and for a column with text data, a text axis is generated.
DynamicAxis can generate axes in different orientations. Axes themselves can be both vertical and horizontal, and
the axes can also be placed vertically or horizontally with respect to each other.

This component is made specifically for visualisations that require one or more axes.
If you want to use a single axis, it is recommended to use the Axis component.

#### Optional Attributes
* axisOrder: string[]                           - The order that the axes should be drawn in.
                                                  The array should contain strings identical to column names in the dataset.
                                                  Defaults to `[]`, which draws axes in the order they appear in the dataset.
* squashOuterTicks: boolean                     - Specifies whether or not to tuck in the first and last tick.
                                                  Defaults to `false`.
* alignment: Alignment                          - The alignment of the axes (i.e. the side of the column where the axis is placed).
                                                  Defaults to `'start'`.
* fontSize: number                              - The font size of the tick labels.
                                                  Defaults to `12`.
* color: string                                 - The colour of the axis line. Valid inputs include CSS colours specified as a string.
                                                  Valid inputs include CSS colours specified as a string.
                                                  Defaults to `'black'`.
* renderLabel: boolean                          - Specifies wether a label should be rendered next to the axis.
                                                  Defaults to `false`.
* labelPosition: Position                       - The position of the label relative to the axis.
                                                  Defaults to `'top'`.
* labelOffset: number                           - The distance from the label to the axis in pixels.
                                                  Defaults to `'20'`.
* hasTicks: boolean                             - Specifies whether to display tick marks or not.
                                                  Defaults to `true`.
* offset: number                                - The offset of the axis from the side of the visualisation in pixels.
                                                  Defaults to `0`.
* ticksNumber: number                           - The number of ticks to display on the axes.
                                                  Defaults to `10`.
* position: 'bottom' | 'top' | 'left' | 'right' - The position of the axis.
                                                  Defaults to `'bottom'`.
* spacingDirection: Direction                   - The direction to space the axes.
                                                  Defaults to `'horizontal'`.
* padding: number                               - The amount of padding between axes in pixels.
                                                  This is important for either vertically spaced vertical axes or
                                                  horizontally spaced horizontal axes.
                                                  Defaults to `0`.

#### Events
* Please check the documentation for detailed information about dispatches.
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
      {squashOuterTicks}
      on:dragMove
      on:dragMove={onDragMove}
      on:dragStop
      on:dragStop={onDragStop}
      on:renderAxis />
  {/each}
{/key}
