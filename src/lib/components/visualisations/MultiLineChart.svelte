<script lang="ts">
  import * as d3 from 'd3';
  import { setContext } from 'svelte';

  import { GraphStore } from '$lib/store.js';
  import Axis from '$lib/components/base/Axis.svelte';
  import HoverLine from '$lib/components/base/HoverLine.svelte';

  // Insert exports
  export let width: number;
  export let height: number;
  export let data: { x: number; y: number }[][];

  export let marginLeft: number | null = null;
  export let marginRight: number | null = null;
  export let marginBottom: number | null = null;
  export let marginTop: number | null = null;

  export let minX: number | null = null;
  export let maxX: number | null = null;
  export let minY: number | null = null;
  export let maxY: number | null = null;

  let flattenedData = data.flat();
  let xValues: number[] = flattenedData.map((d) => d.x);
  let yValues = flattenedData.map((d) => d.y);

  // Set store values
  const graphStore = new GraphStore();

  marginLeft ? graphStore.marginLeft.set(marginLeft) : null;
  marginRight ? graphStore.marginRight.set(marginRight) : null;
  marginBottom ? graphStore.marginBottom.set(marginBottom) : null;
  marginTop ? graphStore.marginTop.set(marginTop) : null;

  graphStore.height.set(height);
  graphStore.height.set(width);
  graphStore.minX.set(minX ? minX : d3.min(xValues) ?? 0);
  graphStore.minY.set(minY ? minY : d3.min(yValues) ?? 0);
  graphStore.maxX.set(maxX ? maxX : d3.max(xValues) ?? 0);
  graphStore.maxY.set(maxY ? maxY : d3.max(yValues) ?? 0);

  setContext('store', graphStore);

  let anyLineHovered: boolean = false;
</script>

<!--
@component
### LineChart
This is a visualisation to show a line between points

#### Required attributes
  * width: number  - Width of the visualisation
  * height: number  - Height of the visualisation
  * data: { x: number; y: number }[][]  - List of lists of points (each list of points represents one line)

#### Optional attributes
* marginLeft: number  - Margin to the left of the visualisation, defaults to 40
* marginRight: number  - Margin to the right of the visualisation, defaults to 40
* marginTop: number  - Margin to the top of the visualisation, defaults to 40
* marginBottom: number  - Margin to the bottom of the visualisation, defaults to 40

* minX: number  - Minimal value of the horizontal axes, defaults to data range
* maxX: number  - Maximal value of the horizontal axes, defaults to data range
* minY: number  - Minimal value of the vertical axes, defaults to data range
* maxY: number  - Maximal value of the vertical axes, defaults to data range
-->
<svg id="multiLineContainer" class="visualisation" {height} {width}>
  {#key data}
    {#each data as p, i (i)}
      <HoverLine
        points={p}
        width={2}
        {anyLineHovered}
        id={i}
        on:mouseenter={() => {
          anyLineHovered = true;
        }}
        on:mouseleave={() => {
          anyLineHovered = false;
        }} />
    {/each}
    <Axis position="left" />
    <Axis position="bottom" />
  {/key}
</svg>
