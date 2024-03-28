<script lang="ts">
  import * as d3 from 'd3';
  import { onMount, setContext } from 'svelte';

  import { VisualisationStore } from '$lib/store.js';
  import BarColumn from '$lib/components/base/BarColumn.svelte';
  import { DataUtils } from '$lib/utils/DataUtils.js';
  import DynamicAxis from '../base/DynamicAxis.svelte';

  // Required attributes
  export let width: number;
  export let height: number;
  export let dataUtil: DataUtils;

  // Optional attributes
  export let marginLeft: number = 50;
  export let marginRight: number = 50;
  export let marginTop: number = 50;
  export let marginBottom: number = 50;

  export let columnMarginLeft: number = 0;
  export let columnMarginRight: number = 0;
  export let columnMarginTop: number = 0;
  export let columnMarginBottom: number = 0;
  export let columnPadding: number = 0.1;

  export let barPadding: number = 0.2;
  export let barColor: string = 'red';
  export let barRadiusX: number | string = 0;
  export let barRadiusY: number | string = 0;

  export let textColor: string = 'black';
  export let fontSize: string = '12px';
  export let fontWeight: string = 'normal';
  export let fontFamily: string = 'Arial';

  export let headerColor: string = 'rgb(200,200,200)';
  export let headerOpacity: number | string = 1;
  export let headerRadiusX: number | string = 5;
  export let headerRadiusY: number | string = 5;
  export let headerPadding: number = 5;
  export let headerTextColor: string = 'black';
  export let headerFontSize: string = '12px';
  export let headerFontWeight: string = 'normal';
  export let headerFontFamily: string = 'Arial';
  export let hasHeaderBackground: boolean = false;

  // Set store values.
  const visualisationStore = new VisualisationStore();
  visualisationStore.width.set(width);
  visualisationStore.height.set(height);
  visualisationStore.data.set(dataUtil.data);
  visualisationStore.padding.set(columnPadding);
  visualisationStore.marginLeft.set(marginLeft);
  visualisationStore.marginRight.set(marginRight);
  visualisationStore.marginTop.set(marginTop);
  visualisationStore.marginBottom.set(marginBottom);
  visualisationStore.columns.set(dataUtil.columns);
  setContext('store', visualisationStore);

  // Private attributes.
  // A column either just has labels or it has pairs of labels and values.
  type LabelColumn = {
    header: string;
    rows: Array<{ label: string }>;
  };
  type BarColumn = {
    header: string;
    rows: Array<{ label: string; value: number }>;
  };

  // Convert array of rows to array of columns (i.e. transpose).
  // Distance between columns is determined by scaleColumns.
  const scaleColumns = d3
    .scaleBand()
    .domain(dataUtil.columns)
    .range([marginLeft, width - marginRight])
    .padding(columnPadding);
  const columns: Array<LabelColumn | BarColumn> = [];

  // Fill labelColumn
  const transposedData: Array<Array<number | string>> = d3.transpose(dataUtil.data);
  const labelColumn: LabelColumn = {
    header: dataUtil.columns[0],
    rows: transposedData[0].map((label) => {
      return { label: label as string };
    })
  };
  columns.push(labelColumn);

  // Fill barColumns
  const barColumns: Array<BarColumn> = [];
  // -1 or +1, because we are only interested in the bar columns here.
  for (let i: number = 0; i < dataUtil.columns.length - 1; ++i) {
    barColumns[i] = { header: dataUtil.columns[i + 1], rows: [] };

    for (let j: number = 0; j < transposedData[i + 1].length; ++j) {
      barColumns[i].rows.push({
        label: transposedData[0][j] as string,
        value: transposedData[i + 1][j] as number
      });
    }

    columns.push(barColumns[i]);
  }

  // On mount, get the axes for the columns.
  let axes: Array<SVGGElement> = [];
  setTimeout(() => {
    axes = getAxes();
  }, 1000);

  // Function to load the axes
  function getAxes(): Array<SVGGElement> {
    const newAxes: Array<SVGGElement> = [];
    const axesList = document.getElementById('axes');
    if (axesList && axes.length === 0) {
      // Get the axes for the columns
      axesList.childNodes.forEach((element) => {
        if (element.nodeName !== 'g') {
          return;
        }
        newAxes.push(element as SVGGElement);
      });
      axesList.remove();
    }
    return newAxes;
  }
