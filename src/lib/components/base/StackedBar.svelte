<script lang="ts">
  // DMVis imports
  import Bar from '$lib/components/base/Bar.svelte';
  import Label from '$lib/components/base/Label.svelte';
  import { getVisualisationContext } from '$lib/utils/Context.js';
  import type { Opacity, ScaleLinear } from '$lib/Types.js';

  // Required attributes
  export let y: number;
  export let barWidth: number;
  export let row: (string | number)[];
  export let attributeScales: ScaleLinear[];

  // Optional attributes
  export let opacity: Opacity = 1;
  export let showTotals: boolean = false;

  // Get store info
  const { columns, marginLeft, styleUtil } = getVisualisationContext();
  // Prepare data for rendering
  let numericalCols = $columns.slice(1);
  if (numericalCols.length === 0) numericalCols = new Array(row.length);
  const rowData = row.slice(1) as number[];

  // Calculate the scaled value for each bar in the stacked bar
  let values = rowData.map((value, i) => {
    // If there is a value that is not a number, it is something that means undefined (which is the same as 0)
    if (typeof value !== 'number') return 0;
    let scale = attributeScales[i];
    return scale(value);
  });
  // Create the xPositions for each bar in the stacked bar
  const xPositions: number[] = [];
  let currentX = 0;
  xPositions.push(currentX);
  for (let i = 0; i < numericalCols.length; i++) {
    // If there is a value that is not a number, it is something that means undefined (which is the same as 0)
    if (typeof rowData[i] !== 'number') {
      xPositions.push(currentX);
      continue;
    }
    currentX += attributeScales[i](rowData[i]);
    xPositions.push(currentX);
  }
  // Calculate the scaled total value of this row, this is displayed at the end of the stacked bar
  const total = rowData.reduce((old, current, i) => {
    if (typeof current !== 'number') return old;
    return old + attributeScales[i](current);
  }, 0);
</script>

<!--
@component
### StackedBar
The StackedBar is used for visualising data in a
stacked bar format. It is a wrapper around the Bar
component that allows for multiple bars to be stacked
on top of each other.

#### Required Attributes
* y: number                      - The y-coordinate of the stacked bar.
* barWidth: number               - The width of the stacked bar in pixels.
* row: (string|number)[]         - An entire row of the `DataUtils` instance, which will be represented as a stacked bar.
* attributeScales: ScaleLinear[] - An array of scales, where the first entry
                                   is the scale for the first numerical entry in the row attribute and so on.
#### Optional Attributes
* opacity: Opacity    - The opacity of the stacked bar.
                       It can be a number between `0` and `1` (inclusive) or a string representing a percentage (e.g. `'50%'`).
                       Defaults to `1`.
* showTotals: boolean - Whether or not to display the sum of all bars at the end as a number.
                       Defaults to `false`.
-->

<!-- The stacked bar -->
<g>
  <!-- Loop over all attributes -->
  {#each xPositions as x, i}
    <!-- Create a bar for every attribute -->
    <Bar
      x={$marginLeft + x}
      {y}
      width={barWidth}
      length={values[i]}
      isVertical={false}
      color={$styleUtil.colorScheme[i % $styleUtil.colorScheme.length]}
      origin={'topLeft'}
      hoverText={`${numericalCols[i] ? numericalCols[i] + ':' : ''}${Number(rowData[i])}`}
      {opacity} />
  {/each}
  {#if showTotals}
    <Label
      x={currentX + $marginLeft}
      y={y + barWidth / 2}
      text={Math.floor(total).toString()}
      origin={'middleLeft'}
      hasBackground={false}
      fontSize={`${10}px`} />
  {/if}
</g>
