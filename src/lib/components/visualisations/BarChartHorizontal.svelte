<script lang="ts">
  import * as d3 from 'd3';
  import { graphStore } from '$lib/store.js';
  import { setContext } from 'svelte';
  import Bar from '../base/Bar.svelte';
  import LeftAxis from '../base/LeftAxis.svelte';
  import BottomAxis from '../base/BottomAxis.svelte';
  import { OriginX, OriginY } from '$lib/Enums.js';

  // Required attributes
  export let width: number;
  export let height: number;
  export let barData: { label: string; value: number }[];
  export let minX;
  export let maxX;

  // Optional attributes
  export let margin: { top: number; right: number; bottom: number; left: number } = {
    top: 40,
    right: 40,
    bottom: 40,
    left: 40
  };
  export let padding: number = 0.2;
  export let radiusX: number | string = 5;
  export let radiusY: number | string = 5;

  // Private attributes
  const xAxisScale = d3
    .scaleLinear()
    .domain([minX, maxX])
    .range([margin.left, width - margin.right]);
  const yAxisScale = d3
    .scaleBand()
    .domain(barData.map((data) => data.label))
    .range([margin.top, height - margin.bottom])
    .padding(padding);
  const barScale = d3
    .scaleLinear()
    .domain([minX, maxX])
    .range([0, width - margin.left - margin.right]);
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
      x={margin.left}
      y={yAxisScale(data.label) ?? 0}
      width={yAxisScale.bandwidth()}
      value={barScale(data.value)}
      isValueAlongYAxis={false}
      originX={OriginX.Left}
      originY={OriginY.Top}
      {radiusX}
      {radiusY} />
  {/each}
  <LeftAxis yScale={yAxisScale} fontSize={20} {margin} />
  <BottomAxis xScale={xAxisScale} {height} {margin} />
</svg>
