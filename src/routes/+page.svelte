<script lang="ts">
  import { DataUtils } from '$lib/utils/DataUtils.js';
  import ParallelCoordinates from '$lib/components/visualisations/ParallelCoordinates.svelte';
  import StackedBarChart from '$lib/components/visualisations/StackedBarChart.svelte';
  import ScatterplotMatrix from '$lib/components/visualisations/ScatterplotMatrix.svelte';
  import TabularVisualisation from '$lib/components/visualisations/TabularVisualisation.svelte';

  const dataUrl = '/datasets/holidays-20.csv';
  const dataUtil = new DataUtils();

  // Load promising
  $: load = (async () => {
    await dataUtil.parseData(dataUrl);
  })();
</script>

{#await load then}
  <TabularVisualisation {dataUtil} />
  <ParallelCoordinates marginLeft={100} marginTop={40} marginRight={50} {dataUtil} />
  <ScatterplotMatrix {dataUtil} />
{/await}
<br />
{#await load then}
  <StackedBarChart marginLeft={100} {dataUtil} />
{/await}
