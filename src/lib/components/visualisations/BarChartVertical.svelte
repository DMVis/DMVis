<script lang="ts">
  import * as d3 from 'd3';
  import { GraphStore } from '$lib/store.js';
  import { setContext } from 'svelte';
  import Bar from '$lib/components/base/Bar.svelte';
  import LeftAxis from '$lib/components/base/LeftAxis.svelte';
  import BottomAxis from '$lib/components/base/BottomAxis.svelte';
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
  export let color: string = 'blue'; // Store needed?
  export let opacity: number | string = 1; // Store needed?
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
  const { xScale } = graphStore;
  const xScaleLocal = $xScale as d3.ScaleBand<string>;
  const marginBottomBar = graphStore.marginBottom;
  const marginTopBar = graphStore.marginTop;
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
* marginLeft: number       - Margin to the left of the visualisation.
* marginRight: number      - Margin to the right of the visualisation.
* marginTop: number        - Margin to the top of the visualisation.
* marginBottom: number     - Margin to the bottom of the visualisation.
* padding: number          - Value for the distance between each bar in the range [0..1].
* color: string = 'blue'   - Color of each bar.
* opacity: number | string - Opacity of each bar as a number in range [0..1] or
                             a percentage string formatted as '{number}%'.
* radiusX: number | string - Horizontal corner radius of each bar as a number in range [0..1] or
                             a percentage string formatted as '{number}%'.
* radiusY: number | string - Vertical corner radius of each bar as a number in range [0..1] or
                             a percentage string formatted as '{number}%'.
-->
<svg class="visualisation" {width} {height}>
  {#each data as bar}
    <Bar
      x={xScaleLocal(bar.label) ?? 0}
      y={height - $marginBottomBar}
      width={xScaleLocal.bandwidth()}
      value={barScale(bar.value)}
      isValueAlongYAxis={true}
      originX={OriginX.Left}
      originY={OriginY.Bottom}
      {color}
      {opacity}
      {radiusX}
      {radiusY} />
  {/each}
  <LeftAxis />
  <BottomAxis />
</svg>
