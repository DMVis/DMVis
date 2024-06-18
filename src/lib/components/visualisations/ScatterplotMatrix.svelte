<script lang="ts">
  // Imports
  import {
    scaleBand,
    select,
    brush,
    max as maxFunction,
    min as minFunction,
    type ScaleBand
  } from 'd3';
  import { onMount, afterUpdate } from 'svelte';

  // DMVis imports
  import {
    getVisualisationContext,
    setVisualisationContext,
    updateVisualisationContext
  } from '$lib/utils/Context.js';
  import Label from '$lib/components/base/Label.svelte';
  import Tooltip from '$lib/components/base/Tooltip.svelte';
  import Draggable from '$lib/components/base/Draggable.svelte';
  import StaticLine from '$lib/components/base/StaticLine.svelte';
  import DynamicAxis from '$lib/components/base/DynamicAxis.svelte';
  import Scatterplot from '$lib/components/visualisations/Scatterplot.svelte';
  import { StyleUtils } from '$lib/utils/StyleUtils.js';
  import BaseVisualisation from '$lib/components/base/BaseVisualisation.svelte';
  import type { DataUtils } from '$lib/utils/DataUtils.js';
  import { formatClassName } from '$lib/utils/ClassNameFormat.js';
  import type { ScaleLinear, UndefineableString } from '$lib/Types.js';

  // Required attributes
  export let dataUtil: DataUtils;

  // Optional attributes
  export let display: 'full' | 'top' | 'bottom' = 'full';
  export let styleUtil: StyleUtils = new StyleUtils({ color: '#f42b03' });

  export let height: number = calculateDimensions(dataUtil.columns.length);
  export let width: number = calculateDimensions(dataUtil.columns.length);
  export let marginLeft: number = 40;
  export let marginRight: number = 40;
  export let marginBottom: number = 40;
  export let marginTop: number = 40;
  export let padding: number = 0.1;
  export let pointOpacity: number = 0.3;
  export let isScrollable: boolean = false;
  export let showFilter: boolean = false;

  let scatterplotMatrixRef: SVGElement;

  // List that holds all the names of the grey points in the scatterplot matrix
  let currentGreyPoints: string[] = [];

  // Current mouse coordinates, used for the tooltip lines
  let mouseX = 0;
  let mouseY = 0;

  // Scaled mouse coordinates, meaning they hold the actual coordinates of a point inside a scatterplot
  let scaledMouseX: number = 0;
  let scaledMouseY: number = 0;

  // Current x and y attribute that are hovered, go back to '' if nothing is hovered
  let currentX: string = '';
  let currentY: string = '';

  // Scales used to space the scatterplots, where you can put in an attribute name and get the starting position back
  let xScale: ScaleBand<string>;
  let yScale: ScaleBand<string>;

  // Order of the attributes from top-left to bottom-right
  let axisNames: string[] = [];

  // Whether or not to display the tooltip lines
  let showMouseLines = true;

  // Only one of these will be true, whether to draw the tooltip lines to the top-right corner or the bottom-left corner
  let showTopRightLines = false;
  let showBottomLeftLines = false;

  // X and Y that the brush is currently active in, set to -1 if brush is inactive
  let brushX: number = -1;
  let brushY: number = -1;

  /* A matrix that is the same shape as the scatterplot matrix
     For each position it holds the scaled selection of the corresponding scatterplot */
  let selectionMatrix: Array<Array<number[][] | null>>;

  // rangePerAttribute is an array that for each entry it holds [min,max] or null (meaning no filter specified)
  let rangePerAttribute: (number[] | null)[];

  // Data for the tooltip label that shows up when hovering over a point
  let tooltipData = {
    visible: false,
    x: 0,
    y: 0,
    text: ''
  };

  // Holds the name of the point that is currently clicked
  let clickedPoint = '';

  // Used to force a reload of the scatterplot matrix
  let reloadKey = false;

  // Drag related variables
  let dragging: boolean = false;
  let draggingLabelOffsetX: number = 0;
  let draggingLabelOffsetY: number = 0;
  let draggedAttribute: UndefineableString = undefined;

  // Hover line related variables
  let hoveredPoint: string = '';
  let hoveredPointX: number;
  let hoveredPointY: number;
  let enteredNewPoint: boolean = false;

  const { visualisationData } = dataUtil;

  // Fill the store
  setVisualisationContext({});

  $: {
    updateVisualisationContext({
      data: $visualisationData,
      columns: dataUtil.columns,
      marginLeft,
      marginRight,
      marginTop,
      marginBottom,
      width: showFilter ? width - 150 : width,
      height,
      styleUtil
    });

    // The first column name is `label`, this is not relevant
    // Only needed the first time this component is loaded
    if (axisNames.length === 0) {
      axisNames = dataUtil.columns.slice(1);
    }
    // Create scalebands to get the positioning of all the scatterplots correct, and also include padding
    yScale = scaleBand()
      .domain(axisNames)
      .range([marginTop, height - marginBottom])
      .paddingInner(padding);
    xScale = scaleBand()
      .domain(axisNames)
      .range([marginLeft, width - marginRight])
      .paddingInner(padding);
  }

  // Get the computed scales from the store
  const { xScales, yScales } = getVisualisationContext();

  // Function that calculates the dimension of the scatterplot matrix based on the number of attributes
  // Used 150 as a base value, because it fits well on the screen for most cases
  function calculateDimensions(numAttributes: number): number {
    return numAttributes * 150;
  }

  // This function is called when the mouse is over a scatterplot
  function onMouseOver(xAxis: string, yAxis: string, showLines: boolean = true) {
    // If both the xAxis and yAxis have not changed, then there is no need to update anything, so return
    if (currentX === xAxis && currentY === yAxis) return;
    // Update the global variables
    currentX = xAxis;
    currentY = yAxis;

    // Add highlight to the labels
    select(scatterplotMatrixRef)
      .selectAll(`.label-${formatClassName(xAxis)}Attr > *`)
      .classed('highlighted', true);
    select(scatterplotMatrixRef)
      .selectAll(`.label-${formatClassName(yAxis)}Attr > *`)
      .classed('highlighted', true);

    showMouseLines = showLines;
  }

  // This function is called when the mouse leaves a scatterplot
  function onMouseOut(xAxis: string, yAxis: string) {
    // Remove the highlight from the labels
    select(scatterplotMatrixRef)
      .selectAll(`.label-${formatClassName(xAxis)}Attr > *`)
      .classed('highlighted', false);
    select(scatterplotMatrixRef)
      .selectAll(`.label-${formatClassName(yAxis)}Attr > *`)
      .classed('highlighted', false);

    // There no longer are attributes that need to be highlighted
    currentX = '';
    currentY = '';

    // If there is no point clicked (and therefore locking the mouse lines to this place), hide the lines that follow the mouse
    if (clickedPoint === '') showMouseLines = false;
  }

  // This function is called when the mouse moves over the scatterplot
  function onMouseMove(event: MouseEvent, xAxis: string, yAxis: string) {
    if (!showMouseLines) showMouseLines = true;
    // Line to block the line from moving if a point is selected
    // An exception is when there is a new point entered, in that case update the line
    if ((hoveredPoint !== '' && !enteredNewPoint) || clickedPoint !== '') return;

    if (enteredNewPoint) {
      mouseX = hoveredPointX + xScale(xAxis)!;
      mouseY = hoveredPointY + yScale(yAxis)!;
    } else {
      // Update global variables
      mouseX = event.offsetX;
      mouseY = event.offsetY;
    }
    enteredNewPoint = false;

    let [scaledX, scaledY] = getScaledMouseCoords(mouseX, mouseY, xAxis, yAxis);
    scaledMouseX = scaledX;
    scaledMouseY = scaledY;

    // Check which tooltip line to display
    showBottomLeftLines = (xScale(yAxis) ?? 0) > mouseX;
    showTopRightLines = !showBottomLeftLines;
  }

  // This function takes mouse coordinates and the 2 attributes which the scatterplot are about
  // And returns the scaled coordinates of the mouse in this scatterplot
  function getScaledMouseCoords(mouseX: number, mouseY: number, xAxis: string, yAxis: string) {
    // Scatter coordinates are the absolute coordinates inside a scatterplot
    let scatterX = mouseX - (xScale(xAxis) ?? 0);
    let scatterY = mouseY - (yScale(yAxis) ?? 0);

    // The index of the x and y attribute
    let xIndex = dataUtil.columns.indexOf(xAxis);
    let yIndex = dataUtil.columns.indexOf(yAxis);

    // Get the corresponding scales and set the correct range
    let xScaleLinear = $xScales[xIndex] as ScaleLinear;
    xScaleLinear.range([xScale.bandwidth(), 0]);
    let yScaleLinear = $yScales[yIndex] as ScaleLinear;
    yScaleLinear.range([0, yScale.bandwidth()]);

    // Scaled mouse coordinates are the scaled coordinates of a scatterplot
    let scaledMouseXLocal = xScaleLinear.invert(scatterX);
    let scaledMouseYLocal = yScaleLinear.invert(scatterY);

    return [scaledMouseXLocal, scaledMouseYLocal];
  }
  // Function that fires when the user starts brushing
  function brushStart(ap: { sourceEvent: { offsetX: number; offsetY: number } }) {
    /* Get the x and y index of the scatterplot from which the brush is initiated
       This is done to prevent the user from hovering over another scatterplot mid-brush and therefore update that selection */
    brushX = calculateAttributeIndex(xScale, ap.sourceEvent.offsetX - marginLeft);
    brushY = calculateAttributeIndex(yScale, ap.sourceEvent.offsetY - marginTop);
  }

  // Function is called when something happens to the brushed selection
  function brushing(ap: { selection: number[][] }) {
    // Calculate which attributes are being selected
    let xAttr = xScale.domain()[brushX];
    let yAttr = yScale.domain()[brushY];

    // If the scatterplot is not recognised, do nothing
    if (!xAttr || !yAttr || xAttr === yAttr) return;

    // Get the actual selection and scale it according to the scales corresponding to the scatterplot
    let selection = scaleSelection(ap.selection, brushX, brushY);

    // Update the selectionMatrix with the given selection
    if (selection === null) {
      selectionMatrix[brushX][brushY] = null;
    } else {
      selectionMatrix[brushX][brushY] = selection.slice();
    }

    // Update the ranges for the 2 attributes that the scatterplot is about
    rangePerAttribute[getDataUtilIndex(brushX)] = calculateRangePerIndex(brushX);
    rangePerAttribute[getDataUtilIndex(brushY)] = calculateRangePerIndex(brushY);

    // Filter the data
    let excludedPoints: string[] = dataUtil.filterData(rangePerAttribute)[1];

    let pointsTurningRed: string[] = Array.from(setMinus(currentGreyPoints, excludedPoints));
    pointsTurningRed.forEach((name: string) => {
      changeFocus(name, true);
    });
    let pointsTurningGrey: string[] = Array.from(setMinus(excludedPoints, currentGreyPoints));
    pointsTurningGrey.forEach((name: string) => {
      changeFocus(name, false);
    });

    currentGreyPoints = excludedPoints.slice();

    /* Given an index (and therefore an attribute), it calculates the range
       This is done by searching through the global selectionMatrix */
    function calculateRangePerIndex(index: number): number[] | null {
      // Get all the selections across the row of this index which are not null
      let rowValues = selectionMatrix[index].filter((selection) => {
        return selection !== null;
      });

      // Get all the selections across the column of this index which are not null
      let columnValues = selectionMatrix
        .map((row) => {
          return row[index];
        })
        .filter((selection) => {
          return selection !== null;
        });

      /* Get the minimum and maximum value along the row
         Note that we want the highest minimum and the lowest maximum
         Which is why we use d3.max for min and vice versa */
      let minRow =
        maxFunction(rowValues, (selection) => {
          return Math.floor((selection as number[][])[0][0]);
        }) ?? -1;
      let maxRow =
        minFunction(rowValues, (selection) => {
          return Math.ceil((selection as number[][])[1][0]);
        }) ?? -1;

      // Do the same for the column
      let minCol =
        maxFunction(columnValues, (selection) => {
          return Math.floor((selection as number[][])[0][1]);
        }) ?? -1;
      let maxCol =
        minFunction(columnValues, (selection) => {
          return Math.ceil((selection as number[][])[1][1]);
        }) ?? -1;

      // Now compare the row and column to get the final min and max
      let min, max;
      /* minCol and minRow are -1 if there are no selections found
         If both are -1, we can return null since there is no selection */
      if (minCol < 0 && minRow < 0) {
        return null;
      } else {
        if (maxCol < 0) {
          // If there is no selection across the column, just return the max from the row
          max = maxRow;
        } else if (maxRow < 0) {
          // If there is no selection across the row, just return the max from the column
          max = maxCol;
        } else {
          // If there is a selection across both, then get the lowest of the 2 for the max
          max = Math.min(maxCol, maxRow);
        }
        /* Min can always be calculated this way,
           Because if one of the 2 is -1, then the other one will simply get chosen */
        min = Math.max(minCol, minRow);
        //Return the min and the max for the give attribute
        return [min, max];
      }
    }

    // Takes a selection and returns a scaled selection
    function scaleSelection(selection: number[][], xIndex: number, yIndex: number) {
      // Empty selections don't need scaling
      if (selection === null) return null;

      /* Get the relevant scales
         The +1 is because the columnnames also has a scale, which we are not interested in */
      let xScaleLinear = $xScales[getDataUtilIndex(xIndex) + 1] as ScaleLinear;
      let yScaleLinear = $yScales[getDataUtilIndex(yIndex) + 1] as ScaleLinear;

      let scaledSelection = [
        [xScaleLinear.invert(selection[0][0]), yScaleLinear.invert(selection[1][1])],
        [xScaleLinear.invert(selection[1][0]), yScaleLinear.invert(selection[0][1])]
      ];
      return scaledSelection;
    }

    function* setMinus(A: string[], B: string[]) {
      const setA = new Set(A);
      const setB = new Set(B);

      for (const value of setB.values()) {
        if (!setA.delete(value)) {
          yield value;
        }
      }
    }
  }

  /* Toggles the focus of all the points with a given classname
       If the bool is true the point will be grey, if false it will not be grey */
  function changeFocus(pointName: string, needsToBeGrey: boolean) {
    select(scatterplotMatrixRef)
      .selectAll(`.point-${formatClassName(pointName)}`)
      .classed('greyed', needsToBeGrey);
  }

  /* Custom function that mimics the invert function on other scales.
     But scaleband does not support this function, so need to create it yourself
     Returns the index rather than the name */
  function calculateAttributeIndex(scale: ScaleBand<string>, coordinate: number) {
    const index = Math.floor(coordinate / scale.step());
    return index;
  }

  // Function that fires when the mouse leaves any point
  function onMousePointLeave(e: CustomEvent<{ name: string; x: number; y: number }>): void {
    // Reset the cursor
    document.body.style.cursor = 'crosshair';

    // Set the hovered point to the name of the point
    let name = e.detail.name;
    hoveredPoint = '';

    // If there is a point clicked, do not do anything
    if (clickedPoint !== '') return;

    // Remove the highlight from all points
    select(scatterplotMatrixRef)
      .selectAll(`.point-${formatClassName(name)}`)
      .classed('highlighted', false);

    // Tooltip label is no longer visible
    tooltipData.visible = false;
  }

  // Function that fires when the mouse hovers over any point
  function onMousePointEnter(e: CustomEvent<{ name: string; x: number; y: number }>): void {
    // Update the cursor
    document.body.style.cursor = 'pointer';

    // Set the hovered point to the name of the point
    enteredNewPoint = true;
    hoveredPointX = e.detail.x;
    hoveredPointY = e.detail.y;
    let name = e.detail.name;
    hoveredPoint = name;

    // If there is a point clicked, do not do anything
    if (clickedPoint !== '') return;

    // Select all the points with the same class name
    select(scatterplotMatrixRef)
      .selectAll(`.point-${formatClassName(name)}`)
      .classed('highlighted', true);
    // Get the coordinates of this point
    // Used for the tooltip label
    let xCoordPoint = e.detail.x + (xScale(currentX) ?? 0);
    tooltipData.x = xCoordPoint;
    let yCoordPoint = e.detail.y + (yScale(currentY) ?? 0);
    tooltipData.y = yCoordPoint;
    // Tooltip label is now visible
    tooltipData.visible = true;

    // Update the tooltip text to show the current point
    tooltipData.text = name;
  }

  // Function that fires when a point is clicked
  function onMousePointClick(e: CustomEvent<{ name: string; x: number; y: number }>): void {
    let name = e.detail.name;
    // If this point is already clicked, then make the point no longer clicked
    if (name === clickedPoint) {
      clickedPoint = '';
    }
    // If no point is currently clicked, then this point will be the clicked point
    else if (clickedPoint === '') {
      clickedPoint = name;
    }
  }

  function getDataUtilIndex(attributeIndex: number) {
    let res = dataUtil.columns.indexOf(axisNames[attributeIndex]) - 1;
    return res;
  }

  afterUpdate(() => {
    // After each update, reapply the brush
    select(scatterplotMatrixRef)
      .selectAll<SVGGElement, unknown>('.brush')
      .call(
        brush()
          .extent([
            [0, 0],
            [xScale.bandwidth(), yScale.bandwidth()]
          ])
          .on('brush end', brushing)
          .on('start', brushStart)
      );
  });

  onMount(() => {
    /* Select all brush elements, these are already created in the scatterplot component
       Add a d3 brush to them and set the brush size to a size that corresponds with the scatterplot size
       Finally, add eventhandlers to brushing
    */
    select(scatterplotMatrixRef)
      .selectAll<SVGGElement, unknown>('.brush')
      .call(
        brush()
          .extent([
            [0, 0],
            [xScale.bandwidth(), yScale.bandwidth()]
          ])
          .on('brush end', brushing)
          .on('start', brushStart)
      );

    // Create an empty selectionMatrix, filled with all null values
    selectionMatrix = JSON.parse(
      JSON.stringify(Array(axisNames.length).fill(Array(axisNames.length).fill(null)))
    );
    // Set the ranges to be null
    rangePerAttribute = Array(axisNames.length).fill(null);

    //The first column name is `label`, this is not relevant
    axisNames = dataUtil.columns.slice(1);
  });

  // Function that handles updating the position of the axis that is being dragged
  function onDragMove(e: CustomEvent) {
    let elementName = e.detail.elementName;
    let movementX = e.detail.movementX;
    let movementY = e.detail.movementY;
    draggedAttribute = elementName;
    draggingLabelOffsetX += movementX;
    draggingLabelOffsetY += movementY;
  }

  // Reset local dragging variables when we stop dragging
  function onDragStop() {
    swapLabels();
    dragging = false;
    draggedAttribute = undefined;
    draggingLabelOffsetX = 0;
    draggingLabelOffsetY = 0;
    currentGreyPoints = [];
    showMouseLines = false;
    clickedPoint = '';
  }

  // Raise the label when we start dragging
  function onDragStart(e: CustomEvent) {
    dragging = true;
    select(scatterplotMatrixRef)
      .selectAll(`.${formatClassName(e.detail.elementName)}`)
      .raise();
  }

  // After dragging, find which label the dragged label should be swapped with and swap them
  function swapLabels() {
    if (draggingLabelOffsetX === 0) return;
    // Enforced type because it will always exist
    const axisIndex = axisNames.indexOf(draggedAttribute as string);
    let newIndex =
      draggingLabelOffsetX > 0
        ? Math.floor((draggingLabelOffsetX + xScale.bandwidth() / 2) / xScale.step())
        : Math.ceil((draggingLabelOffsetX - xScale.bandwidth() / 2) / xScale.step());
    newIndex = axisIndex + newIndex;
    // Clamp newIndex so it does not go out of bounds in the array
    if (newIndex < 0 || newIndex > axisNames.length - 1) {
      newIndex = newIndex < 0 ? 0 : axisNames.length - 1;
    }
    if (axisNames[newIndex] === draggedAttribute) return;
    axisNames.splice(axisNames.indexOf(draggedAttribute as string), 1);
    axisNames.splice(newIndex, 0, draggedAttribute!);
    resetScatterplotMatrix();
  }
  function resetScatterplotMatrix() {
    xScale.domain(axisNames);
    yScale.domain(axisNames);
    axisNames = [...axisNames];
    // Update all the global variabes and update the scatterplot
    reloadKey = !reloadKey;
    selectionMatrix = JSON.parse(
      JSON.stringify(Array(axisNames.length).fill(Array(axisNames.length).fill(null)))
    );
    rangePerAttribute = Array(axisNames.length).fill(null);

    tooltipData.visible = false;
  }
  function onKeyDown(e: KeyboardEvent) {
    if (e.key !== 'Escape') {
      return;
    }
    unSelectClickedPoint();
    removeBrush();
  }
  function unSelectClickedPoint() {
    if (clickedPoint === '') return;
    select(scatterplotMatrixRef)
      .selectAll(`.point-${formatClassName(clickedPoint)}`)
      .classed('highlighted', false);
    clickedPoint = '';
    tooltipData.visible = false;
    showMouseLines = false;
  }
  function removeBrush() {
    select(scatterplotMatrixRef)
      .selectAll<SVGGElement, unknown>('.brush')
      .nodes()
      .forEach((brushElem: SVGGElement) => {
        select(brushElem).call(brush().clear);
      });
    currentGreyPoints.forEach((pointName) => {
      changeFocus(pointName, false);
    });
    currentGreyPoints = [];
    selectionMatrix = JSON.parse(
      JSON.stringify(Array(axisNames.length).fill(Array(axisNames.length).fill(null)))
    );
    rangePerAttribute = Array(axisNames.length).fill(null);
  }
