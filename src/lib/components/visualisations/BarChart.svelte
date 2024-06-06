<script lang="ts">
  // Imports
  import { type ScaleBand, scaleBand, scaleLinear, max, axisLeft, axisBottom } from 'd3';

  // DMVis imports
  import Bar from '$lib/components/base/Bar.svelte';
  import Axis from '$lib/components/base/Axis.svelte';
  import { OriginX, OriginY } from '$lib/Enums.js';
  import type { Opacity, ScaleLinear } from '$lib/Types.js';

  // Required attributes
  export let width: number;
  export let height: number;
  export let data: { label: string; value: number }[];

  // Optional attributes
  export let minValue: number = 0;
  export let maxValue: number = max(data.map((data) => data.value)) ?? 0;
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
  export let opacity: Opacity = 1;
  export let borderRadius: number = 5;

  // Private attributes
  const values = data.map((data) => data.label);
  let positionScale: ScaleBand<string>;
  let barScale: ScaleLinear;

  // Horizontal BarChart
  if (!isVertical) {
    positionScale = scaleBand()
      .domain(values)
      .range([height - marginBottom, marginTop])
      .padding(padding);
    barScale = scaleLinear()
      .domain([minValue, maxValue])
      .range([0, width - marginLeft - marginRight]);
    // Vertical BarChart
  } else {
    positionScale = scaleBand()
      .domain(values)
      .range([marginLeft, width - marginRight])
      .padding(padding);
    barScale = scaleLinear()
      .domain([minValue, maxValue])
      .range([height - marginTop - marginBottom, 0]);
  }
</script>

<!--
@component
### BarChart
This is a visualisation that represents categorical data with rectangular bars.
The length of each bar corresponds to the numerical value of the data being represented.
The axes have different meanings depending on `isVertical`.
One axis has categorical data, which represents a data entry, whereas
the other axis goes in the direction of the length of the bars and has numerical values.

#### Required attributes
* width: number                            - Width of the visualisation.
* height: number                           - Height of the visualisation.
* data: { label: string; value: number }[] - List of bars.

#### Optional attributes
* minValue: number                 - Minimum value of the numerical length of each bar.
* maxValue: number                 - Maximum value of the numerical length of each bar.
* isVertical: boolean              - Orients `BarChart` vertically as opposed to horizontally if `true`.
* ticks: number = 10;              - Number of ticks on the value axis.
* showLeftAxis: boolean = true;    - Whether the left axis is visible.
* showBottomAxis: boolean = true;  - Whether the bottom axis is visible.
* marginLeft: number               - Margin to the left of the visualisation.
* marginRight: number              - Margin to the right of the visualisation.
* marginTop: number                - Margin to the top of the visualisation.
* marginBottom: number             - Margin to the bottom of the visualisation.
* padding: number                  - Value for the distance between each bar in the range [0..1].
* color: string = 'blue'           - Colour of each bar.
* opacity: number | string         - Opacity of each bar as a number in the range [0..1] or
                                     a percentage string formatted as '{number}%'.
* borderRadius: number             - Border radius of each bar in pixels. This defaults to `0`.
-->
<svg class="visualisation barchart" {width} {height}>
  {#key data}
    <!-- Loop over all data, and plot a bar for each point -->
    {#each data as bar}
      {#if !isVertical}
        <Bar
          x={marginLeft}
          y={positionScale(bar.label) ?? 0}
          barWidth={positionScale.bandwidth()}
          value={barScale(bar.value)}
          isVertical={false}
          originX={OriginX.Left}
          originY={OriginY.Top}
          {color}
          {opacity}
          {borderRadius} />
      {:else}
        <Bar
          x={positionScale(bar.label) ?? 0}
          y={height - marginBottom}
          barWidth={positionScale.bandwidth()}
          value={barScale(maxValue - bar.value)}
          isVertical={true}
          originX={OriginX.Left}
          originY={OriginY.Bottom}
          {color}
          {opacity}
          {borderRadius} />
      {/if}
    {/each}
  {/key}

  <!-- Axis orientation for horizontal BarChart -->
  {#if !isVertical}
    <!-- Horizontal Axis -->
    {#if showBottomAxis}
      <Axis
        placementX={marginLeft}
        placementY={height - marginBottom}
        axis={axisBottom(barScale).ticks(ticks)} />
    {/if}

    {#if showLeftAxis}
      <!-- Vertical Axis -->
      <Axis placementX={marginLeft} placementY={0} axis={axisLeft(positionScale)} />
    {/if}

    <!-- Axis orientation for vertical BarChart -->
  {:else}
    <!-- Horizontal Axis -->
    {#if showBottomAxis}
      <Axis placementX={0} placementY={height - marginBottom} axis={axisBottom(positionScale)} />
    {/if}

    <!-- Vertical Axis -->
    {#if showLeftAxis}
      <Axis placementX={marginLeft} placementY={marginTop} axis={axisLeft(barScale).ticks(ticks)} />
    {/if}
  {/if}
</svg>
