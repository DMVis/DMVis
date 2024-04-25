<script lang="ts">
  // Imports
  import * as d3 from 'd3';
  import { getContext } from 'svelte';

  // DMVis imports
  import { VisualisationStore } from '$lib/store.js';
  import { ThrowError } from '$lib/utils/ThrowError.js';
  import { SpacerEqual, SpacerSide } from '$lib/utils/Spacer.js';
  import Axis from '$lib/components/base/Axis.svelte';

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
  } = getContext<VisualisationStore>('store');

  // Public variables
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
  export let hasPadding: boolean = false;
  export let startColumn: number = 0;
  export let endColumn: number = $xScales.length;
  export let customPadding: number = 0;

  // Private variables
  let placementX: number = 0;
  let placementY: number = 0;
  let axisGenerator: AxisConfig[] = [];
  let spacer: d3.ScaleBand<string> | d3.ScalePoint<string>;

  // Create a spacer, which is a scaleBand or scalePoint, which will handle the positions for all the axis
  switch (alignment) {
    // For alignment 'start' and 'end', the spacer is the same
    case 'start':
    case 'end':
      spacer = SpacerSide($width, $marginLeft, $marginRight, $columns, alignment);
      break;
    case 'spaced': {
      spacer = SpacerEqual($width, $marginLeft, $marginRight, $columns);
      break;
    }
    default:
      throw ThrowError('Error', 'Invalid alignment provided.', 'DynamicAxis');
  }

  interface AxisConfig {
    column: string;
    axis: d3.Axis<string> | d3.Axis<d3.NumberValue>;
    x: number;
    y: number;
  }

  // Calculate vertical padding based on the total height and the height of all the axis
  // If hasPadding is false, this will be 0
  let verticalPadding = hasPadding
    ? ($height - $marginTop - $marginBottom - spacer.step() * ($columns.length - 1)) /
      ($columns.length - 2)
    : 0;
  // Calculate horizontal padding based on the total width and the width of all the axis
  // If hasPadding is false, this will be 0
  let horizontalPadding = hasPadding
    ? ($width - $marginLeft - $marginRight - spacer.step() * ($columns.length - 1)) /
      ($columns.length - 2)
    : 0;

  // From all the scales, select only those specified by the user
  let xScalesToDraw = $xScales.slice(startColumn, endColumn);
  let yScalesToDraw = $yScales.slice(startColumn, endColumn);

  // Every different position will require a different axis to be drawn
  $: {
    switch (position) {
      case 'top':
        // For the top axis, loop over all the xScales and draw an axis for each of them
        xScalesToDraw.forEach((scale, index) => {
          let newAxis;

          if ('padding' in scale) {
            // If the scale is a scaleband
            newAxis = d3.axisTop(scale as d3.ScaleBand<string>);
          } else {
            // If the scale is a scaleLinear
            if (spacingDirection === 'vertical') {
              newAxis = d3.axisTop(scale as d3.ScaleLinear<number, number>);
            } else {
              // If the spacing direction is horizontal, re-calculate the lEngth of the axis
              newAxis = d3.axisTop(
                scale.range([
                  spacer.step() - customPadding + customPadding / $columns.length,
                  0
                ]) as d3.ScaleLinear<number, number>
              );
            }
            // Set the ticks of the scaleLinear axis
            if (hasTicks) {
              newAxis = newAxis.tickSizeOuter(0).ticks(ticksNumber);
            } else {
              newAxis = newAxis.tickSize(0);
            }
          } // End of if-else statement about scaleBand vs scaleLinear

          // Place the top-axis at the top margin plus some offset to make it not overlap with the visualisation
          placementY = $marginTop + Number(offset) - 5;

          // Edit the placement depending on the spacing direction
          if (spacingDirection === 'horizontal') {
            placementX = offset + spacer($columns[index])! + horizontalPadding * index;
          } else {
            placementY = offset + spacer($columns[index])! + verticalPadding * index;
          }

          axisGenerator.push({
            column: $columns[startColumn + index],
            axis: newAxis,
            x: placementX,
            y: placementY
          } as AxisConfig);
        });
        break;

      case 'bottom':
        // For the bottom axis, loop over all the xScales and draw an axis for each of them
        xScalesToDraw.forEach((scale, index) => {
          let newAxis;

          if ('padding' in scale) {
            // If the scale is a scaleBand
            newAxis = d3.axisBottom(scale as d3.ScaleBand<string>);
          } else {
            // If the scale is a scaleLinear
            if (spacingDirection === 'vertical') {
              newAxis = d3.axisBottom(scale as d3.ScaleLinear<number, number>);
            } else {
              // If the spacing direction is horizontal, re-calculate the length of the axis
              newAxis = d3.axisBottom(
                scale.range([spacer.step(), 0]) as d3.ScaleLinear<number, number>
              );
            }

            // Set the correct amount of ticks on the scaleLinear axis
            if (hasTicks) {
              newAxis = newAxis.tickSizeOuter(0).ticks(ticksNumber);
            } else {
              newAxis = newAxis.tickSize(0);
            }
          } // End of if-else statement about scaleBand vs scaleLinear

          // Place the bottom axis at the bottom margin + some offset
          placementY = $height - $marginBottom - Number(offset) + 5;

          // Edit the placement based on the spacing direction
          if (spacingDirection === 'horizontal') {
            placementX = offset + spacer($columns[index])! + horizontalPadding * index;
          } else {
            placementY = offset - spacer($columns[index])! - verticalPadding * index + 5;
          }

          axisGenerator.push({
            column: $columns[startColumn + index],
            axis: newAxis,
            x: placementX,
            y: placementY
          } as AxisConfig);
        });
        break;

      case 'left':
        // For the left axis, loop over all the yScales and draw an axis for each of them
        yScalesToDraw.forEach((scale, index) => {
          let newAxis;

          if ('padding' in scale) {
            // If the scale is a scaleBand
            newAxis = d3.axisLeft(scale as d3.ScaleBand<string>);
          } else {
            // If the scale is a scaleLinear
            if (spacingDirection === 'horizontal') {
              newAxis = d3.axisLeft(scale as d3.ScaleLinear<number, number>);
            } else {
              // If the spacing direction is vertical , re-calculate the length of the axis
              newAxis = d3.axisLeft(
                scale.range([0, spacer.step()]) as d3.ScaleLinear<number, number>
              );
            }

            // Set the correct amount of ticks for the scaleLinear axis
            if (hasTicks) {
              newAxis = newAxis.tickSizeOuter(0).ticks(ticksNumber);
            } else {
              newAxis = newAxis.tickSize(0);
            }
          } // End of if-else statement about scaleBand vs scaleLinear

          // Depending on the spacing directions, modify the placement
          if (spacingDirection === 'horizontal') {
            placementX = offset + spacer($columns[index])! + horizontalPadding * index;
          } else {
            placementX = $marginLeft - 5;
            placementY = offset + spacer($columns[index])! + verticalPadding * index;
          }

          axisGenerator.push({
            column: $columns[startColumn + index],
            axis: newAxis,
            x: placementX,
            y: placementY
          } as AxisConfig);
        });
        break;

      case 'right':
        // For the right axis, loop over all the yScales and draw an axis for each of them
        yScalesToDraw.forEach((scale, index) => {
          let newAxis;

          if ('padding' in scale) {
            // If the scale is a scaleBand
            newAxis = d3.axisRight(scale as d3.ScaleBand<string>);
          } else {
            // If the scale is a scaleLinear
            if (spacingDirection === 'horizontal') {
              newAxis = d3.axisRight(scale as d3.ScaleLinear<number, number>);
            } else {
              // If the spacing direction is vertical , re-calculate the length of the axis
              newAxis = d3.axisRight(
                scale.range([0, spacer.step()]) as d3.ScaleLinear<number, number>
              );
            }

            // Set the correct amount of ticks for the scaleLinear axis
            if (hasTicks) {
              newAxis = newAxis.tickSizeOuter(0).ticks(ticksNumber);
            } else {
              newAxis = newAxis.tickSize(0);
            }
          } // End of if-else statement about scaleBand vs scaleLinear

          // Depending on the spacing directions, modify the placement
          if (spacingDirection === 'horizontal') {
            placementX = $width - offset - spacer($columns[index])! - horizontalPadding * index;
          } else {
            placementX = $width - $marginRight + 5;
            placementY = offset + spacer($columns[index])! + verticalPadding * index;
          }

          axisGenerator.push({
            column: $columns[startColumn + index],
            axis: newAxis,
            x: placementX,
            y: placementY
          } as AxisConfig);
        });
        break;

      // If this point is reached, the input was not recognised. So throw an error
      // Note that due to TypeScript, this will never happen
      default:
        throw ThrowError('Error', 'Invalid axis position', 'DynamicAxis');
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
  * alignment: 'start' | 'end' | 'spaced'           - Alignment of the axes (i.e. the side of the column where the axis is placed).
                                                      Defaults to `'start'`.
  * fontSize: number                                - Font size of the tick labels. Defaults to `12`.
  * color: string                                   - Color of the axis line. Defaults to `'black'`.
  * renderLabel: boolean                            - Renders a label next to the axis. Defaults to `false`.
  * labelPosition: 'left' | 'right' | 'top' | 'bottom'  - Position of the label relative to the axis. Defaults to `'top'`.
  * labelOffset: number                             - Distance from the label to the axis. Defaults to `'20'`.
  * hasTicks: boolean                               - Whether to display tick marks. Defaults to `true`.
  * offset: number                                  - The offset of the axis from the side of the visualisation. Defaults to `0`.
  * ticksNumber: number                             - The number of ticks you want displayed on the axes. Defaults to `10`.
  * position: 'bottom' | 'top' | 'left' | 'right'   - The position of the axis. Defaults to `'bottom'`.
  * spacingDirection: 'horizontal' | 'vertical'
                    | 'left' | 'right'              - The direction to space the axes. Defaults to `'horizontal'`.
  * hasPadding: boolean                             - Whether the visualisation includes padding. Defaults to `true`.
  * startColumn: number                             - Index of first column that is drawn, starting from 0. Defaults to `0`.
  * endColumn: number                               - Index of last column that is drawn. Defaults to the last column.
  * customPadding: number                           - Custom padding between columns. Defaults to `0`.
-->

<!-- Loop over all the axis and draw them at their corresponding position -->
{#each axisGenerator as axis}
  <Axis
    placementX={axis.x}
    placementY={axis.y}
    axis={axis.axis}
    {renderLabel}
    {labelPosition}
    labelText={axis.column}
    {labelOffset}
    {fontSize}
    {color} />
{/each}
