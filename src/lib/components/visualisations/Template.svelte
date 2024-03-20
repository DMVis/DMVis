<script lang="ts">
  import { setContext } from 'svelte';

  import { GraphStore } from '$lib/store.js';

  // Insert exports
  const graphStore = new GraphStore();

  setContext('store', graphStore);
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
<svg class="graph"> </svg>

<style>
  /* Insert graph styling  */
</style>
