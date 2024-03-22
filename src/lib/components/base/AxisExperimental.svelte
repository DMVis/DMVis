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

  // Private variables
  let placementX: number = 0;
  let placementY: number = 0;
  let axisGenerator: AxisConfig[] = [];
  let axisRefs: SVGGElement[] = [];

  interface AxisConfig {
    axis: d3.Axis<string> | d3.Axis<d3.NumberValue>;
    element: SVGGElement;
    x: number;
    y: number;
  }

  switch (position) {
    case 'top':
      $xScales.forEach((scale, index) => {
        let newAxis;

        if ('padding' in scale) {
          newAxis = d3.axisTop(scale as d3.ScaleBand<string>);
        } else {
          newAxis = d3.axisTop(scale as d3.ScaleLinear<number, number>);
          if (ticks) {
            newAxis = newAxis.tickSizeOuter(0).ticks(ticksNumber);
          } else {
            newAxis = newAxis.tickSize(0);
          }
        }

        if (spacingDirection === 'horizontal') {
          let spacerOffset = Spacer($width, $marginLeft, $marginRight, $xScales.length) * index;
          placementX = offset + spacerOffset;
        } else {
          let spacerOffset = Spacer($height, $marginBottom, $marginTop, $xScales.length) * index;
          placementY = $marginTop + offset + spacerOffset;
        }

        axisGenerator.push({
          axis: newAxis,
          x: placementX,
          y: placementY
        } as AxisConfig);
      });
      break;
    case 'bottom':
      $xScales.forEach((scale, index) => {
        let newAxis;

        if ('padding' in scale) {
          newAxis = d3.axisBottom(scale as d3.ScaleBand<string>);
        } else {
          newAxis = d3.axisBottom(scale as d3.ScaleLinear<number, number>);
          if (ticks) {
            newAxis = newAxis.tickSizeOuter(0).ticks(ticksNumber);
          } else {
            newAxis = newAxis.tickSize(0);
          }
        }

        placementY = $marginTop + Number(offset);

        if (spacingDirection === 'horizontal') {
          let spacerOffset = Spacer($width, $marginLeft, $marginRight, $xScales.length) * index;
          placementX = offset + spacerOffset;
        } else {
          let spacerOffset = Spacer($height, $marginTop, $marginBottom, $xScales.length) * index;
          placementY = $marginBottom + offset + spacerOffset;
        }
        axisGenerator.push({
          axis: newAxis,
          x: placementX * index,
          y: placementY * index
        } as AxisConfig);
      });
      break;
    case 'left':
      $yScales.forEach((scale, index) => {
        let newAxis;

        if ('padding' in scale) {
          newAxis = d3.axisLeft(scale as d3.ScaleBand<string>);
        } else {
          newAxis = d3.axisLeft(scale as d3.ScaleLinear<number, number>);
          if (ticks) {
            newAxis = newAxis.tickSizeOuter(0).ticks(ticksNumber);
          } else {
            newAxis = newAxis.tickSize(0);
          }
        }

        if (spacingDirection === 'horizontal') {
          let spacerOffset = Spacer($width, $marginLeft, $marginRight, $xScales.length) * index;
          placementX = $marginLeft + offset + spacerOffset;
        } else {
          let spacerOffset = Spacer($height, $marginBottom, $marginTop, $xScales.length) * index;
          placementY = 0 + offset + spacerOffset;
        }

        axisGenerator.push({
          axis: newAxis,
          x: placementX,
          y: placementY
        } as AxisConfig);
      });
      break;
    case 'right':
      $yScales.forEach((scale, index) => {
        let newAxis;

        if ('padding' in scale) {
          newAxis = d3.axisRight(scale as d3.ScaleBand<string>);
        } else {
          newAxis = d3.axisRight(scale as d3.ScaleLinear<number, number>);
          if (ticks) {
            newAxis = newAxis.tickSizeOuter(0).ticks(ticksNumber);
          } else {
            newAxis = newAxis.tickSize(0);
          }
        }

        if (spacingDirection === 'horizontal') {
          let spacerOffset = Spacer($width, $marginLeft, $marginRight, $xScales.length) * index;
          placementX = $marginRight + offset + spacerOffset;
        } else {
          let spacerOffset = Spacer($height, $marginBottom, $marginTop, $xScales.length) * index;
          placementY = 0 + offset + spacerOffset;
        }
        axisGenerator.push({
          axis: newAxis,
          x: placementX,
          y: placementY
        } as AxisConfig);
      });
      break;
    default:
      $yScales.forEach((scale, index) => {
        let newAxis;

        if ('padding' in scale) {
          newAxis = d3.axisTop(scale as d3.ScaleBand<string>);
        } else {
          newAxis = d3.axisTop(scale as d3.ScaleLinear<number, number>);
          if (ticks) {
            newAxis = newAxis.tickSizeOuter(0).ticks(ticksNumber);
          } else {
            newAxis = newAxis.tickSize(0);
          }
        }

        if (spacingDirection === 'horizontal') {
          let spacerOffset = Spacer($width, $marginLeft, $marginRight, $xScales.length) * index;
          placementX = $marginBottom + offset + spacerOffset;
        } else {
          let spacerOffset = Spacer($height, $marginBottom, $marginTop, $xScales.length) * index;
          placementY = 0 + offset + spacerOffset;
        }
        axisGenerator.push({
          axis: newAxis,
          x: placementX,
          y: placementY
        } as AxisConfig);
      });
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
-->

{#each axisGenerator as axis}
  <g class="axis" bind:this={axis.element} transform="translate({axis.x}, {axis.y})"></g>
{/each}

<style>
</style>
