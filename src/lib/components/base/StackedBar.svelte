<script lang="ts">
  import * as d3 from 'd3';
  import { getContext } from 'svelte';

  import { OriginX, OriginY } from '$lib/Enums.js';
  import Bar from '$lib/components/base/Bar.svelte';
  import type { VisualisationStore } from '$lib/store.js';

  // Optional attributes
  export let opacity: number | string = 1;
  export let colors: string[] = [
    '#a6cee3',
    '#1f78b4',
    '#b2df8a',
    '#33a02c',
    '#fb9a99',
    '#e31a1c',
    '#fdbf6f',
    '#ff7f00',
    '#cab2d6',
    '#6a3d9a',
    '#ffff99',
    '#b15928'
  ];

  // Get store info
  const { data, columns, yScales, marginLeft } = getContext<VisualisationStore>('store');
  const yScale = $yScales[0] as d3.ScaleBand<string>;

  // Prepare data for rendering
  const labels = $data.map((row) => row[0]);
  const numericalData: Array<Array<Number>> = $data.map((row) => row.slice(1) as Array<Number>);
  const numericalCols = $columns.slice(1);
</script>

<g>
  {#each numericalData as rows, rowIndex}
    {#each numericalCols as _, colIndex}
      <Bar
        x={$marginLeft + d3.sum(rows.slice(0, colIndex))}
        y={Number(yScale(String(labels[rowIndex])))}
        width={yScale.bandwidth()}
        value={Number(rows[colIndex])}
        isValueAlongYAxis={false}
        color={colors[colIndex % colors.length]}
        originX={OriginX.Left}
        originY={OriginY.Top}
        {opacity} />
    {/each}
  {/each}
</g>
