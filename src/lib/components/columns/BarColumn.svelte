<script lang="ts">
  // Imports
  import { writable } from 'svelte/store';
  import { createEventDispatcher } from 'svelte';
  import { max as maxFunction, axisTop, scaleLinear } from 'd3';

  // DMVis imports
  import Bar from '$lib/components/base/Bar.svelte';
  import Axis from '$lib/components/base/Axis.svelte';
  import Label from '$lib/components/base/Label.svelte';
  import Column from '$lib/components/base/Column.svelte';
  import Histogram from '$lib/components/visualisations/Histogram.svelte';
  import { DMVisError } from '$lib/utils/DMVisError.js';
  import type { Filter, Visibility, ScaleLinear } from '$lib/Types.js';
  import { ColumnType, OriginX, OriginY, IconType } from '$lib/Enums.js';

  // Required attributes
  export let x: number;
  export let width: number;
  export let height: number;
  export let data: Array<number>;

  // Optional attributes
  export let filter: Filter = { min: 0, max: 100 };
  export let name: string = 'Column';
  export let padding: number = 10;
  export let barColor: string = 'red';
  export let icons: IconType[] = [IconType.Sort, IconType.Filter, IconType.More];
  export let weight: string = '10';
  export let overviewItem: 'histogram' | 'axis' | 'none' = 'none';
  export let scale: ScaleLinear = scaleLinear()
    .domain([0, maxFunction(data) ?? 0])
    .range([0, width - padding]);

  export let names: string[] = [];
  export let barOpacity: number = 1;
  export let barLabelVisibility: Visibility = 'none';

  if (overviewItem !== 'histogram' && overviewItem !== 'axis' && overviewItem !== 'none') {
    // This is for completeness, as type safety ensures this cannot happen
    throw DMVisError(
      `Cannot assign '${overviewItem}' to the overviewItem attribute. Please use: 'histogram', 'axis', or 'none'.`,
      'BarColumn'
    );
  }

  if (names.length > 0 && names.length !== data.length) {
    throw DMVisError(
      `The value assigned to the names attribute does not have the same length as the value assigned to the data attribute. Please ensure that they are of the same length.`,
      'BarColumn'
    );
  }

  // Bar standards
  const barWidth = 18;

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
    // Get the top-left y of the supposed position and the next position and half
    // for OriginX.Left and OriginY.Middle usage
    return (index * 20 + 120 + 1 + ((index + 1) * 20 + 120 + 1)) / 2;
  }

  // Dispatch filter
  let min = writable(filter.min.toString());
  let max = writable(filter.max.toString());
  function dispatchFilter() {
    dispatch('filter', { column: name, min: parseInt($min), max: parseInt($max) });
  }

  // Function that fires when the user changes the column weight
  function dispatchWeight() {
    // Regex to check if the number is an integer or floating point with a '.'
    const regex = /^[-+]?[0-9]*\.?[0-9]+$/;
    if (regex.test(weight)) {
      const weightAsFloat = parseFloat(weight);
      if (weightAsFloat < 0 || weightAsFloat > 100) {
        weightInputIsCorrect = false;
        return;
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

  // Function that formats a number to a string, and rounds numerical values to 2 decimals
  function formatValue(value: number): string {
    if (!isNaN(value)) {
      // If it is a number, round it to 2 decimals
      return (Math.round(value * 100) / 100).toString();
    }
    if (value) {
      return value.toString();
    }
    // At this point value is null/undefined meaning there was no value supplied in the input csv.
    // All is done now is ensuring it is a string to satisfy typescript
    // These empty values are handled later on
    return value as unknown as string;
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
* overviewItem: 'histogram'|'axis'|'none' - Determines what item to display in the overview section of the column header.
                                              Defaults to none
* scale: ScaleLinear                      - What scale to use for all of the bars in the column.
                                            Defaults to a scale that ranges from 0 to width
                                            and has a domain from 0 to the maximum value.
* barOpacity: number                      - Opacity of all the bars in this column. This defaults to `1`
* names: string[]                         - The name for each point. Will be used for accessing the bars with classnames.
                                            The first entry of this array is linked with the first item of the data array, etc..
                                            This defaults to [], meaning no names are given
* barLabelVisibility: 'none' | 'alwaysVisible' | 'visibleOnHighlight' - Determines the behaviour of the labels on the bars.
                                                                        Refer to the documentation for more information. This defaults to `'none'`

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
  showSeparator={overviewItem === 'none'}
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
          on:change={dispatchWeight} />
      </foreignObject>
    {/if}
  </g>
  <g slot="overview">
    {#if overviewItem === 'axis'}
      <Axis
        placementX={x + padding / 2}
        placementY={100}
        axis={axisTop(scale).ticks(5)}
        squashOuterTicks={true} />
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
          {barWidth}
          value={scale(value)}
          originX={OriginX.Left}
          originY={OriginY.Middle}
          isVertical={false}
          color={barColor}
          hoverText={formatValue(value)}
          on:mouseBarEnter
          on:mouseBarLeave
          name={names.length > 0 ? names[i] : undefined}
          opacity={barOpacity}
          labelType={barLabelVisibility} />
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
