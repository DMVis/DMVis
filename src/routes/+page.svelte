<script lang="ts">
  import { DataUtils } from '$lib/utils/DataUtils.js';
  import ParallelCoordinates from '$lib/components/visualisations/ParallelCoordinates.svelte';
  import StackedBarChart from '$lib/components/visualisations/StackedBarChart.svelte';
  import ScatterplotMatrix from '$lib/components/visualisations/ScatterplotMatrix.svelte';
  import TabularVisualisation from '$lib/components/visualisations/TabularVisualisation.svelte';

  const height: number = 1000;
  const width: number = 1000;

  const dataUrl = '/datasets/holidays-20.csv';
  const dataUtil = new DataUtils();

  // Load promising
  $: load = (async () => {
    await dataUtil.parseCSV(dataUrl);
  })();
</script>

{#await load then}
  <!-- <TabularVisualisation width={1400} height={1000} {dataUtil} />
  <ParallelCoordinates
    marginLeft={100}
    marginTop={40}
    marginRight={50}
    {dataUtil}
    width={1750}
    height={1500} /> -->
  <ScatterplotMatrix {dataUtil} {height} {width} pointColor="red" pointOpacity={0.3} />
{/await}
<br />
{#await load then}
  <StackedBarChart marginLeft={100} width={1750} height={1500} {dataUtil} />
{/await}
