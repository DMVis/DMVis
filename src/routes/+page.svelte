<script lang="ts">
  import Point from '$lib/components/base/Point.svelte';

  const numPoints: number = 200;
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
</svg>
