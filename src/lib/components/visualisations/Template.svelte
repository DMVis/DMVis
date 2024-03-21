<script lang="ts">
  import { setContext } from 'svelte';

  import { GraphStore } from '$lib/store.js';

  export let data: { label: string; value: number }[];

  // Insert exports
  const graphStore = new GraphStore();

  setContext('store', graphStore);
</script>

<!--
@component
### Visualisation Name
A small description of the visualisation.

#### Required attributes
* attribute: type  - Description.

#### Optional attributes
* attribute: type  - Description. Default is 'default'.
-->
<svg class="visualisation">
  {#key data}
    <!-- Insert visualisation -->
  {/key}
</svg>

<style>
  /* Insert visualisation styling  */
</style>