</script>

<!--
@component
### Tabular Visualisation
This is visualisation that represents numerical data with rectangular bars or
categorical data with labels in a column.
Since a header label is added on top of each column, it might be necessary
to adjust `marginTop` or `columnMarginTop`.

#### Required attributes
* width: number                       - Width of the visualisation.
* height: number                      - Height of the visualisation.
* dataUtil: DataUtils                 - The `DataUtils` class which, contains all the data to be displayed.

#### Optional attributes
* marginLeft: number                  - Margin to the left of the visualisation.
* marginRight: number                 - Margin to the right of the visualisation.
* marginTop: number                   - Margin to the top of the visualisation.
* marginBottom: number                - Margin to the bottom of the visualisation.
* columnMarginLeft: number            - Margin to the left of each column.
* columnMarginRight: number           - Margin to the right of each column.
* columnMarginTop: number             - Margin to the top of each column.
* columnMarginBottom: number          - Margin to the bottom of each column.
* columnPadding: number               - Value for the distance between each column in the range [0..1].
* barPadding: number                  - Value for the distance between each bar in each column in the range [0..1].
* barColor: string                    - Color of each bar in each column.
* barRadiusX: number                  - Horizontal corner radius of each bar in each column as a number
                                        or a percentage string formatted as '{number}%'.
* barRadiusY: number                  - Vertical corner radius of each bar in each column as a number
                                        or a percentage string formatted as '{number}%'.
* textColor: string                   - Color of the text in each bar in each column.
* fontSize: string                    - Font size of the text in each bar in each column.
* fontWeight: string                  - Font weight of the text in each bar in each column.
* fontFamily: string                  - Font family of the text in each bar in each column.
* headerColor: string                 - Color of the rectangle behind the header label in each column.
* headerOpacity: number | string      - Opacity of the header label in each column.
* headerRadiusX: number | string      - Horizontal corner radius of the header label in each column as a number
                                        or a percentage string formatted as '{number}%'.
* headerRadiusY: number | string      - Vertical corner radius of the header label in each column as a number or
                                        a percentage string formatted as '{number}%'.
* headerPadding: number               - Padding around the text in the header label in each column.
* headerTextColor: string             - Color of the text in the header label in each column.
* headerFontSize: string              - Font size of the text in the header label in each column.
* headerFontWeight: string            - Font weight of the text in the header label in each column.
* headerFontFamily: string            - Font family of the text in the header label in each column.
* hasHeaderBackground: boolean        - Whether the header label in each column has a background or not.
-->
<svg class="visualisation" {width} {height}>
  {#key dataUtil}
    <g id="axes" style="display: none">
      <DynamicAxis position="top" offset={20} ticksNumber={3} />
    </g>
    {#each columns as column, columnIndex}
      <BarColumn
        colNumber={columnIndex}
        x={scaleColumns(column.header) ?? 0}
        y={marginTop}
        width={scaleColumns.bandwidth()}
        height={height - marginTop - marginBottom}
        data={column}
        marginLeft={columnMarginLeft}
        marginRight={columnMarginRight}
        marginTop={columnMarginTop}
        marginBottom={columnMarginBottom}
        axis={columnIndex != 0 ? axes[columnIndex] : null ?? null}
        {barPadding}
        {barColor}
        {barRadiusX}
        {barRadiusY}
        {textColor}
        {fontSize}
        {fontWeight}
        {fontFamily}
        {headerColor}
        {headerOpacity}
        {headerRadiusX}
        {headerRadiusY}
        {headerPadding}
        {headerTextColor}
        {headerFontSize}
        {headerFontWeight}
        {headerFontFamily}
        {hasHeaderBackground} />
    {/each}
  {/key}
</svg>
