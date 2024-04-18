<script lang="ts">
  // Imports
  import { setContext } from 'svelte';

  // DMVis imports
  import StackedBar from '$lib/components/base/StackedBar.svelte';
  import DynamicAxis from '$lib/components/base/DynamicAxis.svelte';
  import { StyleUtils } from '$lib/utils/StyleUtils.js';
  import type { DataUtils } from '$lib/utils/DataUtils.js';
  import { VisualisationStore } from '$lib/store.js';

  // Required attributes
  export let width: number;
  export let height: number;
  export let dataUtil: DataUtils;

  // Optional attributes
  export let marginLeft: number = 40;
  export let marginRight: number = 40;
  export let marginBottom: number = 40;
  export let marginTop: number = 40;
  export let padding: number = 0.2;
  export let opacity: number | string = 1;
  export let styleUtil: StyleUtils = new StyleUtils({
    colorSet: 'Set1',
    numColors: dataUtil.columns.length - 1
  });

  // Set store values
  const visualisationStore = new VisualisationStore();
  visualisationStore.marginLeft.set(marginLeft);
  visualisationStore.marginRight.set(marginRight);
  visualisationStore.marginBottom.set(marginBottom);
  visualisationStore.marginTop.set(marginTop);
  visualisationStore.padding.set(padding);
  visualisationStore.width.set(width);
  visualisationStore.height.set(height);
  visualisationStore.data.set(dataUtil.data);
  visualisationStore.columns.set(dataUtil.columns);
  visualisationStore.styleUtil.set(styleUtil);

  setContext('store', visualisationStore);
</script>

<!--
@component
### Stacked Bar Chart
This is visualisation that represents categorical data with rectangular bars.
The length of each bar corresponds to the numerical value of the data being represented.
The x-axis represents the numerical values of the data.
The y-axis represents the categories of the data.

#### Required attributes
* width: number                        - Width of the visualisation.
* height: number                       - Height of the visualisation.
* dataUtil: Array<Array<string | number>>  - Data to visualise.

#### Optional attributes
* marginLeft: number       - Margin to the left of the visualisation.
* marginRight: number      - Margin to the right of the visualisation.
* marginTop: number        - Margin to the top of the visualisation.
* marginBottom: number     - Margin to the bottom of the visualisation.
* padding: number          - Value for the distance between each bar in the range [0..1].
* opacity: number | string - Opacity of each bar as a number in range [0..1] or
                             a percentage string formatted as '{number}%'.
* styleUtil: StyleUtils     - Class holding all the styling. See documentation.
-->

<svg class="visualisation stackedBarchart" {width} {height}>
  {#key dataUtil}
    <StackedBar {opacity} />
    <DynamicAxis position="left" endColumn={1} />
  {/key}
</svg>
