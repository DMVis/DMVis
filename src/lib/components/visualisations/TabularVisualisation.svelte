<script lang="ts">
  // Imports
  import { select, drag, scaleBand, type Selection, type ScaleBand } from 'd3';
  import { afterUpdate } from 'svelte';

  // DMVis component imports
  import BarColumn from '$lib/components/columns/BarColumn.svelte';
  import StaticLine from '$lib/components/base/StaticLine.svelte';
  import TextColumn from '$lib/components/columns/TextColumn.svelte';
  import BaseVisualisation from '$lib/components/base/BaseVisualisation.svelte';

  // DMVis imports
  import { IconType } from '$lib/Enums.js';
  import { DataUtils } from '$lib/utils/DataUtils.js';
  import { StyleUtils } from '$lib/utils/StyleUtils.js';
  import { formatClassName } from '$lib/utils/ClassNameFormat.js';
  import { setVisualisationContext, updateVisualisationContext } from '$lib/Context.js';

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
  export let barOpacity: number = 0.6;

  // Private variables
  const { visualisationData } = dataUtil;
  let tabularRef: SVGElement;
  let tabularSelection: Selection<SVGElement, unknown, null, undefined>;

  // Values related to columns, will be set in the updateColumns function
  let columns: Array<string[] | number[]>;
  let labelColumn: string[];
  let numericalColumns: number[][];

  // Scaleband used to equally space out the columns over the entire width
  let columnScale: ScaleBand<string>;

  // Drag related variables, set by dragHandler
  let deltaY: number = 0;
  let deltaYNumber: number = 0;
  let deltaYLabel: number = 0;
  let draggedRow: string = '';
  let draggedItem: string = '';
  let startingDraggedY: number = 0;
  let draggedItemIsSpan: boolean = false;

  // Sorting variables
  let sortedColumn: string = '';
  let sortedOrder: 'asc' | 'desc' | 'none' = 'none';

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
  const dragHandler = drag<SVGElement, unknown>()
    .on('start', function (event) {
      // Set the element being dragged
      // Note that every different type of node requires a different item to be selected in order to get the class name
      if (event.sourceEvent.srcElement.nodeName === 'rect') {
        // For a rect (and therefore the bar element), just get the class of the item that is being dragged
        draggedRow = event.sourceEvent.srcElement.attributes
          .getNamedItem('class')
          .value.split(' ')[1];
        /* Note that draggedItem will be the class name of the element,
            and will therefore be formatted to not use any whitespaces and other symbols.
            Formatting is done by ClassNameFormat.ts */
        draggedItem = draggedRow.split('-')[1];
      } else if (event.sourceEvent.srcElement.nodeName === 'text') {
        /* For a text element (being a label without any whitespaces), get the parent of the text element
           (therefore the group element that `Label` creates), which will hold the class name. */
        draggedRow = event.sourceEvent.srcElement.parentElement.attributes
          .getNamedItem('class')
          .value.split(' ')[1];
        /* Note that draggedItem will be the class name of the element,
            and will therefore be formatted to not use any whitespaces and other symbols.
            Formatting is done by ClassNameFormat.ts */
        draggedItem = draggedRow.split('-')[1];
      } else if (event.sourceEvent.srcElement.nodeName === 'tspan') {
        /* For a tspan element (meaning a label that has whitespaces), get the parent element (which is the text element),
            and after that, do the same as the code block above */
        draggedRow = event.sourceEvent.srcElement.parentElement.parentElement.attributes
          .getNamedItem('class')
          .value.split(' ')[1];
        /* Note that draggedItem will be the class name of the element,
            and will therefore be formatted to not use any whitespaces and other symbols.
            Formatting is done by ClassNameFormat.ts */
        draggedItem = draggedRow.split('-')[1];
      }
      // Store the initial y position of the dragged row
      startingDraggedY = parseFloat(tabularSelection.select(`.bar-${draggedItem}`).attr('y'));
      // Get the initial y position of the bar
      deltaY = parseFloat(tabularSelection.select(`.bar-${draggedItem}`).attr('y')) - event.y;
      deltaYNumber =
        parseFloat(tabularSelection.select(`.bar-number-${draggedItem} > g > text`).attr('y')) -
        event.y;

      /* Check if we are dealing with a tspan or just a text element.
          This is done by checking if the text element has any child nodes (these would be tspans).
          Note that this could not be done in the if statement above, since you could start dragging a row by grabbing the bar
            but the label could still be a tspan */
      const textSelection = tabularSelection.select(`.label-${draggedItem} > text`);
      const amountOfSpans = textSelection.selectAll('tspan').size();
      if (amountOfSpans > 0) {
        // If there are more than 0 children, it means this is a label containing tspans, so set this flag to true
        draggedItemIsSpan = true;
        // Now calculate the inital deltaY for the label by selecting the first tspan element in the text element
        deltaYLabel = parseFloat(textSelection.select('tspan').attr('y')) - event.y;
      } else {
        // If there is only a text element, just get the delta from this label
        deltaYLabel = parseFloat(textSelection.attr('y')) - event.y;
      }
      // Raise dragged row to the front
      tabularSelection.selectAll(`.bar-${draggedItem}`).raise();
      tabularSelection.selectAll(`.label-${draggedItem}`).raise();
      tabularSelection.selectAll(`.bar-number-${draggedItem}`).raise();
    })
    .on('drag', function (event) {
      // Update y position of the bars
      tabularSelection.selectAll(`.bar-${draggedItem}`).attr('y', event.y + deltaY);
      // Update y position of the number in the bar
      tabularSelection
        .selectAll(`.bar-number-${draggedItem} > g > text`)
        .attr('y', event.y + deltaYNumber);

      // Update y position of the label
      if (draggedItemIsSpan) {
        // If this item is a span, move all of the spans in the selected text selection
        tabularSelection
          .selectAll(`.label-${draggedItem} >  text > tspan`)
          .attr('y', event.y + deltaYLabel);
      } else {
        // If this is not a span, just move the text element
        tabularSelection
          .selectAll(`.label-${draggedItem} >  text`)
          .attr('y', event.y + deltaYLabel);
      }
    })
    .on('end', async function () {
      let y: number;
      // Get the y coordinate of the label of the dragged row
      if (draggedItemIsSpan) {
        // If the item is a span, get the y position of the first span element of the text element
        y = parseFloat(
          tabularSelection.select(`.label-${draggedItem} > text`).select('tspan').attr('y')
        );
      } else {
        // If the item is not a span, just get the y position of the text element
        y = parseFloat(tabularSelection.select(`.label-${draggedItem} > text`).attr('y'));
      }
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
        // If the row is undefined, do nothing
        if (rowY === null || rowY === undefined) {
          return Infinity;
        }
        // Get the label text of this row
        let textContent = formatClassName(row.innerHTML);
        // If this label is cut short with ellipses, then get the actual long text
        if (select(row).select('title').size() > 0) {
          textContent = formatClassName(select(row).selectChild().html());
        }
        // If this row is the same as the dragged item, return infinity if nothign has changed
        if (textContent === draggedItem) {
          // Dragging less than 20 pixels means draggedItem is closest
          if (Math.abs(startingDraggedY - y) > 20) {
            return Infinity;
          }
        }
        // Return the distance betweent the 2 rowss
        return Math.abs(parseFloat(rowY as string) - y);
      });
      // Now that all of the distances are computed, find the rows that need to be updated

      // Find the closed row index
      const minDistanceIndex = distances.indexOf(Math.min(...distances));
      // Get the actual row, rather than the index
      const nearestRow = rows[minDistanceIndex !== -1 ? minDistanceIndex : 0];
      // Select the label, depending on whether the nearest row holds spans or not
      let nearestLabel: string;
      // Check if the label has multiple rows
      const amountOfSpansRow = select(nearestRow).selectAll('tspan').size();
      // Check if the label is cut short using ellipses
      const hasEllipsis = select(nearestRow).selectAll('title').size() > 0;
      if (amountOfSpansRow > 0) {
        nearestLabel = '';
        let children = nearestRow.children;
        // Loop over all the tspans
        for (let i = 0; i < children.length; i++) {
          const child = children[i] as Element;
          // Add the text of the tspan to the result
          nearestLabel += child.innerHTML;
          // Add a whitespace to the end if this is not the last tspan
          if (i < nearestRow.children.length - 1) {
            nearestLabel += ' ';
          }
        }
      } else if (hasEllipsis) {
        nearestLabel = select(nearestRow).select('title').html();
      } else {
        nearestLabel = nearestRow.innerHTML;
      }
      // Find the index of the dragged row, note that since draggedItem is formatted, we will also format the data we search through
      const oldIndex = $visualisationData.findIndex(
        (row) => formatClassName(row[0].toString()) === draggedItem
      );
      // Find the index of the nearest row
      const newIndex = $visualisationData.findIndex((row) => row[0] === nearestLabel);
      // Reorder the rows using the datautil
      const newData = dataUtil.reorderRows(
        oldIndex,
        newIndex === -1 ? 0 : newIndex,
        $visualisationData
      );
      $visualisationData = newData;
      // Update all of the columns and rows
      updateColumns();

      // Unhighlight and reset row
      tabularSelection.selectAll(`.label-${draggedItem} > text`).classed('highlighted', false);
      draggedItem = '';
      draggedRow = '';
      draggedItemIsSpan = false;
    });
  // End of assignment to dragHandler

  // Function that creates the columns from the visualisation data
  function updateColumns() {
    // Create the column scale if this is the first time this function is called
    if (columnScale === undefined) {
      columnScale = scaleBand()
        .domain(dataUtil.columns)
        .range([0, width - marginRight - marginLeft]);
    }

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
    tabularSelection = select(tabularRef);
    dragHandler(tabularSelection.selectAll('.bar'));
    dragHandler(tabularSelection.select('.labelNames').selectAll('.label'));
    dragHandler(tabularSelection.selectAll('.bar-number'));
    const axes = document.getElementById('axes');

    if (axes !== null && axes.children.length > 0) {
      axes.removeChild(axes.children[0]);
    }
  });

  function sortData(event: CustomEvent) {
    const { column } = event.detail;
    if (sortedColumn === column) {
      // Decide sorting order, none -> asc -> desc -> none
      sortedOrder = sortedOrder === 'asc' ? 'desc' : sortedOrder === 'desc' ? 'none' : 'asc';
    } else {
      sortedOrder = 'asc';
    }
    sortedColumn = column;

    // Check if sorting should be applied or not
    if (sortedOrder !== 'none') {
      // Sort the data
      dataUtil.sortData(column, sortedOrder === 'asc');
    } else {
      // Reset sorting values
      dataUtil.resetVisualisationData();
    }
    updateColumns();
  }

  // Function that will toggle the class `highlighted` on all needed components.
  // Namely the bar, bar number and label
  function toggleHighlight(name: string, classActive: boolean) {
    const formattedName = formatClassName(name);
    // Update the bars
    tabularSelection.selectAll(`.bar-${formattedName}`).classed('highlighted', classActive);
    // Update the numbers in the bar
    tabularSelection.selectAll(`.bar-number-${formattedName}`).classed('highlighted', classActive);
    // Update the labels
    tabularSelection
      .selectAll(`.label-${formattedName} > text`)
      .classed('highlighted', classActive);
  }

  // Handle columns being dragged
  let dragMove: string | null = null;
  let dragMoveX: number = 0;

  // Raise the column when dragging so its displayed over the other ones
  function onDraggingStart(event: CustomEvent) {
    dragMove = event.detail.elementName as string;
    tabularSelection.select(`#${formatClassName(dragMove)}-column`).raise();
  }

  // Set the new position of the column when dragging
  function onDragMove(event: CustomEvent) {
    dragMoveX += event.detail.movementX;
  }

  // Update the columns array with the new order
  function onDragStop() {
    if (dragMove === null) {
      return;
    }

    // Update the columns array with the new order
    let newColumnOrder = columnScale.domain();
    const oldIndex = newColumnOrder.indexOf(dragMove);
    let newIndex =
      dragMoveX > 0
        ? Math.floor(dragMoveX / columnScale.step())
        : Math.ceil(dragMoveX / columnScale.step());
    newIndex = oldIndex + newIndex;
    const removedCol = newColumnOrder.splice(oldIndex, 1);
    newColumnOrder.splice(newIndex, 0, removedCol[0]);
    columnScale.domain(newColumnOrder);

    // Reset the element that is being dragged
    dragMove = null;
    dragMoveX = 0;
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
* barOpacity: number                  - Opacity of each bar as a number in the range [0..1].
                                        A value lower than one is recommended for visible bar highlighting.
                                        This defaults to `0.6`.
-->

<BaseVisualisation>
  <svg class="visualisation tabularVisualisation" {width} {height} bind:this={tabularRef}>
    {#key dataUtil || $visualisationData}
      <!-- Loop over all the columns and create a barcolumn for each of them -->
      <TextColumn
        x={marginLeft +
          (columnScale(dataUtil.columns[0]) ?? 0) +
          (dragMove === dataUtil.columns[0] ? dragMoveX : 0)}
        icons={[IconType.Sort]}
        name={dataUtil.columns[0]}
        width={columnScale.step()}
        height={height - marginTop - marginBottom}
        data={labelColumn}
        padding={columnPadding}
        on:mouseLabelEnter={onMouseLabelEnter}
        on:mouseLabelLeave={onMouseLabelLeave}
        on:dragStart={onDraggingStart}
        on:dragMove={onDragMove}
        on:dragStop={onDragStop} />
      {#each numericalColumns as column, columnIndex}
        <BarColumn
          overviewItem={'axis'}
          x={marginLeft +
            (columnScale(dataUtil.columns[columnIndex + 1]) ?? 0) +
            (dragMove === dataUtil.columns[columnIndex + 1] ? dragMoveX : 0)}
          icons={[IconType.Sort]}
          name={dataUtil.columns[columnIndex + 1]}
          width={columnScale.step()}
          height={height - marginTop - marginBottom}
          data={column}
          on:mouseBarEnter={onMouseBarEnter}
          on:mouseBarLeave={onMouseBarLeave}
          on:sort={sortData}
          on:dragStart={onDraggingStart}
          on:dragMove={onDragMove}
          on:dragStop={onDragStop}
          padding={columnPadding}
          names={labelColumn}
          {barOpacity}
          barLabelVisibility={'alwaysVisible'} />
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
