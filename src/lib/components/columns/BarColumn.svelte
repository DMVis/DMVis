<script lang="ts">
  // Imports
  import * as d3 from 'd3';
  import { writable } from 'svelte/store';
  import { createEventDispatcher } from 'svelte';

  // DMVis imports
  import Label from '$lib/components/base/Label.svelte';
  import Column from '$lib/components/base/Column.svelte';
  import Histogram from '$lib/components/visualisations/Histogram.svelte';
  import { DMVisError } from '$lib/utils/DMVisError.js';
  import { ColumnType, OriginX, OriginY, IconType } from '$lib/Enums.js';
  import Axis from '$lib/components/base/Axis.svelte';
  import Bar from '$lib/components/base/Bar.svelte';

  // Required attributes
  export let x: number;
  export let width: number;
  export let height: number;
  export let data: Array<number>;

  // Optional attributes
  export let filter: { min: number; max: number } = { min: 0, max: 100 };
  export let name: string = 'Column';
  export let padding: number = 10;
  export let barColor: string = 'red';
  export let icons: IconType[] = [IconType.Sort, IconType.Filter, IconType.More];
  export let weight: string = '10';
  export let overviewItem: 'histogram' | 'axis' | 'none' = 'none';
  export let scale: d3.ScaleLinear<number, number> = d3
    .scaleLinear()
    .domain([0, d3.max(data) ?? 0])
    .range([0, width - padding]);

  export let names: string[] = [];
  export let barOpacity: number = 1;

  if (overviewItem !== 'histogram' && overviewItem !== 'axis' && overviewItem !== 'none') {
    throw DMVisError(`${overviewItem} was not recognised as overview item`, 'BarColumn');
  }

  if (names.length > 0 && names.length !== data.length) {
    throw DMVisError('Specified names array is either too big, or too small', 'BarColumn');
  }

  // Column standards
  const dispatch = createEventDispatcher();
  const type = ColumnType.Bar;
  const paddingSide: number = padding / 2;
  const minValue = Math.min(...data);
  const maxValue = Math.max(...data);
  let showFilter = false;
  let showWeight = false;
  let weightInputIsCorrect = true;

  // Get the y position of the column
  function getY(index: number) {
    // 20 = height of row, 120 = height of top part, 1 = padding
    return index * 20 + 120 + 1;
  }

  // Dispatch filter
  let min = writable(filter.min.toString());
  let max = writable(filter.max.toString());
  function dispatchFilter() {
    dispatch('filter', { column: name, min: parseInt($min), max: parseInt($max) });
  }

  // Function that fires when a key is pressed in the weight input
  function dispatchWeight(e: KeyboardEvent) {
    // Only allow weights to be accepted when the enter button is pressed
    if (e.key !== 'Enter') return;
    // Regex to check if the number is an integer or floating point with a '.'
    const regex = /^[-+]?[0-9]*\.?[0-9]+$/;
    if (regex.test(weight)) {
      const weightAsFloat = parseFloat(weight);
      if (weightAsFloat < 0 || weightAsFloat > 100) {
        throw DMVisError('Invalid weight supplied', 'BarColumn');
      }
      // Turn box back to white
      weightInputIsCorrect = true;
      // Dispatch the new weight
      dispatch('weightChanged', {
        column: name,
        value: weightAsFloat
      });
    } else {
      //Turn box red
      weightInputIsCorrect = false;
    }
  }
</script>

<!--
@component
### BarColumn
BarColumn is a Column component that displays bars for each value in the data array.

#### Required attributes
* x: number       - The X-coordinate of the column.
* width: number   - The width of the column.
* height: number  - The height of the column.
* data: number[]  - The data you want to display as bars.

#### Optional attributes
* name: string                            - The name of the column. Usually the attribute name.
* padding: number                         - The padding of the column.
* barColor: string                        - The colour of the bars.
* icons: IconType[]                       - List of what icons to display in the top of the column,
                                              defaults to `[IconType.Sort,IconType.Filter,IconType.More]`
* overviewItem: 'histogram'|'axis'|'none' - Determines what item to display in the overview section of the column header. Defaults to none
* scale: d3.ScaleLinear<number,number>    - What scale to use for all of the bars in the column.
                                            Defaults to a scale that ranges from 0 to width and has a domain from 0 to the maximum value.

#### Events
* For detailed information about dispatches, check the documentation.
-->

<Column
  {type}
  {x}
  {height}
  {width}
  {padding}
  {name}
  {icons}
  showSeparator={false}
  on:dragStart
  on:dragMove
  on:dragStop
  on:filter={() => (showFilter = !showFilter)}
  on:mouseHover
  on:mouseRowClick
  on:remove
  on:sort
  on:weight={() => (showWeight = !showWeight)}>
  <g slot="overlay">
    {#if showFilter}
      <rect
        class="column-overlay"
        x={x + paddingSide}
        y={60}
        width={width - padding}
        height={100}
        role="gridcell" />
      <Label
        x={x + width / 2}
        y={80}
        backgroundColor={'none'}
        borderColor={'none'}
        text={'Select range'} />
      <!-- Add 5px extra padding -->
      <foreignObject x={x + 5 + paddingSide} y={100} width={width - padding - 10} height={50}>
        <input
          class="filter-bar-min"
          type="number"
          min={minValue}
          max={maxValue}
          bind:value={$min}
          placeholder="Min"
          aria-label="MinInput"
          style="width: 100%; padding:0; margin:0;"
          on:change={dispatchFilter} />
        <input
          class="filter-bar-max"
          type="number"
          min={minValue}
          max={maxValue}
          bind:value={$max}
          placeholder="Max"
          aria-label="MaxInput"
          style="width: 100%; padding:0; margin:0;"
          on:change={dispatchFilter} />
      </foreignObject>
    {/if}
    {#if showWeight}
      <foreignObject x={x + paddingSide} y={60} width={width - padding - 1} height={26}>
        <input
          type="number"
          placeholder={'Weight'}
          aria-label="WeightInput"
          style={`translate: ${0}px 0px; font-size: 12px; font-family: Arial; padding: 5px; border: 1px solid black;` +
            `background-color: ${weightInputIsCorrect ? 'white' : '#ff534a'}; height:14px; width: ${width - padding - 5}px;`}
          min={0}
          bind:value={weight}
          on:keypress={dispatchWeight} />
      </foreignObject>
    {/if}
  </g>
  <g slot="overview">
    {#if overviewItem === 'axis'}
      <Axis placementX={x + padding / 2} placementY={90} axis={d3.axisTop(scale).ticks(5)} />
    {:else if overviewItem === 'histogram'}
      <foreignObject {x} y={45} {width} height={75}>
        <Histogram
          {width}
          height={75}
          bins={8}
          forceCategorical={false}
          showOuterTicks={true}
          padding={0.2}
          color={barColor}
          {data} />
      </foreignObject>
    {/if}
  </g>
  <g slot="data">
    {#key data || width}
      {#each data as value, i}
        <Bar
          x={x + paddingSide}
          y={getY(i)}
          width={18}
          height={scale(value)}
          originX={OriginX.Left}
          originY={OriginY.Top}
          isVertical={false}
          color={barColor}
          hoverText={value.toString()}
          on:mouseBarEnter
          on:mouseBarLeave
          name={names.length > 0 ? names[i] : undefined}
          opacity={barOpacity} />
      {/each}
    {/key}
  </g>
</Column>

<style>
  .column-overlay {
    fill: #ffffff;
    fill-opacity: 100%;
    stroke: black;
    stroke-width: 1;
  }
</style>