</script>

<!--
@component
### ScatterplotMatrix
This is a visualisation that consists of multiple scatterplots in a matrix.
It can be used to quickly find relations between attributes in a large data set.

#### Required Attributes
* dataUtil: DataUtils - An instance of `dataUtils`, which holds all the data. See its documentation for more information.

#### Optional Attributes
* styleUtil: StyleUtils              - An instance of `StyleUtils`, which contains styling for the visualisation. See its documentation for more information.
                                       Defaults to `new StyleUtils({ color: '#f42b03' })`.
* padding: number                    - The padding between each scatterplots.
                                       Defaults to `0.1`.
* pointColor: string                 - The colour of each point in each scatterplot. Valid inputs include CSS colours specified as a string.
                                       Defaults to `'red'`.
* pointOpacity: number               - The default opacity of the points in each scatterplot.
                                       It can be a number between `0` and `1` (inclusive).
                                       Defaults to `0.3`.
* display: 'full' | 'top' | 'bottom' - Whether to draw the entire visualisation, or only the top, or only the bottom half.
                                       Defaults to `'full'`.

* height: number                     - The height of the visualisation in pixels.
                                       Defaults to `numberOfAttributes * 150`.
* width: number                      - The width of the visualisation in pixels.
                                       Defaults to `numberOfAttributes * 150`.
