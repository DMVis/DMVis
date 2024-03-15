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
  export let barData: { label: string; value: number }[];
  export let minY;
  export let maxY;

  // Optional attributes
  export let marginLeft: number | null = null;
  export let marginRight: number | null = null;
  export let marginBottom: number | null = null;
  export let marginTop: number | null = null;
  export let padding: number = 0.2;
  export let radiusX: number | string = 5;
  export let radiusY: number | string = 5;

  // Set store values
  const graphStore = new GraphStore();
  marginLeft ? graphStore.marginLeft.set(marginLeft) : null;
  marginRight ? graphStore.marginRight.set(marginRight) : null;
  marginBottom ? graphStore.marginBottom.set(marginBottom) : null;
  marginTop ? graphStore.marginTop.set(marginTop) : null;

  graphStore.height.set(height);
  graphStore.width.set(width);

  graphStore.values.set(barData.map((data) => data.label));
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
### Graph Name
[TO-DO] A small description of the graph.

#### Required attributes
* [TO-DO] attribute: type  - Description.

#### Optional attributes
* [TO-DO] attribute: type  - Description. Default is 'default'.
-->
<svg class="graph" {width} {height}>
  {#each barData as data}
    <Bar
      x={xScaleLocal(data.label) ?? 0}
      y={height - $marginBottomBar}
      width={xScaleLocal.bandwidth()}
      value={barScale(data.value)}
      isValueAlongYAxis={true}
      originX={OriginX.Left}
      originY={OriginY.Bottom}
      {radiusX}
      {radiusY} />
  {/each}
  <LeftAxis />
  <BottomAxis />
</svg>
