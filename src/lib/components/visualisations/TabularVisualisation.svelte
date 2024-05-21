<script lang="ts">
  // Imports
  import * as d3 from 'd3';
  import { afterUpdate } from 'svelte';

  // DMVis component imports
  import BarColumn from '$lib/components/columns/BarColumn.svelte';
  import StaticLine from '$lib/components/base/StaticLine.svelte';
  import TextColumn from '$lib/components/columns/TextColumn.svelte';
  import BaseVisualisation from '$lib/components/base/BaseVisualisation.svelte';

  // DMVis imports
  import { DataUtils } from '$lib/utils/DataUtils.js';
  import { StyleUtils } from '$lib/utils/StyleUtils.js';
  import { setVisualisationContext, updateVisualisationContext } from '$lib/context.js';
  import { IconType } from '$lib/Enums.js';

  // Required attributes
  export let dataUtil: DataUtils;

  // Optional attributes
  export let styleUtil: StyleUtils = new StyleUtils();

  // Defaults for the margins
  export let marginLeft: number = 30;
  export let marginRight: number = 30;
  export let marginTop: number = 50;
  export let marginBottom: number = 50;

  // Automatically calculate the height and width of the visualisation if none is specified
  export let width: number = calculateWidth(dataUtil.columns.length);
  export let height: number = calculateHeight(dataUtil.data.length);

  // Determines whether or not the lines between columns are drawn
  export let showColumnLines: boolean = false;
  // Padding between columns
  export let columnPadding: number = 10;
  // Default opacity of the bars
  export let barOpacity: number | string = 0.6;

  // Private variables
  const { visualisationData } = dataUtil;
  let tabularElement: SVGElement;
  let tabularSelection: d3.Selection<SVGElement, unknown, null, undefined>;

  // Values related to columns, will be set in the updateColumns function
  let columns: Array<string[] | number[]>;
  let labelColumn: string[];
  let numericalColumns: number[][];

  // Scaleband used to equally space out the columns over the entire width
  let columnScale: d3.ScaleBand<string>;

  // Drag related variables, set by dragHandler
  let deltaY: number = 0;
  let deltaYLabel: number = 0;
  let draggedRow: string = '';
  let draggedItem: string = '';
  let startingDraggedY: number = 0;

  // Set store values
  setVisualisationContext({
    width,
    height,
    data: $visualisationData,
    columns: dataUtil.columns,
    styleUtil,
    marginLeft: marginLeft,
    marginRight: marginRight,
    marginTop,
    marginBottom
  });

  // Set reactive store values
  $: {
    updateVisualisationContext({ data: $visualisationData });
    height = calculateHeight($visualisationData.length);
    updateColumns();
  }

  // Allows for rows to be dragged
  const dragHandler = d3
    .drag<SVGElement, unknown>()
    .on('start', function (event) {
      // Set the element being dragged
      if (event.sourceEvent.srcElement.nodeName === 'text') {
        draggedRow = event.sourceEvent.srcElement.parentElement.attributes
          .getNamedItem('class')
          .value.split(' ')[1];
        draggedItem = draggedRow.split('-')[1];
      } else {
        draggedRow = event.sourceEvent.srcElement.attributes
          .getNamedItem('class')
          .value.split(' ')[1];
        draggedItem = draggedRow.split('-')[1];
      }
      // Store the initial y position of the dragged row
      startingDraggedY = parseFloat(tabularSelection.select(`.bar-${draggedItem}`).attr('y'));
      deltaY = parseFloat(tabularSelection.select(`.bar-${draggedItem}`).attr('y')) - event.y;
      deltaYLabel =
        parseFloat(tabularSelection.select(`.label-${draggedItem} > text`).attr('y')) - event.y;

      // Raise dragged row to the front
      tabularSelection.selectAll(`.bar-${draggedItem}`).raise();
      tabularSelection.selectAll(`.label-${draggedItem}`).raise();

      // Hide the bar numbers
      tabularSelection.selectAll(`.bar-number-${draggedItem}`).classed('highlighted', false);
    })
    .on('drag', function (event) {
      // Update y position of the row
      tabularSelection.selectAll(`.bar-${draggedItem}`).attr('y', event.y + deltaY);
      tabularSelection.selectAll(`.label-${draggedItem} > text`).attr('y', event.y + deltaYLabel);
    })
    .on('end', async function () {
      // Get the y coordinate of the label of the dragged row
      const y = parseFloat(tabularSelection.select(`.label-${draggedItem} > text`).attr('y'));
      // Select the column with all the other labels in it
      const labelColumn = tabularSelection.select('.labelNames');
      // From this column, select all the text elements
      const rows: Array<Element> = labelColumn.selectAll('text').nodes() as Array<Element>;
      // Loop over all these text elements and compute the distance from this one to the dragged row
      const distances = rows.map((row: Element) => {
        // If this row is not found, return infinity
        if (row === null) {
          return Infinity;
        }
        // Get the y attribute of the row
        const rowY: string | undefined = row.attributes?.getNamedItem('y')?.value;
        if (rowY === null || rowY === undefined) {
          return Infinity;
        }
        if (row.innerHTML === draggedItem) {
          // Dragging less than 20 pixels means draggedItem is closest
          if (Math.abs(startingDraggedY - y) > 20) {
            return Infinity;
          }
        }
        return Math.abs(parseFloat(rowY as string) - y);
      });

      // Update the data
      const minDistanceIndex = distances.indexOf(Math.min(...distances));
      const nearestRow = rows[minDistanceIndex !== -1 ? minDistanceIndex : 0];
      const nearestLabel = nearestRow ? nearestRow.innerHTML : rows[0].innerHTML;
      const oldIndex = $visualisationData.findIndex((row) => row[0] === draggedItem);
      const newIndex = $visualisationData.findIndex((row) => row[0] === nearestLabel);
      const newData = dataUtil.reorderRows(
        oldIndex,
        newIndex === -1 ? 0 : newIndex,
        $visualisationData
      );
      $visualisationData = newData;
      updateColumns();

      // Show bar numbers again
      tabularSelection.selectAll(`.bar-number-${draggedItem}`).classed('highlighted', true);

      // Unhighlight and reset row
      tabularSelection
        .selectAll(`.${draggedItem}`)
        .classed('highlighted', false)
        .attr('fill-opacity', barOpacity);
      tabularSelection.selectAll(`.label-${draggedItem} > text`).classed('highlighted', false);
      draggedItem = '';
      draggedRow = '';
    });
  // End of assignment to dragHandler

  // Function that creates the columns from the visualisation data
  function updateColumns() {
    columnScale = d3
      .scaleBand()
      .domain(dataUtil.columns)
      .range([0, width - marginRight - marginLeft]);

    // Transpose the entire data
    let transposedData = $visualisationData[0].map((_, colIndex) =>
      $visualisationData.map((row) => row[colIndex])
    );
    // Create a column for all the labels, and columns for each attribute
    let newColumns: (string[] | number[])[] = [];
    let newLabelColumn = transposedData[0] as string[];
    let newNumericalColumns = transposedData.slice(1) as number[][];
    newColumns.push(newLabelColumn);
    newNumericalColumns.forEach((col) => newColumns.push(col));
    // Update the global variables
    columns = [...newColumns];
    labelColumn = [...newLabelColumn];
    numericalColumns = [...newNumericalColumns];
  }

  // Function that fires when the mouse enters any bar that is a child component of the tabular visualisation
  function onMouseBarEnter(e: CustomEvent<{ name: string }>) {
    if (draggedItem !== '') return;
    const name = e.detail.name;
    // Highlight bar row
    toggleHighlight(name, true);
  }

  // Function that fires when the mouse leaves any bar that is a child component of the tabular visualisation
  function onMouseBarLeave(e: CustomEvent<{ name: string }>) {
    if (draggedItem !== '') return;
    const name = e.detail.name;
    // Unhighlight bar row if not dragging
    if (draggedRow !== e.detail.name) {
      toggleHighlight(name, false);
    }
  }

  // Function that fires when the mouse enters any label that is a child component of the tabular visualisation
  function onMouseLabelEnter(e: CustomEvent<{ name: string }>) {
    if (draggedItem !== '') return;
    const name = e.detail.name;
    // Highlight bar row
    toggleHighlight(name, true);
  }

  // Function that fires when the mouse leaves any label that is a child component of the tabular visualisation
  function onMouseLabelLeave(e: CustomEvent<{ name: string }>) {
    if (draggedItem !== '') return;
    const name = e.detail.name;
    // Unhighlight bar row if not dragging
    if (draggedRow !== name) {
      toggleHighlight(name, false);
    }
  }

  // Calculate height based on number of rows
  function calculateHeight(numRows: number): number {
    // 105 and 20 are both hard coded values in barColumn
    // that represent the height of the column header and the height of a bar respectively
    return numRows * 20 + 105 + marginBottom;
  }

  // Calculate width based on number of columns
  // Use 200 per column as a default value
  function calculateWidth(numColumns: number): number {
    return numColumns * 200;
  }

  // Run initial and update functions
  updateColumns();
  afterUpdate(() => {
    tabularSelection = d3.select(tabularElement);
    dragHandler(tabularSelection.selectAll('.bar'));
    dragHandler(tabularSelection.select('.labelNames').selectAll('.label'));
    const axes = document.getElementById('axes');

    if (axes !== null && axes.children.length > 0) {
      axes.removeChild(axes.children[0]);
    }
  });

  // Function that will toggle the class `highlighted` on all needed components.
  // Namely the bar, bar number and label
  function toggleHighlight(name: string, classActive: boolean) {
    // Update the bars
    tabularSelection.selectAll(`.bar-${name}`).classed('highlighted', classActive);
    // Update the numbers in the bar
    tabularSelection.selectAll(`.bar-number-${name}`).classed('highlighted', classActive);
    // Update the labels
    tabularSelection.selectAll(`.label-${name} > text`).classed('highlighted', classActive);
  }
