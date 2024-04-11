<script lang="ts">
  import * as d3 from 'd3';
  import { writable } from 'svelte/store';
  import { onMount, setContext, afterUpdate } from 'svelte';

  import { Spacer } from '$lib/utils/Spacer.js';
  import { VisualisationStore } from '$lib/store.js';
  import { DataUtils } from '$lib/utils/DataUtils.js';
  import { StyleUtils } from '$lib/utils/StyleUtils.js';
  import BarColumn from '$lib/components/base/BarColumn.svelte';
  import DynamicAxis from '$lib/components/base/DynamicAxis.svelte';

  // Required attributes
  export let width: number;
  export let height: number;
  export let dataUtil: DataUtils;

  // Optional attributes
  export let styleUtil: StyleUtils = new StyleUtils({ color: 'red' });

  export let marginLeft: number = 30;
  export let marginRight: number = 30;
  export let marginTop: number = 50;
  export let marginBottom: number = 50;

  export let columnSpacing: number = 20;
  export let showColumnLines: boolean = false;

  export let barPadding: number = 0.15;
  export let barColor: string = styleUtil.color;
  export let barRadiusX: number | string = 0;
  export let barRadiusY: number | string = 0;

  export let textColor: string = 'black';
  export let fontSize: string = '10px';
  export let fontWeight: string = 'normal';
  export let fontFamily: string = styleUtil.fontFamily;
  export let barOpacity: number | string = 0.6;
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
  visualisationStore.data.set(dataUtil.data ?? []);
  visualisationStore.marginLeft.set(marginLeft + columnSpacing / 2);
  visualisationStore.marginRight.set(marginRight + columnSpacing / 2);
  visualisationStore.marginTop.set(marginTop);
  visualisationStore.marginBottom.set(marginBottom);
  visualisationStore.columns.set(dataUtil.columns);
  visualisationStore.styleUtil.set(styleUtil);
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

  // Allows rows to be dragged
  let deltaY: number = 0;
  let deltaYLabel: number = 0;
  let draggedRow: string = '';
  const dragHandler = d3
    .drag<SVGElement, unknown>()
    .on('start', function (event) {
      // Set the element being dragged
      draggedRow = event.sourceEvent.srcElement.attributes
        .getNamedItem('class')
        .value.split(' ')[1];
      deltaY = parseFloat(d3.select(`.${draggedRow}`).attr('y')) - event.y;
      deltaYLabel = parseFloat(d3.select(`.label-${draggedRow} > text`).attr('y')) - event.y;

      // Raise dragged row to the front
      d3.selectAll(`.${draggedRow}`).raise();
      d3.selectAll(`.label-${draggedRow}`).raise();
    })
    .on('drag', function (event) {
      // Update the row its y position
      d3.selectAll(`.${draggedRow}`).attr('y', event.y + deltaY);
      d3.selectAll(`.label-${draggedRow} > text`).attr('y', event.y + deltaYLabel);
    })
    .on('end', async function () {
      // Get nearest row to the dragged row
      const y = parseFloat(d3.select(`.label-${draggedRow} > text`).attr('y'));
      const labelColumn = d3.select('.bar-column');
      const rows: Array<Element> = labelColumn.selectAll('text').nodes() as Array<Element>;
      const distances = rows.map((row: Element) => {
        if (row == null || row.innerHTML == draggedRow) return Infinity;
        let rowY = row.attributes?.getNamedItem('y')?.value;
        if (rowY == null) return Infinity;
        return Math.abs(parseFloat(rowY) - y);
      });

      // Update the data
      const minDistanceIndex = distances.indexOf(Math.min(...distances));
      const nearestRow: Element = rows[minDistanceIndex != -1 ? minDistanceIndex : 0];
      const nearestLabel = nearestRow ? nearestRow.innerHTML : rows[0].innerHTML;
      const oldIndex = dataUtil.data.findIndex((row) => row[0] == draggedRow);
      const newIndex = dataUtil.data.findIndex((row) => row[0] == nearestLabel);
      const newData = dataUtil.reorderRows('label', oldIndex, newIndex == -1 ? 0 : newIndex);

      // Update the data
      dataUtil.data = newData;
      visualisationStore.data.set(newData);
      updateColumns();

      // Unhighlight and reset row
      d3.selectAll(`.${draggedRow}`).classed('highlighted', false).attr('fill-opacity', barOpacity);
      d3.selectAll(`.label-${draggedRow} > text`).classed('highlighted', false);
      draggedRow = '';
    });

  // Convert array of rows to array of columns (i.e. transpose).
  // Distance between columns is determined by scaleColumns.
  const { xScales } = visualisationStore;
  const columns = writable<Array<LabelColumn | BarColumn>>([]);
  let scaleColumns: d3.ScaleBand<string>;
  let spacerDistance: number = 0;

  function updateColumns() {
    scaleColumns = d3
      .scaleBand()
      .domain(dataUtil.columns)
      .range([marginLeft - columnSpacing / 2, width - marginRight - columnSpacing / 2]);

    // Calculate the distance between each column.
    spacerDistance = Spacer(
      width,
      marginLeft + columnSpacing / 2,
      marginRight + columnSpacing / 2,
      $xScales.length
    );

    // Fill labelColumn
    const transposedData: Array<Array<number | string>> = d3.transpose(dataUtil.data);
    const labelColumn: LabelColumn = {
      header: dataUtil.columns[0],
      rows: transposedData[0].map((label) => {
        return { label: label as string };
      })
    };
    let newColumns = [labelColumn];

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

      newColumns.push(barColumns[i]);
    }

    // Update columns store
    columns.set(newColumns);

    // Add drag handler to all rows
    dragHandler(d3.selectAll('.bar'));
  }

  function onMouseBarEntered(e: CustomEvent<{ name: string }>) {
    // Highlight bar row
    d3.selectAll(`.${e.detail.name}`).classed('highlighted', true);
    // Highlight label. '> text' is to refer to the nested text object
    d3.selectAll(`.label-${e.detail.name} > text`).classed('highlighted', true);
  }

  function onMouseBarLeft(e: CustomEvent<{ name: string }>) {
    // Unhighlight bar row if not dragging
    if (draggedRow != e.detail.name) {
      d3.selectAll(`.${e.detail.name}`).classed('highlighted', false);

      // Unhighlight label
      d3.selectAll(`.label-${e.detail.name} > text`).classed('highlighted', false);
    }
  }

  // Run intial and update functions
  updateColumns();
  afterUpdate(() => {
    dragHandler(d3.selectAll('.bar'));
    const axes = document.getElementById('axes');
    if (axes != null && axes.children.length > 0) {
      axes.removeChild(axes.children[0]);
    }
  });
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
* styleUtil: StyleUtils               - The `StyleUtils` class which, contains all the styling for the visualisation.
* marginLeft: number                  - Margin to the left of the visualisation.
* marginRight: number                 - Margin to the right of the visualisation.
* marginTop: number                   - Margin to the top of the visualisation.
* marginBottom: number                - Margin to the bottom of the visualisation.
* columnSpacing: number               - Spacing between each column. Adds `columnSpacing / 2` to the left and right of each column.
* showColumnLines: boolean            - Whether to show lines at the start and end of each column. Defaults to false.
* barPadding: number                  - Value for the distance between each bar in each column in the range [0..1].
* barColor: string                    - Color of each bar in each column.
* barOpacity: number | string         - Opacity of each bar as a number in range [0..1] or
                                        a percentage string formatted as '{number}%'. A value
                                        lower than one is recommended for visible bar highlighting.
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
    <g id="axes">
      <DynamicAxis
        position="top"
        ticksNumber={3}
        hasPadding={false}
        customPadding={columnSpacing}
        startColumn={0} />
    </g>
    {#each $columns as column, columnIndex}
      <BarColumn
        x={marginLeft + spacerDistance * columnIndex}
        y={marginTop}
        width={scaleColumns.bandwidth()}
        height={height - marginTop - marginBottom}
        data={column}
        {columnSpacing}
        {showColumnLines}
        {barPadding}
        {barColor}
        {barOpacity}
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
        {hasHeaderBackground}
        on:mouseBarEntered={onMouseBarEntered}
        on:mouseBarLeft={onMouseBarLeft} />
    {/each}
  {/key}
</svg>
