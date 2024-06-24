<script lang="ts">
  // Imports
  import { type ScaleBand, scaleBand, scaleLinear, max, axisLeft, axisBottom } from 'd3';

  // DMVis imports
  import Bar from '$lib/components/base/Bar.svelte';
  import Axis from '$lib/components/base/Axis.svelte';
  import type { Opacity, ScaleLinear } from '$lib/Types.js';

  // Required attributes
  export let width: number;
  export let height: number;
  export let data: { label: string; value: number }[];

  // Optional attributes
  export let minValue: number = 0;
  export let maxValue: number = max(data.map((data) => data.value)) ?? 0;
  export let isVertical: boolean = true;
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
  export let borderRadius: number = 0;

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
the other axis goes in the direction of the length of the bars and holds corresponding numerical values.
`isVertical` switches the two axes.


#### Required Attributes
* width: number                            - The width of the visualisation in pixels.
* height: number                           - The height of the visualisation in pixels.
* data: { label: string; value: number }[] - A list of data to display as bars.

#### Optional Attributes
* minValue: number                 - The minimum value of the numerical length of each bar.
                                     Defaults to `0`.
* maxValue: number                 - The maximum value of the numerical length of each bar.
                                     Defaults to the highest value in the dataset.
* isVertical: boolean              - Whether to orient `BarChart` vertically or horizontally.
* ticks: number                    - The number of ticks on the value axis.
                                     Defaults to `10`.
* showLeftAxis: boolean = true;    - Whether the left axis is visible.
                                     Defaults to `true`.
* showBottomAxis: boolean = true;  - Whether the bottom axis is visible.
                                     Defaults to `true`.
* marginLeft: number               - The margin to the left of the visualisation in pixels.
                                     Defaults to `40`.
* marginRight: number              - The margin to the right of the visualisation in pixels.
                                     Defaults to `40`.
* marginTop: number                - The margin to the top of the visualisation in pixels.
                                     Defaults to `40`.
* marginBottom: number             - The margin to the bottom of the visualisation in pixels.
                                     Defaults to `40`.
* padding: number                  - The distance between each bar.
                                     It can be a number between `0` and `1` (inclusive).
                                     Defaults to `0.2`.
* color: string = 'blue'           - The colour of each bar.
                                     Valid inputs include CSS colours specified as a string.
                                     Defaults to `'blue'`.
* opacity: Opacity                 - The opacity of each bar.
                                     It can be a number between `0` and `1` (inclusive) or a string representing a percentage (e.g. `'50%'`).
                                     Defaults to `1`.
* borderRadius: number             - The border radius of each bar in pixels.
                                     Defaults to `0`.
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
          length={barScale(bar.value)}
          isVertical={false}
          origin={'topLeft'}
          {color}
          {opacity}
          {borderRadius} />
      {:else}
        <Bar
          x={positionScale(bar.label) ?? 0}
          y={height - marginBottom}
          width={positionScale.bandwidth()}
          length={barScale(maxValue - bar.value)}
          isVertical={true}
          origin={'bottomLeft'}
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
