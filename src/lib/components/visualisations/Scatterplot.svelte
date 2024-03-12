<script lang="ts">
  import { GraphStore } from '$lib/store.js';
  import { setContext } from 'svelte';
  import * as d3 from 'd3';

  import LeftAxis from '$lib/components/base/LeftAxis.svelte';
  import BottomAxis from '$lib/components/base/BottomAxis.svelte';
  import Point from '$lib/components/base/Point.svelte';

  //Mandatory exports
  export let width: number;
  export let height: number;
  export let data: Map<string, number>[] | { x: number; y: number }[];

  //Optional exports
  export let xAxis: string = 'x';
  export let yAxis: string = 'y';

  export let minX: number | 'auto' = 0;
  export let minY: number | 'auto' = 0;
  export let maxX: number | 'auto' = 'auto';
  export let maxY: number | 'auto' = 'auto';

  export let marginLeft: number | null = null;
  export let marginRight: number | null = null;
  export let marginBottom: number | null = null;
  export let marginTop: number | null = null;

  export let showAxis: boolean = true;

  //Fill graphstore
  const graphStore = new GraphStore();

  marginLeft ? graphStore.marginLeft.set(marginLeft) : null;
  marginRight ? graphStore.marginRight.set(marginRight) : null;
  marginBottom ? graphStore.marginBottom.set(marginBottom) : null;
  marginTop ? graphStore.marginTop.set(marginTop) : null;

  graphStore.height.set(height);
  graphStore.width.set(width);

  let formattedData: Map<string, number>[];
  //Check if data is of type Map, if not convert to Map
  if (!(data[0] instanceof Map)) {
    formattedData = [];
    for (let i = 0; i < data.length; i++) {
      let item = new Map<string, number>();
      item.set('x', (data[i] as { x: number; y: number }).x);
      item.set('y', (data[i] as { x: number; y: number }).y);
      formattedData.push(item);
    }
  }
  //If the data is already of type Map, check if the specified axis actually are present in the given data
  else {
    if (data[0].get(xAxis) == undefined) {
      throw new Error('xAxis is not recognised, you may need to set the xAxis parameter');
    }
    if (data[0].get(yAxis) == undefined) {
      throw new Error('yAxis is not recognised, you may need to set the yAxis parameter');
    }
    formattedData = data as Map<string, number>[];
  }

  //Autoscaling logic X
  if (minX === 'auto') {
    minX = d3.min(formattedData, function (d) {
      return d.get(xAxis);
    }) as number;
  }
  if (maxX === 'auto') {
    maxX = d3.max(formattedData, function (d) {
      return d.get(xAxis);
    }) as number;
  }
  //Autoscaling logic Y
  if (minY === 'auto') {
    minY = d3.min(formattedData, function (d) {
      return d.get(yAxis);
    }) as number;
  }
  if (maxY === 'auto') {
    maxY = d3.max(formattedData, function (d) {
      return d.get(yAxis);
    }) as number;
  }

  graphStore.minX.set(minX as number);
  graphStore.minY.set(minY as number);
  graphStore.maxX.set(maxX as number);
  graphStore.maxY.set(maxY as number);

  setContext('store', graphStore);
</script>

<!--
@component
### Scatterplot
This is a visualisation to display a dataset of points

#### Required attributes
  * width: number                                            - Width of the visualisation
  * height: number                                           - Height of the visualisation
  * data: Map<string,number>[] | { x: number; y: number }[]  - List of all the points, can be in either format. See documentation for full explanation

#### Semi-Required attributes
These attributes are required when using the Map datatype
  * xAxis: string - The name of the attribute that needs to be plotted on the x-axis. This should be the same one that is provided in the data
  * yAxis: string - The name of the attribute that needs to be plotted on the y-axis. This should be the same one that is provided in the data

#### Optional attributes
  * marginLeft: number  - Margin to the left of the visualisation, defaults to 40
  * marginRight: number  - Margin to the right of the visualisation, defaults to 40
  * marginTop: number  - Margin to the top of the visualisation, defaults to 40
  * marginBottom: number  - Margin to the bottom of the visualisation, defaults to 40

  * minX: number | 'auto' - Minimal value of the horizontal axes, defaults to 0
  * maxX: number | 'auto' - Maximal value of the horizontal axes, defaults to data range
  * minY: number | 'auto' - Minimal value of the vertical axes, defaults to 0
  * maxY: number | 'auto' - Maximal value of the vertical axes, defaults to data range

  * showAxis: bool - Whether or not the axis should be drawn
-->
<svg {width} {height}>
  {#if showAxis}
    <LeftAxis />
    <BottomAxis />
  {/if}
  {#each formattedData as p}
    <Point x={p.get(xAxis) ?? 0} y={p.get(yAxis) ?? 0} />
  {/each}
</svg>
