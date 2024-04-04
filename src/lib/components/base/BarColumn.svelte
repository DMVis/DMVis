<script lang="ts">
  import * as d3 from 'd3';

  import { OriginX, OriginY } from '$lib/Enums.js';
  import Bar from '$lib/components/base/Bar.svelte';
  import Label from './Label.svelte';

  // Required attributes.
  export let x: number;
  export let y: number;
  export let width: number;
  export let height: number;
  // Every column has a title and either has
  // categorical values paired with a value (a bar + label) or only the first (just a label).
  export let data: {
    header: string;
    rows: Array<{ label: string }> | Array<{ label: string; value: number }>;
  };

  // Optional attributes.
  export let marginLeft: number = 0;
  export let marginRight: number = 0;
  export let marginTop: number = 0;
  export let marginBottom: number = 0;

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

  // Private attributes.
  const values: Array<number> = data.rows.map((row) => (`value` in row ? row.value : 0));
  const maxX: number = d3.max(values) ?? 0;
  const xScale = d3
    .scaleLinear()
    .domain([0, maxX])
    .range([marginLeft, width - marginRight]);
  const yScale = d3
    .scaleBand()
    .domain(data.rows.map((bar) => bar.label))
    .range([marginTop, height - marginBottom])
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
* marginLeft: number             - Margin to the left of the bar column.
* marginRight: number            - Margin to the right of the bar column.
* marginTop: number              - Margin to the top of the bar column.
* marginBottom: number           - Margin to the bottom of the bar column.
* barPadding: number             - Value for the distance between each bar in the range [0..1].
* barColor: string               - Color of each bar.
* barOpacity: number             - Opacity of each bar as a number in range [0..1] or
                                   a percentage string formatted as '{number}%'.
* barRadiusX: number             - Horizontal corner radius of each bar as a number in range [0..1] or
                                   a percentage string formatted as '{number}%'.
* barRadiusY: number             - Vertical corner radius of each bar as a number in range [0..1] or
                                   a percentage string formatted as '{number}%'.
* textColor: string              - Color of the text in each bar.
* fontSize: string               - Font size of the text in each bar.
* fontWeight: string             - Font weight of the text in each bar.
* fontFamily: string             - Font family of the text in each bar.
* headerOffsetY: number          - Vertical offset of the header label.
* headerColor: string            - Color of the rectangle behind the header label.
* headerOpacity: number | string - Opacity of the header label.
* headerOriginX: OriginX         - Horizontal origin of the header label.
                                   Possible values: `OriginX.Left`, `OriginX.Middle`, `OriginX.Right`.
                                   Which value is useful depends on your positioning logic.
* headerOriginY: OriginY         - Vertical origin of the header label.
                                   Possible values: `OriginY.Top`, `OriginY.Middle`, `OriginY.Bottom`.
                                   Which value is useful depends on your positioning logic.
* headerRotationDegrees: number  - Rotation of the header label in degrees.
* headerRadiusX: number | string - Horizontal corner radius of the header label as
                                   a number in range [0..1] or
                                   a percentage string formatted as '{number}%'.
* headerRadiusY: number | string - Vertical corner radius of the header label as
                                   a number in range [0..1] or
                                   a percentage string formatted as '{number}%'.
* headerPadding: number          - Padding around the text in the header label.
* headerTextColor: string        - Color of the text in the header label.
* headerFontSize: string         - Font size of the text in the header label.
* headerFontWeight: string       - Font weight of the text in the header label.
* headerFontFamily: string       - Font family of the text in the header label.
* hasHeaderBackground: boolean   - Whether the header label has a background or not.
-->
<g {width} {height}>
  {#each data.rows as row}
    {#if `value` in row}
      <Bar
        x={x + marginLeft}
        y={y + (yScale(row.label) ?? 0)}
        width={yScale.bandwidth()}
        value={xScale(row.value) - xScale(0)}
        isValueAlongYAxis={false}
        originX={OriginX.Left}
        originY={OriginY.Top}
        color={barColor}
        opacity={barOpacity}
        radiusX={barRadiusX}
        radiusY={barRadiusY} />
    {/if}
    <!--
      Draw bar value on top of bar
      or just the label depending on the data.
      This can be made more customisable for the user if needed.
    -->
    <Label
      x={x + marginLeft}
      y={y + (yScale(row.label) ?? 0) + yScale.bandwidth() / 2}
      text={`value` in row ? `${row.value}` : `${row.label}`}
      opacity={1}
      originX={OriginX.Left}
      originY={OriginY.Middle}
      padding={10}
      {textColor}
      {fontSize}
      {fontWeight}
      {fontFamily}
      hasBackground={false} />
  {/each}

  <!-- Draw header on top of column. -->
  <Label
    x={x + marginLeft + (width - marginLeft - marginRight) / 2}
    y={y + marginTop + headerOffsetY}
    text={data.header}
    color={headerColor}
    opacity={headerOpacity}
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
  <!-- Draw left vertical line at numerical value of 0 for clarity. -->
  <line
    x1={x + marginLeft}
    y1={y + marginTop}
    x2={x + marginLeft}
    y2={y + height - marginBottom}
    stroke={'black'}
    stroke-opacity={barOpacity}
    stroke-width={1} />
  <!-- Draw right vertical line at numerical value of max for clarity. -->
  <line
    x1={x + width - marginRight}
    y1={y + marginTop}
    x2={x + width - marginRight}
    y2={y + height - marginBottom}
    stroke={'black'}
    stroke-opacity={barOpacity}
    stroke-width={1} />
</g>
