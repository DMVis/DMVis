<script lang="ts">
  // Imports
  // import { getContext, createEventDispatcher } from 'svelte';

  // DMVis imports
  import Column from '$lib/components/base/Column.svelte';
  import { ColumnType } from '$lib/Enums.js';

  // Mandatory attributes
  export let x: number;
  export let width: number;
  export let height: number;

  // Optional attributes
  export let padding: number = 10;

  // Column standards
  const type = ColumnType.Rank;
</script>

<!--
@component
### RankColumn
Work in progress

#### Required attributes
  * T.B.D.

#### Optional attributes
  * T.B.D.
-->

<Column {type} {x} {height} {width} {padding} name="Rank">
  <g slot="data">
    <!-- Insert column index -->
  </g>
</Column>
