<script lang="ts">
  // Imports
  import { setContext, type ComponentType } from 'svelte';

  // DMVis imports
  import { VisualisationStore } from '$lib/utils/VisualisationStore.js';

  // Required attributes
  export let Component: ComponentType;
  // Optional attributes
  export let config = {};

  // Import VisualisationStore and use defaults for mocking
  const store = new VisualisationStore();
  store.marginLeft.set(0);
  store.marginRight.set(0);
  store.marginTop.set(0);
  store.marginBottom.set(0);
  store.data.set(createNewData().slice(1));
  store.columns.set(createNewData()[0] as string[]);
  store.height.set(1000);
  store.width.set(1000);

  setContext('store', store);

  function createNewData(): Array<Array<string | number>> {
    return [
      ['Country', 'Inhabitants', 'gdp'],
      ['Netherlands', 0, 0],
      ['Germany', 3, 8],
      ['Belgium', 6, 6],
      ['France', 8, 3],
      ['UK', 10, 10]
    ];
  }
</script>

<svelte:component this={Component} {...config} />
