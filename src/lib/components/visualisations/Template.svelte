<script lang="ts">
  import { graphStore } from '$lib/store.js';
  import { setContext } from 'svelte';

  // Insert exports

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
