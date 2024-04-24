<script lang="ts">
  // Imports
  // import { getContext, createEventDispatcher } from 'svelte';

  // DMVis imports
  import { ColumnType } from '$lib/Enums.js';
  import Column from '$lib/components/base/Column.svelte';

  // Mandatory attributes
  export let x: number;
  export let width: number;
  export let height: number;

  // Optional attributes
  export let padding: number = 10;
  export let name: string = 'Column';

  // Column standards
  const type = ColumnType.Bar;
</script>

<!--
@component
### BarColumn
Work in progress

#### Required attributes
  * T.B.D.

#### Optional attributes
  * T.B.D.
-->

<Column {type} {x} {height} {width} {padding} {name}>
  <g slot="overview">
    <!-- Insert histogram using barchart -->
  </g>
  <g slot="data">
    <!-- Insert a bar for each row -->
  </g>
</Column>
