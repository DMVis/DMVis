<script lang="ts">
  // Imports
  import * as d3 from 'd3';

  // DMVis imports
  import BarColumn from '$lib/components/columns/BarColumn.svelte';
  import TextColumn from '$lib/components/columns/TextColumn.svelte';
  import RankColumn from '$lib/components/columns/RankColumn.svelte';
  import SelectColumn from '$lib/components/columns/SelectColumn.svelte';
  import { StyleUtils } from '$lib/utils/StyleUtils.js';
  import BaseVisualisation from '$lib/components/base/BaseVisualisation.svelte';
  import type { DataUtils } from '$lib/utils/DataUtils.js';
  import { setVisualisationContext, updateVisualisationContext } from '$lib/context.js';

  // Required attributes
  export let dataUtil: DataUtils;

  // Optional attributes
  export let styleUtil: StyleUtils = new StyleUtils();
  export let columnWidth: number = 150;
  export let width: number = calculateWidth(dataUtil.columns.length);
  export let height: number = calculateHeight(dataUtil.data.length);
  export let padding: number = 10;

  const { visualisationData } = dataUtil;

  // Set store values
  setVisualisationContext({
    width,
    height,
    data: $visualisationData,
    columns: dataUtil.columns,
    styleUtil
  });

  $: {
    //visualisationStore.data.set($visualisationData);
    updateVisualisationContext({ data: $visualisationData });
    height = calculateHeight($visualisationData.length);
    [columnData, columnColors] = setColumnData($visualisationData);
  }

  // Set variables for data and highlighting
  const columnInfo: { [key: string]: string } = {
    LineUp_Rank: 'rank',
    LineUp_Select: 'select',
    ...dataUtil.columnInfo
  };
  let columns = ['LineUp_Rank', 'LineUp_Select', ...dataUtil.columns];
  let highlightRow: number = -1;

  // Booleans to track whether a special key is being held for selection
  let shift: boolean = false;
  let ctrl: boolean = false;
  function setCurrentKey(event: KeyboardEvent) {
    // Only checking Shift and Control for multi-select
    if (event.key === 'Shift') {
      shift = event.type === 'keydown';
    } else if (event.key === 'Control') {
      ctrl = event.type === 'keydown';
    }
  }

  // Create the data and colors for each column
  const barColors = styleUtil.generateColors('Dark2', columns.length);
  let columnData: { [key: string]: Array<number | string> };
  let columnColors: { [key: string]: string };
  [columnData, columnColors] = setColumnData($visualisationData);

  function setColumnData(data: Array<Array<number | string>>) {
    let newColumnData: { [key: string]: Array<number | string> } = {};
    let newColumnColors: { [key: string]: string } = {};

    // Transpose rows to columns
    let transposedData = data.reduce(
      (acc, currentRow) => {
        currentRow.forEach((value, index) => {
          if (acc[index] === undefined) {
            acc[index] = [] as Array<number | string>;
          }
          acc[index].push(value);
        });
        return acc;
      },
      [[]] as Array<Array<number | string>>
    );

    columns.forEach((column, index) => {
      if (column === 'LineUp_Rank') {
        newColumnData[column] = [data.length];
      } else if (column === 'LineUp_Select') {
        newColumnData[column] = [data.length];
      } else {
        // Skipping the first two columns, since they are rank and select columns which
        // do not hold any data from the data array. Defaulting to an empty array if no
        // values are present for the column.
        newColumnData[column] = transposedData[index - 2] || [];
      }
      newColumnColors[column] = barColors[index];
    });

    return [newColumnData, newColumnColors] as [
      { [key: string]: Array<number | string> },
      { [key: string]: string }
    ];
  }

  // Calculate height based on number of rows
  function calculateHeight(numRows: number): number {
    return numRows * 20 + 120;
  }

  // Calculate width based on number of columns
  function calculateWidth(numColumns: number): number {
    return (numColumns + 2) * columnWidth;
  }

  // Handle events
  let selectedRows: Set<number> = new Set();
  function selectRows(event: CustomEvent) {
    if (shift) {
      shiftselectedRows(event);
    } else if (ctrl) {
      selectRow(event, false);
    } else {
      selectRow(event);
    }
  }

  function selectRow(event: CustomEvent, single: boolean = true) {
    // Get the row that was clicked, if it is a valid row
    const row = Number(event.detail.row);
    if (row < 0) {
      return;
    }

    // Add selected row to the set, based on normal of shift click
    if (single) {
      // With a normal click, only select one row, deselect others
      selectedRows.forEach((deselect) => {
        const checkbox = document.getElementById(`select-${deselect}`) as HTMLInputElement;
        checkbox.checked = false;
      });

      // If the row was already selected, deselect it
      if (!selectedRows.has(row)) {
        selectedRows = new Set([row]);
      } else {
        selectedRows = new Set();
      }
    } else {
      // With a shift click, we want to be able to have more than one row selected
      if (event.detail.checked || !selectedRows.has(row)) {
        selectedRows.add(row);
      } else {
        selectedRows.delete(row);
      }
    }

    // Update the selected rows
    selectedRows = selectedRows;

    // Set the column checkbox based on selectedRows state
    const allCheckbox = document.getElementById('column-select-all') as HTMLInputElement;
    if (selectedRows.size === dataUtil.data.length) {
      allCheckbox.indeterminate = false;
      allCheckbox.checked = true;
    } else if (selectedRows.size === 0) {
      allCheckbox.indeterminate = false;
      allCheckbox.checked = false;
    } else {
      allCheckbox.checked = false;
      allCheckbox.indeterminate = true;
    }
  }

  function shiftselectedRows(event: CustomEvent) {
    // Get the row ranges that need to be selected
    const row = Number(event.detail.row);
    const rowArray = Array.from(selectedRows);
    const min = Math.min(...rowArray);
    const max = Math.max(...rowArray);

    // Reset the selected rows
    selectedRows = new Set();

    // Select the rows based on the range
    if (min === -Infinity || max === Infinity || min === Infinity || max === -Infinity) {
      selectRow(event);
    } else if (row < min) {
      for (let i = row; i <= min; i++) {
        selectRow({ detail: { row: i } } as CustomEvent, false);
      }
    } else if (row > max) {
      for (let i = max; i <= row; i++) {
        selectRow({ detail: { row: i } } as CustomEvent, false);
      }
    } else {
      for (let i = min; i <= row; i++) {
        selectRow({ detail: { row: i } } as CustomEvent, false);
      }
    }
  }

  function selectAll(event: CustomEvent) {
    if (event.detail.checked) {
      selectedRows = new Set([...Array(dataUtil.data.length).keys()]);
    } else {
      selectedRows = new Set();
    }
  }

  function filterData(event: CustomEvent) {
    // TODO: Implement filtering functionality in DataUtils
    console.log('filter', event.detail.column, event.detail.min, event.detail.max);
  }

  function groupData(event: CustomEvent) {
    // TODO: Implement grouping functionality in DataUtils & LineUp
    console.log('group', event.detail.column);
  }

  function searchData(event: CustomEvent) {
    // TODO: Implement search functionality in DataUtils
    console.log('search', event.detail.column, event.detail.search);
  }

  function sortData(event: CustomEvent) {
    // TODO: Make sure that we can disable sorting as well, not just ascending and descending
    console.log('sort', event.detail.column, event.detail.sorting);
  }

  // Handle columns being dragged
  let dragMove: string | null = null;
  let dragMoveX: number = 0;

  // Raise the column when dragging so its displayed over the other ones
  function onDraggingStart(event: CustomEvent) {
    dragMove = event.detail.elementName as string;
    d3.select(`.lineUp > #${dragMove.replace(/[\s()/]/g, '')}-column`).raise();
  }

  // Set the new position of the column when dragging
  function onDragMove(event: CustomEvent) {
    dragMoveX += event.detail.movementX;
  }

  // Update the columns array with the new order
  function onDragStop() {
    if (dragMove === null) {
      return;
    }

    // Update the columns array with the new order
    const oldIndex = columns.indexOf(dragMove);
    const newIndexOffset =
      dragMoveX > 0 ? Math.floor(dragMoveX / columnWidth) : Math.ceil(dragMoveX / columnWidth);
    const newIndex = Math.max(0, Math.min(columns.length - 1, oldIndex + newIndexOffset));
    columns = columns.filter((_, i) => i !== oldIndex);
    columns.splice(newIndex, 0, dragMove);
    columns = columns;

    // Reset the element that is being dragged
    dragMove = null;
    dragMoveX = 0;
  }