* marginLeft: number                 - The margin to the left of the visualisation in pixels.
                                       Defaults to `40`.
* marginRight: number                - The margin to the right of the visualisation in pixels.
                                       Defaults to `40`.
* marginTop: number                  - The margin to the top of the visualisation in pixels.
                                       Defaults to `40`.
* marginBottom: number               - The margin to the bottom of the visualisation in pixels.
                                       Defaults to `40`.
* isScrollable: boolean              - Whether the visualisation is scrollable in its parent container.
                                       Defaults to `false`.
* showFilter: boolean                - Whether the filter is displayed next to the visualisation.
                                       Defaults to `false`.
-->

<BaseVisualisation {isScrollable} showFilter={showFilter ? dataUtil : null}>
  {#await xScale}
    <p>Loading visualisation, please wait...</p>
  {:then}
    <svg
      width={isScrollable ? width : '100%'}
      height={isScrollable ? height : '100%'}
      class="visualisation scatterplotMatrix"
      bind:this={scatterplotMatrixRef}>
      {#key reloadKey || $visualisationData}
        <!-- Loop over all the attributes on the xAxis -->
        {#each axisNames as xAxis, i}
          <!-- Loop over all the attributes on the yAxis -->
          {#each axisNames as yAxis, j}
            <!-- If they are not the same, draw a scatterplot
              Also check if this scatterplot needs to be drawn if only half of the SM is drawn -->
            {#if xAxis !== yAxis && (display !== 'top' || j < i) && (display !== 'bottom' || j > i)}
              <g
                transform="translate({xScale(xAxis)},{yScale(yAxis)})"
                on:mouseover={() => {
                  onMouseOver(xAxis, yAxis);
                }}
                on:mouseout={() => {
                  onMouseOut(xAxis, yAxis);
                }}
                on:focus={() => {
                  onMouseOver(xAxis, yAxis);
                }}
                on:blur={() => {
                  onMouseOut(xAxis, yAxis);
                }}
                on:mousemove={(event) => {
                  onMouseMove(event, xAxis, yAxis);
                }}
                role="treeitem"
                aria-selected="false"
                tabindex={-1}>
                <Scatterplot
                  on:mousePointLeave={onMousePointLeave}
                  on:mousePointEnter={onMousePointEnter}
                  on:mousePointClick={onMousePointClick}
                  {xAxis}
                  {yAxis}
                  width={xScale.bandwidth()}
                  height={yScale.bandwidth()}
                  showAxis={false}
                  {pointOpacity}
                  marginBottom={0}
                  marginTop={0}
                  marginRight={0}
                  marginLeft={0} />
                <!--The rect will function as a border around the scatterplot  -->
                <rect
                  width={xScale.bandwidth()}
                  height={yScale.bandwidth()}
                  x={0}
                  y={0}
                  stroke="black"
                  fill="none"
                  style="pointer-events: none">
                </rect>
              </g>
              <!-- If xAxis and yAxis are the same, draw a label displaying the attribute name -->
            {:else if xAxis === yAxis}
              <g
                style={dragging ? 'cursor:grabbing' : 'cursor:grab'}
                transform="translate({xScale(xAxis)},{yScale(yAxis)})"
                class={formatClassName(xAxis)}>
                <Draggable
                  offsetX={xAxis === draggedAttribute ? draggingLabelOffsetX : 0}
                  offsetY={xAxis === draggedAttribute ? draggingLabelOffsetY : 0}
                  elementName={xAxis}
                  on:dragStart={onDragStart}
                  on:dragMove={onDragMove}
                  on:dragStop={onDragStop}>
                  <Label
                    x={xScale.bandwidth() / 2}
                    y={yScale.bandwidth() / 2}
                    text={xAxis}
                    hasBackground={true}
                    name={xAxis + 'Attr'}
                    width={xScale.bandwidth()}
                    height={yScale.bandwidth()}
                    backgroundColor={'white'}
                    on:mouseLabelEnter={() => {
                      onMouseOver(xAxis, yAxis, false);
                    }}
                    on:mouseLabelLeave={() => {
                      onMouseOut(xAxis, yAxis);
                    }}
                    hasPointerEvents={true} />
                </Draggable>
              </g>
            {/if}
            <!-- End of looping over yAxis -->
          {/each}
          <!-- End of looping over xAxis -->
        {/each}
        <!-- Draw the lines that go from the mouse coordinates to the appropiate axis, only if necessary -->
        {#if showMouseLines}
          <!-- Either draw lines to the top- and right-axis, or draw them to the bottom- and left-axis -->
          {#if showTopRightLines}
            <!-- Draw a line to the right axis, and a label displaying the scaled y position of the mouse -->
            <StaticLine
              points={[
                { x: mouseX, y: mouseY },
                { x: width - marginRight, y: mouseY }
              ]}
              opacity={0.5}
              dashLength="5" />
            <Tooltip
              x={width - marginRight - 5}
              y={Math.round(mouseY) + 10}
              text={`${Math.round(scaledMouseY)}`}
              origin={'topRight'} />
            <!-- Draw a line to the top axis, and a label displaying the scaled x position of the mouse -->
            <StaticLine
              points={[
                { x: mouseX, y: mouseY },
                { x: mouseX, y: marginTop }
              ]}
              opacity={0.5}
              dashLength="5" />
            <Tooltip
              x={Math.round(mouseX) + 10}
              y={marginTop + 5}
              text={`${Math.round(scaledMouseX)}`}
              origin={'topLeft'} />
          {/if}
          {#if showBottomLeftLines}
            <!-- Draw a line to the left axis, and a label displaying the scaled y position of the mouse -->
            <StaticLine
              points={[
                { x: mouseX, y: mouseY },
                { x: marginLeft, y: mouseY }
              ]}
              opacity={0.5}
              dashLength="5" />
            <Tooltip
              x={marginLeft + 5}
              y={Math.round(mouseY) + 10}
              text={`${Math.round(scaledMouseY)}`}
              origin={'topLeft'} />

            <!-- Draw a line to the bottom axis, and a label displaying the scaled x position of the mouse -->
            <StaticLine
              points={[
                { x: mouseX, y: mouseY },
                { x: mouseX, y: height - marginBottom }
              ]}
              opacity={0.5}
              dashLength="5" />
            <Tooltip
              x={Math.round(mouseX) + 10}
              y={height - marginBottom}
              text={`${Math.round(scaledMouseX)}`}
              origin={'bottomLeft'} />
          {/if}
          <!-- End of if-statement about the mouselines-->
        {/if}
        <!-- Draw the tooltip if a point is hovered over or clicked -->
        {#if tooltipData.visible}
          <Tooltip
            x={tooltipData.x - 5}
            y={tooltipData.y - 5}
            text={tooltipData.text}
            hasBackground={true}
            origin={'bottomRight'} />
        {/if}
        <!-- Draw the axis on all 4 sides of the Scatterplot matrix -->
        <!-- The top and right axis are not needed if only the bottom of the SM is drawn -->
        {#if display !== 'bottom'}
          <DynamicAxis
            position="right"
            spacingDirection="vertical"
            ticksNumber={2}
            {padding}
            axisOrder={axisNames}
            offset={5}
            squashOuterTicks={true} />
          <DynamicAxis
            position="top"
            spacingDirection="horizontal"
            ticksNumber={2}
            {padding}
            axisOrder={axisNames}
            offset={5}
            squashOuterTicks={true} />
        {/if}
        <!-- The bottom and left axis are not needed if only the top of the SM is drawn -->
        {#if display !== 'top'}
          <DynamicAxis
            position="left"
            spacingDirection="vertical"
            ticksNumber={2}
            {padding}
            axisOrder={axisNames}
            offset={5}
            squashOuterTicks={true} />
          <DynamicAxis
            position="bottom"
            spacingDirection="horizontal"
            ticksNumber={2}
            {padding}
            axisOrder={axisNames}
            offset={5}
            squashOuterTicks={true} />
        {/if}
      {/key}
    </svg>
  {:catch}
    <p>Loading visualisation failed</p>
  {/await}
</BaseVisualisation>
<svelte:window on:keydown={onKeyDown} />
