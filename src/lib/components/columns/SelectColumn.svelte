<script lang="ts">
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
SelectColumn is a Column component that displays checkboxes for each value in the data array.

#### Required attributes
  * `x` - The x-coordinate of the column.
  * `width` - The width of the column.
  * `height` - The height of the column.
  * `length` - The number of checkboxes to display.

#### Optional attributes
  * `padding` - The padding of the column.
-->

<Column {type} {x} {height} {width} {padding} name="Select" on:groupData on:sortData>
  <g slot="overview">
    <foreignObject x={x + (width - 20) / 2} y="60" width="20px" height="20px">
      <input type="checkbox" />
    </foreignObject>
  </g>
  <g slot="data">
    <!-- eslint-disable-next-line @typescript-eslint/no-unused-vars -->
    {#each Array.from({ length }) as _, i}
      <foreignObject x={x + (width - 20) / 2} y={i * 20 + 105} width="20px" height="20px">
        <input type="checkbox" id={`select-${i}`} />
      </foreignObject>
    {/each}
  </g>
</Column>
