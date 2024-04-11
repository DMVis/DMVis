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
  const numericalData: Array<Array<number>> = $data.map((row) => row.slice(1) as Array<number>);
  const numericalCols = $columns.slice(1);
</script>

<!--
@component
### StackedBar
The StackedBar is used for visualising data in a
stacked bar format. It is a wrapper around the Bar
component that allows for multiple bars to be stacked
on top of each other.

#### Optional attributes
* opacity: number | string - Opacity of each bar as a number in range [0..1] or
                             a percentage string formatted as '{number}%'.
* colors: string[]         - Array of colors to use for each bar.
-->
<g>
  {#each numericalData as rows, rowIndex}
    {#each numericalCols as column, colIndex}
      <Bar
        x={$marginLeft + d3.sum(rows.slice(0, colIndex))}
        y={Number(yScale(String(labels[rowIndex])))}
        width={yScale.bandwidth()}
        value={Number(rows[colIndex])}
        isValueAlongYAxis={false}
        color={colors[colIndex % colors.length]}
        originX={OriginX.Left}
        originY={OriginY.Top}
        hoverText={`${column}: `}
        {opacity} />
    {/each}
  {/each}
</g>
