<script lang="ts">
  // Imports
  import { getContext, createEventDispatcher } from 'svelte';

  // DMVis imports
  import { ColumnType } from '$lib/Enums.js';
  import Column from '$lib/components/base/Column.svelte';

  // Mandatory attributes
  export let x: number;
  export let width: number;
  export let height: number;

  // Optional attributes
  export let padding: number = 10;

  // Column standards
  const type = ColumnType.Select;
</script>

<Column {type} {x} {height} {width} {padding} name="Select">
  <g slot="overview">
    <foreignObject x={x + (width - 20) / 2} y="60" width="20px" height="20px">
      <input type="checkbox" />
    </foreignObject>
  </g>
  <g slot="data">
    <!-- For each row, insert checkbox -->
  </g>
</Column>
