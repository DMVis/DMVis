<script lang="ts">
  import Bar from '$lib/components/base/Bar.svelte';
  import Line from '$lib/components/base/Line.svelte';
  import Point from '$lib/components/base/Point.svelte';
  import * as d3 from 'd3';

  const barData: { x: number; y: number; width: number; height: number }[] = [
    { x: 0, y: 0, width: 50, height: 289 },
    { x: 50, y: 0, width: 50, height: 239 },
    { x: 100, y: 0, width: 50, height: 129 },
    { x: 150, y: 0, width: 50, height: 10 },
    { x: 200, y: 0, width: 50, height: 380 },
    { x: 250, y: 0, width: 50, height: 230 }
  ];

  let width = 400;
  let height = 400;
  let yScale = d3.scaleLinear().domain([0, height]).range([0, height]);
  let xScale = d3.scaleLinear().domain([0, width]).range([0, width]);

  const numPoints: number = 3;
  const size: { x: number; y: number } = { x: 400, y: 400 };
  const data: { x: number; y: number }[] = genPoints();

  function genPoints() {
    let res: { x: number; y: number }[] = [];
    for (let i = 0; i < numPoints; i++) {
      let xRandom: number = Math.floor(Math.random() * size.x);
      let yRandom: number = Math.floor(Math.random() * size.y);
      res.push({ x: xRandom, y: yRandom });
    }
    return res;
  }
</script>

<h1>DMVis</h1>
<p>Framework for making complex decision matrix visualizations.</p>

<svg style="border: 1px solid black" width="400" height="400">
  {#each data as p}
    <Point x={p.x} y={p.y} r={6} />
  {/each}
  <Line points={data} />
</svg>

<h2>Bar example</h2>
<svg width="{width}," {height}>
  {#each barData as p}
    <Bar
      x={p.x}
      barWidth={p.width}
      barHeight={p.height}
      maxHeight={height}
      {xScale}
      {yScale}
      xRounding={5}
      yRounding={5}
      strokeWidth={4} />
  {/each}
</svg>
