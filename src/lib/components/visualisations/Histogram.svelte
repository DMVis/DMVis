<script lang="ts">
  // Imports
  import {
    max,
    scaleLinear,
    scaleBand,
    bin,
    axisBottom,
    type Bin,
    type ScaleLinear,
    type ScaleBand
  } from 'd3';

  // DMVis imports
  import Bar from '$lib/components/base/Bar.svelte';
  import Axis from '$lib/components/base/Axis.svelte';
  import BaseVisualisation from '$lib/components/base/BaseVisualisation.svelte';
  import { OriginX, OriginY } from '$lib/Enums.js';

  // Required attributes
  export let width: number;
  export let height: number;
  export let data: Array<string | number>;

  // Optional attributes
  export let x: number = 0;
  export let y: number = 0;
  export let marginLeft: number = 10;
  export let marginRight: number = 10;
  export let marginTop: number = 20;
  export let marginBottom: number = 20;

  // The default number of bins are calculated based on the max value in the data divided by 2
  export let bins: number = (max(data as Array<number>) ?? 20) / 2;
  export let showOuterTicks: boolean = true;
  export let forceCategorical: boolean = true;
  export let padding: number = 0.03;

  export let color: string = 'blue';
  export let opacity: number | string = 1;
  export let radiusX: number | string = 0;
  export let radiusY: number | string = 0;

  // Private attributes
  let categoricalBuckets: { key: string; values: string[] }[] = [];
  let numericalBuckets: Bin<number, number>[];
  let yScale: ScaleLinear<number, number>;
  let categoricalScale: ScaleBand<string>;
  let numericalScale: ScaleLinear<number, number>;

  // Check if data is categorical or numerical by checking the first entry in the 'data' array
  // Data is categorical
  if (typeof data[0] === 'string') {
    data.forEach((category) => {
      // When an element has not yet been processed, add it to buckets with all its duplicates
      if (typeof categoricalBuckets.find((element) => element.key === category) === 'undefined') {
        categoricalBuckets.push({
          key: category as string,
          values: data.filter((element) => element === category) as string[]
        });
      }
      // Scale used for placing bars
      categoricalScale = scaleBand()
        .domain(categoricalBuckets.map((element) => element.key))
        .range([marginLeft, width - marginRight])
        .padding(padding);

      // Scale used for length the bars
      yScale = scaleLinear()
        .domain([0, max(categoricalBuckets.map((element) => element.values.length)) ?? 0])
        .range([height - marginBottom - marginTop, 0]);
    });

    // Data is numerical
  } else {
    // Group data into buckets representing a range of numbers
    numericalBuckets = bin().thresholds(bins)(data as number[]);

    // Force the numerical data into categorical data
    // Make categories using the inclusive lower and exlusive upper bound of each bucket
    if (forceCategorical) {
      numericalBuckets.forEach((bucket) =>
        categoricalBuckets.push({
          key: bucket.x0 + '-' + (bucket.x1 ?? 0),
          values: bucket.map((value) => value.toString())
        })
      );

      // Scale used for placing bars
      categoricalScale = scaleBand()
        .domain(categoricalBuckets.map((element) => element.key))
        .range([marginLeft, width - marginRight])
        .padding(padding);

      // Scale used for length the bars
      yScale = scaleLinear()
        .domain([0, max(categoricalBuckets.map((element) => element.values.length)) ?? 0])
        .range([height - marginBottom - marginTop, 0]);

      // Keep numerical as numerical
    } else {
      // Scale used for placing bars
      numericalScale = scaleLinear()
        .domain([
          numericalBuckets[0].x0 ?? 0,
          numericalBuckets[numericalBuckets.length - 1].x1 ?? 0
        ])
        .range([marginLeft, width - marginRight]);

      // Scale used for length of the bars
      yScale = scaleLinear()
        .domain([0, max(numericalBuckets, (bucket) => bucket.length) ?? 0])
        .range([height - marginBottom - marginTop, 0]);
    }
  }
</script>

<!--
@component
### Histogram
This visualisation shows frequencies of data. It can group data categorically or numerically.

#### Required attributes
* width: number                - The width of the visualisation.
* height: number               - The height of the visualisation.
* data: Array<string | number> - An array of data which should be shown in the histogram. They will be represented as bars.

