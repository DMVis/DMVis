<script lang="ts">
  import { setContext } from 'svelte';
  import { VisualisationStore } from '$lib/store.js';

  import HoverLine from '$lib/components/base/HoverLine.svelte';
  import Axis from '$lib/components/base/Axis.svelte';
  import { Spacer } from '$lib/utils/Spacer.js';

  // Insert exports
  export let width: number;
  export let height: number;
  export let data: (number | string)[][];

  const graphStore = new VisualisationStore();

  graphStore.width.set(width);
  graphStore.height.set(height);
  graphStore.data.set(data);
  setContext('store', graphStore);

  const { marginRight } = graphStore;
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
    <Axis offset={Spacer(width, $marginRight, data[0].length) * i} position={'left'} />
  {/each}
  <!-- {#each data as p, i (i)}
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
  {/each} -->
</svg>

<style>
  /* Insert graph styling  */
</style>
