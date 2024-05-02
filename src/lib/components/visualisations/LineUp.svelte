<script lang="ts">
  // Imports
  import { setContext } from 'svelte';

  // DMVis imports
  import BarColumn from '$lib/components/columns/BarColumn.svelte';
  import TextColumn from '$lib/components/columns/TextColumn.svelte';
  import RankColumn from '$lib/components/columns/RankColumn.svelte';
  import SelectColumn from '$lib/components/columns/SelectColumn.svelte';
  import { StyleUtils } from '$lib/utils/StyleUtils.js';
  import type { DataUtils } from '$lib/utils/DataUtils.js';
  import { VisualisationStore } from '$lib/store.js';

  // Required attributes
  export let dataUtil: DataUtils;

  // Optional attributes
  export let styleUtil: StyleUtils = new StyleUtils();
  export let width: number = calculateWidth(dataUtil.columns.length);
  export let height: number = calculateHeight(dataUtil.data.length);
  export let columnWidth: number = 150;
  export let padding: number = 10;

  const { visualisationData } = dataUtil;

  // Set store values
  const visualisationStore = new VisualisationStore();

  $: {
    visualisationStore.data.set($visualisationData);
    height = calculateHeight($visualisationData.length);
    // columnData = $visualisationData.map((_, colIndex) => [
    //   ...$visualisationData.map((row) => row[colIndex])
    // ]);
  }

  // Set context of the visualisation
  visualisationStore.width.set(width);
  visualisationStore.height.set(height);
  visualisationStore.data.set(dataUtil.data);
  visualisationStore.columns.set(dataUtil.columns);
  visualisationStore.styleUtil.set(styleUtil);
  setContext('store', visualisationStore);

  // Set variables for data and highlighting
  const columnInfo: { [key: string]: string } = {
    LineUp_Rank: 'rank',
    LineUp_Select: 'select',
    ...dataUtil.columnInfo
  };
  let columns = ['LineUp_Rank', 'LineUp_Select', ...dataUtil.columns];
  let highlightRow: number = -1;
  let shift: boolean = false;

  // Create a dictionary for all the data that needs to be displayed
  const transposedData = $visualisationData.map((_, colIndex) =>
    $visualisationData.map((row) => row[colIndex])
  );
  const barColors = styleUtil.generateColors('Dark2', columns.length);
  let columnData: { [key: string]: Array<number | string> } = {};
  let columnColors: { [key: string]: string } = {};
  columns.forEach((column, index) => {
    if (column === 'LineUp_Rank') {
      columnData[column] = [$visualisationData.length];
    } else if (column === 'LineUp_Select') {
      columnData[column] = [$visualisationData.length];
    } else {
      columnData[column] = transposedData[index - 2];
    }
    columnColors[column] = barColors[index];
  });

  // Calculate height based on number of rows
  function calculateHeight(numRows: number): number {
    return numRows * 20 + 105;
  }

  // Calculate width based on number of columns
  function calculateWidth(numColumns: number): number {
    return (numColumns + 2) * columnWidth;
  }

  // Handle events
  let selectRows: Set<number> = new Set();
  function selectRow(event: CustomEvent, single: boolean = true) {
    // Get the row that was clicked, if it is a valid row
    const row = Number(event.detail.row);
    if (row < 0) {
      return;
    }

    // Add selected row to the set, based on normal of shift click
    if (single) {
      // With a normal click, only select one row, deselect others
      selectRows.forEach((deselect) => {
        const checkbox = document.getElementById(`select-${deselect}`) as HTMLInputElement;
        checkbox.checked = false;
      });

      // If the row was already selected, deselect it
      if (!selectRows.has(row)) {
        selectRows = new Set([row]);
      } else {
        selectRows = new Set();
      }
    } else {
      // With a shift click, we want to be able to have more than one row selected
      if (event.detail.checked || !selectRows.has(row)) {
        selectRows.add(row);
      } else {
        selectRows.delete(row);
      }
    }

    // Select the checkbox if the row was clicked outside the checkbox
    if (event.detail.checked === undefined) {
      const checkbox = document.getElementById(`select-${row}`) as HTMLInputElement;
      checkbox.checked = selectRows.has(row);
    }

    // Update the selected rows
    selectRows = selectRows;

    // Set the column checkbox based on selectRows state
    const allCheckbox = document.getElementById('column-select-all') as HTMLInputElement;
    if (selectRows.size === dataUtil.data.length) {
      allCheckbox.indeterminate = false;
      allCheckbox.checked = true;
    } else if (selectRows.size === 0) {
      allCheckbox.indeterminate = false;
      allCheckbox.checked = false;
    } else {
      allCheckbox.checked = false;
      allCheckbox.indeterminate = true;
    }
  }

  function shiftSelectRows(event: CustomEvent) {
    // Get the row ranges that need to be selected
    const row = Number(event.detail.row);
    const rowArray = Array.from(selectRows);
    const min = Math.min(...rowArray);
    const max = Math.max(...rowArray);

    // Select the rows based on the range
    if (min === -Infinity || max === Infinity || min === Infinity || max === -Infinity) {
      selectRow(event);
    } else if (row < min) {
      for (let i = row; i < min; i++) {
        selectRow({ detail: { row: i } } as CustomEvent, false);
      }
    } else if (row > max) {
      for (let i = max + 1; i <= row; i++) {
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
      selectRows = new Set([...Array(dataUtil.data.length).keys()]);
    } else {
      selectRows = new Set();
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
  let draggingElement: string | null = null;
  let draggingElementX: number = 0;

  function onDraggingElement(event: CustomEvent) {
    draggingElement = event.detail.elementName;
    draggingElementX += event.detail.movementX;
  }

  function onStoppedDragging() {
    if (draggingElement === null) {
      return;
    }

    // Update the columns array with the new order
    const oldIndex = columns.indexOf(draggingElement);
    const newIndexOffset = Math.floor(draggingElementX / columnWidth);
    const newIndex = Math.max(0, Math.min(columns.length - 1, oldIndex + newIndexOffset));
    columns = columns.filter((_, i) => i !== oldIndex);
    columns.splice(newIndex, 0, draggingElement);
    columns = columns;

    // Reset the element that is being dragged
    draggingElement = null;
    draggingElementX = 0;
  }
</script>

<!--
@component
### LineUp
LineUp is a visualisation that displays multiple columns of data in a tabular format. It is used to compare and rank data. The visualisation
displays different types of columns such as text, bar, and rank columns. This is based on the type of the supplied data.

#### Required attributes
* dataUtil: DataUtils                 - The `DataUtils` class which, contains all the data to be displayed.

#### Optional attributes
* width: number                        - The width of the visualisation. Default value is calculated based on the number of columns and the column width.
* height: number                       - The height of the visualisation. Default value is calculated based on the number of rows and the font size.
* columnWidth: number                  - The width of each column. Default value is 150.
* styleUtil: StyleUtils                - The `StyleUtils` class which, contains all the styling information. Default value is a new instance of `StyleUtils`.
* padding: number                      - The padding between columns. Default value is 10.
-->

<svg
  class="visualisation lineUp"
  {width}
  {height}
  role="cell"
  tabindex="-1"
  on:keydown={(e) => {
    if (e.key === 'Shift') {
      shift = true;
    }
  }}
  on:keyup={(e) => {
    if (e.key === 'Shift') {
      shift = false;
    }
  }}>
  {#key dataUtil || $visualisationData}
    <g class="lineUp-highlights">
      {#if highlightRow >= 0}
        <rect
          x={0}
          y={highlightRow * 20 + 105}
          {width}
          height="20"
          fill={styleUtil.focusColor}
          fill-opacity="10%" />
      {/if}
      {#each selectRows as row}
        <rect
          x={0}
          y={row * 20 + 105}
          {width}
          height="20"
          fill={styleUtil.focusColor}
          fill-opacity="25%" />
      {/each}
    </g>
    {#key columns}
      {#each columns as column, i}
        {#if columnInfo[column] === 'string'}
          <TextColumn
            x={draggingElement === column ? draggingElementX + i * columnWidth : i * columnWidth}
            width={columnWidth}
            {height}
            {padding}
            name={column}
            data={columnData[column].map(String)}
            on:draggingElement={onDraggingElement}
            on:stoppedDragging={onStoppedDragging}
            on:mouseHover={(e) => (highlightRow = e.detail.row)}
            on:mouseRowClick={(e) => (shift ? shiftSelectRows(e) : selectRow(e))}
            on:searchData={(e) => searchData(e)}
            on:sortData={(e) => sortData(e)} />
        {:else if columnInfo[column] === 'rank'}
          <RankColumn
            x={draggingElement === column ? draggingElementX + i * columnWidth : i * columnWidth}
            width={columnWidth}
            {height}
            {padding}
            length={Number(columnData[column][0])}
            on:draggingElement={onDraggingElement}
            on:stoppedDragging={onStoppedDragging}
            on:mouseHover={(e) => (highlightRow = e.detail.row)}
            on:mouseRowClick={(e) => (shift ? shiftSelectRows(e) : selectRow(e))} />
        {:else if columnInfo[column] === 'select'}
          <SelectColumn
            x={draggingElement === column ? draggingElementX + i * columnWidth : i * columnWidth}
            width={columnWidth}
            {height}
            {padding}
            length={Number(columnData[column][0])}
            on:check={(e) => (shift ? shiftSelectRows(e) : selectRow(e))}
            on:draggingElement={onDraggingElement}
            on:stoppedDragging={onStoppedDragging}
            on:toggleAll={(e) => selectAll(e)}
            on:groupData={(e) => groupData(e)}
            on:mouseHover={(e) => (highlightRow = e.detail.row)}
            on:mouseRowClick={(e) => (shift ? shiftSelectRows(e) : selectRow(e))}
            on:sortData={(e) => sortData(e)} />
        {:else if columnInfo[column] === 'number'}
          <BarColumn
            x={draggingElement === column ? draggingElementX + i * columnWidth : i * columnWidth}
            width={columnWidth}
            {height}
            {padding}
            barColor={columnColors[column]}
            name={column}
            data={columnData[column].map(Number)}
            on:draggingElement={onDraggingElement}
            on:stoppedDragging={onStoppedDragging}
            on:filterData={(e) => filterData(e)}
            on:mouseHover={(e) => (highlightRow = e.detail.row)}
            on:mouseRowClick={(e) => (shift ? shiftSelectRows(e) : selectRow(e))}
            on:sortData={(e) => sortData(e)} />
        {/if}
      {/each}
    {/key}
  {/key}
</svg>