#### Optional attributes
* x: number                        - The x position of the histogram. Defaults to `0`.
* y: number                        - The y position of the histogram. Defaults to `0`.
* marginLeft: number               - The margin to the left of the visualisation. Defaults to `10`.
* marginRight: number              - The margin to the right of the visualisation. Defaults to `10`.
* marginTop: number                - The margin to the top of the visualisation. Defaults to `20`.
* marginBottom: number             - The margin to the bottom of the visualisation. Defaults to `20`.
* bins: number                     - The number of bins of numerical values. This only has an impact on numerical data.
                                     Categorical data is divided into unique categories (strings).
                                     Bucketing multiple strings together makes the histogram less useful/clear.
                                     To make buckets for numerical data we use the d3.bin function which groups numerical values in buckets with equally large ranges.
                                     This d3.bin function has a parameter called 'thresholds()' where you can enter a number to specify how many buckets you want. Here we use the bins variable as its input and thus should specify the number of buckets.
                                     However, the d3.bin().thresholds(bins) do not enforce the precise amount of buckets you wish to have.
                                     It only tries to get as close as possible to the specified number of 'bins' and may make more or less than the value assigned to 'bins'.
                                     This is heavily influenced by the data you give it; with bins set to 5 it could make 5 buckets with one set of data, but 7 with another. Defaults to `(d3.max(data as Array<number>) ?? 20) / 2`.
* showOuterTicks: boolean          - A toggle to show only outer ticks.
                                     When `true`: show only the outer ticks.
                                     Otherwise: show all ticks. Defaults to `true`.
* forceCategorical: boolean        - A toggle to force numerical data into a categorical format.
                                     When `true`: forces numerical data into a categorical format.
                                     Otherwise: keep numerical as is. Deafaults to `true`.
* padding: number                  - The value for the distance between each bar in the range [0..1]. Defaults to `0.03`.
* color: string                    - The color of each bar. Defaults to `blue`.
* opacity: number | string         - The opacity of each bar as a number in the range [0..1] or
                                     a percentage string formatted as '{number}%'. Defaults to `1`.
* radiusX: number | string         - The horizontal corner radius of each bar as a number in the range [0..1] or
                                     a percentage string formatted as '{number}%'. Defaults to `0`.
* radiusY: number | string         - The vertical corner radius of each bar as a number in the range [0..1] or
                                     a percentage string formatted as '{number}%'. Defaults to `0`.
-->

<BaseVisualisation>
  <svg class="visualisation histogram" {width} {height} {x} {y}>
    <!-- Draw categorical bars because categoricalBuckets is not empty -->
    {#if categoricalBuckets.length > 0}
      {#each categoricalBuckets as bucket}
        <Bar
          x={categoricalScale(bucket.key) ?? 0}
          y={height - marginBottom}
          width={categoricalScale.bandwidth()}
          height={yScale(0) - yScale(bucket.values.length)}
          isVertical={true}
          originX={OriginX.Left}
          originY={OriginY.Bottom}
          {color}
          {opacity}
          {radiusX}
          {radiusY} />
      {/each}
      <!-- Draw numercial bars -->
    {:else}
      {#each numericalBuckets as bucket}
        <Bar
          x={numericalScale(bucket.x0 ?? 0) + 1 ?? 0}
          y={height - marginBottom}
          width={numericalScale(bucket.x1 ?? 0) -
            numericalScale(bucket.x0 ?? 0) -
            (numericalScale(bucket.x1 ?? 0) - numericalScale(bucket.x0 ?? 0)) * padding}
          height={yScale(0) - yScale(bucket.length)}
          isVertical={true}
          originX={OriginX.Left}
          originY={OriginY.Bottom}
          {color}
          {opacity}
          {radiusX}
          {radiusY} />
      {/each}
    {/if}
    <!-- Draw categorical Axis because categoricalBuckets is not empty -->
    {#if categoricalBuckets.length > 0}
      <Axis
        placementX={0}
        placementY={height - marginBottom}
        axis={axisBottom(categoricalScale).tickSizeOuter(0)} />
      <!-- Draw numerical Axis with only the outer ticks -->
    {:else if showOuterTicks}
      <Axis
        placementX={0}
        placementY={height - marginBottom}
        axis={axisBottom(numericalScale).tickValues(numericalScale.domain())} />
      <!-- Draw numerical Axis with all ticks -->
    {:else}
      <Axis placementX={0} placementY={height - marginBottom} axis={axisBottom(numericalScale)} />
    {/if}
  </svg>
</BaseVisualisation>
