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
  export let length: number;

  // Optional attributes
  export let padding: number = 10;

  // Column standards
  const type = ColumnType.Select;
</script>

<!--
@component
### SelectColumn
Work in progress

#### Required attributes
  * T.B.D.

#### Optional attributes
  * T.B.D.
-->

<Column {type} {x} {height} {width} {padding} name="Select" on:groupData on:sortData>
  <g slot="overview">
    <foreignObject x={x + (width - 20) / 2} y="60" width="20px" height="20px">
      <input type="checkbox" />
    </foreignObject>
  </g>
  <g slot="data">
    {#each Array.from({ length }) as _, i}
      <foreignObject x={x + (width - 20) / 2} y={i * 20 + 105} width="20px" height="20px">
        <input type="checkbox" id={`select-${i}`} />
      </foreignObject>
    {/each}
  </g>
</Column>
