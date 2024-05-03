<script lang="ts">
  import FilterColumn from '$lib/components/columns/FilterColumn.svelte';
  import { DataUtils } from '$lib/utils/DataUtils.js';
  import { onMount, setContext } from 'svelte';
  import { StyleUtils } from '$lib/utils/StyleUtils.js';
  import { ColumnType } from '$lib/Enums.js';
  import { VisualisationStore } from '$lib/store.js';

  // Required attributes
  export let dataUtil: DataUtils;

  // Optional attributes
  export let width: number = 150;
  export let columnHeight: number = 100;
  export let styleUtil: StyleUtils = new StyleUtils();

  // Set store values
  const visualisationStore = new VisualisationStore();
  visualisationStore.styleUtil.set(styleUtil); // Is needed in the column component
  setContext('store', visualisationStore);

  // Types
  type FilterValues = {
    [key: string]: string | { min: number; max: number };
  };

  // Variables to track the state of the filters
  let columns: string[] = [];
  let filters: FilterValues = {};
  let sortColumn = ''; // Track the column currently being sorted
  let sort = 'none'; // Track the sorting order
  /* eslint-disable */
  let showSearch = false; // Ignored because its needed in the svg but linter does not approve
  /* eslint-enable */
  let showFilter = true;
  let reversedColumns: string[] = [];
  // Create a map to store the last filter value for each column
  let filterMap: Map<string, string> = new Map();

  function handleFilterData(event: CustomEvent) {
    const { column, value, isMin } = event.detail;

    // Check if the input is a string type column
    if (dataUtil.columnInfo[column] === 'string') {
      filters[column] = value;
    } else {
      // If not, we are dealing with a numeric column
      filters[column] = filters[column] ?? {
        min: Number.MIN_SAFE_INTEGER,
        max: Number.MAX_SAFE_INTEGER
      };
      const numericFilter = filters[column] as { min: number; max: number };
      const numValue = Number(value);

      // Check if the input is empty and set the value to null or keep it wide open
      if (isNaN(numValue)) {
        if (isMin) {
          numericFilter.min = Number.MIN_SAFE_INTEGER;
        } else {
          numericFilter.max = Number.MAX_SAFE_INTEGER;
        }
      } else {
        // Update the min or max value based on the input
        if (isMin) {
          numericFilter.min = +numValue;
        } else {
          numericFilter.max = +numValue;
        }
      }
      // Ensure filters[column] is updated with the modified numericFilter
      filters[column] = numericFilter;
    }

    // Sort the data if sorting is applied
    if (sort !== 'none') {
      let ascending = sort === 'ascend'; // True if sorting is 'ascend'
      dataUtil.sortData(sortColumn, ascending);
    }

    // Apply the filters to the data
    dataUtil.applyFilters(filters);
  }

  // Function to handle sorting
  function handleSort(event: CustomEvent) {
    const { column } = event.detail;
    const sorting = filterMap.get(column) ?? 'none'; // Default to 'none' if undefined

    // Check if sorting should be applied or not
    if (sorting !== 'none') {
      // Set sorting values
      sortColumn = column;
      sort = sorting;

      let ascending = sorting === 'ascend'; // True if sorting is 'ascend'
      dataUtil.sortData(column, ascending);
    } else {
      // Reset sorting values
      sortColumn = '';
      sort = 'none';
      dataUtil.resetVisualisationData();
    }

    // Update the filterMap with the new sorting state
    filterMap.set(column, getNextSortingState(sorting));

    // Always apply filters regardless of whether sorting is applied
    dataUtil.applyFilters(filters);
  }

  function getNextSortingState(currentState: string | undefined): string {
    switch (currentState) {
      case 'ascend':
        return 'descend';
      case 'descend':
        return 'ascend';
      default:
        return 'ascend';
    }
  }

  // Initialize columns and filters once when the component is mounted
  onMount(() => {
    columns = dataUtil.columns;

    reversedColumns = [...columns].reverse();

    // Fill the filterMap with the initial filter values
    columns.forEach((column) => {
      filterMap.set(column, 'ascend');
    });
  });
</script>

<!--
@component
### Filter
Filter is a component that allows users to filter data based on the column values. It is a fixed component that appears on the right side of the screen.

#### Required attributes
* dataUtil: DataUtils    - Class holding all the data, see documentation.

#### Optional attributes
* columnHeight: number   - Height per column filter. Defaults to `100`.
* width: number          - Width of the filter. Defaults to `150`.
-->

<!-- Drawn in reverse order so the overlays will be on top -->
<svg class="filter-container">
  {#each reversedColumns as column, index}
    <FilterColumn
      x={10}
      y={(reversedColumns.length - index) * columnHeight}
      type={dataUtil.columnInfo[column] === 'string' ? ColumnType.Text : ColumnType.Bar}
      {width}
      height={columnHeight}
      padding={10}
      name={column}
      on:filter={() => {
        showFilter = !showFilter;
        showSearch = false;
      }}
      on:filterData={handleFilterData}
      on:sortData={handleSort} />
  {/each}
</svg>

<style>
  :global(.filter-container) {
    position: fixed; /* Fixed positioning relative to the viewport */
    top: 0; /* Aligns the top of the element with the viewport */
    right: 0; /* Aligns the right of the element with the viewport */
    width: 200px; /* Set a specific width for the filter component */
    height: 100vh; /* Set the height to take full viewport height */
    overflow-y: auto; /* Adds scroll to the filter if content exceeds the viewport height */
    padding: 20px;
    background-color: #f9f9f9; /* Optional background color */
    z-index: 1000; /* Ensures the filter appears above other content */
  }
</style>