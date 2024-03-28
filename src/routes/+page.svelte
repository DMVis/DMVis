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
  <TabularVisualisation
    width={1920}
    height={1250}
    {dataUtil}
    marginLeft={50}
    marginRight={50}
    marginTop={50}
    marginBottom={50}
    columnMarginLeft={0}
    columnMarginRight={0}
    columnMarginTop={20}
    columnMarginBottom={0}
    columnPadding={0}
    barPadding={0.1}
    barColor={'red'}
    barRadiusX={0}
    barRadiusY={0}
    textColor={'black'}
    fontSize={'12px'}
    fontWeight={'normal'}
    fontFamily={'Arial'}
    headerOffsetY={-30}
    headerColor={'rgb(200,200,200)'}
    headerOpacity={1}
    headerRadiusX={5}
    headerRadiusY={5}
    headerPadding={5}
    headerTextColor={'black'}
    headerFontSize={'14px'}
    headerFontWeight={'normal'}
    headerFontFamily={'Arial'}
    hasHeaderBackground={true} />
{/await}
{#await load then}
  <ParallelCoordinates
    marginLeft={100}
    marginTop={40}
    marginRight={50}
    {dataUtil}
    width={1750}
    height={1500} />
  <ScatterplotMatrix {dataUtil} {height} {width} pointColor="red" pointOpacity={0.3} />
{/await}
<br />
{#await load then}
  <StackedBarChart marginLeft={100} width={1750} height={1500} data={dataUtil} />
{/await}
<br />