</script>

<!--
@component
### LineUp
LineUp is a visualisation that displays multiple columns of data in a tabular format. It is used to compare and rank data. The visualisation
displays different types of columns such as text, bar, and rank columns. This is based on the type of the supplied data.

#### Required attributes
* dataUtil: DataUtils                 - The `DataUtils` class contains all the data to be displayed.

#### Optional attributes
* styleUtil: StyleUtils                - The `StyleUtils` class contains all the styling information. The default value is a new instance of `StyleUtils`.
* columnWidth: number                  - The width of each column. The default value is 150.
* width: number                        - The width of the visualisation. The default value is calculated based on the number of columns and `columnWidth`.
* height: number                       - The height of the visualisation. The default value is calculated based on the number of rows and the row height.
* padding: number                      - The padding between columns. The default value is 10.
-->

<BaseVisualisation>
  <svg
    class="visualisation lineUp"
    {width}
    {height}
    role="cell"
    tabindex="-1"
    on:keydown={setCurrentKey}
    on:keyup={setCurrentKey}>
    {#key dataUtil || $visualisationData}
      <g class="lineUp-highlights">
        {#if highlightRow >= 0}
          <rect
            x={0}
            y={highlightRow * 20 + 120}
            {width}
            height="20"
            fill={styleUtil.focusColor}
            fill-opacity="10%" />
        {/if}
        {#each selectedRows as row}
          <rect
            x={0}
            y={row * 20 + 120}
            {width}
            height="20"
            fill={styleUtil.focusColor}
            fill-opacity="25%" />
        {/each}
      </g>
      {#each columns as column, i}
        {#if columnInfo[column] === 'string'}
          <TextColumn
            x={dragMove === column ? dragMoveX + i * columnWidth : i * columnWidth}
            width={columnWidth}
            {height}
            {padding}
            name={column}
            data={columnData[column].map(String)}
            on:dragStart={onDraggingStart}
            on:dragMove={onDragMove}
            on:dragStop={onDragStop}
            on:mouseHover={(e) => (highlightRow = e.detail.row)}
            on:mouseRowClick={selectRows}
            on:search={(e) => searchData(e)}
            on:sort={(e) => sortData(e)} />
        {:else if columnInfo[column] === 'rank'}
          <RankColumn
            x={dragMove === column ? dragMoveX + i * columnWidth : i * columnWidth}
            width={columnWidth}
            {height}
            {padding}
            length={Number(columnData[column][0])}
            on:dragStart={onDraggingStart}
            on:dragMove={onDragMove}
            on:dragStop={onDragStop}
            on:mouseHover={(e) => (highlightRow = e.detail.row)}
            on:mouseRowClick={selectRows} />
        {:else if columnInfo[column] === 'select'}
          <SelectColumn
            x={dragMove === column ? dragMoveX + i * columnWidth : i * columnWidth}
            width={columnWidth}
            {height}
            {padding}
            selected={selectedRows}
            length={Number(columnData[column][0])}
            on:check={selectRows}
            on:dragStart={onDraggingStart}
            on:dragMove={onDragMove}
            on:dragStop={onDragStop}
            on:checkAll={(e) => selectAll(e)}
            on:group={(e) => groupData(e)}
            on:mouseHover={(e) => (highlightRow = e.detail.row)}
            on:mouseRowClick={selectRows}
            on:sort={(e) => sortData(e)} />
        {:else if columnInfo[column] === 'number'}
          {#key column}
            <BarColumn
              x={dragMove === column ? dragMoveX + i * columnWidth : i * columnWidth}
              width={columnWidth}
              {height}
              {padding}
              barColor={columnColors[column]}
              name={column}
              overviewItem={'histogram'}
              data={columnData[column].map(Number)}
              on:dragStart={onDraggingStart}
              on:dragMove={onDragMove}
              on:dragStop={onDragStop}
              on:filter={(e) => filterData(e)}
              on:mouseHover={(e) => (highlightRow = e.detail.row)}
              on:mouseRowClick={selectRows}
              on:sort={(e) => sortData(e)} />
          {/key}
        {/if}
      {/each}
    {/key}
  </svg>
</BaseVisualisation>
