<script lang="ts">
  import HorizontalBar from '$lib/components/base/HorizontalBar.svelte';
  import VerticalBar from '$lib/components/base/VerticalBar.svelte';
  import Line from '$lib/components/base/Line.svelte';
  import Label from '$lib/components/base/Label.svelte';
  import Point from '$lib/components/base/Point.svelte';
  import { OriginX, OriginY } from '$lib/Enums.js';
  import * as d3 from 'd3';
  import LeftAxis from '$lib/components/base/LeftAxis.svelte';
  import BottomAxis from '$lib/components/base/BottomAxis.svelte';

  const barData: { x: number; y: number; width: number; height: number }[] = [
    { x: 0, y: 0, width: 50, height: 289 },
    { x: 50, y: 0, width: 50, height: 239 },
    { x: 100, y: 0, width: 50, height: 129 },
    { x: 150, y: 0, width: 50, height: 10 },
    { x: 200, y: 0, width: 50, height: 380 },
    { x: 250, y: 0, width: 50, height: 230 }
  ];

  const margin = { top: 40, right: 40, bottom: 40, left: 50 };

  let width = 500;
  let height = 500;
  let yScale = d3.scaleLinear().domain([0, height]).range([0, height]);
  let xScale = d3.scaleLinear().domain([0, width]).range([0, width]);

  let yScaleAxis = d3
    .scaleLinear()
    .domain([0, height])
    .range([margin.top, height - margin.bottom]);
  let xScaleAxis = d3
    .scaleLinear()
    .domain([0, width])
    .range([margin.left, width - margin.right]);

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

<svg {width} {height}>
  {#each data as p}
    <Point x={p.x} y={p.y} radius={6} />
  {/each}
  <Line points={data} />
</svg>

<h2>Vertical Bar example</h2>
<svg {width} {height}>
  {#each barData as p}
    <VerticalBar
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

<h2>Axis Example</h2>
<svg {width} {height}>
  <LeftAxis yScale={yScaleAxis} fontSize={20} {margin} />
  <BottomAxis xScale={xScaleAxis} {height} {margin} />
</svg>

<h2>Horizontal Bar example</h2>
<svg {width} {height}>
  {#each barData as p}
    <HorizontalBar
      y={p.x}
      barWidth={p.height}
      barHeight={p.width}
      {xScale}
      {yScale}
      xRounding={0}
      yRounding={0}
      strokeWidth={4} />
  {/each}
</svg>

<h2>Label example</h2>
<svg style="border: 1px solid black" width="500" height="500">
  <Label
    x={100}
    y={100}
    text="Hello, world!"
    textColor="black"
    color="#fe7215"
    originX={OriginX.Left}
    originY={OriginY.Top}
    rotationDegrees={0}
    opacity={'1'}
    radiusX={5}
    radiusY={5}
    hasBackground={true} />
  <Point x={100} y={100} radius={6} />
  <!-- Point for debugging purpose -->
</svg>
