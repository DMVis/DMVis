<script lang="ts">
  import { DataUtils } from '$lib/utils/DataUtils.js';
  import LineUp from '$lib/components/visualisations/LineUp.svelte';
  import StackedBarChart from '$lib/components/visualisations/StackedBarChart.svelte';
  import ScatterplotMatrix from '$lib/components/visualisations/ScatterplotMatrix.svelte';
  import ParallelCoordinates from '$lib/components/visualisations/ParallelCoordinates.svelte';
  import TabularVisualisation from '$lib/components/visualisations/TabularVisualisation.svelte';
  import Filter from '$lib/components/base/Filter.svelte';
  const dataUrl = '/datasets/holidays-20_v1.json';
  const dataUtil = new DataUtils();

  // Load promise
  $: load = (async () => {
    await dataUtil.parseData(dataUrl);
  })();
</script>

{#await load then}
  <Filter {dataUtil} />
  <LineUp width={1920} height={1080} {dataUtil} />
  <TabularVisualisation {dataUtil} />
  <ParallelCoordinates marginLeft={100} marginTop={40} marginRight={50} {dataUtil} />
  <ScatterplotMatrix {dataUtil} />
  <StackedBarChart marginLeft={100} {dataUtil} showTotals={true} />
{/await}
