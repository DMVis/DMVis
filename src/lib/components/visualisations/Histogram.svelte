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
  export let data: Array<string | number>;

  // Optional attributes
  export let x: number = 0;
  export let showOuterTicks: boolean = true;
  export let bins: number = d3.max(data as number[]) as number;
  export let marginLeft: number = 10;
  export let marginRight: number = 10;
  export let marginBottom: number = 20;
  export let marginTop: number = 20;
  export let padding: number = 0;
  export let color: string = 'blue';
  export let opacity: number | string = 1;
  export let radiusX: number | string = 0;
  export let radiusY: number | string = 0;

  // Private attributes
  let categoricalBuckets: { key: string; values: string[] }[] = [];
  let numericalBuckets: d3.Bin<number, number>[];
  let yScale: d3.ScaleLinear<number, number>;
  let categoricalScale: d3.ScaleBand<string>;
  let numericalScale: d3.ScaleLinear<number, number>;

  // Check if data is categorical or numerical by checking the first entry in the array
  if (typeof data[0] === 'string') {
    data.forEach((d) => {
      // When an element has not yet been processed, add it to buckets with all its duplicates
      if (typeof categoricalBuckets.find((element) => element.key === d) === 'undefined') {
        categoricalBuckets.push({
          key: d as string,
          values: data.filter((element) => element === d) as string[]
        });
      }
      // Scale from all categorical data
      categoricalScale = d3
        .scaleBand()
        .domain(categoricalBuckets.map((element) => element.key))
        .range([marginLeft, width - marginRight])
        .padding(padding);
      yScale = d3
        .scaleLinear()
        .domain([0, d3.max(categoricalBuckets.map((element) => element.values.length)) ?? 0])
        .range([height - marginBottom - marginTop, 0]);
    });
  } else {
    numericalBuckets = d3.bin().thresholds(bins)(data as number[]);
    numericalScale = d3
      .scaleLinear()
      .domain([0, numericalBuckets[numericalBuckets.length - 1].x1 ?? 0])
      .range([marginLeft, width - marginRight]);
    yScale = d3
      .scaleLinear()
      .domain([0, d3.max(numericalBuckets, (d) => d.length) ?? 0])
      .range([height - marginBottom - marginTop, 0]);
  }
</script>

<!--
@component
### Histogram
This visualisation shows frequencies of data. It can group data categorically or numerically.

#### Required attributes
* width: number                - Width of the visualisation.
* height: number               - Height of the visualisation.
* data: Array<string | number> - Array of data which should be shown in the histogram. They will be represented as bars.

#### Optional attributes
* x: number                        - X position of the histogram.
* showOuterTicks: boolean          - Specifies if you want to show only the outer ticks. Otherwise shows all ticks.
* bins: number                     - Specifies the number of bins. This only has an impact on numerical data.
                                     Categorical data is divided into unique categories (strings).
                                     Bucketing multiple strings together makes the histogram less useful/clear.
                                     To make buckets for numerical data we use the d3.bin function which groups numerical values in buckets with equally large ranges.
                                     This d3.bin function has a parameter called 'thresholds()' where you can enter a number to specify how many buckets you want. Here we use the bins variable as its input and thus should specify the number of buckets.
                                     However, the d3.bin().thresholds(bins) do not enforce the precise amount of buckets you wish to have.
                                     It only tries to get as close as possible to the specified number of 'bins' and may make more or less than the value assigned to 'bins'.
                                     This is heavily influenced by the data you give it; with bins set to 5 it could make 5 buckets with one set of data, but 7 with another.
* marginLeft: number               - Margin to the left of the visualisation.
* marginRight: number              - Margin to the right of the visualisation.
* marginTop: number                - Margin to the top of the visualisation.
* marginBottom: number             - Margin to the bottom of the visualisation.
* padding: number                  - Value for the distance between each bar in the range [0..1].
* color: string = 'blue'           - Color of each bar.
* opacity: number | string         - Opacity of each bar as a number in the range [0..1] or
                                     a percentage string formatted as '{number}%'.
* radiusX: number | string         - Horizontal corner radius of each bar as a number in the range [0..1] or
                                     a percentage string formatted as '{number}%'.
* radiusY: number | string         - Vertical corner radius of each bar as a number in the range [0..1] or
                                     a percentage string formatted as '{number}%'.
-->
<svg class="visualisation histogram" {width} {height} {x}>
  <!-- If the categoricalBuckets is not empty it means the histogram should be rendered as categorical -->
  {#if categoricalBuckets.length > 0}
    {#each categoricalBuckets as bucket}
      <!-- Draw Bars -->
      <Bar
        x={categoricalScale(bucket.key) ?? 0}
        y={height - marginBottom}
        width={categoricalScale.bandwidth() - 1}
        height={yScale(0) - yScale(bucket.values.length)}
        isVertical={true}
        originX={OriginX.Left}
        originY={OriginY.Bottom}
        {color}
        {opacity}
        {radiusX}
        {radiusY} />
    {/each}
  {:else}
    {#each numericalBuckets as bucket}
      <!-- Draw Bars -->
      <Bar
        x={numericalScale(bucket.x0 ?? 0) + 1 ?? 0}
        y={height - marginBottom}
        width={numericalScale(bucket.x1 ?? 0) - numericalScale(bucket.x0 ?? 0) - 1}
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
  <!-- Draw categorical Axis because the data was categorical -->
  {#if categoricalBuckets.length > 0}
    <Axis
      placementX={0}
      placementY={height - marginBottom}
      axis={d3.axisBottom(categoricalScale)} />
    <!-- Draw numerical Axis cause the data was numerical -->
  {:else if showOuterTicks}
    <Axis
      placementX={0}
      placementY={height - marginBottom}
      axis={d3.axisBottom(numericalScale).tickValues(numericalScale.domain())} />
  {:else}
    <Axis placementX={0} placementY={height - marginBottom} axis={d3.axisBottom(numericalScale)} />
  {/if}
</svg>
