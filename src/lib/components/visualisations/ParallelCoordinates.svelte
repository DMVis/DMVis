<script lang="ts">
  // Imports
  import { setContext } from 'svelte';

  // DMVis imports
  import Line from '$lib/components/base/Line.svelte';
  import DynamicAxis from '$lib/components/base/DynamicAxis.svelte';
  import { StyleUtils } from '$lib/utils/StyleUtils.js';
  import type { DataUtils } from '$lib/utils/DataUtils.js';
  import { VisualisationStore } from '$lib/store.js';

  // Required attributes
  export let dataUtil: DataUtils;

  // Optional attributes
  export let styleUtil: StyleUtils = new StyleUtils();
  export let width: number = calculateWidth(dataUtil.columns.length);
  export let height: number = calculateHeight(dataUtil.data.length);
  export let marginLeft: number = 40;
  export let marginRight: number = 40;
  export let marginTop: number = 40;
  export let marginBottom: number = 40;

  // Fill the store
  const visualisationStore = new VisualisationStore();

  visualisationStore.width.set(width);
  visualisationStore.height.set(height);
  visualisationStore.data.set(dataUtil.data);
  visualisationStore.columns.set(dataUtil.columns);
  visualisationStore.marginLeft.set(marginLeft);
  visualisationStore.marginRight.set(marginRight);
  visualisationStore.marginTop.set(marginTop);
  visualisationStore.marginBottom.set(marginBottom);
  visualisationStore.styleUtil.set(styleUtil);
  setContext('store', visualisationStore);

  // Calculate height based on number of rows
  // Use the fontsize per row and multiply by 1.5 for padding
  function calculateHeight(numRows: number): number {
    return numRows * styleUtil.fontSize * 1.5;
  }

  // Calculate width based on number of columns
  // Use 175 as the width of each column, as a default
  function calculateWidth(numColumns: number): number {
    return numColumns * 175;
  }
</script>

<!--
@component
### Parallel Coordinates
This is a visualisation that is capable of visualising multi-dimensional data.
It creates an axis for each column in the supplied table with data
  and draws a line through each axis for each row in the table.

#### Required attributes
* dataUtil: DataUtils    - Class holding all the data, see documentation.

#### Optional attributes
* styleUtil: StyleUtils  - Class holding all the styling. See its documentation.
* width: number;         - Width of the visualisation. Defaults to `numberOfColumns * 175`.
* height: number;        - Height of the visualisation. Defaults to `numberOfRows * 15`.
* marginLeft: number     - Margin to the left of the visualisation. Defaults to `40`.
* marginRight: number    - Margin to the right of the visualisation. Defaults to `40`.
* marginTop: number      - Margin to the top of the visualisation. Defaults to `40`.
* marginBottom: number   - Margin to the bottom of the visualisation. Defaults to `40`.
-->
<svg class="visualisation parallelCoordinates" {width} {height}>
  <!-- Draw all the lines -->
  <Line lineWidth={2} hoverable={true} />
  <!-- Draw all the axis -->
  <DynamicAxis position={'left'} alignment={'spaced'} renderLabel={true} labelPosition={'top'} />
</svg>
