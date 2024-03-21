<script lang="ts">
  import { setContext } from 'svelte';
  import { VisualisationStore } from '$lib/store.js';

  import HoverLine from '$lib/components/base/HoverLine.svelte';
  import AxisExperimental from '$lib/components/base/AxisExperimental.svelte';

  // Insert exports
  export let width: number;
  export let height: number;
  export let data: (number | string)[][];

  const visualisationStore = new VisualisationStore();

  visualisationStore.width.set(width);
  visualisationStore.height.set(height);
  visualisationStore.data.set(data);
  setContext('store', visualisationStore);
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
  <AxisExperimental position={'left'} />
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
