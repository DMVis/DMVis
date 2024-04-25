<script lang="ts">
  // Imports
  import { getContext } from 'svelte';

  // DMVis imports
  import Column from '$lib/components/base/Column.svelte';
  import { ColumnType } from '$lib/Enums.js';
  import type { VisualisationStore } from '$lib/store.js';
  import Label from '../base/Label.svelte';

  // Mandatory attributes
  export let x: number;
  export let width: number;
  export let height: number;
  export let length: number;

  // Optional attributes
  export let padding: number = 10;

  // Column standards
  const type = ColumnType.Rank;

  // Get store values
  const { styleUtil } = getContext<VisualisationStore>('store');
</script>

<!--
@component
### RankColumn
RankColumn is a Column component that displays the rank of each value in the data array.

#### Required attributes
  * `x` - The x-coordinate of the column.
  * `width` - The width of the column.
  * `height` - The height of the column.
  * `length` - The number of ranks to display.

#### Optional attributes
  * `padding` - The padding of the column.
-->

<Column {type} {x} {height} {width} {padding} name="Rank">
  <g slot="data">
    <!-- eslint-disable-next-line @typescript-eslint/no-unused-vars -->
    {#each Array.from({ length }) as _, i}
      <Label
        x={x + width / 2}
        y={i * 20 + 105 + $styleUtil.fontSize}
        width={10}
        height={20}
        {padding}
        hasPointerEvents={true}
        hasBackground={false}
        text={(i + 1).toString()} />
    {/each}
  </g>
</Column>
