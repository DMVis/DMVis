<script lang="ts">
  import { GraphStore } from '$lib/store.js';
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

  export let minX: number | null = null;
  export let maxX: number | null = null;
  export let minY: number | null = null;
  export let maxY: number | null = null;

  let xValues: number[] = data.map((d) => d.x);
  let yValues = data.map((d) => d.y);

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
</script>

<!--
@component
### LineChart
This is a visualisation to show a line between points

#### Required attributes
  * width: number  - Width of the visualisation
  * height: number  - Height of the visualisation
  * data: { x: number; y: number }[]  - List of points

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
<svg class="visualisation" {height} {width}>
  <LeftAxis ticksNumber={yValues.length} />
  <BottomAxis ticksNumber={xValues.length} />
  <Line points={data} />
</svg>
