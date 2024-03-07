<script lang="ts">
  import { graphStore } from '$lib/store.js';
  import * as d3 from 'd3';
  import { setContext } from 'svelte';
  import LeftAxis from '../base/LeftAxis.svelte';
  import BottomAxis from '../base/BottomAxis.svelte';
  import Line from '../base/Line.svelte';

  // Insert exports
  export let width: number;
  export let height: number;
  export let data: { x: number; y: number }[];

  export let marginLeft: number | null = null;
  export let marginRight: number | null = null;
  export let marginBottom: number | null = null;
  export let marginTop: number | null = null;

  let xValues: number[] = data.map((d) => d.x);
  let yValues = data.map((d) => d.y);

  // Set store values
  marginLeft ? graphStore.marginLeft.set(marginLeft) : null;
  marginRight ? graphStore.marginRight.set(marginRight) : null;
  marginBottom ? graphStore.marginBottom.set(marginBottom) : null;
  marginTop ? graphStore.marginTop.set(marginTop) : null;

  graphStore.height.set(height);
  graphStore.height.set(width);
  graphStore.minX.set(d3.min(xValues) ?? 0);
  graphStore.minY.set(d3.min(yValues) ?? 0);
  graphStore.maxX.set(d3.max(xValues) ?? 0);
  graphStore.maxY.set(d3.max(yValues) ?? 0);

  setContext('store', graphStore);
</script>

<!--
@component
### Visualisation Name
A small description of the graph.

#### Required attributes
* attribute: type  - Description.

#### Optional attributes
* attribute: type  - Description. Default is 'default'.
-->
<svg class="visualisation" {height} {width}>
  <LeftAxis ticksNumber={yValues.length} />
  <BottomAxis ticksNumber={xValues.length} />
  <Line points={data} />
</svg>

<style>
  /* Insert visualisation styling  */
</style>
