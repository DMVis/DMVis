<script lang="ts">
  import { setContext } from 'svelte';
  import { GraphStore, VisualisationStore } from '$lib/store.js';

  import HoverLine from '$lib/components/base/HoverLine.svelte';
  import AxisExperimental from '$lib/components/base/AxisExperimental.svelte';

  // Insert exports
  export let width: number;
  export let height: number;
  export let data: (number | string)[][];

  export let marginLeft: number = 40;
  export let marginRight: number = 40;
  export let marginTop: number = 40;
  export let marginBottom: number = 40;

  const visualisationStore = new VisualisationStore();

  visualisationStore.width.set(width);
  visualisationStore.height.set(height);
  visualisationStore.data.set(data);
  visualisationStore.marginLeft.set(marginLeft);
  visualisationStore.marginRight.set(marginRight);
  visualisationStore.marginTop.set(marginTop);
  visualisationStore.marginBottom.set(marginBottom);
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
  <HoverLine lineWidth={2} />
  <AxisExperimental position={'left'} />
</svg>

<style>
  /* Insert graph styling  */
</style>
