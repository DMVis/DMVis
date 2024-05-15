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
  // export let icons: IconType[] = [IconType.Item,IconType.Band];

  // Column standards
  const type = ColumnType.Separator;
</script>

<!--
@component
### SeparatorColumn
SeparatorColumn is a Column component that displays lines connecting rows in the data array.

#### Required attributes
* x - X-coordinate of the column.
* width - The width of the column.
* height - The height of the column.

#### Optional attributes
* padding - The padding of the column.

#### Events
* For detailed information about dispatches, check the documentation.
-->

<Column {type} {x} {height} {width} {padding} name="">
  <g slot="data">
    <!-- Insert lines connecting rows -->
  </g>
</Column>
