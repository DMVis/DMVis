<script lang="ts">
  import * as d3 from 'd3';
  import { getContext } from 'svelte';
  import { VisualisationStore } from '$lib/store.js';
  import { Spacer } from '$lib/utils/Spacer.js';

  // Get store information
  const { xScales, yScales, width, height, marginTop, marginRight, marginBottom } =
    new VisualisationStore();

  // Public variables
  export let ticks: boolean = true;
  export let fontSize: number = 17;
  export let color: string = 'black';
  export let offset: number = 0;
  export let ticksNumber: number = 10;
  export let position: 'bottom' | 'top' | 'left' | 'right' = 'bottom';
  export let spacingDirection: 'vertical' | 'horizontal' = 'horizontal';

  // Private variables
  let placementX: number = 0;
  let placementY: number = 0;
  let axisElement: SVGGElement;

  interface AxisConfig {
    axis: d3.Axis<string> | d3.Axis<d3.NumberValue>;
    x: number;
    y: number;
  }

  // Update the axis using reactive statements
  $: {
    // Create the axis generator
    let axisGenerator: AxisConfig[] = [];

    // Decide the placement and axis-type of the axis based on the position
    switch (position) {
      case 'top':
        $xScales.forEach((scale, index) => {
          let newAxisConfig: AxisConfig;
          let newAxis;

          if (scale instanceof d3.scaleBand) {
            newAxis = d3.axisTop(scale as d3.ScaleBand<string>);
          } else {
            newAxis = d3.axisTop(scale as d3.ScaleLinear<number, number>);
          }

          placementY = $marginTop + Number(offset);

          if (spacingDirection === 'horizontal') {
            let spacerOffset = Spacer($width, $marginRight, $xScales.length) * index;
            placementX = 0 + offset + spacerOffset;
          } else {
            let spacerOffset = Spacer($height, $marginBottom, $xScales.length) * index;
            placementY = $marginTop + offset + spacerOffset;
          }
          axisGenerator.push(
            (newAxisConfig = {
              axis: newAxis,
              x: placementX * index,
              y: placementY * index
            })
          );
        });
        break;
      case 'bottom':
        placementY = Number($height) - Number($marginBottom) + Number(offset);
        if (scale instanceof d3.scaleBand) {
          axisGenerator = d3.axisBottom(scale as d3.ScaleBand<string>);
        } else {
          axisGenerator = d3.axisBottom(scale as d3.ScaleLinear<number, number>);
        }
        break;
      case 'left':
        placementX = Number($marginLeft) + Number(offset);
        if (scale instanceof d3.scaleBand) {
          axisGenerator = d3.axisLeft(scale as d3.ScaleBand<string>);
        } else {
          axisGenerator = d3.axisLeft(scale as d3.ScaleLinear<number, number>);
        }
        break;
      case 'right':
        placementX = Number($marginRight) + Number(offset);
        if (scale instanceof d3.scaleBand) {
          axisGenerator = d3.axisRight(scale as d3.ScaleBand<string>);
        } else {
          axisGenerator = d3.axisRight(scale as d3.ScaleLinear<number, number>);
        }
        break;
      default:
        placementX = Number($height) - Number($marginBottom) + Number(offset);
        if (scale instanceof d3.scaleBand) {
          axisGenerator = d3.axisBottom(scale as d3.ScaleBand<string>);
        } else {
          axisGenerator = d3.axisBottom(scale as d3.ScaleLinear<number, number>);
        }
    }

    // Set the tick size and number of ticks
    if (scale instanceof d3.scaleLinear) {
      axisGenerator = axisGenerator as d3.Axis<d3.NumberValue>;
      if (ticks) {
        axisGenerator = axisGenerator.tickSizeOuter(0).ticks(ticksNumber);
      } else {
        axisGenerator = axisGenerator.tickSize(0);
      }
    }

    // Render the axis
    d3.select(axisElement)
      .call(axisGenerator)
      .selectAll('text')
      .style('font-size', `${fontSize}px`)
      .style('color', color);
  }
</script>

<!--
@component
### Axis
The Axis component renders the axis of a chart with the tick on the bottom.
It displays tick marks and labels based on provided data.
You can use this component to render the axis on the top, bottom, left, or right side of the graph.

#### Optional attributes
  * fontSize: number                                - The font size of the tick labels. Defaults to 17.
  * color: string                                   - The color of the axis line. Defaults to 'black'.
  * ticks: boolean                                  - Whether to display tick marks. Defaults to true.
  * offset: number                                  - The offset of the axis from the side of the graph. Defaults to 0.
  * ticksNumber: number                             - The number of ticks you want displayed on the axes, defaults to 10
  * position: 'bottom' | 'top' | 'left' | 'right'   - The position of the axis. Defaults to 'bottom'.
-->

<g bind:this={axisElement} transform="translate({placementX}, {placementY})"></g>

<style>
</style>
