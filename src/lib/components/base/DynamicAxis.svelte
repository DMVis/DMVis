<script lang="ts">
  import * as d3 from 'd3';
  import { getContext, onMount } from 'svelte';
  import { Spacer } from '$lib/utils/Spacer.js';
  import { VisualisationStore } from '$lib/store.js';

  // Get store information
  const { xScales, yScales, width, height, marginTop, marginRight, marginBottom, marginLeft } =
    getContext<VisualisationStore>('store');

  // Public variables
  export let ticks: boolean = true;
  export let fontSize: number = 10;
  export let color: string = 'black';
  export let offset: number = 0;
  export let ticksNumber: number = 10;
  export let position: 'bottom' | 'top' | 'left' | 'right' = 'bottom';
  export let spacingDirection: 'vertical' | 'horizontal' = 'horizontal';
  export let hasPadding: boolean = false;
  export let startColumn: number = 0;
  export let endColumn: number = $xScales.length;

  // Private variables
  let placementX: number = 0;
  let placementY: number = 0;
  let axisGenerator: AxisConfig[] = [];

  interface AxisConfig {
    axis: d3.Axis<string> | d3.Axis<d3.NumberValue>;
    element: SVGGElement;
    x: number;
    y: number;
  }

  let verticalPadding = hasPadding
    ? ($height -
        $marginTop -
        $marginBottom -
        Spacer($height, $marginBottom, $marginTop, $xScales.length) * ($xScales.length - 1)) /
      ($xScales.length - 2)
    : 0;
  let horizontalPadding = hasPadding
    ? ($width -
        $marginLeft -
        $marginRight -
        Spacer($width, $marginLeft, $marginRight, $yScales.length) * ($yScales.length - 1)) /
      ($yScales.length - 2)
    : 0;

  switch (position) {
    case 'top':
      $xScales.slice(startColumn, endColumn).forEach((scale, index) => {
        let newAxis;

        if ('padding' in scale) {
          newAxis = d3.axisTop(scale as d3.ScaleBand<string>);
        } else {
          if (spacingDirection === 'vertical') {
            newAxis = d3.axisTop(scale as d3.ScaleLinear<number, number>);
          } else {
            newAxis = d3.axisTop(
              scale.range([
                Spacer($height, $marginBottom, $marginTop, $xScales.length),
                0
              ]) as d3.ScaleLinear<number, number>
            );
          }
          if (ticks) {
            newAxis = newAxis.tickSizeOuter(0).ticks(ticksNumber);
          } else {
            newAxis = newAxis.tickSize(0);
          }
        }
        placementY = $marginTop + Number(offset) - 5;
        if (spacingDirection === 'horizontal') {
          let spacerOffset =
            (Spacer($width, $marginLeft, $marginRight, $xScales.length) + horizontalPadding) *
            index;
          placementX = $marginLeft + offset + spacerOffset;
        } else {
          let spacerOffset =
            (Spacer($height, $marginTop, $marginBottom, $xScales.length) + verticalPadding) * index;
          placementY = $marginBottom + offset + spacerOffset;
        }

        axisGenerator.push({
          axis: newAxis,
          x: placementX,
          y: placementY
        } as AxisConfig);
      });
      break;
    case 'bottom':
      $xScales.slice(startColumn, endColumn).forEach((scale, index) => {
        let newAxis;
        if ('padding' in scale) {
          newAxis = d3.axisBottom(scale as d3.ScaleBand<string>);
        } else {
          if (spacingDirection === 'vertical') {
            newAxis = d3.axisBottom(scale as d3.ScaleLinear<number, number>);
          } else {
            newAxis = d3.axisBottom(
              scale.range([
                Spacer($height, $marginBottom, $marginTop, $xScales.length),
                0
              ]) as d3.ScaleLinear<number, number>
            );
          }
          if (ticks) {
            newAxis = newAxis.tickSizeOuter(0).ticks(ticksNumber);
          } else {
            newAxis = newAxis.tickSize(0);
          }
        }

        placementY = $height - $marginBottom - Number(offset) + 5;
        if (spacingDirection === 'horizontal') {
          let spacerOffset =
            (Spacer($width, $marginLeft, $marginRight, $xScales.length) + horizontalPadding) *
            index;
          placementX = $marginLeft + offset + spacerOffset;
        } else {
          let spacerOffset =
            (Spacer($height, $marginTop, $marginBottom, $xScales.length) + verticalPadding) * index;
          placementY = $height - $marginBottom - offset - spacerOffset + 5;
        }
        axisGenerator.push({
          axis: newAxis,
          x: placementX,
          y: placementY
        } as AxisConfig);
      });
      break;
    case 'left':
      $yScales.slice(startColumn, endColumn).forEach((scale, index) => {
        let newAxis;
        if ('padding' in scale) {
          newAxis = d3.axisLeft(scale as d3.ScaleBand<string>);
        } else {
          if (spacingDirection === 'horizontal') {
            newAxis = d3.axisLeft(scale as d3.ScaleLinear<number, number>);
          } else {
            newAxis = d3.axisLeft(
              scale.range([
                0,
                Spacer($height, $marginBottom, $marginTop, $xScales.length)
              ]) as d3.ScaleLinear<number, number>
            );
          }
          if (ticks) {
            newAxis = newAxis.tickSizeOuter(0).ticks(ticksNumber);
          } else {
            newAxis = newAxis.tickSize(0);
          }
        }
        if (spacingDirection === 'horizontal') {
          let spacerOffset =
            (Spacer($width, $marginLeft, $marginRight, $xScales.length) + horizontalPadding) *
            index;
          placementX = $marginLeft + offset + spacerOffset;
        } else {
          placementX = $marginLeft - 5;
          let spacerOffset =
            (Spacer($height, $marginBottom, $marginTop, $xScales.length) + verticalPadding) * index;
          placementY = $marginTop + offset + spacerOffset;
        }

        axisGenerator.push({
          axis: newAxis,
          x: placementX,
          y: placementY
        } as AxisConfig);
      });
      break;
    case 'right':
      $yScales.slice(startColumn, endColumn).forEach((scale, index) => {
        let newAxis;

        if ('padding' in scale) {
          newAxis = d3.axisRight(scale as d3.ScaleBand<string>);
        } else {
          if (spacingDirection === 'horizontal') {
            newAxis = d3.axisRight(scale as d3.ScaleLinear<number, number>);
          } else {
            newAxis = d3.axisRight(
              scale.range([
                0,
                Spacer($height, $marginBottom, $marginTop, $xScales.length)
              ]) as d3.ScaleLinear<number, number>
            );
          }
          if (ticks) {
            newAxis = newAxis.tickSizeOuter(0).ticks(ticksNumber);
          } else {
            newAxis = newAxis.tickSize(0);
          }
        }

        if (spacingDirection === 'horizontal') {
          let spacerOffset =
            (Spacer($width, $marginLeft, $marginRight, $xScales.length) + horizontalPadding) *
            index;
          placementX = $width - $marginRight - offset - spacerOffset;
        } else {
          placementX = $width - $marginRight + 5;
          let spacerOffset =
            (Spacer($height, $marginBottom, $marginTop, $xScales.length) + verticalPadding) * index;
          placementY = $marginTop + offset + spacerOffset;
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
  * fontSize: number                                - The font size of the tick labels. Defaults to 17.
  * color: string                                   - The color of the axis line. Defaults to 'black'.
  * ticks: boolean                                  - Whether to display tick marks. Defaults to true.
  * offset: number                                  - The offset of the axis from the side of the graph. Defaults to 0.
  * ticksNumber: number                             - The number of ticks you want displayed on the axes, defaults to 10
  * position: 'bottom' | 'top' | 'left' | 'right'   - The position of the axis. Defaults to 'bottom'.
  * spacerDirection: 'horizontal' | 'vertical' | 'left' | 'right'   - The direction to space the axes. Defaults to 'horizontal'.
  * hasPadding: boolean                             - Does the visualisation include padding
  * startColumn: number                             - Index of first column that is drawn, starting from 0
  * endColumn: number                               - Index of last column that is drawn, defaults to last one
-->

{#each axisGenerator as axis}
  <g class="axis" bind:this={axis.element} transform="translate({axis.x}, {axis.y})"></g>
{/each}

<style>
</style>
