<script lang="ts">
  // Imports
  import * as d3 from 'd3';
  import { setContext, getContext, onMount } from 'svelte';

  // DMVis imports
  import Label from '$lib/components/base/Label.svelte';
  import StaticLine from '$lib/components/base/StaticLine.svelte';
  import DynamicAxis from '$lib/components/base/DynamicAxis.svelte';
  import Scatterplot from '$lib/components/visualisations/Scatterplot.svelte';

  // Import dmvis utils
  import { StyleUtils } from '$lib/utils/StyleUtils.js';
  import type { DataUtils } from '$lib/utils/DataUtils.js';
  import { OriginX, OriginY } from '$lib/Enums.js';
  import { VisualisationStore } from '$lib/store.js';

  // Required attributes
  export let dataUtil: DataUtils;

  // Optional attributes
  export let styleUtil: StyleUtils = new StyleUtils({ color: '#f42b03' });

  export let height: number = calculateDimensions(dataUtil.columns.length);
  export let width: number = calculateDimensions(dataUtil.columns.length);
  export let marginLeft: number = 40;
  export let marginRight: number = 40;
  export let marginBottom: number = 40;
  export let marginTop: number = 40;

  export let padding: number = 0.1;
  export let pointOpacity: number = 0.3;

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
  let xScale: d3.ScaleBand<string>;
  let yScale: d3.ScaleBand<string>;

  // Order of the attributes from top-left to bottom-right
  let axisNames: string[];

  // Whether or not to display the tooltip lines
  let showMouseLines = false;

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

  // Fill the store
  const visualisationStore = new VisualisationStore();
  $: {
    visualisationStore.data.set(dataUtil.data);
    visualisationStore.columns.set(dataUtil.columns);
    visualisationStore.marginLeft.set(marginLeft);
    visualisationStore.marginRight.set(marginRight);
    visualisationStore.marginTop.set(marginTop);
    visualisationStore.marginBottom.set(marginBottom);
    visualisationStore.width.set(width);
    visualisationStore.height.set(height);
    visualisationStore.styleUtil.set(styleUtil);

    // The first column name is `label`, this is not relevant
    axisNames = dataUtil.columns.slice(1);

    // Create scalebands to get the positioning of all the scatterplots correct, and also include padding
    yScale = d3
      .scaleBand()
      .domain(axisNames)
      .range([marginTop, height - marginBottom])
      .paddingInner(padding);
    xScale = d3
      .scaleBand()
      .domain(axisNames)
      .range([marginLeft, width - marginRight])
      .paddingInner(padding);
  }
  setContext('store', visualisationStore);

  // Get the computed scales from the store
  const { xScales, yScales } = getContext<VisualisationStore>('store');

  // Function that calculates the dimension of the scatterplot matrix based on the number of attributes
  // Used 150 as a base value, because it fits well on the screen for most cases
  function calculateDimensions(numAttributes: number): number {
    return numAttributes * 150;
  }

  // This function is called when the mouse is over a scatterplot
  function mouseOver(xAxis: string, yAxis: string) {
    // If both the xAxis and yAxis have not changed, then there is no need to update anything, so return
    if (currentX == xAxis && currentY == yAxis) return;
    // Update the global variables
    currentX = xAxis;
    currentY = yAxis;

    // Add highlight to the labels
    d3.selectAll(`.label-${formatClassName(xAxis)}-attr > *`).classed('highlighted', true);
    d3.selectAll(`.label-${formatClassName(yAxis)}-attr > *`).classed('highlighted', true);

    // If the mouse is over a scatterplot, there need to be tooltip lines displayed
    showMouseLines = true;
  }

  // This function is called when the mouse leaves a scatterplot
  function mouseOut(xAxis: string, yAxis: string) {
    // Remove the highlight from the labels
    d3.selectAll(`.label-${formatClassName(xAxis)}-attr > *`).classed('highlighted', false);
    d3.selectAll(`.label-${formatClassName(yAxis)}-attr > *`).classed('highlighted', false);

    // There no longer are attributes that need to be highlighted
    currentX = '';
    currentY = '';

    // If the mouse is no longer over a scatterplot, there don't need to be any tooltip lines
    showMouseLines = false;
  }

  // This function is called when the mouse moves over the scatterplot
  function mouseMove(event: MouseEvent, xAxis: string, yAxis: string) {
    // Update global variables
    mouseX = event.offsetX;
    mouseY = event.offsetY;

    // Scatter coordinates are the absolute coordinates inside a scatterplot
    let scatterX = event.offsetX - (xScale(xAxis) ?? 0);
    let scatterY = event.offsetY - (yScale(yAxis) ?? 0);

    // The index of the x and y attribute
    let xIndex = dataUtil.columns.indexOf(xAxis);
    let yIndex = dataUtil.columns.indexOf(yAxis);

    // Get the corresponding scales and set the correct range
    let xScaleLinear = $xScales[xIndex] as d3.ScaleLinear<number, number>;
    xScaleLinear.range([xScale.bandwidth(), 0]);
    let yScaleLinear = $yScales[yIndex] as d3.ScaleLinear<number, number>;
    yScaleLinear.range([0, yScale.bandwidth()]);

    // Scaled mouse coordinates are the scaled coordinates of a scatterplot
    scaledMouseX = xScaleLinear.invert(scatterX);
    scaledMouseY = yScaleLinear.invert(scatterY);

    // Check which tooltip line to display
    showBottomLeftLines = (xScale(yAxis) ?? 0) > mouseX;
    showTopRightLines = !showBottomLeftLines;
  }

  onMount(() => {
    /* Select all brush elements, these are already created in the scatterplot component
       Add a d3 brush to them and set the brush size to a size that corresponds with the scatterplot size
       Finally, add eventhandlers to brushing
    */
    d3.selectAll<SVGGElement, unknown>('.brush').call(
      d3
        .brush()
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
  });

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
    rangePerAttribute[brushX] = calculateRangePerIndex(brushX);
    rangePerAttribute[brushY] = calculateRangePerIndex(brushY);
    // Filter the data
    let excludedPoints: string[] = dataUtil.filterData(rangePerAttribute)[1];

    // Put all the old grey points calculateExcludedPoints
    currentGreyPoints.forEach((name: string) => {
      changeFocus(name, false);
    });

    // Put the points outside of the selection to grey
    excludedPoints.forEach((name) => {
      changeFocus(name, true);
    });

    // Update the current grey points in the scatterplot matrix
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
        d3.max(rowValues, (selection) => {
          return Math.floor((selection as number[][])[0][0]);
        }) ?? -1;
      let maxRow =
        d3.min(rowValues, (selection) => {
          return Math.ceil((selection as number[][])[1][0]);
        }) ?? -1;

      // Do the same for the column
      let minCol =
        d3.max(columnValues, (selection) => {
          return Math.floor((selection as number[][])[0][1]);
        }) ?? -1;
      let maxCol =
        d3.min(columnValues, (selection) => {
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
      let xScaleLinear = $xScales[xIndex + 1] as d3.ScaleLinear<number, number>;
      let yScaleLinear = $yScales[yIndex + 1] as d3.ScaleLinear<number, number>;

      let scaledSelection = [
        [xScaleLinear.invert(selection[0][0]), yScaleLinear.invert(selection[1][1])],
        [xScaleLinear.invert(selection[1][0]), yScaleLinear.invert(selection[0][1])]
      ];
      return scaledSelection;
    }

    /* Toggles the focus of all the points with a given classname
       If the bool is true the point will be grey, if false it will not be grey */
    function changeFocus(pointName: string, needsToBeGrey: boolean) {
      d3.selectAll(`.${pointName}`).classed('greyed', needsToBeGrey);
    }
  }

  /* Custom function that mimics the invert function on other scales.
     But scaleband does not support this function, so need to create it yourself
     Returns the index rather than the name */
  function calculateAttributeIndex(scale: d3.ScaleBand<string>, coordinate: number) {
    const index = Math.floor(coordinate / scale.step());
    return index;
  }

  // Function that fires when the mouse leaves any point
  function onMousePointLeft(): void {
    // If there is a point clicked, do not do anything
    if (clickedPoint != '') return;
    // Remove the highlight from all points
    d3.selectAll('.highlighted').classed('highlighted', false);
    // Tooltip label is no longer visible
    tooltipData.visible = false;
  }
  // Function that fires when the mouse hovers over any point
  function onMousePointEntered(e: CustomEvent<{ name: string; x: number; y: number }>): void {
    // If there is a point clicked, do not do anything
    if (clickedPoint != '') return;

    // Select all the points with the same class name
    let name = e.detail.name;
    d3.selectAll(`.${name}`).classed('highlighted', true);
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
  function onPointClicked(e: CustomEvent<{ name: string; x: number; y: number }>): void {
    let name = e.detail.name;
    // If this point is already clicked, then make the point no longer clicked
    if (name === clickedPoint) {
      clickedPoint = '';
    }
    // If no point is currently clicked, then this point will be the clicked point
    else if (clickedPoint == '') {
      clickedPoint = name;
    }
  }

  // Class names can't accept brackets and other fancy symbols, so remove them
  function formatClassName(name: string) {
    return name.replace(/[\s()/]/g, '');
  }
</script>

<!--
@component
### Scatterplot Matrix
A matrix of scatterplots that can be used to quickly find relations between attributes in a large dataset.

#### Required attributes
* dataUtil: DataUtils;                  - Class holding all the data, see documentation.

#### Optional attributes
* styleUtil: StyleUtils - Class holding all the styling. See documentation.
* padding: number  - Padding between the different scatterplots. Default is 0.1.
* pointColor: string - Color of the points in the scatterplots. Default is "red".
* pointOpacity: number - Default opacity of the points in the scatterplots. Default is 0.3

* height: number   - Height of the Scatterplot Matrix.
* width: number    - Width of the Scatterplot Matrix.
* marginLeft: number  - Margin to the left of the visualisation, defaults to 40
* marginRight: number  - Margin to the right of the visualisation, defaults to 40
* marginTop: number  - Margin to the top of the visualisation, defaults to 40
* marginBottom: number  - Margin to the bottom of the visualisation, defaults to 40
-->

{#await xScale}
  <p>Loading visualisation, please wait...</p>
{:then}
  <svg class="visualisation scatterplotMatrix" {width} {height}>
    {#key dataUtil}
      <!-- Loop over all the attributes on the xAxis -->
      {#each axisNames as xAxis}
        <!-- Loop over all the attributes on the yAxis -->
        {#each axisNames as yAxis}
          <!-- If they are not the same, draw a scatterplot -->
          {#if xAxis != yAxis}
            <g
              style="cursor:crosshair"
              transform="translate({xScale(xAxis)},{yScale(yAxis)})"
              on:mouseover={() => {
                mouseOver(xAxis, yAxis);
              }}
              on:mouseout={() => {
                mouseOut(xAxis, yAxis);
              }}
              on:focus={() => {
                mouseOver(xAxis, yAxis);
              }}
              on:blur={() => {
                mouseOut(xAxis, yAxis);
              }}
              on:mousemove={(event) => {
                mouseMove(event, xAxis, yAxis);
              }}
              role="treeitem"
              aria-selected="false"
              tabindex={-1}>
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
              <Scatterplot
                on:mousePointLeft={onMousePointLeft}
                on:mousePointEntered={onMousePointEntered}
                on:pointClicked={onPointClicked}
                {xAxis}
                {yAxis}
                width={xScale.bandwidth()}
                height={yScale.bandwidth()}
                showAxis={false}
                {pointOpacity} />
            </g>
            <!-- If xAxis and yAxis are the same, draw a label displaying the attribute name -->
          {:else}
            <g transform="translate({xScale(xAxis)},{yScale(yAxis)})">
              <Label
                x={xScale.bandwidth() / 2}
                y={yScale.bandwidth() / 2}
                text={xAxis}
                hasBackground={true}
                name={formatClassName(xAxis) + '-attr'}
                width={xScale.bandwidth()}
                height={yScale.bandwidth()}
                color="white" />
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
          <Label
            x={width - marginRight - 10}
            y={Math.round(mouseY) + 10}
            text={`${Math.round(scaledMouseY)}`}
            fontSize={'14'}
            fontWeight={'bold'}
            hasBackground={false} />
          <!-- Draw a line to the top axis, and a label displaying the scaled x position of the mouse -->
          <StaticLine
            points={[
              { x: mouseX, y: mouseY },
              { x: mouseX, y: marginTop }
            ]}
            opacity={0.5}
            dashLength="5" />
          <Label
            x={Math.round(mouseX) + 10}
            y={marginTop + 10}
            text={`${Math.round(scaledMouseX)}`}
            fontSize={'14'}
            fontWeight={'bold'}
            hasBackground={false} />
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
          <Label
            x={marginLeft + 10}
            y={Math.round(mouseY) + 10}
            text={`${Math.round(scaledMouseY)}`}
            fontSize={'14'}
            fontWeight={'bold'}
            originY={OriginY.Top}
            hasBackground={false} />
          <!-- Draw a line to the bottom axis, and a label displaying the scaled x position of the mouse -->
          <StaticLine
            points={[
              { x: mouseX, y: mouseY },
              { x: mouseX, y: height - marginBottom }
            ]}
            opacity={0.5}
            dashLength="5" />
          <Label
            x={Math.round(mouseX) + 15}
            y={height - marginBottom - 10}
            text={`${Math.round(scaledMouseX)}`}
            fontSize={'14'}
            fontWeight={'bold'}
            originX={OriginX.Left}
            hasBackground={false} />
        {/if}
        <!-- End of if-statement about the mouselines-->
      {/if}
      <!-- Draw the tooltip if a point is hovered over or clicked -->
      {#if tooltipData.visible}
        <Label
          x={tooltipData.x - 15}
          y={tooltipData.y - 16}
          text={tooltipData.text}
          color={'#FFF'}
          hasBackground={true}
          fontSize={'14'}
          fontWeight={'bold'}
          backgroundOpacity={0.7}
          name={tooltipData.text}
          borderColor="none"
          padding={0} />
      {/if}
    {/key}
    <!-- Draw the axis on all 4 sides of the Scatterplot matrix -->
    <DynamicAxis
      position="left"
      spacingDirection="vertical"
      ticksNumber={4}
      hasPadding={true}
      startColumn={1} />
    <DynamicAxis
      position="right"
      spacingDirection="vertical"
      ticksNumber={4}
      hasPadding={true}
      startColumn={1} />
    <DynamicAxis
      position="bottom"
      spacingDirection="horizontal"
      ticksNumber={4}
      hasPadding={true}
      startColumn={1} />
    <DynamicAxis
      position="top"
      spacingDirection="horizontal"
      ticksNumber={4}
      hasPadding={true}
      startColumn={1} />
  </svg>
{:catch}
  <p>Loading visualisation failed</p>
{/await}
