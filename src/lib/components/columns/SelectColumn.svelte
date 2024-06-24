<script lang="ts">
  // Imports
  import { createEventDispatcher, onMount } from 'svelte';

  // DMVis imports
  import Column from '$lib/components/base/Column.svelte';
  import { ColumnType, IconType } from '$lib/Enums.js';

  // Required attributes
  export let x: number;
  export let width: number;
  export let height: number;
  export let length: number;
  export let selected: Set<number>;

  // Optional attributes
  export let padding: number = 10;
  export let icons: IconType[] = [IconType.Group, IconType.More];

  // Column standards
  const type = ColumnType.Select;
  const rowArray: Array<number> = Array.from({ length }, (_, index) => index);

  // Get the y position of the column
  function getY(index: number) {
    // 20 = height of row, 120 = height of top part
    return index * 20 + 120;
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

    dispatch('checkAll', { checked: selectAll });
  };

  onMount(() => {
    const allCheckbox = document.getElementById('column-select-all') as HTMLInputElement;
    if (!allCheckbox) return;
    allCheckbox.checked = selected.size === length;
    allCheckbox.indeterminate = selected.size > 0 && selected.size < length;
  });
</script>

<!--
@component
### SelectColumn
SelectColumn is a Column component that displays checkboxes for each value in the data array.

#### Required Attributes
* x: number             - The x-coordinate of the column.
* width: number         - The width of the column in pixels
* height: number        - The height of the column in pixels.
* length: number        - The number of checkboxes to display.
* selected: Set<number> - A set of numbers that represent the selected rows.

#### Optional Attributes
* padding: number       - The padding around the column pixels.
                          Defaults to `10`.
* icons: IconType[]     - A list of what icons to display at the top of the column.
                          Defaults to `[IconType.Group, IconType.More]`.

#### Events
* Please check the documentation for detailed information about dispatches.
-->

<!-- The select column -->
<Column
  {type}
  {x}
  {height}
  {width}
  {padding}
  {icons}
  name="LineUp_Select"
  on:dragStart
  on:dragMove
  on:dragStop
  on:group
  on:mouseHover
  on:mouseRowClick
  on:remove
  on:sort>
  <g slot="overview">
    <foreignObject x={x + (width - 20) / 2} y="60" width="20px" height="20px">
      <input
        id="column-select-all"
        type="checkbox"
        style="cursor:pointer;"
        on:change={(e) => toggleAllRows(e)} />
    </foreignObject>
  </g>
  <g slot="data">
    {#each rowArray as row}
      <foreignObject x={x + (width - 20) / 2} y={`${getY(row)}px`} width="20px" height="20px">
        <input
          class="column-select"
          type="checkbox"
          style="cursor:pointer;"
          id={`select-${row}`}
          checked={selected.has(row)}
          on:change={(e) => dispatchCheck(e)} />
      </foreignObject>
    {/each}
  </g>
</Column>
