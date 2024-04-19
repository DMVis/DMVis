<script lang="ts">
  // Imports
  import * as d3 from 'd3';
  import { setContext } from 'svelte';

  // DMVis imports
  import Bar from '$lib/components/base/Bar.svelte';
  import Axis from '$lib/components/base/Axis.svelte';
  import { GraphStore } from '$lib/store.js';
  import { OriginX, OriginY } from '$lib/Enums.js';

  // Required attributes
  export let width: number;
  export let height: number;
  export let data: { label: string; value: number }[];
  export let minY: number; // Can be made optional?
  export let maxY: number; // Can be made optional?

  // Optional attributes
  export let marginLeft: number | null = null;
  export let marginRight: number | null = null;
  export let marginBottom: number | null = null;
  export let marginTop: number | null = null;
  export let padding: number = 0.2;
  export let color: string = 'blue';
  export let opacity: number | string = 1;
  export let radiusX: number | string = 5;
  export let radiusY: number | string = 5;

  // Set store values
  const graphStore = new GraphStore();
  marginLeft ? graphStore.marginLeft.set(marginLeft) : null;
  marginRight ? graphStore.marginRight.set(marginRight) : null;
  marginBottom ? graphStore.marginBottom.set(marginBottom) : null;
  marginTop ? graphStore.marginTop.set(marginTop) : null;

  graphStore.width.set(width);
  graphStore.height.set(height);
  graphStore.values.set(data.map((data) => data.label));
  graphStore.minY.set(minY);
  graphStore.maxY.set(maxY);
  graphStore.padding.set(padding);
  graphStore.xAxisType.set('band');

  // Private attributes
  const { xScale, marginTop: marginTopBar, marginBottom: marginBottomBar } = graphStore;
  const xScaleLocal = $xScale as d3.ScaleBand<string>;
  const barScale = d3
    .scaleLinear()
    .domain([minY, maxY])
    .range([0, height - $marginTopBar - $marginBottomBar]);

  // Set graph store
  setContext('store', graphStore);
</script>

<!--
@component
### VerticalBarChart
This is visualisation that represents categorical data with rectangular bars.
The length of each bar corresponds to the numerical value of the data being represented.
The x-axis represents the categories of the data.
The y-axis represents the numerical values of the data.

#### Required attributes
* width: number                            - Width of the visualisation.
* height: number                           - Height of the visualisation.
* data: { label: string; value: number }[] - List of bars.
* minY: number                             - Minimum value of the numerical y-axis.
* maxY: number                             - Maximum value of the numerical y-axis.

#### Optional attributes
* marginLeft: number       - Margin to the left of the visualisation. Defaults to `40`.
* marginRight: number      - Margin to the right of the visualisation. Defaults to `40`.
* marginTop: number        - Margin to the top of the visualisation. Defaults to `40`.
* marginBottom: number     - Margin to the bottom of the visualisation. Defaults to `40`.
* padding: number          - Value for the distance between each bar in the range [0..1].
                             Defaults to `0.2`.
* color: string = 'blue'   - Color of each bar. Defaults to `'blue'`.
* opacity: number | string - Opacity of each bar as a number in range [0..1] or
                             a percentage string formatted as '{number}%'.
                             Defaults to `1`.
* radiusX: number | string - Horizontal corner radius of each bar as a number in range [0..1] or
                             a percentage string formatted as '{number}%'.
                             Defaults to `5`.
* radiusY: number | string - Vertical corner radius of each bar as a number in range [0..1] or
                             a percentage string formatted as '{number}%'.
                             Defaults to `5`.
-->
<svg class="visualisation barchart" {width} {height}>
  {#key data}
    <!-- Loop over all data, and plot a bar for each point -->
    {#each data as bar}
      <Bar
        x={xScaleLocal(bar.label) ?? 0}
        y={height - $marginBottomBar}
        width={xScaleLocal.bandwidth()}
        height={barScale(bar.value)}
        isVertical={true}
        originX={OriginX.Left}
        originY={OriginY.Bottom}
        {color}
        {opacity}
        {radiusX}
        {radiusY} />
    {/each}
    <!-- Draw 2 axes -->
    <Axis position="left" />
    <Axis position="bottom" />
  {/key}
</svg>
