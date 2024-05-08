<script lang="ts">
  // Imports
  import * as d3 from 'd3';

  // DMVis Imports
  import Bar from '$lib/components/base/Bar.svelte';
  import Label from '$lib/components/base/Label.svelte';
  import { OriginX, OriginY } from '$lib/Enums.js';

  // Required attributes
  export let x: number;
  export let y: number;
  export let width: number;
  export let height: number;
  /*  Every column has:
      - Header label
      - Either:
          - categorical values paired with a value (a label + bar)
          - Just a label
  */
  export let data: {
    header: string;
    rows: Array<{ label: string }> | Array<{ label: string; value: number }>;
  };

  // Optional attributes
  export let columnSpacing: number = 20;
  export let showColumnLines: boolean = false;
  export let barPadding: number = 0.2;
  export let barColor: string = 'red';
  export let barOpacity: number | string = 0.6;
  export let barRadiusX: number | string = 0;
  export let barRadiusY: number | string = 0;

  export let textColor: string = 'black';
  export let fontSize: string = '12px';
  export let fontWeight: string = 'normal';
  export let fontFamily: string = 'Arial';

  export let headerOffsetY: number = -20;
  export let headerColor: string = 'rgb(200,200,200)';
  export let headerOpacity: number | string = 1;
  export let headerOriginX: OriginX = OriginX.Middle;
  export let headerOriginY: OriginY = OriginY.Bottom;
  export let headerRotationDegrees: number = 0;
  export let headerRadiusX: number | string = 5;
  export let headerRadiusY: number | string = 5;
  export let headerPadding: number = 5;
  export let headerTextColor: string = 'black';
  export let headerFontSize: string = '14px';
  export let headerFontWeight: string = 'normal';
  export let headerFontFamily: string = 'Arial';
  export let hasHeaderBackground: boolean = true;

  // Private attributes

  // Loop over all the data and select only the values
  const values: Array<number> = data.rows.map((row) => (`value` in row ? row.value : 0));
  // Find the largest value of them all
  const maxX: number = d3.max(values) ?? 0;
  // Create a xScale based on this maximum value
  const xScale = d3
    .scaleLinear()
    .domain([0, maxX])
    .range([columnSpacing / 2, width - columnSpacing / 2]);
  const yScale = d3
    .scaleBand()
    .domain(data.rows.map((bar) => bar.label))
    .range([columnSpacing / 2, height - columnSpacing / 2])
    .padding(barPadding);
</script>

<!--
@component
### Bar Column
The bar column is used to represent a column of labels or a column of bars.
Respectively, those are categorical and numerical data visualisations.
This component can be used by itself, though it is meant for the tabular visualisation.
Since a header label is added on top of the bar column, it might be
necessary to adjust `marginTop` depending on its positioning in an SVG element.

#### Required attributes
* x: number                      - X-coordinate of the bar column.
* y: number                      - Y-coordinate of the bar column.
* width: number                  - Width of the bar column.
* height: number                 - Height of the bar column.
* data: {
    header: string;
    rows: Array<{ label: string }>
        | Array<{ label: string; value: number }>;
  };
                                 - A header label with a list of labels
                                   or a list of pairs of labels and values.

#### Optional attributes
* columnSpacing: number          - Spacing between each column.
                                   Adds `columnSpacing / 2` to the left and right of each column.
                                   Defaults to `20`.
* showColumnLines: boolean       - Whether to show lines at the start and end of each column. This defaults to `false`.
* barPadding: number             - Value for the distance between each bar in the range [0..1]. This defaults to `0.2`.
* barColor: string               - Color of each bar. This defaults to `'red'`.
* barOpacity: number             - Opacity of each bar as a number in range [0..1] or
                                   a percentage string formatted as '{number}%'.
                                   Defaults to `0.6`.
* barRadiusX: number             - Horizontal corner radius of each bar as a number in range [0..1] or
                                   a percentage string formatted as '{number}%'.
                                   Defaults to `0`.
* barRadiusY: number             - Vertical corner radius of each bar as a number in range [0..1] or
                                   a percentage string formatted as '{number}%'.
                                   Defaults to `0`.
