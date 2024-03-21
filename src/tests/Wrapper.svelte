<script lang="ts">
  import { setContext } from 'svelte';
  import { GraphStore } from '$lib/store.js';

  // Exports
  export let Component: any;
  export let config = {};

  // Import GraphStore and use defaults for mocking
  const store = new GraphStore();
  store.minX.set(0);
  store.maxX.set(100);
  setContext('store', store);
</script>

<svelte:component this={Component} {...config} />
