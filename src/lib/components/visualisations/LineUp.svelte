<script lang="ts">
  // Imports
  import { select } from 'd3';
  import { onMount } from 'svelte';

  // DMVis imports
  import BarColumn from '$lib/components/columns/BarColumn.svelte';
  import TextColumn from '$lib/components/columns/TextColumn.svelte';
  import RankColumn from '$lib/components/columns/RankColumn.svelte';
  import SelectColumn from '$lib/components/columns/SelectColumn.svelte';
  import { StyleUtils } from '$lib/utils/StyleUtils.js';
  import { DMVisError } from '$lib/utils/DMVisError.js';
  import BaseVisualisation from '$lib/components/base/BaseVisualisation.svelte';
  import type { DataUtils } from '$lib/utils/DataUtils.js';
  import { setVisualisationContext, updateVisualisationContext } from '$lib/context.js';
  import { formatClassName } from '$lib/utils/ClassNameFormat.js';

  // Required attributes
  export let dataUtil: DataUtils;

  // Margin to let the rows know where to start
  let columnTopMargin: number = 120;

  // Optional attributes
  export let styleUtil: StyleUtils = new StyleUtils();
  export let columnWidth: number = 150;
  export let width: number = calculateWidth(Math.max(0, dataUtil.columns.length - 1)); // Exclude the ID column
  export let height: number = calculateHeight(dataUtil.data.length);
  export let padding: number = 10;

  let lineUpRef: SVGElement;

  // Get the visualisation data
  const { visualisationData, dataMap } = dataUtil;

  // Set store values
  setVisualisationContext({
    width,
    height,
    data: $visualisationData,
    columns: dataUtil.columns,
    styleUtil
  });

  // Handle mount
  const columnFilters: Map<string, string | { min: number; max: number }> = new Map();
  const columnColours: Map<string, string> = new Map();
  let columnData: Map<string, Array<number | string>> = $dataMap;

  $: {
    // Update the visualisation context
    updateVisualisationContext({ data: $visualisationData });
    height = calculateHeight($visualisationData.length);
    columnData = $dataMap;
  }

  // Set variables for data and highlighting
  const columnInfo: { [key: string]: string } = {
    LineUp_Rank: 'rank',
    LineUp_Select: 'select',
    ...dataUtil.columnInfo
  };
  let highlightRow: number = -1;

  // Set the columns, excluding the first ID column
  let columns = [
    'LineUp_Rank',
    'LineUp_Select',
    ...dataUtil.columns.filter((column) => column !== 'DMVIS_ID')
  ];

  // Set the colors for each columns
  if (dataUtil.columns.length > 0) {
    const barColors = styleUtil.generateColors('Dark2', dataUtil.columns.length);
    dataUtil.columns.forEach((column, i) => {
      columnColours.set(column, barColors[i]);
    });
  }

  // Set the filters
  columns.forEach((column) => {
    if (dataUtil.columnInfo[column] === 'number') {
      const data = $dataMap.get(column) as Array<number>;
      columnFilters.set(column, { min: Math.min(...data), max: Math.max(...data) });
    } else {
      columnFilters.set(column, '');
    }
  });

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

  // Calculate height based on number of rows
  function calculateHeight(numRows: number): number {
    return numRows * 20 + columnTopMargin;
  }

  // Calculate width based on number of columns
  function calculateWidth(numColumns: number): number {
    return (numColumns + 2) * columnWidth;
  }

  // Handle events
  let selectedRows: Map<string, number> = new Map();
  function selectRows(event: CustomEvent, multiple: boolean = false) {
    if (shift) {
      shiftselectedRows(event);
    } else if (ctrl || multiple) {
      selectRow(event, false);
    } else {
      selectRow(event);
    }
  }

  function selectRow(event: CustomEvent, single: boolean = true) {
    // Get the row that was clicked, if it is a valid row
    const row = Number(event.detail.row);
    const rowId = ($dataMap.get('DMVIS_ID')?.[row] as string) ?? '-1';

    if (row < 0 || row >= $visualisationData.length) {
      return;
    }

    // Add selected row to the set, based on normal of shift click
    if (single) {
      // With a normal click, only select one row, deselect others
      selectedRows.forEach((deselect) => {
        const checkbox = document.getElementById(`select-${deselect}`) as HTMLInputElement;
        checkbox ? (checkbox.checked = false) : null;
      });

      // If the row was already selected, deselect it
      if (!selectedRows.has(rowId)) {
        selectedRows = new Map();
        selectedRows.set(rowId, row);
      } else {
        selectedRows = new Map();
      }
    } else {
      // With a shift click, we want to be able to have more than one row selected
      if (event.detail.checked || !selectedRows.has(rowId)) {
        selectedRows.set(rowId, row);
      } else {
        selectedRows.delete(rowId);
      }
    }

    // Update the selected rows
    selectedRows = selectedRows;

    // Set the column checkbox based on selectedRows state
    const allCheckbox = document.getElementById('column-select-all') as HTMLInputElement;
    if (selectedRows.size === $visualisationData.length) {
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
    const rowArray = Array.from(selectedRows.values());
    const min = Math.min(...rowArray);
    const max = Math.max(...rowArray);

    // Reset the selected rows
    selectedRows = new Map();

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
      selectedRows = new Map(
        [...Array($visualisationData.length).keys()].map((row) => [`D-${row}`, row])
      );
    } else {
      selectedRows = new Map();
    }
  }

  function filterData(event: CustomEvent) {
    // Get the filter values
    const { column, min, max, value } = event.detail;

    // Create a new filter object
    if (value !== undefined) {
      columnFilters.set(column, value);
    } else {
      columnFilters.set(column, { min, max });
    }

    // Apply the filters to the data and (if needed) sort it
    dataUtil.applyFilters(Object.fromEntries(columnFilters));
    if (sortedOrder !== 'none') {
      dataUtil.sortData(sortedColumn, sortedOrder === 'asc');
    }
  }

  function getColumnFilter(column: string): { min: number; max: number } {
    return columnFilters.get(column) as { min: number; max: number };
  }

  let groupColumn: string = '';
  let grouped: boolean = false;
  function groupSelect(event: CustomEvent) {
    // Get the current column (DMVIS_Select) and if it is grouped or not
    const { column } = event.detail;

    // Check if the column is already grouped
    if (grouped && groupColumn === column) {
      // Reset the data
      dataUtil.resetVisualisationData();
      dataUtil.applyFilters(Object.fromEntries(columnFilters));
    } else {
      // Since we only group the select column, we can just sort the data based on the selectedRows
      const selectedList = Array.from(selectedRows.keys());
      const sortedData = $visualisationData.sort((a, b) => {
        // ID is always the first column
        const aIndex = selectedList.indexOf(a[0] as string);
        const bIndex = selectedList.indexOf(b[0] as string);

        // If one of the rows is not in the selected rows, it should be at the bottom
        if (aIndex === -1 && bIndex === -1) {
          return 0;
        } else if (aIndex === -1) {
          return 1;
        } else if (bIndex === -1) {
          return -1;
        } else {
          return aIndex - bIndex;
        }
      });

      // Set the visualisation data
      dataUtil.setVisualisationData(sortedData);
    }

    // Update the selected rows
    const selected = new Map();
    selectedRows.forEach((row, rowId) => {
      const rowIndex = $dataMap.get('DMVIS_ID')?.indexOf(rowId) ?? row;
      selected.set(rowId, rowIndex);
    });
    selectedRows = selected;

    // Set the group column and grouped state
    groupColumn = column;
    grouped = !grouped;
  }

  function searchData(event: CustomEvent) {
    const { column, value } = event.detail;
    const selected: Map<string, number> = new Map();

    if (value !== '') {
      // Select the rows that match the search
      $dataMap.get(column)?.forEach((rowValue, i) => {
        if (String(rowValue).toLowerCase().includes(value.toLowerCase())) {
          const rowId = ($dataMap.get('DMVIS_ID')?.[i] as string) ?? '-1';
          selected.set(rowId, i);
          selectRow({ detail: { row: i } } as CustomEvent, false);
        }
      });
    }

    // Set the selected rows
    selectedRows = selected;
  }

  let sortedColumn: string = '';
  let sortedOrder: 'asc' | 'desc' | 'none' = 'none';
  function sortData(event: CustomEvent) {
    const { column } = event.detail;
    if (sortedColumn === column) {
      // Decide sorting order, none -> asc -> desc -> none
      sortedOrder = sortedOrder === 'asc' ? 'desc' : sortedOrder === 'desc' ? 'none' : 'asc';
    } else {
      sortedOrder = 'asc';
    }
    sortedColumn = column;

    // Check if sorting should be applied or not
    if (sortedOrder !== 'none') {
      // Sort the data
      dataUtil.sortData(column, sortedOrder === 'asc');
    } else {
      // Reset sorting values
      dataUtil.resetVisualisationData();
      dataUtil.applyFilters(Object.fromEntries(columnFilters));
    }

    // Update the selected rows
    const selected = new Map();
    selectedRows.forEach((row, rowId) => {
      const rowIndex = $dataMap.get('DMVIS_ID')?.indexOf(rowId) ?? row;
      selected.set(rowId, rowIndex);
    });
    selectedRows = selected;
  }

  // Handle columns being dragged
  let dragMove: string | null = null;
  let dragMoveX: number = 0;

  // Raise the column when dragging so its displayed over the other ones
  function onDraggingStart(event: CustomEvent) {
    dragMove = event.detail.elementName as string;
    select(lineUpRef)
      .select(`#${formatClassName(dragMove)}-column`)
      .raise();
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

  // Check if the correct dataUtil is being used
  onMount(() => {
    if (!dataUtil.includeId) {
      throw DMVisError(
        'The LineUp visualisation requires a DataUtils instance with the `includeId` flag set to true.',
        'LineUp'
      );
    }
  });
</script>

<!--
@component
### LineUp
LineUp is a visualisation that displays multiple columns of data in a tabular format. It is used to compare and rank data. The visualisation
displays different types of columns such as text, bar, and rank columns. This is based on the type of the supplied data.

#### Required attributes
* dataUtil: DataUtils                 - The `DataUtils` class contains all the data to be displayed. Requires a dataUtil with the `includeId` flag set to `true`.

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
    on:keyup={setCurrentKey}
    bind:this={lineUpRef}>
    {#key columnData || dataUtil || $dataMap || $visualisationData || grouped || sortedOrder}
      <g class="lineUp-highlights">
        {#if highlightRow >= 0}
          <rect
            x={0}
            y={highlightRow * 20 + columnTopMargin}
            {width}
            height="20"
            fill={styleUtil.focusColor}
            fill-opacity="10%" />
        {/if}
        {#each selectedRows.values() as row}
          <rect
            x={0}
            y={row * 20 + columnTopMargin}
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
            data={columnData.get(column)?.map(String) ?? []}
            filter={String(columnFilters.get(column))}
            on:dragStart={onDraggingStart}
            on:dragMove={onDragMove}
            on:dragStop={onDragStop}
            on:mouseHover={(e) => (highlightRow = e.detail.row)}
            on:mouseRowClick={selectRows}
            on:search={searchData}
            on:filter={filterData}
            on:remove={() => (columns = columns.filter((c) => c !== column))}
            on:sort={sortData} />
        {:else if columnInfo[column] === 'rank'}
          <RankColumn
            x={dragMove === column ? dragMoveX + i * columnWidth : i * columnWidth}
            width={columnWidth}
            {height}
            {padding}
            length={$visualisationData.length}
            on:dragStart={onDraggingStart}
            on:dragMove={onDragMove}
            on:dragStop={onDragStop}
            on:mouseHover={(e) => (highlightRow = e.detail.row)}
            on:mouseRowClick={selectRows}
            on:remove={() => (columns = columns.filter((c) => c !== column))} />
        {:else if columnInfo[column] === 'select'}
          {#key selectedRows}
            <SelectColumn
              x={dragMove === column ? dragMoveX + i * columnWidth : i * columnWidth}
              width={columnWidth}
              {height}
              {padding}
              selected={new Set(selectedRows.values())}
              length={$visualisationData.length}
              on:check={(e) => selectRows(e, true)}
              on:dragStart={onDraggingStart}
              on:dragMove={onDragMove}
              on:dragStop={onDragStop}
              on:checkAll={selectAll}
              on:group={groupSelect}
              on:mouseHover={(e) => (highlightRow = e.detail.row)}
              on:mouseRowClick={selectRows}
              on:remove={() => (columns = columns.filter((c) => c !== column))}
              on:sort={sortData} />
          {/key}
        {:else if columnInfo[column] === 'number'}
          {#key column}
            <BarColumn
              x={dragMove === column ? dragMoveX + i * columnWidth : i * columnWidth}
              width={columnWidth}
              {height}
              {padding}
              barColor={columnColours.get(column)}
              name={column}
              overviewItem={'histogram'}
              data={columnData.get(column)?.map(Number) ?? []}
              filter={getColumnFilter(column)}
              on:dragStart={onDraggingStart}
              on:dragMove={onDragMove}
              on:dragStop={onDragStop}
              on:filter={filterData}
              on:mouseHover={(e) => (highlightRow = e.detail.row)}
              on:mouseRowClick={selectRows}
              on:remove={() => (columns = columns.filter((c) => c !== column))}
              on:sort={sortData} />
          {/key}
        {/if}
      {/each}
    {/key}
  </svg>
</BaseVisualisation>