* textColor: string              - Color of the text in each bar. This defaults to `'black'`.
* fontSize: string               - Font size of the text in each bar. This defaults to `'12px'`.
* fontWeight: string             - Font weight of the text in each bar. This defaults to `'normal'`.
* fontFamily: string             - Font family of the text in each bar. This defaults to `'Arial'`.
* headerOffsetY: number          - Vertical offset of the header label. This defaults to `-20`.
* headerColor: string            - Color of the rectangle behind the header label. This defaults to `'rgb(200,200,200)'`.
* headerOpacity: number | string - Opacity of the header label. Defauls to `1`.
* headerOriginX: OriginX         - Horizontal origin of the header label.
                                   Possible values: `OriginX.Left`, `OriginX.Middle`, `OriginX.Right`.
                                   Which value is useful depends on your positioning logic.
                                   Defaults to `OriginX.Middle`.
* headerOriginY: OriginY         - Vertical origin of the header label.
                                   Possible values: `OriginY.Top`, `OriginY.Middle`, `OriginY.Bottom`.
                                   Which value is useful depends on your positioning logic.
                                   Defaults to `OriginY.Bottom`.
* headerRotationDegrees: number  - Rotation of the header label in degrees. This defaults to `0`.
* headerRadiusX: number | string - Horizontal corner radius of the header label as
                                   a number in range [0..1] or
                                   a percentage string formatted as '{number}%'.
                                   Defaults to `5`.
* headerRadiusY: number | string - Vertical corner radius of the header label as
                                   a number in range [0..1] or
                                   a percentage string formatted as '{number}%'.
                                   Defaults to `5`.
* headerPadding: number          - Padding around the text in the header label. This defaults to `5`.
* headerTextColor: string        - Color of the text in the header label. This defaults to `'black'`.
* headerFontSize: string         - Font size of the text in the header label. This defaults to `'14px'`.
* headerFontWeight: string       - Font weight of the text in the header label. This defaults to `'normal'`.
* headerFontFamily: string       - Font family of the text in the header label. This defaults to `'Arial'`.
* hasHeaderBackground: boolean   - Whether the header label has a background. This defaults to `true`.
-->
<g {width} {height} class="bar-column">
  <!-- Loop over all rows -->
  {#each data.rows as row}
    <!-- If this row has a value, draw a bar -->
    {#if 'value' in row}
      <Bar
        x={x + columnSpacing / 2}
        y={y + (yScale(row.label) ?? 0)}
        width={yScale.bandwidth()}
        height={xScale(row.value) - xScale(0)}
        isVertical={false}
        originX={OriginX.Left}
        originY={OriginY.Top}
        color={barColor}
        opacity={barOpacity}
        radiusX={barRadiusX}
        radiusY={barRadiusY}
        hoverText={`${row.label}: ${row.value}`}
        name={row.label}
        on:mouseBarEnter
        on:mouseBarLeave />
    {/if}

    <!--
      Draw bar value on top of bar
      or just the label depending on the data
    -->
    <Label
      x={x + columnSpacing / 2}
      y={y + (yScale(row.label) ?? 0) + yScale.bandwidth() / 2}
      text={'value' in row ? `${row.value}` : `${row.label}`}
      textOpacity={1}
      originX={OriginX.Left}
      originY={OriginY.Middle}
      padding={10}
      {textColor}
      {fontSize}
      {fontWeight}
      {fontFamily}
      hasBackground={false}
      hasPointerEvents={true}
      name={`${row.label} bar-label`}
      on:mouseLabelEnter
      on:mouseLabelLeave />
    <!-- End of each loop over rows -->
  {/each}

  <!-- Draw the header of this column -->
  <Label
    x={x + width / 2}
    y={y + headerOffsetY}
    text={data.header}
    backgroundColor={headerColor}
    textOpacity={headerOpacity}
    originX={headerOriginX}
    originY={headerOriginY}
    rotationDegrees={headerRotationDegrees}
    radiusX={headerRadiusX}
    radiusY={headerRadiusY}
    padding={headerPadding}
    textColor={headerTextColor}
    fontSize={headerFontSize}
    fontWeight={headerFontWeight}
    fontFamily={headerFontFamily}
    hasBackground={hasHeaderBackground} />

  <!-- Add lines at start and end of the bars for clarity -->
  {#if showColumnLines}
    <line
      x1={x + columnSpacing / 2}
      y1={y}
      x2={x + columnSpacing / 2}
      y2={y + height}
      stroke={'black'}
      stroke-opacity={barOpacity}
      stroke-width={1} />
    <line
      x1={x + width - columnSpacing / 2}
      y1={y}
      x2={x + width - columnSpacing / 2}
      y2={y + height}
      stroke={'black'}
      stroke-opacity={barOpacity}
      stroke-width={1} />
  {/if}
</g>
