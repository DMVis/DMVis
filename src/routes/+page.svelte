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

<div style="width: 100%; height: 100vh">
  {#await load then}
    <ValueChart width={1500} height={900} {dataUtil} isScrollable={true} />
    <LineUp width={1920} height={1080} dataUtil={dataUtilWithId} isScrollable={true} />
    <TabularVisualisation {dataUtil} width={1500} isScrollable={true} />
    <ParallelCoordinates
      marginLeft={100}
      marginTop={40}
      marginRight={50}
      {dataUtil}
      isScrollable={true} />
    <ScatterplotMatrix {dataUtil} isScrollable={true} />
    <StackedBarChart marginLeft={100} {dataUtil} showTotals={true} isScrollable={true} />
  {/await}
</div>
