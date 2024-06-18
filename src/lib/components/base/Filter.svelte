<script lang="ts">
  // Imports
  import { onMount, setContext } from 'svelte';

  // DMVis imports
  import Scrollable from '$lib/components/base/Scrollable.svelte';
  import FilterColumn from '$lib/components/columns/FilterColumn.svelte';
  import { DataUtils } from '$lib/utils/DataUtils.js';
  import { ColumnType } from '$lib/Enums.js';
  import { StyleUtils } from '$lib/utils/StyleUtils.js';
  import { VisualisationStore } from '$lib/utils/VisualisationStore.js';

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
  let height: number;
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

    // Added the 50 for some extra space at the bottom, otherwise the last filter is partially hidden
    height = columns.length * columnHeight + 50;
  });
</script>

<!--
@component
### Filter
The filter component adds a filter to the right side of a visualisation.
It can be used to filter and sort the data displayed in a visualisation.

#### Required Attributes
* dataUtil: DataUtils   - An instance of `dataUtils`, which holds all the data. See its documentation for more information.

#### Optional attribute
* columnHeight: number  - The height per column filter in pixels.
                          Defaults to `100`.
* width: number         - The width of the filter in pixels.
                          Defaults to `150`.
* styleUtil: StyleUtils - An instance of `StyleUtils`, which contains styling for the visualisation. See its documentation for more information.
                          It is needed in the column component.
                          Defaults to `new StyleUtils()`.
-->

<!-- Drawn in reverse order so the overlays will be on top -->
<div class="filter-container">
  <Scrollable width={width + 50}>
    <svg {height}>
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
          on:filter={handleFilterData}
          on:sort={handleSort} />
      {/each}
    </svg>
  </Scrollable>
</div>

<style>
  .filter-container {
    width: 200px;
    height: 100%;
    padding: 20px;
    background-color: #f9f9f9;
  }

  svg {
    display: block;
    width: 100%;
  }
</style>
