<script lang="ts">
  import { GraphStore } from '$lib/store.js';
  import { setContext } from 'svelte';
  import LeftAxis from '../base/LeftAxis.svelte';
  import HoverLine from '../base/HoverLine.svelte';

  // Insert exports
  export let width: number;
  export let height: number;
  export let data: (number | string)[][];
  const graphStore = new GraphStore();

  setContext('store', graphStore);
  const { marginRight } = graphStore;

  const spacer = (width - $marginRight - 1) / (data[0].length - 1);
  console.log(data);
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
<svg class="graph" {width} {height}>
  {#each { length: data[0].length } as _, i}
    <LeftAxis offsetX={spacer * i} />
  {/each}
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
</svg>

<style>
  /* Insert graph styling  */
</style>
