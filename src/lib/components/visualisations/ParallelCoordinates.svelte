<script lang="ts">
  import { setContext } from 'svelte';
  import { VisualisationStore } from '$lib/store.js';

  import Line from '$lib/components/base/Line.svelte';
  import DynamicAxis from '$lib/components/base/DynamicAxis.svelte';
  import { StyleUtils } from '$lib/utils/StyleUtils.js';
  import type { DataUtils } from '$lib/utils/DataUtils.js';

  // Insert exports
  export let width: number;
  export let height: number;
  export let dataUtil: DataUtils;

  export let styleUtil: StyleUtils = new StyleUtils();
  export let marginLeft: number = 40;
  export let marginRight: number = 40;
  export let marginTop: number = 40;
  export let marginBottom: number = 40;

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
</script>

<!--
@component
### Parallel Coordinates
This is a visualisation that is capable of visualising multi-dimensional data.
It creates an axis for each column in the supplied table with data
  and draws a line through each axis for each row in the table.

#### Required attributes
* width: number;                        - Width of the visualisation.
* height: number;                       - Height of the visualisation.
* dataUtil: DataUtils;                  - Class holding all the data, see documentation.

#### Optional attributes
* marginLeft: number  - Margin to the left of the visualisation, defaults to 40
* marginRight: number  - Margin to the right of the visualisation, defaults to 40
* marginTop: number  - Margin to the top of the visualisation, defaults to 40
* marginBottom: number  - Margin to the bottom of the visualisation, defaults to 40
* styleUtil: StyleUtils - Class holding all the styling. See documentation.
-->
<svg class="visualisation" {width} {height}>
  <Line lineWidth={2} hoverable={true} />
  <DynamicAxis position={'left'} alignment={'spaced'} />
</svg>
