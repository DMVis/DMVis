<script lang="ts">
  import * as d3 from 'd3';
  import { getContext, onMount } from 'svelte';
  import { SpacerEqual, SpacerSide } from '$lib/utils/Spacer.js';
  import { VisualisationStore } from '$lib/store.js';

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
  switch (alignment) {
    case 'start':
    case 'end':
      spacer = SpacerSide($width, $marginLeft, $marginRight, $columns, alignment);
      break;
    case 'spaced': {
      spacer = SpacerEqual($width, $marginLeft, $marginRight, $columns);
      break;
    }
    default:
      throw new Error('Invalid alignment provided.');
  }

  interface AxisConfig {
    axis: d3.Axis<string> | d3.Axis<d3.NumberValue>;
    element: SVGGElement;
    x: number;
    y: number;
  }

  let verticalPadding = hasPadding
    ? ($height - $marginTop - $marginBottom - spacer.step() * ($columns.length - 1)) /
      ($columns.length - 2)
    : 0;
  let horizontalPadding = hasPadding
    ? ($width - $marginLeft - $marginRight - spacer.step() * ($columns.length - 1)) /
      ($columns.length - 2)
    : 0;
  let xScalesToDraw = $xScales.slice(startColumn, endColumn);
  let yScalesToDraw = $yScales.slice(startColumn, endColumn);

  switch (position) {
    case 'top':
      xScalesToDraw.forEach((scale, index) => {
        let newAxis;

        if ('padding' in scale) {
          newAxis = d3.axisTop(scale as d3.ScaleBand<string>);
        } else {
          if (spacingDirection === 'vertical') {
            newAxis = d3.axisTop(scale as d3.ScaleLinear<number, number>);
          } else {
            newAxis = d3.axisTop(
              scale.range([
                spacer.step() - customPadding + customPadding / $columns.length,
                0
              ]) as d3.ScaleLinear<number, number>
            );
          }
          if (hasTicks) {
            newAxis = newAxis.tickSizeOuter(0).ticks(ticksNumber);
          } else {
            newAxis = newAxis.tickSize(0);
          }
        }
        placementY = $marginTop + Number(offset) - 5;
        if (spacingDirection === 'horizontal') {
          placementX = offset + spacer($columns[index])! + horizontalPadding * index;
        } else {
          placementY = offset + spacer($columns[index])! + verticalPadding * index;
        }

        axisGenerator.push({
          axis: newAxis,
          x: placementX,
          y: placementY
        } as AxisConfig);
      });
      break;
    case 'bottom':
      xScalesToDraw.forEach((scale, index) => {
        let newAxis;
        if ('padding' in scale) {
          newAxis = d3.axisBottom(scale as d3.ScaleBand<string>);
        } else {
          if (spacingDirection === 'vertical') {
            newAxis = d3.axisBottom(scale as d3.ScaleLinear<number, number>);
          } else {
            newAxis = d3.axisBottom(
              scale.range([spacer.step(), 0]) as d3.ScaleLinear<number, number>
            );
          }
          if (hasTicks) {
            newAxis = newAxis.tickSizeOuter(0).ticks(ticksNumber);
          } else {
            newAxis = newAxis.tickSize(0);
          }
        }

        placementY = $height - $marginBottom - Number(offset) + 5;
        if (spacingDirection === 'horizontal') {
          placementX = offset + spacer($columns[index])! + horizontalPadding * index;
        } else {
          placementY = offset - spacer($columns[index])! - verticalPadding * index + 5;
        }
        axisGenerator.push({
          axis: newAxis,
          x: placementX,
          y: placementY
        } as AxisConfig);
      });
      break;
    case 'left':
      yScalesToDraw.forEach((scale, index) => {
        let newAxis;
        if ('padding' in scale) {
          newAxis = d3.axisLeft(scale as d3.ScaleBand<string>);
        } else {
          if (spacingDirection === 'horizontal') {
            newAxis = d3.axisLeft(scale as d3.ScaleLinear<number, number>);
          } else {
            newAxis = d3.axisLeft(
              scale.range([0, spacer.step()]) as d3.ScaleLinear<number, number>
            );
          }
          if (hasTicks) {
            newAxis = newAxis.tickSizeOuter(0).ticks(ticksNumber);
          } else {
            newAxis = newAxis.tickSize(0);
          }
        }
        if (spacingDirection === 'horizontal') {
          placementX = offset + spacer($columns[index])! + horizontalPadding * index;
        } else {
          placementX = $marginLeft - 5;
          placementY = offset + spacer($columns[index])! + verticalPadding * index;
        }
        axisGenerator.push({
          axis: newAxis,
          x: placementX,
          y: placementY
        } as AxisConfig);
      });
      break;
    case 'right':
      yScalesToDraw.forEach((scale, index) => {
        let newAxis;
        if ('padding' in scale) {
          newAxis = d3.axisRight(scale as d3.ScaleBand<string>);
        } else {
          if (spacingDirection === 'horizontal') {
            newAxis = d3.axisRight(scale as d3.ScaleLinear<number, number>);
          } else {
            newAxis = d3.axisRight(
              scale.range([0, spacer.step()]) as d3.ScaleLinear<number, number>
            );
          }
          if (hasTicks) {
            newAxis = newAxis.tickSizeOuter(0).ticks(ticksNumber);
          } else {
            newAxis = newAxis.tickSize(0);
          }
        }

        if (spacingDirection === 'horizontal') {
          placementX = $width - offset - spacer($columns[index])! - horizontalPadding * index;
        } else {
          placementX = $width - $marginRight + 5;
          placementY = offset + spacer($columns[index])! + verticalPadding * index;
        }
        axisGenerator.push({
          axis: newAxis,
          x: placementX,
          y: placementY
        } as AxisConfig);
      });
      break;
    default:
      throw new Error('Invalid axis position');
  }

  onMount(() => {
    // Render the axis
    axisGenerator.forEach((axis) => {
      d3.select(axis.element)
        .call(axis.axis)
        .selectAll('text')
        .style('font-size', `${fontSize}px`)
        .style('color', color);
    });
  });
</script>

<!--
@component
### AxisExperimental
The AxisExperimental component renders the axes based on the data.
It displays tick marks and labels based on provided data.
You can use this component to render the axis on the top, bottom, left, or right side of the visualisation.

#### Optional attributes
  * alignment: 'start' | 'end' | 'spaced'           - Alignment of the axes (side of the column where the axis is placed). Defaults to 'start'.
  * fontSize: number                                - The font size of the tick labels. Defaults to 10.
  * color: string                                   - The color of the axis line. Defaults to 'black'.
  * hasTicks: boolean                               - Whether to display tick marks. Defaults to true.
  * offset: number                                  - The offset of the axis from the side of the visualisation. Defaults to 0.
  * ticksNumber: number                             - The number of ticks you want displayed on the axes, defaults to 10
  * position: 'bottom' | 'top' | 'left' | 'right'   - The position of the axis. Defaults to 'bottom'.
  * spacingDirection: 'horizontal' | 'vertical'
                    | 'left' | 'right'              - The direction to space the axes. Defaults to 'horizontal'.
  * hasPadding: boolean                             - Does the visualisation include padding
  * startColumn: number                             - Index of first column that is drawn, starting from 0
  * endColumn: number                               - Index of last column that is drawn, defaults to last one
  * customPadding: number                           - Custom padding between columns, defaults to 0
-->

{#each axisGenerator as axis}
  <g class="axis" bind:this={axis.element} transform="translate({axis.x}, {axis.y})"></g>
{/each}

<style>
</style>
