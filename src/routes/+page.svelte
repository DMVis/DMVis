<script lang="ts">
  import LineChart from '$lib/components/visualisations/LineChart.svelte';

  let data: { x: number; y: number }[] = [
    { x: 0, y: 0 },
    { x: 1, y: 2 },
    { x: 2, y: 4 },
    { x: 3, y: 4 }
  ];
  const width = 640;
  const height = 640;
</script>

<LineChart marginLeft={40} marginBottom={40} {width} {height} {data} />
