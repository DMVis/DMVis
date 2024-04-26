<script lang="ts">
  // DMVis imports
  import Column from '$lib/components/base/Column.svelte';
  import { ColumnType } from '$lib/Enums.js';

  // Required attributes
  export let x: number;
  export let width: number;
  export let height: number;

  // Optional attributes
  export let padding: number = 10;
  export let name: string = 'Column';

  // Column standards
  const type = ColumnType.Sum;
</script>

<!--
@component
### SumColumn
SumColumn is a Column component that displays the StackedBar for the given attributes in the data array.

#### Required attributes
  * x - X-coordinate of the column.
  * width - The width of the column.
  * height - The height of the column.

#### Optional attributes
  * padding - The padding of the column.
  * name - The name of the column. Usually the attribute name.
-->

<Column {type} {x} {height} {width} {padding} {name} on:sortData on:mouseHover on:groupData>
  <g slot="overlay">
    <!-- Insert overlay for editing weights -->
  </g>
  <g slot="overview">
    <!-- Insert the sum overview of the column -->
  </g>
  <g slot="data">
    <!-- Insert the stacked bar chart -->
  </g>
</Column>
