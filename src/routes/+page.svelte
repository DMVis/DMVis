<script lang="ts">
  import { DataUtils } from '$lib/utils/DataUtils.js';

  import LineUp from '$lib/components/visualisations/LineUp.svelte';
  import ValueChart from '$lib/components/visualisations/ValueChart.svelte';
  import StackedBarChart from '$lib/components/visualisations/StackedBarChart.svelte';
  import ScatterplotMatrix from '$lib/components/visualisations/ScatterplotMatrix.svelte';
  import ParallelCoordinates from '$lib/components/visualisations/ParallelCoordinates.svelte';
  import TabularVisualisation from '$lib/components/visualisations/TabularVisualisation.svelte';

  const dataUrl = '/datasets/holidays-20.csv';
  const dataUtil = new DataUtils();
  const dataUtilWithId = new DataUtils(true);

  // Load promise
  $: load = (async () => {
    await dataUtil.parseData(dataUrl);
    await dataUtilWithId.parseData(dataUrl);
  })();
</script>

{#await load then}
  <ValueChart width={1500} height={900} {dataUtil} />
  <LineUp width={1920} height={1080} dataUtil={dataUtilWithId} />
  <TabularVisualisation {dataUtil} width={1500} />
  <ParallelCoordinates marginLeft={100} marginTop={40} marginRight={50} {dataUtil} />
  <ScatterplotMatrix {dataUtil} />
  <StackedBarChart marginLeft={100} {dataUtil} showTotals={true} />
{/await}
