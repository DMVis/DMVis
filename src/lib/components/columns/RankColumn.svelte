<script lang="ts">
  // DMVis imports
  import Label from '$lib/components/base/Label.svelte';
  import Column from '$lib/components/base/Column.svelte';
  import { ColumnType, IconType } from '$lib/Enums.js';
  import { getVisualisationContext } from '$lib/utils/Context.js';

  // Required attributes
  export let x: number;
  export let width: number;
  export let height: number;
  export let length: number;

  // Optional attributes
  export let padding: number = 10;
  export let icons: IconType[] = [IconType.More];

  // Column standards
  const type = ColumnType.Rank;
  const rowArray: Array<number> = Array.from({ length }, (_, index) => index);

  // Get the y position of the column
  function getY(index: number) {
    // 20 = height of row, 120 = height of top part
    return index * 20 + 120 + $styleUtil.fontSize;
  }

  // Get store values
  const { styleUtil } = getVisualisationContext();
</script>

<!--
@component
### RankColumn
`RankColumn` is a `Column` component that displays the rank of each value in the data array.

#### Required Attributes
* x: number         - The x-coordinate of the column.
* width: number     - The width of the column in pixels.
* height: number    - The height of the column in pixels.
* length: number    - The number of ranks to display.

#### Optional Attributes
* padding: number   - The padding around the column in pixels.
                      Defaults to `10`.
* icons: IconType[] - A list of what icons to display in the top of the column.
                      Defaults to `[IconType.More]`.

#### Events
* Please check the documentation for detailed information about dispatches.
-->

<!-- The rank column -->
<Column
  {type}
  {x}
  {height}
  {width}
  {padding}
  {icons}
  name="LineUp_Rank"
  on:dragStart
  on:dragMove
  on:dragStop
  on:mouseHover
  on:mouseRowClick
  on:remove>
  <g slot="data">
    {#each rowArray as row}
      <Label
        x={x + width / 2}
        y={getY(row)}
        width={10}
        height={20}
        {padding}
        hasPointerEvents={true}
        hasBackground={false}
        text={(row + 1).toString()} />
    {/each}
  </g>
</Column>