</script>

<!--
@component
### Tabular Visualisation
This is a visualisation that represents numerical data with rectangular bars or
categorical data with labels in a column.

#### Required attributes
* dataUtil: DataUtils                 - The `DataUtils` class contains all the data to be displayed.

#### Optional attributes
* styleUtil: StyleUtils               - The `StyleUtils` class contains all the styling for the visualisation.

* width: number                       - Width of the visualisation. This defaults to `numberOfColumns * 200`.
* height: number                      - Height of the visualisation. This defaults to `numberOfRows * 20 + header`.

* marginLeft: number                  - Margin to the left of the visualisation. This defaults to `30`.
* marginRight: number                 - Margin to the right of the visualisation. This defaults to `30`.
* marginTop: number                   - Margin to the top of the visualisation. This defaults to `50`.
* marginBottom: number                - Margin to the bottom of the visualisation. This defaults to `30`.

* showColumnLines: boolean            - Whether to show lines at the start and end of each column. This defaults to `false`.
* columnPadding: number               - Value for the distance between each column. This defaults to `10`.
* barOpacity: number | string         - Opacity of each bar as a number in the range [0..1] or
                                        a percentage string formatted as '{number}%'. A value
                                        lower than one is recommended for visible bar highlighting.
                                        This defaults to `0.6`.
