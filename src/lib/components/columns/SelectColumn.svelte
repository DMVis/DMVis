<script lang="ts">
  // Imports
  import { createEventDispatcher } from 'svelte';

  // DMVis imports
  import Column from '$lib/components/base/Column.svelte';
  import { ColumnType } from '$lib/Enums.js';

  // Required attributes
  export let x: number;
  export let width: number;
  export let height: number;
  export let length: number;
  export let selected: Set<number>;

  // Optional attributes
  export let padding: number = 10;

  // Column standards
  const type = ColumnType.Select;
  const rowArray: Array<number> = Array.from({ length }, (_, index) => index);

  // Get the y position of the column
  function getY(index: number) {
    // 20 = height of row, 105 = height of top part
    return index * 20 + 105;
  }

  // Let the parent know that a checkbox has been checked
  const dispatch = createEventDispatcher();
  const dispatchCheck = (event: Event) => {
    dispatch('check', {
      checked: (event.target as HTMLInputElement)?.checked,
      row: (event.target as HTMLInputElement)?.id.split('-')[1]
    });
  };

  // Let the parent know that all checkboxes have been checked and check all boxes
  let selectAll = false;
  const toggleAllRows = (event: Event) => {
    selectAll = (event.target as HTMLInputElement)?.checked;
    const checkboxes = document.getElementsByClassName('column-select');
    for (let i = 0; i < checkboxes.length; i++) {
      (checkboxes[i] as HTMLInputElement).checked = selectAll;
    }

    dispatch('toggleAll', { checked: selectAll });
  };
</script>

<!--
@component
### SelectColumn
SelectColumn is a Column component that displays checkboxes for each value in the data array.

#### Required attributes
  * x - X-coordinate of the column.
  * width - The width of the column.
  * height - The height of the column.
  * length - The number of checkboxes to display.
  * selected - List of rows which are currently selected

#### Optional attributes
  * padding - The padding of the column.
-->

<Column
  {type}
  {x}
  {height}
  {width}
  {padding}
  name="LineUp_Select"
  on:dragStart
  on:dragMove
  on:dragStop
  on:groupData
  on:mouseHover
  on:mouseRowClick
  on:sortData>
  <g slot="overview">
    <foreignObject x={x + (width - 20) / 2} y="60" width="20px" height="20px">
      <input id="column-select-all" type="checkbox" on:change={(e) => toggleAllRows(e)} />
    </foreignObject>
  </g>
  <g slot="data">
    {#each rowArray as row}
      <foreignObject x={x + (width - 20) / 2} y={`${getY(row)}px`} width="20px" height="20px">
        <input
          class="column-select"
          type="checkbox"
          id={`select-${row}`}
          checked={selected.has(row)}
          on:change={(e) => dispatchCheck(e)} />
      </foreignObject>
    {/each}
  </g>
</Column>
