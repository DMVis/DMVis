<script lang="ts">
  import { setContext } from 'svelte';

  import { VisualisationStore } from '$lib/store.js';
  import type { DataUtils } from '$lib/utils/DataUtils.js';
  import StackedBar from '$lib/components/base/StackedBar.svelte';
  import DynamicAxis from '$lib/components/base/DynamicAxis.svelte';

  // Required attributes
  export let width: number;
  export let height: number;
  export let data: DataUtils;

  // Optional attributes
  export let marginLeft: number = 40;
  export let marginRight: number = 40;
  export let marginBottom: number = 40;
  export let marginTop: number = 40;
  export let padding: number = 0.2;
  export let opacity: number | string = 1;

  // Set store values
  const visStore = new VisualisationStore();
  visStore.marginLeft.set(marginLeft);
  visStore.marginRight.set(marginRight);
  visStore.marginBottom.set(marginBottom);
  visStore.marginTop.set(marginTop);
  visStore.padding.set(padding);
  visStore.width.set(width);
  visStore.height.set(height);
  visStore.data.set(data.data);
  visStore.columns.set(data.columns);

  // Set graph store
  setContext('store', visStore);
</script>

<!--
@component
### StackedBarChart
This is visualisation that represents categorical data with rectangular bars.
The length of each bar corresponds to the numerical value of the data being represented.
The x-axis represents the numerical values of the data.
The y-axis represents the categories of the data.

#### Required attributes
* width: number                        - Width of the visualisation.
* height: number                       - Height of the visualisation.
* data: Array<Array<string | number>>  - Data to visualise.

#### Optional attributes
* marginLeft: number       - Margin to the left of the visualisation.
* marginRight: number      - Margin to the right of the visualisation.
* marginTop: number        - Margin to the top of the visualisation.
* marginBottom: number     - Margin to the bottom of the visualisation.
* padding: number          - Value for the distance between each bar in the range [0..1].
* opacity: number | string - Opacity of each bar as a number in range [0..1] or
                             a percentage string formatted as '{number}%'.
-->
<svg class="visualisation" {width} {height}>
  {#key data}
    <StackedBar {opacity} />
    <DynamicAxis position="left" endColumn={1} />
  {/key}
</svg>
