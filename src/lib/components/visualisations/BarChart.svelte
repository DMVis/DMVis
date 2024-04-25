<script lang="ts">
  // Imports
  import * as d3 from 'd3';

  // DMVis imports
  import Bar from '$lib/components/base/Bar.svelte';
  import Axis from '$lib/components/base/Axis.svelte';
  import { OriginX, OriginY } from '$lib/Enums.js';

  // Required attributes
  export let width: number;
  export let height: number;
  export let data: { label: string; value: number }[];

  // Optional attributes
  export let minValue: number = 0;
  export let maxValue: number = d3.max(data.map((data) => data.value)) ?? 0;
  export let isVertical: boolean = false;
  export let ticks: number = 10;
  export let showLeftAxis: boolean = true;
  export let showBottomAxis: boolean = true;
  export let marginLeft: number = 40;
  export let marginRight: number = 40;
  export let marginBottom: number = 40;
  export let marginTop: number = 40;
  export let padding: number = 0.2;
  export let color: string = 'blue';
  export let opacity: number | string = 1;
  export let radiusX: number | string = 5;
  export let radiusY: number | string = 5;

  // Private attributes
  const values = data.map((data) => data.label);
  let positionScale: d3.ScaleBand<string>;
  let barScale: d3.ScaleLinear<number, number>;

  // Horizontal BarChart
  if (!isVertical) {
    positionScale = d3
      .scaleBand()
      .domain(values)
      .range([height - marginBottom, marginTop])
      .padding(padding);
    barScale = d3
      .scaleLinear()
      .domain([minValue, maxValue])
      .range([0, width - marginLeft - marginRight]);

    // Vertical BarChart
  } else {
    positionScale = d3
      .scaleBand()
      .domain(values)
      .range([marginLeft, width - marginRight])
      .padding(padding);
    barScale = d3
      .scaleLinear()
      .domain([minValue, maxValue])
      .range([height - marginTop - marginBottom, 0]);
  }
</script>

<!--
@component
### BarChart
This is visualisation that represents categorical data with rectangular bars.
The length of each bar corresponds to the numerical value of the data being represented.
Depending on if the `BarChart` should be horizontal or vertical, the axes can have different meanings.
One axis has the categorical data, which represents a data entry.
The other axis should go in the diraction of the length of the bars and have the numerical values.

#### Required attributes
* width: number                            - Width of the visualisation.
* height: number                           - Height of the visualisation.
* data: { label: string; value: number }[] - List of bars.

#### Optional attributes
* minValue: number                 - Minimum value of the numerical length of bar.
* maxValue: number                 - Maximum value of the numerical length of bar.
* isVertical: boolean              - Orients the BarChart Vertically when true.
* ticks: number = 10;              - Specifies the number of ticks for the value axis.
* showLeftAxis: boolean = true;    - Toggle left axis.
* showBottomAxis: boolean = true;  - Toggle bottom axis.
* marginLeft: number               - Margin to the left of the visualisation.
* marginRight: number              - Margin to the right of the visualisation.
* marginTop: number                - Margin to the top of the visualisation.
* marginBottom: number             - Margin to the bottom of the visualisation.
* padding: number                  - Value for the distance between each bar in the range [0..1].
* color: string = 'blue'           - Color of each bar.
* opacity: number | string         - Opacity of each bar as a number in range [0..1] or
                                     a percentage string formatted as '{number}%'.
* radiusX: number | string         - Horizontal corner radius of each bar as a number in range [0..1] or
                                     a percentage string formatted as '{number}%'.
* radiusY: number | string         - Vertical corner radius of each bar as a number in range [0..1] or
                                     a percentage string formatted as '{number}%'.
-->
<svg class="visualisation barchart" {width} {height}>
  {#key data}
    <!-- Loop over all data, and plot a bar for each point -->
    {#each data as bar}
      {#if !isVertical}
        <Bar
          x={marginLeft}
          y={positionScale(bar.label) ?? 0}
          width={positionScale.bandwidth()}
          height={barScale(bar.value)}
          isVertical={false}
          originX={OriginX.Left}
          originY={OriginY.Top}
          {color}
          {opacity}
          {radiusX}
          {radiusY} />
      {:else}
        <Bar
          x={positionScale(bar.label) ?? 0}
          y={height - marginBottom}
          width={positionScale.bandwidth()}
          height={barScale(maxValue - bar.value)}
          isVertical={true}
          originX={OriginX.Left}
          originY={OriginY.Bottom}
          {color}
          {opacity}
          {radiusX}
          {radiusY} />
      {/if}
    {/each}
  {/key}

  <!-- Axis orientation for Horizontal BarChart -->
  {#if !isVertical}
    <!-- Horizontal Axis -->
    {#if showBottomAxis}
      <Axis
        placementX={marginLeft}
        placementY={height - marginBottom}
        axis={d3.axisBottom(barScale).ticks(ticks)} />
    {/if}

    {#if showLeftAxis}
      <!-- Vertical Axis -->
      <Axis placementX={marginLeft} placementY={0} axis={d3.axisLeft(positionScale)} />
    {/if}

    <!-- Axis orientation for Vertical BarChart -->
  {:else}
    <!-- Horizontal Axis -->
    {#if showBottomAxis}
      <Axis placementX={0} placementY={height - marginBottom} axis={d3.axisBottom(positionScale)} />
    {/if}

    <!-- Vertical Axis -->
    {#if showLeftAxis}
      <Axis
        placementX={marginLeft}
        placementY={marginTop}
        axis={d3.axisLeft(barScale).ticks(ticks)} />
    {/if}
  {/if}
</svg>