-->

<BaseVisualisation>
  <svg class="visualisation tabularVisualisation" {width} {height} bind:this={tabularElement}>
    {#key dataUtil || $visualisationData}
      <!-- Loop over all the columns and create a barcolumn for each of them -->
      <TextColumn
        x={marginLeft}
        icons={[IconType.Sort]}
        name={dataUtil.columns[0]}
        width={columnScale.step()}
        height={height - marginTop - marginBottom}
        data={labelColumn}
        padding={columnPadding}
        on:mouseLabelEnter={onMouseLabelEnter}
        on:mouseLabelLeave={onMouseLabelLeave} />
      {#each numericalColumns as column, columnIndex}
        <BarColumn
          overviewItem={'axis'}
          x={marginLeft + columnScale.step() * (columnIndex + 1)}
          icons={[IconType.Sort]}
          name={dataUtil.columns[columnIndex + 1]}
          width={columnScale.step()}
          height={height - marginTop - marginBottom}
          data={column}
          on:mouseBarEnter={onMouseBarEnter}
          on:mouseBarLeave={onMouseBarLeave}
          padding={columnPadding}
          names={labelColumn}
          barOpacity={0.6} />
      {/each}
      {#if showColumnLines}
        {#each Array(columns.length) as i}
          <StaticLine
            points={[
              { x: marginLeft + columnScale.bandwidth() * i, y: marginTop },
              { x: marginLeft + columnScale.bandwidth() * i, y: height - marginBottom / 2 }
            ]} />
        {/each}
        <StaticLine
          points={[
            { x: marginLeft + columnScale.bandwidth() * columns.length, y: marginTop },
            {
              x: marginLeft + columnScale.bandwidth() * columns.length,
              y: height - marginBottom / 2
            }
          ]} />
      {/if}
    {/key}
  </svg>
</BaseVisualisation>
