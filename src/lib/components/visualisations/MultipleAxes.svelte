<script lang="ts">
  import { setContext } from 'svelte';
  import { VisualisationStore } from '$lib/store.js';

  import HoverLine from '$lib/components/base/HoverLine.svelte';
  import AxisExperimental from '$lib/components/base/AxisExperimental.svelte';

  // Insert exports
  export let width: number;
  export let height: number;
  export let data: (number | string)[][];

  export let marginLeft: number = 40;

  const visualisationStore = new VisualisationStore();

  visualisationStore.width.set(width);
  visualisationStore.height.set(height);
  visualisationStore.data.set(data);
  visualisationStore.marginLeft.set(marginLeft);
  setContext('store', visualisationStore);

  let anyLineHovered: boolean = false;
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
  {#each data as p, i (i)}
    <HoverLine lineWidth={2} id={i} />
  {/each}
  <AxisExperimental position={'left'} />
</svg>

<style>
  /* Insert graph styling  */
</style>
